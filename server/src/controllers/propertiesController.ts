import AdminProperties from "../models/AdminProperties";
import { Request, Response } from "express";

export const getAdminProperties = async (req: Request, res: Response) => {
  try {   
    const adminProperties = await AdminProperties.findOne({
      admin: req.query.adminId,
    }).select('-_id -admin');
    res.send({adminProperties: adminProperties, user: req.query.user}).status(200);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};

export const addNewPhoto = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};

export const changePhotoText = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};

export const changeAboutMe = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};
