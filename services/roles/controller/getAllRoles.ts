import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { NOT_FOUND } from "../../../shared/constants/httpErrorMessages";
import Role from "../../../shared/database/models/Role";
import { SUCCESSFULL } from "../../../shared/constants/httpSuccessMessages";

import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { Op, WhereOptions } from "sequelize";

export const getAllRoles = async (param:IControllerParams<null>) => {
  let where:WhereOptions= {
    deletedAt: null
  }
  if (param.user.userType !== "ADMIN") {
    where.userType={
      [Op.not]:['DEVELOPER', 'ADMIN', 'PRINCIPLE', 'FRONT_DESK']
    }
  }
  const roles = await Role.findAndCountAll({
    attributes: ["uuid", "name", "userType"],
    where
  });

  if (!roles) {
    throw new HttpNotFound("Role " + NOT_FOUND);
  }

  return {
    message: SUCCESSFULL,
    payload: { data: roles.rows, count: roles.count },
  };
};
