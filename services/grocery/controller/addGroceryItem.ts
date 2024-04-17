import { HttpUnAuthorized } from "../../../shared/lib/exceptions/HttpUnAuthorized";
import { CREATED } from "../../../shared/constants/httpStatusCodes";
import GroceryItem from "../../../shared/database/models/GroceryItem";
import { isDefined } from "../../../shared/helpers/isDefined";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { IGroceryItem } from "../interface";
import { UN_AUTHORIZED } from "../../../shared/constants/httpErrorMessages";

export const addGroceryItem = async (params: IControllerParams<IGroceryItem>) => {
    const inputs = params.input;
    if(params.user.userType!=="ADMIN") throw new HttpUnAuthorized(UN_AUTHORIZED)
    const groceryItemEntity = {
        ...inputs,
        createdBy: params.user.uuid,
        updatedBy: params.user.uuid
    }
    if (isDefined(inputs.description)) {
        groceryItemEntity["description"] = inputs.description;
    }
    const item = await GroceryItem.create(groceryItemEntity);
    return {
        message: CREATED,
        payload: { uuid: item.uuid },
    };
}
