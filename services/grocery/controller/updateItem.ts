import GroceryItem from "../../../shared/database/models/GroceryItem";
import { NOT_FOUND, UN_AUTHORIZED } from "../../../shared/constants/httpErrorMessages";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { UPDATED } from "../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { IGroceryItem } from "../interface";
import { HttpUnAuthorized } from "../../../shared/lib/exceptions/HttpUnAuthorized";

export const updateItem=async (params: IControllerParams<IGroceryItem>) => {
  if(params.user.userType!=="ADMIN") throw new HttpUnAuthorized(UN_AUTHORIZED)
    const item = await GroceryItem.findOne({
      where:{
        uuid: params.input.uuid,
      },
    });
    if(!item) throw new HttpNotFound(NOT_FOUND)
    await item.update(params.input)
    return {
        message: UPDATED
    };
}
