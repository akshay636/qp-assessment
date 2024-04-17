import User from "../../../shared/database/models/User";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { sign } from "jsonwebtoken";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { WRONG_USER_OR_PASSWORD } from "../../../shared/constants/httpErrorMessages";
import { SUCCESSFULL } from "../../../shared/constants/httpSuccessMessages";
import { generateSha256Password } from "../../../shared/helpers/generateSha256Password";
import { ILogin } from "../../../shared/interface/ILogin";
import Role from "../../../shared/database/models/Role";

export const login = async (params: IControllerParams<ILogin>) => {
  const inputs = params.input;
  let user: any;
  user = await User.findOne({
    where: {
      email: inputs.email,
      password: generateSha256Password(inputs.password),
    },
    include: [
      {
        model: Role,
      },
    ],
  });

  if (!user) {
    throw new HttpNotFound(WRONG_USER_OR_PASSWORD);
  }
  const token = sign(
    {
      uuid: user.uuid,
      role: user.Roles.map((role) => role.dataValues.uuid).join(","),
      userType: user.Roles[0].userType,
    },
    process.env.SHA256_PASSWORD_SALT,
    { expiresIn: process.env.TOKEN_LIFE }
  );
  return {
    message: SUCCESSFULL,
    payload: {
      token,
    },
  };
};
