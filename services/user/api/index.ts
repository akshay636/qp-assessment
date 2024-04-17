import { Router } from "express";
import { invokeControllerRequest } from "../../../shared/middleware/invokeControllerRequest";
import addUser from "../controller/addUser";
import authBarrier from "../../../shared/middleware/authBarrier";
import getUserDetails from "../controller/getUserDetails";
import { deleteSingleUser } from "../controller/deleteUser";
import { updateUser } from "../controller/updateUser";

const router = Router();
router.post(
  "/",
  authBarrier,
  invokeControllerRequest({
    controller: addUser,
  })
);
router.get(
  "/:uuid",
  authBarrier,
  invokeControllerRequest({
    controller: getUserDetails,
  })
);
router.put(
  "/:uuid",
  authBarrier,
  invokeControllerRequest({
    controller: updateUser,
  })
);
router.delete(
  "/:uuid",
  authBarrier,
  invokeControllerRequest({
    controller: deleteSingleUser,
  })
);

export const userRouter = router;
