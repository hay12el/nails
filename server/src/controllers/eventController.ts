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

    const type = req.query.type;

    //@ts-ignore
    const hours = queues.map((x) => new Date(x.time));
    const hoursToReturn = hours.map((x: Date) => x.getUTCHours());

    res.send({ events: hoursToReturn }).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export const addNewQueue = async (req: Request, res: Response) => {
  const { myAdmin, time, hour, type } = req.body;

  const dateObj = new Date(time).setUTCHours(hour);

  try {
    //make new Event
    const event = new Event({
      admin: myAdmin,
      time: new Date(dateObj),
      //@ts-ignore
      connectTo: req.userId,
      type: type,
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
    const yesterday = today.setHours(0, 0, 0, 0);
    //@ts-ignore
    const myQueues = await User.findOne({ _id: req.userId });
    const queues = await Event.find({
      _id: { $in: myQueues?.queues },
      time: { $gte: yesterday },
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
        let objType;
        if (
          queues[i].type == "A" ||
          queues[i].type == "D" ||
          queues[i].type == "F"
        ) {
          if (
            queues[i + 1].type == "A" ||
            queues[i + 1].type == "C" ||
            queues[i + 1].type == "E"
          ) {
            // start and end round hour
            objType = "A";
          } else {
            objType = "B";
          }
        } else {
          if (
            queues[i + 1].type == "A" ||
            queues[i + 1].type == "C" ||
            queues[i + 1].type == "E"
          ) {
            objType = "C";
          } else {
            objType = "D";
          }
        }

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
          type: objType,
          //@ts-ignore
          hour: gapType(queues[i].time.getHours() - 3, queues[i].type),
          //@ts-ignore
          gap: calcGapForAdmin(
            {
              hour: queues[i].time.getHours(),
              type: queues[i].type,
            },
            {
              hour: queues[i + 1].time.getHours(),
              type: queues[i + 1].type,
            }
          ),
          iscatched: false,
        };
        ///

        ///
        LST.push(newObjj);
      }
      LST.push(newObj);
    }
    LST.sort(function (a, b) {
      if (a.hour != b.hour) {
        //@ts-ignore
        return new Date(a.time) - new Date(b.time);
      } else {
        return a.type.charCodeAt(0) - b.type.charCodeAt(0);
      }
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

export const getAvailableHours = async (req: Request, res: Response) => {
  //@ts-ignore
  const Day = returnDate(req.query.date);
  let nextDay = new Date(Day);
  nextDay.setDate(Day.getDate() + 1);

  const queues = await Event.find({
    admin: req.query.admin,
    time: { $gte: Day, $lt: nextDay },
  }).select("time type");

  const hours = queues.map((x) => {
    //@ts-ignore
    return { hour: new Date(x.time).getUTCHours(), type: x.type };
  });
  hours.push({ hour: new Date(Day.setHours(12)).getUTCHours(), type: "M" });
  hours.push({ hour: new Date(Day.setHours(22)).getUTCHours(), type: "M" });

  hours.sort((a, b) => {
    //@ts-ignore
    return a.hour - b.hour;
  });

  const type = req.query.type;

  const gaps = getQueueGaps(hours);

  let availableHours = [];
  switch (type) {
    case "1":
      availableHours = checkHours(gaps, "1");
      break;
    case "2":
      availableHours = checkHours(gaps, "2");
      break;
    case "3":
      availableHours = checkHours(gaps, "3");
      break;
    default:
      break;
  }

  res.send({ events: availableHours }).status(200);
};

//@ts-ignore
function getQueueGaps(sortedQueues) {
  // Initialize an array to store the gaps
  const gaps = [];

  // Loop through the queues and calculate the gaps
  for (let i = 0; i < sortedQueues.length - 1; i++) {
    const currentQueue = sortedQueues[i];
    const nextQueue = sortedQueues[i + 1];

    let gap = 0;
    // Calculate the gap between the current queue and the next queue
    if (currentQueue.type == "M") {
      console.log(currentQueue.hour);
      console.log(nextQueue.hour);

      gap =
        1 +
        nextQueue.hour +
        (nextQueue.type === "F" ||
        nextQueue.type === "D" ||
        nextQueue.type === "B"
          ? 0.5
          : 0) -
        currentQueue.hour;
    } else if (nextQueue.type == "M") {
      console.log(currentQueue.hour);
      console.log(nextQueue.hour);

      gap =
        nextQueue.hour -
        (currentQueue.hour +
          (currentQueue.type === "C" || currentQueue.type === "D" ? 1 : 0) +
          (currentQueue.type === "E" ||
          currentQueue.type === "F" ||
          currentQueue.type === "B"
            ? 0.5
            : 0));
    } else {
      console.log(currentQueue.hour);
      console.log(nextQueue.hour);

      gap =
        nextQueue.hour +
        (nextQueue.type === "F" ||
        nextQueue.type === "D" ||
        nextQueue.type === "B"
          ? 0.5
          : 0) -
        (currentQueue.hour +
          (currentQueue.type === "C" || currentQueue.type === "D" ? 1 : 0) +
          (currentQueue.type === "E" ||
          currentQueue.type === "F" ||
          currentQueue.type === "B"
            ? 0.5
            : 0));
    }

    // Add the gap to the gaps array
    if (gap > 1) {
      gaps.push({
        gap: gap - 1,
        startFrom:
          currentQueue.hour +
          (currentQueue.type === "C" ||
          currentQueue.type === "D" ||
          currentQueue.type === "A" ||
          currentQueue.type === "B"
            ? 1
            : 0) +
          (currentQueue.type === "C" ||
          currentQueue.type === "E" ||
          currentQueue.type === "F" ||
          currentQueue.type === "B"
            ? 0.5
            : 0),
      });
    }
  }

  return gaps;
}

//@ts-ignore
const gapType = (hour, type) => {
  if (type == "D") {
    return hour + 2;
  } else if (type == "E") {
    return hour;
  } else {
    return hour + 1;
  }
};

const calcGapForAdmin = (currentQueue, nextQueue) => {
  let gap = 0;
  // Calculate the gap between the current queue and the next queue
  if (currentQueue.type == "M") {
    console.log(currentQueue.hour);
    console.log(nextQueue.hour);

    gap =
      1 +
      nextQueue.hour +
      (nextQueue.type === "F" ||
      nextQueue.type === "D" ||
      nextQueue.type === "B"
        ? 0.5
        : 0) -
      currentQueue.hour;
  } else if (nextQueue.type == "M") {
    console.log("nextQueue",currentQueue.hour);
    console.log(nextQueue.hour);

    gap =
      nextQueue.hour -
      (currentQueue.hour +
        (currentQueue.type === "C" || currentQueue.type === "D" ? 1 : 0) +
        (currentQueue.type === "E" ||
        currentQueue.type === "F" ||
        currentQueue.type === "B"
          ? 0.5
          : 0));
  } else {
    gap =
      nextQueue.hour +
      (nextQueue.type === "F" ||
      nextQueue.type === "D" ||
      nextQueue.type === "B"
        ? 0.5
        : 0) -
      (currentQueue.hour +
        (currentQueue.type === "C" || currentQueue.type === "D" ? 1 : 0) +
        (currentQueue.type === "E" ||
        currentQueue.type === "F" ||
        currentQueue.type === "B"
          ? 0.5
          : 0));
  }
  return Math.floor(gap);
};

//@ts-ignore
const checkHours = (gaps, type) => {
  const types = { "1": 1, "2": 1.5, "3": 0.5 };

  let availableHours = [];
  for (const gap of gaps) {
    //@ts-ignore
    if (gap.gap >= types[type]) {
      let plusGap = gap.startFrom + gap.gap;
      let tempHour = gap.startFrom;
      while (tempHour <= plusGap) {
        //@ts-ignore
        if (tempHour + types[type] <= plusGap) {
          availableHours.push(tempHour);
        }
        tempHour = tempHour + 0.5;
      }
    }
  }
  return availableHours;
};

//////

//@ts-ignore
const addHours = (date, hours) => {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + hours);

  return newDate;
};

const returnDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return new Date(year, month, day, 0);
};
