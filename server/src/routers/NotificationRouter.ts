import  Express  from "express";
import {sendPushNotification, updateToken} from '../controllers/notificationController'
import { verifyToken } from "../middleware/verifyToken";

const router = Express.Router()

router.post('/updateToken', verifyToken ,updateToken);

router.post('/sendNotification', verifyToken ,sendPushNotification);


export default router;