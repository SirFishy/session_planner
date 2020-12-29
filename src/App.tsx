import React from "react";
import "./App.css";
import Sessions from "./components/Sessions";
import { Session } from "./api/Session";
import { gen_story_nodes } from "./test/data-gen";

import { MongoClient } from "mongodb";
import assert from "assert";

import mongoose from "mongoose";

async function loadMongoose(): Promise<typeof mongoose> {
  return mongoose.connect("mongodb://localhost:27017");
}

loadMongoose();

const mongo_client = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "session_planner";

const client = new MongoClient(url);

client.connect(function (err) {
  assert(null, err);
  console.log("Connected successfully to the server.");
  const db = client.db(dbName);
  client.close();
});

const session: Session = {
  name: "Test Session",
  dateCreated: new Date(Date.now()),
  tools: [],
};

const nbd = gen_story_nodes();

session.tools.push(nbd);

function App() {
  return (
    <div>
      <Sessions
        name={session.name}
        dateCreated={session.dateCreated}
        tools={session.tools}
      />
    </div>
  );
}

export default App;
