import { Request, Response } from "express";
import moment from "moment";
import { IEvent } from "../interfaces/interfaces";
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
  const { myAdmin, time, hour } = req.body;
  const dateObj = new Date(time);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hourN = hour;
  const theTime = new Date(year, month, day, hourN + 3);

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
    const timeAsString = req.query.date.split("T")[0];

    //@ts-ignore
    const Day = returnDate(req.query.date);
    let nextDay = new Date(Day);
    nextDay.setDate(Day.getDate() + 1);

    const queues = await Event.find({
      //@ts-ignore
      admin: req.userId,
      time: { $gte: Day, $lt: nextDay },
    }).sort("time");
    const usersId = queues.map((event: IEvent) => event.connectTo);
    const users = await User.find({ _id: { $in: usersId } }).select(
      "username phone email isAdmin"
    );

    const objectToReturn = {};
    let LST = [];
    for (let i = 0; i < queues.length; i++) {
      let user = users.find(
        (us) => us._id.toString() == queues[i].connectTo.toString()
      );
      let newObj = {
        user: {
          userId: user?._id,
          username: user?.username,
          email: user?.email,
          phone: user?.phone,
          isAdmin: user?.isAdmin,
        },
        postId: queues[i]._id,
        time: queues[i].time,
        type: queues[i].type,
        //@ts-ignore
        hour: queues[i].time.getHours() - 3,
        iscatched: true,
      };
      if (
        i < queues.length - 1 &&
        //@ts-ignore
        queues[i + 1].time.getHours() - queues[i].time.getHours() > 1
      ) {
        //@ts-ignore
        let newObjj = {
          user: {
            userId: user?._id,
            username: user?.username,
            email: user?.email,
            phone: user?.phone,
            isAdmin: user?.isAdmin,
          },
          postId: queues[i]._id,
          //@ts-ignore
          time: addHours(queues[i].time, 1),
          type: "M",
          //@ts-ignore
          hour: queues[i].time.getHours() - 2,
          //@ts-ignore
          gap: queues[i + 1].time.getHours() - queues[i].time.getHours(),
          iscatched: false,
        };
        LST.push(newObjj);
      }
      LST.push(newObj);
    }
    LST.sort(function (a, b) {
      //@ts-ignore
      return new Date(a.time) - new Date(b.time);
    });
    //@ts-ignore
    objectToReturn[timeAsString] = LST;
    res.send({ events: objectToReturn }).status(200);
    // res.sendStatus(200);
  } catch (err: any) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const AdminDeleteQueue = async (req: Request, res: Response) => {
  try {
    const { userId, date, queueId } = req.body;

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { queues: queueId } }
    );

    await Event.findOneAndDelete({ _id: queueId });

    req.query.date = date;
    AdminGetDayQueues(req, res);
  } catch (err) {
    res.sendStatus(404);
  }
};

//@ts-ignore
const addHours = (date, hours) => {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + hours);

  return newDate;
}

const returnDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return new Date(year, month, day, 0);
};
