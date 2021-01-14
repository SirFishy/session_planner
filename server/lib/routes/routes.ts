// /lib/routes/routes.ts
import { Request, Response } from "express";
import { StoryNodeController } from "../controllers/story-node-controller";
import { NodeConnectionController } from "../controllers/node-connection-controller";

export class Routes {
  public storyNodeController: StoryNodeController = new StoryNodeController();
  public nodeConnectionController: NodeConnectionController = new NodeConnectionController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request for Session Planner.",
      });
    });

    app
      .route("/storynode")
      .get(this.storyNodeController.getStoryNodes)
      .post(this.storyNodeController.addNewStoryNode);

    app
      .route("/storynode/:storyNodeId")
      .get(this.storyNodeController.getStoryNodeWithId)
      .put(this.storyNodeController.updateStoryNode)
      .delete(this.storyNodeController.deleteStoryNode);

    app
      .route("/nodeconnection")
      .get(this.nodeConnectionController.getNodeConnections)
      .post(this.nodeConnectionController.addNewNodeConnection);

    app
      .route("/nodeconnection/:nodeConnectionId")
      .get(this.nodeConnectionController.getNodeConnectionWithId)
      .put(this.nodeConnectionController.updateNodeConnection)
      .delete(this.nodeConnectionController.deleteNodeConnection);
  }
}
