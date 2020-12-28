import {DesignTool} from "./DesignTool";
import {StoryNode} from "./StoryNode"

export interface NodeBasedDesign extends DesignTool {
    root: StoryNode
    title: string
}
