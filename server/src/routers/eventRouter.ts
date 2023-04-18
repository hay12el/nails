import {Router} from 'express';
import {getDayQueues,addNewQueue,getMyQueues,deleteMyQueue,AdminGetDayQueues,AdminDeleteQueue} from '../controllers/eventController'
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get("/getDayQueues",  getDayQueues);

router.post("/addNewQueue", verifyToken ,addNewQueue);

router.get('/getMyQueues', verifyToken ,getMyQueues);

router.post('/deleteMyQueue', verifyToken ,deleteMyQueue)

router.get('/adminGetDayQueues', verifyToken, AdminGetDayQueues);

router.post('/AdminDeleteQueue', verifyToken, AdminDeleteQueue);

export default router;