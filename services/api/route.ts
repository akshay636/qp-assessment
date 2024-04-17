import { Router } from "express";
import { userRouter } from "../user/api";
import { authRouter } from "../auth/api";
import { rolesRouter } from "../roles/api";
import { groceryRouter } from "../grocery/api";
import { orderRouter } from "../order/api";
// instantiating the router
// adding the routers from other modules(next layer router)
const router = Router();
//auth router
router.use("/auth", authRouter);
//user router
router.use("/user", userRouter);
//roles router
router.use('/roles', rolesRouter);
//grocery router
router.use('/grocery', groceryRouter)
//order router
router.use('/order', orderRouter)
export default router;