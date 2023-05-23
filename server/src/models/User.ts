import { Schema, model, Types } from "mongoose";
import {IUser} from '../interfaces/interfaces'

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  phone: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  myAdmin: { type: String, required: false },
  birthDay: { type: Date ,required: false },
  notifiToken: { type: String, required: false }, 
  queues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    }
  ]
});

const User = model<IUser>("User", UserSchema);

export default User;
