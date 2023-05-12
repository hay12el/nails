import  Express  from "express";
import {sendPushNotification} from '../controllers/notificationController'

const router = Express.Router()

router.post('/sendNotification', sendPushNotification);

export default router;