import { Router } from "express";
import { invokeControllerRequest } from "../../../shared/middleware/invokeControllerRequest";
import { addGroceryItem } from "../controller/addGroceryItem";
import authBarrier from "../../../shared/middleware/authBarrier";
import { getAllItems } from "../controller/getAllItems";
import { updateItem } from "../controller/updateItem";
import { deleteItem } from "../controller/deleteItem";



const router = Router();
router.get('/', invokeControllerRequest({
  controller: getAllItems,
  options: { transaction: false }
}))

router.post('/',authBarrier, invokeControllerRequest({
  controller: addGroceryItem,
  options: { transaction: false }
}))

router.put('/:uuid',authBarrier,invokeControllerRequest({
  controller: updateItem,
  options: { transaction: false }
}))

router.delete('/:uuid',authBarrier,invokeControllerRequest({
  controller: deleteItem,
  options: { transaction: false }
}))



export const groceryRouter = router;
