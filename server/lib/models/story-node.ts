import { Schema, Types } from "mongoose";
import { INodeConnectionDocument } from "./node-connection";
import * as mongoose from "mongoose";

export const StoryNodeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export interface IStoryNodeDocument extends mongoose.Document {
  title: string;
  description: string;
}
