import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { NodeConnectionSchema } from "../models/node-connection";

const NodeConnection = mongoose.model("NodeConnection", NodeConnectionSchema);

export class NodeConnectionController {
  public addNewNodeConnection(req: Request, res: Response) {
    let newNodeConnection = new NodeConnection(req.body);

    newNodeConnection.save((err, nodeConnection) => {
      if (err) {
        res.send(err);
      } else {
        res.json(nodeConnection);
      }
    });
  }

  public getNodeConnections(req: Request, res: Response) {
    NodeConnection.find({}, (err, nodeConnection) => {
      if (err) {
        res.send(err);
      } else {
        res.json(nodeConnection);
      }
    });
  }

  public getNodeConnectionWithId(req: Request, res: Response) {
    NodeConnection.findById(
      req.params.nodeConnectionId,
      (err, nodeConnection) => {
        if (err) {
          res.send(err);
        } else {
          res.json(nodeConnection);
        }
      }
    );
  }

  public updateNodeConnection(req: Request, res: Response) {
    NodeConnection.findOneAndUpdate(
      { _id: req.params.nodeConnectionId },
      req.body,
      { new: true, useFindAndModify: false },
      (err, nodeConnection) => {
        if (err) {
          res.send(err);
        } else {
          res.json(nodeConnection);
        }
      }
    );
  }

  public deleteNodeConnection(req: Request, res: Response) {
    NodeConnection.deleteOne(
      { _id: req.params.nodeConnectionId },
      {},
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send(`Deleted ${req.params.nodeConnectionId} successfully.`);
        }
      }
    );
  }
}
