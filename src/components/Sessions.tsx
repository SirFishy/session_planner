import React from "react";
import { Session } from "../api/Session";
import NodeBasedDesigns from "./NodeBasedDesigns";
import { NodeBasedDesign } from "../api/NodeBasedDesign";

function Sessions(props: Session) {
  const tools = props.tools
    .sort((a, b) => (a > b ? -1 : 1))
    .map((tool) => {
      if (tool.toolType === "StoryNode Based Design") {
        const nbd: NodeBasedDesign = tool as NodeBasedDesign;
        return (
          <NodeBasedDesigns
            order={nbd.order}
            root={nbd.root}
            title={nbd.title}
            toolType={nbd.toolType}
          />
        );
      } else {
        return <p>Unknown Tools</p>;
      }
    });

  return (
    <div className="Sessions">
      <p>{props.name}</p>
      <p>Created {props.dateCreated.toDateString()}</p>
      {tools}
    </div>
  );
}

export default Sessions;
