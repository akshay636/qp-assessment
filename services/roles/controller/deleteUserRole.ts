import { NOT_FOUND, ROLE_DELETE_NOT_ALLOWED } from "../../../shared/constants/httpErrorMessages";
import { SUCCESSFULL } from "../../../shared/constants/httpSuccessMessages";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import Role from "../../../shared/database/models/Role";
import { User } from "../../../shared/database/models";

export const deleteSingleUserRole = async (params: IControllerParams<{}>) => {

    const role: any = await Role.findOne({
        attributes: ["uuid", "name", "description", "privileges"],
        where: {
            uuid: params.args.params.roleUuid
        }, include: [{
            model: User
        }]
    });

    if (!role) {
        throw new HttpNotFound("Role " + NOT_FOUND);
    }

    if (role.Users.length) {
        throw new HttpBadRequest(ROLE_DELETE_NOT_ALLOWED);
    }

    await Role.destroy({
        where: {
            uuid: params.args.params.roleUuid
        }
    });

    return {
        message: SUCCESSFULL
    };
}
