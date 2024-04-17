import { Router } from "express";
import { invokeControllerRequest } from "../../../shared/middleware/invokeControllerRequest";
import { createAnOrder } from "../controller/createAnOrder";
import authBarrier from "../../../shared/middleware/authBarrier";



const router = Router();
router.post('/', authBarrier, invokeControllerRequest({
  controller: createAnOrder,
  options: { transaction: false }
}))



export const orderRouter = router;
