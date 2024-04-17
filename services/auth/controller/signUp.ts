import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { generateSha256Password } from "../../../shared/helpers/generateSha256Password";
import { CREATED } from "../../../shared/constants/httpSuccessMessages";
import { sign } from "jsonwebtoken";
import { User } from "../../../shared/database/models";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { IRegister } from "../interface/IRegister";
import Role from "../../../shared/database/models/Role";
import UserRoles from "../../../shared/database/models/UserRoles";
import { ROLE_NOT_FOUND } from "../../../shared/constants/httpErrorMessages";

const signUp = async (params: IControllerParams<IRegister>) => {
  const inputs = params.input;
  const role = await Role.findOne({
    where: {
      userType: inputs.type,
    },
  });

  if(!role){
    throw new HttpBadRequest(ROLE_NOT_FOUND)
  }

  const userEntity = {
    firstName : inputs.firstName,
    lastName: inputs.lastName,
    type: inputs.type,
    email: inputs.email,
    phone: inputs.phone,
    password: generateSha256Password(inputs.password),
  };
   const exitingUser = await User.findOne({
    where: {
      email: inputs.email
    }
   })

  let createdUser;
  if (exitingUser) {
    throw new HttpBadRequest('User is already exist with the same email')
  } else {
    createdUser = await User.create(userEntity);
    await UserRoles.create(
      {
        userUuid:createdUser.uuid,
        roleUuid: role.uuid
      },
    );
  }     
  

  const token = sign(
    {
      uuid: createdUser.uuid,
      role: role.uuid,
      userType:role.userType
    },
    process.env.SHA256_PASSWORD_SALT,
    { expiresIn: process.env.TOKEN_LIFE }
  );

  return {
    message: CREATED,
    payload: {
      token,
    },
  };
};

export default signUp