import { Router } from "express";
import { invokeControllerRequest } from "../../../shared/middleware/invokeControllerRequest";
import { login } from "../controller/login";
import { loginSchema } from "../schema/loginSchema";
import signUp from "../controller/signUp";
import { registerSchema } from "../schema/signUpSchema";


const router = Router();
router.post('/sign-up',invokeControllerRequest({
  controller: signUp,
  schema: registerSchema,
  options: { transaction: false }
}))

router.post('/login',invokeControllerRequest({
  controller: login,
  schema: loginSchema,
  options: { transaction: false }
}))


export const authRouter = router;
