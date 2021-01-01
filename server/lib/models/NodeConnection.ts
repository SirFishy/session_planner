import { Schema } from "mongoose";
import { StoryNodeSchema } from "./StoryNode";

export const NodeConnectionSchema = new Schema({
  node: { type: StoryNodeSchema, required: true },
  description: { type: String },
});
