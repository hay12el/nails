import { Request, Response } from "express";
import moment from "moment";
import Event from "../models/Event";
import User from "../models/User";

export const getDayQueues = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const Day = returnDate(req.query.date);
    let nextDay = new Date(Day);
    nextDay.setDate(Day.getDate() + 1);

    const queues = await Event.find({
      admin: req.query.admin,
      time: { $gte: Day, $lt: nextDay },
    });
    //@ts-ignore
    const hours = queues.map((x) => new Date(x.time));
    const hoursToReturn = hours.map((x: Date) => x.getUTCHours());

    res.send({ events: hoursToReturn }).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export const addNewQueue = async (req: Request, res: Response) => {
  //@ts-ignore
  const { myAdmin, time, hour } = req.body;
  const dateObj = new Date(time);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hourN = hour;
  const theTime = new Date(year, month, day, hourN + 3);

  let tomorowDate = new Date(year, month, day + 5, hourN + 3);
  let yesterdayDate = new Date(year, month, day - 5, hourN + 3);

  try {
    //make new Event
    const event = new Event({
      admin: myAdmin,
      time: theTime,
      //@ts-ignore
      connectTo: req.userId,
      type: "A",
    });

    //save the new Event to database
    await event.save();

    const afterUpdate = await User.findOneAndUpdate(
      //@ts-ignore
      { _id: req.userId },
      { $push: { queues: event } }
    );

    res.send(afterUpdate?.queues).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export const getMyQueues = async (req: Request, res: Response) => {
  try {
    const today = new Date(moment().format());

    //@ts-ignore
    const yesterday = today - 24 * 60 * 60 * 1000;
    const yesterdayDate = new Date(yesterday);
    //@ts-ignore
    const myQueues = await User.findOne({ _id: req.userId });
    const queues = await Event.find({
      _id: { $in: myQueues?.queues },
      time: { $gte: yesterdayDate },
    });
    res.send(queues).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export const deleteMyQueue = async (req: Request, res: Response) => {
  const { queueId } = req.body;

  try {
    await Event.findOneAndDelete({ _id: queueId });

    await User.findOneAndUpdate(
      //@ts-ignore
      { _id: req.userId },
      { $pull: { queues: queueId } }
    );

    getMyQueues(req, res);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const AdminGetDayQueues = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const Day = returnDate(req.query.date);
    let nextDay = new Date(Day);
    nextDay.setDate(Day.getDate() + 1);
    
    //@ts-ignore
    const queues = await Event.find({ admin: req.userId, time: {$gte: Day, $lt: nextDay}});

    let LST = [];
    for (let queue of queues) {
      let user = await User.findOne({ _id: queue.connectTo }).select(
        "username phone email isAdmin"
      );
      let newObj = {
        user: {
          userId: user?._id,
          username: user?.username,
          email: user?.email,
          phone: user?.phone,
          isAdmin: user?.isAdmin
        },
        postId: queue._id,
        time: queue.time,
        //@ts-ignore
        hour: queue.time.getHours() -3
      };
      LST.push(newObj)
    }
    
    res.send({events: LST}).status(200);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

const returnDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return new Date(year, month, day, 0);
};
