import { Router } from "express";
import { LOGIN, REGISTER, checkAuth } from "../controllers/userController";
import {verifyToken} from '../middleware/verifyToken'

const router = Router();

router.post("/checkAuth", verifyToken ,checkAuth);

router.post("/login", LOGIN);

router.post("/register", REGISTER);

export default router;
