import {NodeConnection} from "./NodeConnection";

export interface StoryNode {
    _id?: number
    description: string
    connections: NodeConnection[]
}