import { Router } from "express";
import { LOGIN, REGISTER, checkAuth, GetAdminUsers } from "../controllers/userController";
import {verifyToken} from '../middleware/verifyToken'

const router = Router();

router.post("/checkAuth", verifyToken ,checkAuth);

router.post("/login", LOGIN);

router.post("/register", REGISTER);

router.get('/getAdminUsers', verifyToken ,GetAdminUsers)

export default router;
