import { Date, Types } from "mongoose";

export interface IUser {
  isAdmin: Boolean;
  username: String;
  email: String;
  myAdmin: String;
  password: String;
  birthDay: Date;
  name: String;
  phone: String;
  queues: [
    {
      type: Types.ObjectId;
      ref: "Event";
    }
  ];
}

export interface IEvent {
  admin: String;
  time: Date;
  type: String;
  to: String;
  connectTo: {
    type: Types.ObjectId;
    ref: "User";
  };
}

export interface IAdminProperties {
  admin: {
    type: Types.ObjectId;
    ref: "User";
  };
  photos: {};
  aboutMe: String;
  links: {};
}
