import { NodeConnection } from "./NodeConnection";
import { Schema } from "mongoose";

export interface StoryNode {
  _id?: string;
  description: string;
  connections: NodeConnection[];
}
