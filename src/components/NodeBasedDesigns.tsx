import React from 'react';
import {NodeBasedDesign} from "../api/NodeBasedDesign";
import {StoryNodeCollection} from "../utils/design-tool-iterators";
import {StoryNode} from "../api/StoryNode";

function NodeBasedDesigns(props: NodeBasedDesign) {
    let collection:StoryNodeCollection = new StoryNodeCollection(props);
    const nbdIterator = collection.getIterator();
    const nbdArray:StoryNode[] = [];
    while(nbdIterator.valid()) {
        nbdArray.push(nbdIterator.next());
    }
    const nbdJsx = nbdArray.map(nbd =>
        <div>
            <p>Node: {nbd.description}</p>
            <ul>Connections:
                {nbd.connections.map(connection =>
                    <li>
                        {nbd._id} to {connection.node._id} via {connection.description}
                    </li>
                )}
            </ul>
        </div>);
    return (
      <div className="NodeBasedDesigns">
          {nbdJsx}
      </div>
    );
}

export default NodeBasedDesigns;
