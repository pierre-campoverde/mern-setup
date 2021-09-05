import express from "express";
import path from "path";
import template from "./../template";
import { MongoClient } from "mongodb";
//!Comment this line  for production
import devBundle from "./devBundle";
const app = express();
//!Comment this line  for production
devBundle.compile(app);
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
//Rendering templates at the root
app.get("/", (req, res) => {
  res.status(200).send(template());
});

//Express config to start a server that listens the porfor incoming request
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s", port);
});
//Connecting to MONGODB

const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});
