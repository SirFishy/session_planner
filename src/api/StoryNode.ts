import { NodeConnection } from "./NodeConnection";

export interface StoryNode {
  nodeId?: string;
  description: string;
  connections: NodeConnection[];
}
