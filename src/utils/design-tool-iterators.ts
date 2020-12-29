import {NodeBasedDesign} from "../api/NodeBasedDesign";
import {StoryNode} from "../api/StoryNode"
import assert from "assert";

export interface Iterator<T> {
    current(): T;

    next(): T;

    key(): number;

    valid(): boolean;
}

export interface Aggregator {
    getIterator(): Iterator<StoryNode>;
}

export class NodeIterator implements Iterator<StoryNode> {
    private collection: StoryNodeCollection;

    private currentNode: StoryNode;

    private visitedNodes: Set<number> = new Set();

    private visitedMemory: StoryNode[] = [];

    private iteratorValid: boolean = true;

    constructor(collection: StoryNodeCollection) {
        this.collection = collection;
        this.currentNode = collection.rootNode;
        this.visitedMemory.push(collection.rootNode);
    }

    current(): StoryNode {
        return this.currentNode;
    }

    key(): number {
        return this.currentNode._id as number;
    }

    next(): StoryNode {
        if (!this.valid()) {
            throw new Error("Iterator is no longer valid.");
        }
        const returnNode: StoryNode = {
            _id: this.currentNode._id,
            description: this.currentNode.description,
            connections: this.currentNode.connections
        }
        // This will be the next node returned by the next call to "next()"
        let nextNode: StoryNode = this.currentNode;
        // Temporary node for depth first search
        let tempNode: StoryNode = this.currentNode;

        // Perform depth first search
        do {
            // If the node is not root and there are no connections or all connections are visited, go to previous node.
            // Else if the node is root and all of the root connections are visited, iterator is invalid
            // Else search the node connections to find next unvisited node.
            if (tempNode !== this.collection.rootNode &&
                (tempNode.connections.length === 0 || this.isNodeConnectionsVisited(tempNode))) {
                this.visitedMemory.pop();
                tempNode = this.visitedMemory[this.visitedMemory.length - 1];
            } else if (tempNode === this.collection.rootNode && this.isNodeConnectionsVisited(tempNode)) {
                this.iteratorValid = false;
            } else for (let i = 0; i < tempNode.connections.length; i++) {
                const iterNode = tempNode.connections[i].node;
                assert(iterNode._id);
                if (!this.visitedNodes.has(iterNode._id)) {
                    nextNode = iterNode;
                    break;
                }
            }
        } while(this.iteratorValid && nextNode === this.currentNode)

        // Save the state of the search
        this.visitedNodes.add(nextNode._id as number);
        this.visitedMemory.push(nextNode);
        this.currentNode = nextNode;
        return returnNode;
    }

    private isNodeConnectionsVisited(node: StoryNode): boolean {
        for(let i=0; i < node.connections.length; i++) {
            const {_id} = node.connections[i].node;
            assert(_id);
            if (!this.visitedNodes.has(_id)) {
                return false;
            }
        }
        return true;
    }

    valid(): boolean {
        return this.iteratorValid;
    }

}

export class StoryNodeCollection implements Aggregator {
    private readonly root: StoryNode;

    private readonly weakNodeCriteria;

    constructor(design: NodeBasedDesign, weakNodeCriteria: number = 3) {
        this.root = design.root;
        this.weakNodeCriteria = weakNodeCriteria;
    }

    get rootNode() {
        return this.root;
    }

    getWeakNodeIds(): number[] {
       let weakNodes: number[] = [];
       let visitedCount = new Map<number, number>();
       let iterator = this.getIterator();
       while(iterator.valid()) {
           const node = iterator.next();
           const visitedNodes: number[] = [];
           node.connections.forEach(connection => {
               visitedNodes.push(connection.node._id as number);
           });

           visitedNodes.forEach(id => {
               if (visitedCount.has(id)) {
                const value = visitedCount.get(id);
                assert(value);
                visitedCount.set(id, value + 1);
                } else {
                    visitedCount.set(id, 1);
                }
           });
       }
       visitedCount.forEach( (value: number, key: number) => {
            if (value < this.weakNodeCriteria && this.rootNode._id !== key) {
                weakNodes.push(key);
            }
        })
       return weakNodes;
    }

    getIterator(): Iterator<StoryNode> {
        return new NodeIterator(this);
    }
}