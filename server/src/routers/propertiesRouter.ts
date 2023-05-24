import {Router} from 'express';
import {getAdminProperties,addNewPhoto,changeAboutMe,changePhotoText,deletePhoto} from '../controllers/propertiesController'
import { verifyToken } from '../middleware/verifyToken';
import multer from 'multer';

const upload = multer({dest: 'uploads/' })

const router = Router();

router.get("/getAdminProperties", verifyToken ,getAdminProperties);

router.post('/deletePhoto', verifyToken , deletePhoto);

router.post('/addNewPhoto', verifyToken ,addNewPhoto);

router.post('/changePhotoText', verifyToken , upload.single('image'), changePhotoText);

router.post('/changeAboutMe', verifyToken , changeAboutMe);


export default router;