import  Express  from "express";
import {sendPushNotification, updateToken} from '../controllers/notificationController'
import { verifyToken } from "../middleware/verifyToken";

const router = Express.Router()

router.post('/sendNotification', verifyToken ,sendPushNotification);

router.post('updateToken', verifyToken, updateToken)

export default router;