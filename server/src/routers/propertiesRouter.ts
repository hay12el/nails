import {Router} from 'express';
import {getAdminProperties,addNewPhoto,changeAboutMe,changePhotoText,deletePhoto} from '../controllers/propertiesController'
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get("/getAdminProperties", verifyToken ,getAdminProperties);

router.post('/deletePhoto', verifyToken , deletePhoto);

router.post('/addNewPhoto', verifyToken ,addNewPhoto);

router.post('/changePhotoText', verifyToken , changePhotoText);

router.post('/changeAboutMe', verifyToken , changeAboutMe);


export default router;