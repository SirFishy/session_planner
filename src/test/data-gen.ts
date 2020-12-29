import { NodeBasedDesign } from "../api/NodeBasedDesign";
import { StoryNode } from "../api/StoryNode";

export function gen_story_nodes(): NodeBasedDesign {
  let root: StoryNode = {
    _id: "0",
    description: "root",
    connections: [],
  };

  let nodeA: StoryNode = {
    _id: "1",
    description: "A",
    connections: [],
  };

  let nodeB: StoryNode = {
    _id: "2",
    description: "B",
    connections: [],
  };

  let nodeC: StoryNode = {
    _id: "3",
    description: "C",
    connections: [],
  };

  let nodeD: StoryNode = {
    _id: "4",
    description: "D",
    connections: [],
  };

  let nodeE: StoryNode = {
    _id: "5",
    description: "E",
    connections: [],
  };
  root.connections.push(
    { node: nodeA, description: "event root to A" },
    { node: nodeB, description: "event root to B" },
    { node: nodeC, description: "event root to C" }
  );
  nodeA.connections.push(
    { node: nodeB, description: "event A to B" },
    { node: nodeC, description: "event A to C" }
  );
  nodeB.connections.push(
    { node: nodeA, description: "event B to A" },
    { node: nodeC, description: "event B to C" },
    { node: nodeE, description: "event B to E" }
  );
  nodeC.connections.push(
    { node: nodeB, description: "event C to B" },
    { node: nodeA, description: "event C to A" },
    { node: nodeD, description: "event C to D" }
  );
  nodeD.connections.push({ node: nodeA, description: "event D to A" });
  nodeE.connections.push(
    { node: nodeB, description: "event A to B" },
    { node: nodeC, description: "event B to C" }
  );

  const design: NodeBasedDesign = {
    toolType: "StoryNode Based Design",
    title: "A new Story",
    root: root,
    order: 0,
  };
  return design;
}
