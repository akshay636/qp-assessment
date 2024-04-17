import { NOT_FOUND } from "../../../shared/constants/httpErrorMessages";
import {  Role, User } from "../../../shared/database/models";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
const getUserDetails = async (params: IControllerParams<null>) => {
  const uuid = params.input.uuid;

  let user = await User.findOne({
    where: {
      uuid,
    },
    include:{
        model: Role
    }
  });
  if (!user) throw new HttpNotFound(NOT_FOUND);

  return {
    payload: user,
  };
};
export default getUserDetails;
