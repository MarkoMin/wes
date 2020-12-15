import * as express from "express";
import * as bodyParser from "body-parser";
import path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/out"));

var commands = []
var count = 0;

app.post(`/command`, async (req, res) => {
  // ESP8266 šalje komandu u bodyu
  console.log("Writing command into array...")
  const userData = req.body;
  console.log(userData)
  commands[count++] = userData;
});

app.get("/", (req, res) => {
  console.log("Returning index.html!");
  res.sendFile(path.join(__dirname, "client/out/index.html"));
});

export default app;
