import { StoryNodeCollection, Iterator} from "./design-tool-iterators";
import {StoryNode} from "../api/StoryNode";
import {NodeBasedDesign} from "../api/NodeBasedDesign";
import {gen_story_nodes} from "../test/data-gen";

describe("NodeCollection iterator", () => {
    let root: StoryNode;
    let design: NodeBasedDesign;
    let collection: StoryNodeCollection;
    describe("initialized with one root node", () => {
        beforeEach(() => {
            root = {
                _id: 0,
                description: "hello",
                connections: []
            }

            design = {
                toolType: "StoryNode Based Design",
                title: "A new Story",
                root: root,
                order: 0
            }

            collection = new StoryNodeCollection(design);
        });
        test("should return root when next() called", () => {
            let iterator: Iterator<StoryNode> = collection.getIterator();
            expect(iterator.next()).toEqual(root);
        });

        test("should return root when current() called", () => {
            let iterator: Iterator<StoryNode> = collection.getIterator();
            expect(iterator.current()).toEqual(root);
        });

        test("should return true when valid() called", () => {
            let iterator: Iterator<StoryNode> = collection.getIterator();
            expect(iterator.valid()).toEqual(true);
        });

        test("should return false when valid() called after next()", () => {
            let iterator: Iterator<StoryNode> = collection.getIterator();
            iterator.next();
            expect(iterator.valid()).toEqual(false);
        });

        test("should throw error when next() is called if iterator is invalid", () => {
            let iterator: Iterator<StoryNode> = collection.getIterator();
            iterator.next();
            expect(iterator.valid()).toEqual(false);
            expect(() => iterator.next()).toThrowError("Iterator is no longer valid.")
        })
    });

    describe("initialized with branching nodes", () => {
       beforeEach(() => {
           design = gen_story_nodes();
           root = design.root;
           collection = new StoryNodeCollection(design);
        });

       test("should iterate nodes with depth first search", () => {
           const iterator: Iterator<StoryNode> = collection.getIterator();
           expect(iterator.next().description).toEqual("root");
           expect(iterator.next().description).toEqual("A");
           expect(iterator.next().description).toEqual("B");
           expect(iterator.next().description).toEqual("C");
           expect(iterator.next().description).toEqual("D");
           expect(iterator.next().description).toEqual("E");
           expect(iterator.valid()).toEqual(false);
       });

       test("should be valid and should have node A as current when visited", () => {
           const iterator: Iterator<StoryNode> = collection.getIterator();
           iterator.next();
           expect(iterator.current().description).toEqual("A");
           expect(iterator.valid()).toEqual(true);
       });

       test("should identify nodes ids with less than three visits", () => {
            const weakIds = collection.getWeakNodeIds();
            expect(weakIds).not.toContain(0);
            expect(weakIds).not.toContain(1);
            expect(weakIds).not.toContain(2);
            expect(weakIds).not.toContain(3);
            expect(weakIds).toContain(4);
            expect(weakIds).toContain(5);
       });
    });
});
