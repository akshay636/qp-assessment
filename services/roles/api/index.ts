import { Router } from "express";
import { invokeControllerRequest } from "../../../shared/middleware/invokeControllerRequest";
import authBarrier from "../../../shared/middleware/authBarrier";
import { addUserRole } from "../controller/addRoles";
import { deleteSingleUserRole } from "../controller/deleteUserRole";
import { updateUserRole } from "../controller/updateUserRole";
import { getAllRoles } from "../controller/getAllRoles";


const router = Router();

router.post('/', invokeControllerRequest({
    controller: addUserRole
}))
router.get('/',authBarrier, invokeControllerRequest({
    controller: getAllRoles
}))
router.delete('/:uuid', authBarrier,invokeControllerRequest({
    controller: deleteSingleUserRole
}))
router.put('/:uuid',authBarrier, invokeControllerRequest({
    controller: updateUserRole
}))


export const rolesRouter = router;
