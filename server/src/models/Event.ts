import { Schema, model, Types } from "mongoose";
import {IEvent} from '../interfaces/interfaces';


const EventSchema = new Schema<IEvent>({
    admin: {type: String, required: true},
    time: {type: Date, required: true},
    type: {type: String, required: true},
    connectTo: {
        type: Types.ObjectId,
        ref: "User"
    }
});

const Event = model<IEvent>("Event", EventSchema);

export default Event;
