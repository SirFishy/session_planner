import { Schema, Types } from "mongoose";
import { NodeConnectionSchema } from "./NodeConnection";

export const StoryNodeSchema = new Schema({
  description: { type: String, required: true },
  connections: { type: Types.Array<> },
});
