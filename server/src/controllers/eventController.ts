import { Request, Response } from "express";
import moment from "moment";
import { IEvent } from "../interfaces/interfaces";
import Event from "../models/Event";
import User from "../models/User";
import mongoose from "mongoose";

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
  let { myAdmin, time, hour, type, to } = req.body;
  try {
    var dateObj;

    if (type[0] == "M") {
      const newEvent = {
        time: new Date(time).setUTCHours(Number(hour)),
        type: type[1],
        to: Math.floor(to),
        //@ts-ignore
        admin: new mongoose.Types.ObjectId(req.userId),
        //@ts-ignore
        connectTo: new mongoose.Types.ObjectId(req.userId),
      };

      const e = new Event(newEvent);
      await e.save();
      // console.log(e);
      res.sendStatus(200);
    } else {
      let event;
      dateObj = new Date(time).setUTCHours(hour);
      if (type == "G") {
        const Day = returnDate(time);

        let nextDay = new Date(Day);
        nextDay.setDate(Day.getDate() + 1);

        const queues = await Event.find({
          //@ts-ignore
          admin: req.userId,
          time: { $gte: Day, $lt: nextDay },
        });

        //@ts-ignore
        const hours = queues.map((x) => new Date(x.time));
        const hoursToReturn = hours.map((x: Date) => x.getUTCHours());
        if (
          hoursToReturn.some((num) => num < hour) ||
          hoursToReturn.some((num) => num > to)
        ) {
          throw "קיימים תורים בתווך, אנא בטלי אותם לפני קביעת שעות הפעילות";
        } else {
          event = new Event({
            //@ts-ignore
            admin: req.userId,
            time: new Date(dateObj),
            //@ts-ignore
            connectTo: req.userId,
            to: to,
            type: type,
          });
        }
      } else {
        event = new Event({
          admin: myAdmin,
          time: new Date(dateObj),
          //@ts-ignore
          connectTo: req.userId,
          to: to,
          type: type,
        });
      }

      //save the new Event to database
      await event.save();

      const afterUpdate = await User.findOneAndUpdate(
        //@ts-ignore
        { _id: req.userId },
        { $push: { queues: event } }
      );
      res.send(afterUpdate?.queues).status(200);
    }
  } catch (err) {
    //@ts-ignore
    console.log(err);

    res.status(404).send(err);
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
    }).sort("time");
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
    // Add limit hours of the day
    if (!queues.some((e) => e.type == "G")) {
      //@ts-ignore
      queues.push({ time: new Date(Day.setHours(12)), type: "M" });
      //@ts-ignore
      queues.push({ time: new Date(Day.setHours(22)), type: "M" });
    } else {
      // the admin added an hour limitation to the current day
      const limit = queues.find((e) => e.type == "G");

      queues.push({
        //@ts-ignore
        time: new Date(Day.setHours(limit?.time.getHours())),
        type: "M",
      });
      //@ts-ignore
      console.log(new Date(Day.setHours(Number(limit?.to) + 3)));
      queues.push({
        //@ts-ignore
        time: new Date(Day.setHours(Number(limit?.to) + 3)),
        type: "M",
      });
    }
    //Remove Linit Hours
    const ho = queues.filter((x) => x.type != "G");
    //Sort By Hours
    ho.sort((a, b) => {
      //@ts-ignore
      return a.time - b.time;
    });
    if (ho[1].type == "M") {
      let temp = ho[1];
      ho[1] = ho[0];
      ho[0] = temp;
    }

    const objectToReturn = {};
    let LST = [];
    //Go through all the queues
    for (let i = 0; i < ho.length - 1; i++) {
      // if this is the upper limit "queue"
      if (
        ho[i].type == "M" &&
        calcGapForAdmin(
          {
            //@ts-ignore
            hour: ho[i].time.getHours(),
            type: ho[i].type,
          },
          {
            //@ts-ignore
            hour: ho[i + 1].time.getHours(),
            type: ho[i + 1].type,
          },
          false
        ) >= 1
      ) {
        let objType;
        if (
          ho[i + 1].type == "A" ||
          ho[i + 1].type == "C" ||
          ho[i + 1].type == "E"
        ) {
          // start and end round hour
          objType = "A";
        } else {
          objType = "B";
        }
        //@ts-ignore
        let newObj = {
          //@ts-ignore
          time: ho[i].time,
          type: objType,
          //@ts-ignore
          hour: ho[i].time.getHours() - 3,
          //@ts-ignore
          gap: calcGapForAdmin(
            {
              //@ts-ignore
              hour: ho[i].time.getHours(),
              type: ho[i].type,
            },
            {
              //@ts-ignore
              hour: ho[i + 1].time.getHours(),
              type: ho[i + 1].type,
            }
          ),
          iscatched: false,
        };
        LST.push(newObj);
      } else if (ho[i].type != "M") {
        //find the user associated with that queue
        let user = users.find(
          (us) => us._id.toString() == ho[i].connectTo.toString()
        );
        let newObj;
        if (user?.isAdmin) {
          /// The user is Admin
          newObj = {
            user: {
              userId: user?._id,
              username: user?.username,
              email: user?.email,
              phone: user?.phone,
              isAdmin: user?.isAdmin,
            },
            postId: ho[i]._id,
            time: ho[i].time,
            type: ho[i].type,
            to: ho[i].to,
            //@ts-ignore
            hour: ho[i].time.getHours() - 3,
            iscatched: true,
          };
          if (
            i < ho.length - 1 &&
            //@ts-ignore
            calcGapForAdmin(
              {
                //@ts-ignore
                hour: Number(ho[i].to),
                type: ho[i].type,
              },
              {
                //@ts-ignore
                hour: ho[i + 1].time.getHours() - 3,
                type: ho[i + 1].type,
              },
              true
            ) != 0
          ) {
            /// There is Gap
            let objType;
            // the last appointment
            if (ho[i + 1].type == "M") {
              if (ho[i].type == "A" || ho[i].type == "D" || ho[i].type == "F") {
                objType = "A";
              } else {
                objType = "C";
              }
            }
            // Gap between two appoinments
            else if (
              ho[i].type == "A" ||
              ho[i].type == "D" ||
              ho[i].type == "F"
            ) {
              if (
                ho[i + 1].type == "A" ||
                ho[i + 1].type == "C" ||
                ho[i + 1].type == "E"
              ) {
                // start and end round hour
                objType = "A";
              } else {
                objType = "B";
              }
            } else {
              if (
                ho[i + 1].type == "A" ||
                ho[i + 1].type == "C" ||
                ho[i + 1].type == "E"
              ) {
                objType = "C";
              } else {
                objType = "D";
              }
            }
            //@ts-ignore
            let newObjj = {
              time: ho[i + 1].time,
              gap: calcGapForAdmin(
                {
                  //@ts-ignore
                  hour: Number(ho[i].to),
                  type: ho[i].type,
                },
                {
                  //@ts-ignore
                  hour: ho[i + 1].time.getHours() - 3,
                  type: ho[i + 1].type,
                },
                true
              ),
              iscatched: false,
              type: objType,
              //@ts-ignore
              hour: Number(newObj.to),
            };
            console.log(newObjj);

            LST.push(newObjj);
          }
        } else {
          /// regualr user
          newObj = {
            user: {
              userId: user?._id,
              username: user?.username,
              email: user?.email,
              phone: user?.phone,
              isAdmin: user?.isAdmin,
            },
            postId: ho[i]._id,
            time: ho[i].time,
            type: ho[i].type,
            //@ts-ignore
            hour: ho[i].time.getHours() - 3,
            iscatched: true,
          };
          if (
            i < ho.length - 1 &&
            //@ts-ignore
            calcGapForAdmin(
              {
                //@ts-ignore
                hour: ho[i].time.getHours(),
                type: ho[i].type,
              },
              {
                //@ts-ignore
                hour: ho[i + 1].time.getHours(),
                type: ho[i + 1].type,
              }
            ) != 0
          ) {
            let objType;
            // the last appointment
            if (ho[i + 1].type == "M") {
              if (ho[i].type == "A" || ho[i].type == "D" || ho[i].type == "F") {
                objType = "A";
              } else {
                objType = "C";
              }
            }
            // Gap between two appoinments
            else if (
              ho[i].type == "A" ||
              ho[i].type == "D" ||
              ho[i].type == "F"
            ) {
              if (
                ho[i + 1].type == "A" ||
                ho[i + 1].type == "C" ||
                ho[i + 1].type == "E"
              ) {
                // start and end round hour
                objType = "A";
              } else {
                objType = "B";
              }
            } else {
              if (
                ho[i + 1].type == "A" ||
                ho[i + 1].type == "C" ||
                ho[i + 1].type == "E"
              ) {
                objType = "C";
              } else {
                objType = "D";
              }
            }
            let newObjj = {
              time: ho[i + 1].time,
              gap: calcGapForAdmin(
                {
                  //@ts-ignore
                  hour: ho[i].time.getHours(),
                  type: ho[i].type,
                },
                {
                  //@ts-ignore
                  hour: ho[i + 1].time.getHours(),
                  type: ho[i + 1].type,
                },
                false
              ),
              iscatched: false,
              type: objType,
              //@ts-ignore
              hour: gapType(ho[i].time.getHours() - 3, ho[i].type),
            };
            LST.push(newObjj);
          }
        }
        LST.push(newObj);
      }
    }
    LST.sort(function (a, b) {
      //@ts-ignore
      return new Date(a.time) - new Date(b.time);
    });

    //@ts-ignore
    objectToReturn[timeAsString] = LST;
    console.log(objectToReturn);

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

// Works good!
export const getAvailableHours = async (req: Request, res: Response) => {
  //@ts-ignore
  const Day = returnDate(req.query.date);
  let nextDay = new Date(Day);
  nextDay.setDate(Day.getDate() + 1);

  const queues = await Event.find({
    admin: req.query.admin,
    time: { $gte: Day, $lt: nextDay },
  }).select("time type to");
  
  const hours = queues.map((x) => {
    //@ts-ignore
    return { hour: new Date(x.time).getUTCHours(), type: x.type, to: x.to };
  });
  
  // Add limit hours of the day
  if (!hours.some((e) => e.type == "G")) {
    //@ts-ignore
    hours.push({ hour: 9, type: "M" });
    //@ts-ignore
    hours.push({ hour: 18, type: "M" });
  } else {
    const limit = hours.find((e) => e.type == "G");
    //@ts-ignore
    hours.push({ hour: limit?.hour, type: "M" });
    //@ts-ignore
    hours.push({ hour: Number(limit?.to), type: "M" });
  }

  //Remove Linit Hours
  const ho = hours.filter((x) => x.type != "G");

  //Sort By Hours
  ho.sort((a, b) => {
    //@ts-ignore
    return a.hour - b.hour;
  });
  if (ho[1].type == "M" && ho[0].type != "M") {
    let temp = ho[1];
    ho[1] = ho[0];
    ho[0] = temp;
  }

  //gaps == Array of {gap: number, startFrom: number}
  const gaps = getQueueGaps(ho);

  let availableHours = checkHours(gaps, req.query.type);

  res.send({ events: availableHours }).status(200);
};

function getQueueGaps(sortedQueues: any) {
  // Initialize an array to store the gaps
  const gaps = [];

  console.log(sortedQueues);
  

  // Loop through the queues and calculate the gaps
  for (let i = 0; i < sortedQueues.length - 1; i++) {
    const currentQueue = sortedQueues[i];
    const nextQueue = sortedQueues[i + 1];

    let gap = 0;
    // Calculate the gap between the current queue and the next queue
    if (currentQueue.type == "M") {
      gap =
        nextQueue.hour +
        (nextQueue.type == "B" || nextQueue.type == "D" || nextQueue.type == "F"
          ? 0.5
          : 0) -
        currentQueue.hour;
    } else if (nextQueue.type == "M") {
      gap =
        nextQueue.hour -
        (currentQueue.hour +
          (currentQueue.type == "E" ? 0 : 1) +
          (currentQueue.type == "C" ||
          currentQueue.type == "E" ||
          currentQueue.type == "B"
            ? 0.5
            : 0) +
          (currentQueue.type == "D" && +0.5));
    } else {
      gap =
        nextQueue.hour +
        (nextQueue.type == "B" || nextQueue.type == "D" || nextQueue.type == "F"
          ? 0.5
          : 0) -
        (currentQueue.hour +
          (currentQueue.type == "E" ? 0 : 1) +
          (currentQueue.type == "C" ||
          currentQueue.type == "E" ||
          currentQueue.type == "B"
            ? 0.5
            : 0) +
          (currentQueue.type == "D" && +0.5));
    }
    // Add the gap to the gaps array
    if (gap != 0) {
      if (currentQueue.type == "M" && nextQueue.type == "M") {
        console.log(gap, currentQueue.hour);
        gaps.push({
          gap: gap,
          startFrom: currentQueue.hour,
        });
      }else if(currentQueue.type == "M") {
        gaps.push({
          gap: gap,
          startFrom: currentQueue.hour,
        });
      } else {
        gaps.push({
          gap: gap,
          startFrom:
            currentQueue.hour +
            (currentQueue.type == "E" ? 0 : 1) +
            (currentQueue.type == "C" ||
            currentQueue.type == "E" ||
            currentQueue.type == "B"
              ? 0.5
              : 0) +
            (currentQueue.type == "D" && +0.5),
        });
      }
    }
  }

  return gaps;
}

const gapType = (hour: number, type: string) => {
  if (type == "D") {
    return hour + 2;
  } else if (type == "E") {
    return hour;
  } else {
    return hour + 1;
  }
};

//@ts-ignore
const calcGapForAdmin = (currentQueue, nextQueue, isAdmin) => {
  let gap = 0;
  // Calculate the gap between the current queue and the next queue
  console.log(currentQueue, nextQueue);

  if (currentQueue.type == "M") {
    gap =
      nextQueue.hour +
      (nextQueue.type === "F" ||
      nextQueue.type === "D" ||
      nextQueue.type === "B"
        ? 0.5
        : 0) -
      currentQueue.hour;
  } else if (nextQueue.type == "M") {
    if (isAdmin) {
      //Here currentQueue is the end of the cancled queue.
      gap =
        nextQueue.hour -
        (currentQueue.hour +
          (currentQueue.type === "C" || currentQueue.type === "B" ? 0.5 : 0));
    } else {
      console.log("649");

      gap =
        nextQueue.hour -
        (currentQueue.hour +
          (currentQueue.type === "C" ||
          currentQueue.type === "D" ||
          currentQueue.type === "A"
            ? 1
            : 0) +
          (currentQueue.type === "E" ||
          currentQueue.type === "F" ||
          currentQueue.type === "B"
            ? 0.5
            : 0));
    }
  } else {
    if (isAdmin) {
      //Here currentQueue is the end of the cancled queue.
      gap =
        nextQueue.hour +
        (nextQueue.type == "B" || nextQueue.type == "D" || nextQueue.type == "F"
          ? 0.5
          : 0) -
        (currentQueue.hour +
          (currentQueue.type === "C" || currentQueue.type === "B" ? 0.5 : 0));
    } else {
      gap =
        nextQueue.hour +
        (nextQueue.type === "F" ||
        nextQueue.type === "D" ||
        nextQueue.type === "B"
          ? 0.5
          : 0) -
        (currentQueue.hour +
          (currentQueue.type == "E" ? 0 : 1) +
          (currentQueue.type == "C" ||
          currentQueue.type == "E" ||
          currentQueue.type == "B"
            ? 0.5
            : 0) +
          (currentQueue.type == "D" && +0.5));
    }
  }

  return gap;
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
