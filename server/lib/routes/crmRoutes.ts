// /lib/routes/crmRoutes.ts
import { Request, Response } from "express";

export class Routes {
  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request.",
      });
    });

    app
      .route("/storynode")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "GET story node successful.",
        });
      })
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: "POST story node successful.",
        });
      });

    app
      .route("/storynode/:storynodeId")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "GET story node Id successful.",
        });
      })
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: "POST story node Id successful.",
        });
      })
      .put((req: Request, res: Response) => {
        res.status(200).send({
          message: "PUT story node Id successful.",
        });
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send({
          message: "DELETE story node Id successful.",
        });
      });
  }
}
