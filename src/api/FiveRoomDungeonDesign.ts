import {DesignTool} from "./DesignTool";

export interface FiveRoomDungeonDesign extends DesignTool {
    entrance: {
        description: string
    }

    puzzle: {
        description: string
    }

    trick: {
        description: string
    }

    conflict: {
        description: string
    }

    revelation: {
        description: string
    }
}
