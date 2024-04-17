import GroceryItem from "../../../shared/database/models/GroceryItem";
import { NOT_FOUND } from "../../../shared/constants/httpErrorMessages";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import { CREATED } from "../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../shared/interface/IControllerParams";
import Order from "../../../shared/database/models/Order";
import { IGroceryItem } from "../../../services/grocery/interface";
import OrderItem from "../../../shared/database/models/OrderItem";


export const createAnOrder=async (params: IControllerParams<null>) => {
    const {input} = params
    const groceryItems = await GroceryItem.findAll({
      where:{
        uuid: Object.keys(input.items),
      },
      attributes:{
        exclude: ['createdBy','createdAt', 'updatedAt']
      }
    });
    if(!groceryItems) throw new HttpNotFound(NOT_FOUND)
   let totalQuantity:number|any= Object.values(input.items).reduce((acc:number, curr:number) => acc+curr,0);

   let totalAmount:number = groceryItems.reduce((acc:number,curr:IGroceryItem)=>acc+curr.price,0)

   let orderPayload ={
    total: totalAmount,
    quantity: totalQuantity,
    userUuid: params.user.uuid,
    status:'PENDING',
    ...(input.additionalNote && { additionalNote: input.additionalNote })
   }

    const order = await Order.create(orderPayload)
    const orderItems = Object.entries(input.items).map(([key, quantity])=>{
      let item = groceryItems.find((gItem)=>gItem.uuid===key)
      if(item){
        return {
            groceryUuid: key,
            price: item.price,
            total: (item.price as number) * (quantity as number),
            quantity: quantity,
            OrderUuid: order.uuid,
            status: 'PENDING',
            groceryItemUuid: item.uuid
      }
      }

      })
    await OrderItem.bulkCreate(orderItems)
    return {
        message: CREATED
    };
}
