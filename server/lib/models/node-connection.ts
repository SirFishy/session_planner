import { Schema, Types } from "mongoose";
import { IStoryNodeDocument } from "./story-node";
import * as mongoose from "mongoose";

export const NodeConnectionSchema = new Schema({
  nodeStart: { type: Types.ObjectId, ref: "StoryNode" },
  nodeEnd: { type: Types.ObjectId, ref: "StoryNode" },
  description: { type: String },
  title: { type: String },
});

// prettier-ignore
NodeConnectionSchema.index({ "nodeStart": 1, "nodeEnd": 1 }, { unique: true });

export interface INodeConnectionDocument extends mongoose.Document {
  nodeStart: IStoryNodeDocument;
  nodeEnd: IStoryNodeDocument;
  description: string | undefined;
  title: string | undefined;
}
