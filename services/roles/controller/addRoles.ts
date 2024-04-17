import { CREATED } from "../../../shared/constants/httpStatusCodes";
import Role from "../../../shared/database/models/Role";
import { isDefined } from "../../../shared/helpers/isDefined";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { IAddUserRole } from "../interface/IAddUserRole";

export const addUserRole = async (params: IControllerParams<IAddUserRole>) => {
    const inputs = params.input;

    const roleEntity = {
        userType:  inputs.userType,
        name: inputs.name,
        privileges: { names: inputs.privileges },
        // createdBy: params.user.uuid,
        // updatedBy: params.user.uuid
    }

    if (isDefined(inputs.description)) {
        roleEntity["description"] = inputs.description;
    }

    const role = await Role.create(roleEntity);

    return {
        message: CREATED,
        payload: { roleUuid: role.uuid },
    };
}
