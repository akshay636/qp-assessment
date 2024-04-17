import {
  NOT_FOUND,
  USER_DELETED,
} from "../../../shared/constants/httpErrorMessages";
import { Role, User, UserRoles } from "../../../shared/database/models";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";

export const deleteSingleUser = async (params: IControllerParams<{}>) => {
  const user: any = await User.findOne({
    attributes: ["uuid", "firstName", "email", "createdAt"],
    where: {
      uuid: params.input.uuid,
    },
    include: {
      model: Role,
    },
  });

  if (!user) {
    throw new HttpNotFound("User " + NOT_FOUND);
  }
  for (const userRole of user.Roles) {
    await UserRoles.destroy({
      where: {
        roleUuid: userRole.uuid,
        userUuid: user.uuid,
      },
      force: true,
    });
  }

  await User.destroy({
    where: {
      uuid: params.input.uuid,
    },
  });

  return {
    message: USER_DELETED,
  };
};
