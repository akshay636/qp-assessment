import { USER_ADDED } from "../../../shared/constants/httpErrorMessages";
import User from "../../../shared/database/models/User";
import UserRoles from "../../../shared/database/models/UserRoles";
import { generateSha256Password } from "../../../shared/helpers/generateSha256Password";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
 const addUser = async(params:IControllerParams<null>)=>{
  const {input} = params
  const encrptPassword = generateSha256Password(input.password)
  const payload =
  {...input, password:encrptPassword,
    createdBy: params.user.uuid,
    updatedBy:params.user.uuid
  
  }
  const user = await User.create(payload)
  const userRoles = input.roles.map((role) => {
    return {
      userUuid: user.uuid,
      roleUuid: role,
    };
  });

  await UserRoles.bulkCreate(userRoles);
  
  return{
    message:USER_ADDED,
    payload:user
  }
}
export default addUser