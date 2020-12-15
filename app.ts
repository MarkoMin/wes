import * as express from "express";
import * as bodyParser from "body-parser";
import path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/out"));

var commands = []
var count = 0;

//ID predstavlja komandu u string formatu
app.get(`/command/:decodeType/:value/:state/:bits`, async (req, res) => {
  // ESP8266 šalje komandu u bodyu
  console.log("Writing command into array...")
  const userData = req.params;
  const decodeType = userData.decodeType;
  const value = userData.value;
  const state = userData.state;
  const bits = userData.bits;

  const command = {
    decodeType,
    value,
    state,
    bits,
  }

  console.log(command)

  commands[count++] = userData;
  res.sendStatus(200);
});

//Za frontend, dohvacanje postojecih komandi
app.get("/allCommands",(req,res)=>{
  res.status(200).send(JSON.stringify(commands));
});

app.get("/", (req, res) => {
  console.log("Returning index.html!");
  res.sendFile(path.join(__dirname, "client/out/index.html"));
});

app.get("/addCommand", (req, res) => {
  console.log("Returning addCommand.html!");
  res.send("abc").sendStatus(200);
  res.sendFile(path.join(__dirname, "client/out/addCommand.html"));
});

export default app;
