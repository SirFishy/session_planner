import { StoryNode } from "./StoryNode";

export interface NodeConnection {
  connectionId?: string;
  node: StoryNode;
  description: string;
}
