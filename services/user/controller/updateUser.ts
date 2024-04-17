import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import {
  NOT_FOUND,
  UN_AUTHORIZED,
  USER_UPDATED,
} from "../../../shared/constants/httpErrorMessages";
import { Op } from "sequelize";
import { ValidationError } from "../../../shared/lib/exceptions/ValidationError";
import { User } from "../../../shared/database/models";
import Role from "../../../shared/database/models/Role";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { IUpdateUser } from "../interface/IUpdateUser";
import UserRoles from "../../../shared/database/models/UserRoles";
import { HttpUnAuthorized } from "../../../shared/lib/exceptions/HttpUnAuthorized";
import { generateSha256Password } from "../../../shared/helpers/generateSha256Password";
import { isDefined } from "../../../shared/helpers/isDefined";

export const updateUser = async (params: IControllerParams<IUpdateUser>) => {
  const inputs = params.input;
  if (
    params.user.userType !== "ADMIN" &&
    params.user.uuid !== params.args.params.uuid
  ) {
    throw new HttpUnAuthorized(UN_AUTHORIZED);
  }
  const user: any = await User.findOne({
    where: {
      uuid: params.args.params.uuid,
    },
    include: [
      {
        model: Role,
      },
    ],
  });

  if (!user) {
    throw new HttpNotFound("User " + NOT_FOUND);
  }

  const userEmailExist: any = await User.findOne({
    where: {
      email: inputs.email,
      uuid: {
        [Op.ne]: params.args.params.uuid,
      },
    },
  });

  if (userEmailExist) {
    throw new ValidationError("error", {
      email: "User with this email id is already exist.",
    });
  }
  const userEntity = {
    ...inputs,
    updatedBy: params.user.uuid,
  };

  if (isDefined(inputs.password)) {
    userEntity["password"] = generateSha256Password(inputs.password);
  }

  let res = await user.update(userEntity);

  const userRoles = inputs.roles.map((role) => {
    return {
      userUuid: user.uuid,
      roleUuid: role,
    };
  });

  for (const userRole of user.Roles) {
    await UserRoles.destroy({
      where: {
        roleUuid: userRole.uuid,
        userUuid: user.uuid,
      },
      force: true,
    });
  }

  await UserRoles.bulkCreate(userRoles);

  return {
    message: USER_UPDATED,
    payload: res,
  };
};
