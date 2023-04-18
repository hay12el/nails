import { Request, Response, NextFunction } from "express";
import { getAdminProperties } from './propertiesController'
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const checkAuth = async (req: Request, res: Response) => {
  try{
    //@ts-ignore
    if (!req.userId) {
      res.status(401).send("problem");
    } else {
      //@ts-ignore
      const user = await User.findOne({ _id: req.userId }, { password: 0 });
      //@ts-ignore
      req.query.user = user;
      //@ts-ignore
      req.query.adminId = user.myAdmin;
      getAdminProperties(req, res);
      // res.json({ user: user }).status(200);
    }
  }catch(err){
    res.sendStatus(401);
  }
};

const LOGIN = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.sendStatus(403);
    } else {
      const comparePassword = await bcrypt.compare(
        password.toString(),
        //@ts-ignore
        user.password
      );

      if (!comparePassword) {
        res.sendStatus(404);
      } else {
        jwt.sign(
          { _id: user._id },
          process.env.secretKey || "",
          { expiresIn: "7 days" },
          (err, token) => {
            if (err) {
              res.sendStatus(403);
            } else {
              res.json({ token: token, user: user }).sendStatus(200);
            }
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(403).json({ message: err });
  }
};

const REGISTER = async (req: Request, res: Response) => {
  try {
    const { username, email, password, birthDay, phone, myAdmin } = req.body;

    const user1 = await User.find({ email: req.body.email });
    if (user1.length != 0) {
      throw new Error("Required");
    } else {
      const temp = {
        username,
        email,
        password,
        phone,
        isAdmin: false,
        myAdmin,
        birthDay: new Date(birthDay),
      };
      temp.password = await bcrypt.hash(password.toString(), 10);
      const user = new User(temp);

      user
        .save()
        .then((result) => {
          const newToken = jwt.sign(
            { _id: user._id },
            process.env.secretKey || "",
            {
              expiresIn: "7 days",
            }
          );
          user.toJSON();

          res.send({ token: newToken, user: user }).status(200);
        })
        .catch((err) => {
          console.log(err.message);

          res.sendStatus(404);
        });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export { LOGIN, REGISTER, checkAuth };
