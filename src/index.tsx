import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { MongoClient } from "mongodb";
import assert from "assert";

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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
