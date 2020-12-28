import {DesignTool} from "./DesignTool";

export interface Session {
    name: string
    dateCreated: Date
    tools: DesignTool[]
}