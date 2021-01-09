import { Schema, Types } from "mongoose";
import { StoryNodeSchema } from "./StoryNode";

export const NodeConnectionSchema = new Schema({
  node: { type: Types.ObjectId, ref: "StoryNode" },
  description: { type: String },
});
