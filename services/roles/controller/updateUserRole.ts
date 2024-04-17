
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { NOT_FOUND } from "../../../shared/constants/httpErrorMessages";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import Role from "../../../shared/database/models/Role";
import { CREATED } from "../../../shared/constants/httpSuccessMessages";
import { IUpdateUserRole } from "../interface/IUpdateUserRole";

export const updateUserRole = async (params: IControllerParams<IUpdateUserRole>) => {
    const inputs = params.input;
    const role = await Role.findOne({
        attributes: ["uuid", "name", "description", "privileges"],
        where: {
            uuid: params.args.params.roleUuid
        }
    });

    if (!role) {
        throw new HttpNotFound("Role " + NOT_FOUND);
    }

    const roleEntity = {
        userType: inputs.userType,
        name: inputs.name,
        description: inputs.description,
        privileges: { names: inputs.privileges },
        updatedBy: params.user.uuid
    }

    await role.update(roleEntity);
    return {
        message: CREATED,
        payload: { roleUuid: role.uuid },
    };
}
