import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost/SPdb";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup().then((r) => console.log("Database is connected."));
  }

  private async mongoSetup(): Promise<void> {
    await mongoose.connect(this.mongoUrl);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
