
import { CREATED } from "../../../shared/constants/httpStatusCodes";
import GroceryItem from "../../../shared/database/models/GroceryItem";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import { IDynamicObject } from "../../../shared/interface/IDynamicObject";
import {parseLimitOffsetFromRequest} from '../../../shared/helpers/parseLimitOffsetFromReq'
export const getAllItems=async (params: IControllerParams<null>) => {
  const filterParams:IDynamicObject = {}
  if (params?.args.queryString.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(
      params.args.queryString as { limit: any; page: any }
    );
    filterParams.limit = limit;
    filterParams.offset = offset;
  }
    const items = await GroceryItem.findAndCountAll({
      where:{
        deletedAt: null,
      },
      ...filterParams
    });
    return {
        message: CREATED,
        payload: { count: items.count, data: items.rows },
    };
}
