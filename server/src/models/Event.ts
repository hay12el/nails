import { Schema, model, Types } from "mongoose";
import {IEvent} from '../interfaces/interfaces';


const EventSchema = new Schema<IEvent>({
    admin: {type: String, required: false},
    time: {type: Date, required: true},
    type: {type: String, required: true},
    to: {type: String, required: false},
    connectTo: {
        type: Types.ObjectId,
        ref: "User"
    }
});

const Event = model<IEvent>("Event", EventSchema);

export default Event;
