import {Router} from 'express';
import { Request, Response } from 'express';
import {getDayQueues,addNewQueue,getMyQueues,deleteMyQueue,AdminGetDayQueues} from '../controllers/eventController'
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get("/getDayQueues",  getDayQueues);

router.post("/addNewQueue", verifyToken ,addNewQueue);

router.get('/getMyQueues', verifyToken ,getMyQueues);

router.post('/deleteMyQueue', verifyToken ,deleteMyQueue)

router.get('/adminGetDayQueues', verifyToken, AdminGetDayQueues);

export default router;