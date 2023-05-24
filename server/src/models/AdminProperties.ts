import { Schema, model, Types } from "mongoose";
import { IAdminProperties } from "../interfaces/interfaces";

const PropertiesSchema = new Schema<IAdminProperties>({
  admin: {
    type: Types.ObjectId,
    ref: "User",
  },
  photos: {type: [], required: true},
  aboutMe: {type: {}, required: true},
  links: {type: {}, required: true},
});

const AdminProperties = model<IAdminProperties>(
  "AdminProperties",
  PropertiesSchema
);

export default AdminProperties;
