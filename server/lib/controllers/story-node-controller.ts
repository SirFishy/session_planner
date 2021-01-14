import * as mongoose from "mongoose";
import { StoryNodeSchema } from "../models/story-node";
import { Request, Response } from "express";
import { NodeConnectionSchema } from "../models/node-connection";

const StoryNode = mongoose.model("StoryNode", StoryNodeSchema);
const NodeConnection = mongoose.model("NodeConnection", NodeConnectionSchema);

export class StoryNodeController {
  public addNewStoryNode(req: Request, res: Response) {
    let newStoryNode = new StoryNode(req.body);

    newStoryNode.save((err, storyNode) => {
      if (err) {
        res.send(err);
      } else {
        res.json(storyNode);
      }
    });
  }

  public getStoryNodes(req: Request, res: Response) {
    StoryNode.find({}, (err, storyNode) => {
      if (err) {
        res.send(err);
      } else {
        res.json(storyNode);
      }
    });
  }

  public getStoryNodeWithId(req: Request, res: Response) {
    StoryNode.findById(req.params.storyNodeId, (err, storyNode) => {
      if (err) {
        res.send(err);
      } else {
        res.json(storyNode);
      }
    });
  }

  public updateStoryNode(req: Request, res: Response) {
    StoryNode.findOneAndUpdate(
      { _id: req.params.storyNodeId },
      req.body,
      { new: true, useFindAndModify: false },
      (err, storyNode) => {
        if (err) {
          res.send(err);
        } else {
          res.json(storyNode);
        }
      }
    );
  }

  public deleteStoryNode(req: Request, res: Response) {
    NodeConnection.deleteMany(
      { nodeStart: req.params.storyNodeId },
      {},
      (err) => {
        StoryNode.deleteOne({ _id: req.params.storyNodeId }, {}, (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(`Deleted ${req.params.storyNodeId} successfully.`);
          }
        });
      }
    );
  }
}
