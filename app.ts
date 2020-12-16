import * as express from "express";
import * as bodyParser from "body-parser";
import path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/out"));

var commands = []
var count = 0;
var status = "wait"
var executeCommandID = -1
var title = ""
var globalIndex = -1

//index predstavlja komandu u string formatu
app.get("/addCommand/:index", async (req, res) => {
  // ESP8266 šalje komandu u bodyu
  console.log("Writing command into array...")
  const userData = req.params;
  const index = userData.index;

  console.log("Adding command at index: " + index)
  const command = {
    index: Number(index),
    title,
  }

  globalIndex = Number(index)
  commands[count++] = command;
  res.sendStatus(200)
});

// Za frontend, dohvacanje postojecih komandi
app.get("/allCommands", (req, res) => {
  res.status(200).send(JSON.stringify(commands));
});

app.delete("/allCommands",(req,res)=>{
  commands = []
  count = 0
  res.sendStatus(200)
})

// Za frontend, mijenja globalne varijable
app.get("/specify/:response", async (req, res) => {
  const userData = req.params;
  const response = userData.response;
  let resp = response.split(":");

  console.log("Setting status to: " + resp[0])
  status = resp[0];

  if(resp.length === 2){
    if(status==="scan"){
      title = resp[1]

    } else {
    console.log("Setting command index to: "+resp[1])
    executeCommandID = Number(resp[1])
  }
  }else{
    console.log("Setting command index to: "+-1)
    executeCommandID = Number(-1)
  }
  globalIndex=-1;
  setTimeout(() => res.sendStatus(200), 15000);
});

/* 
Svakih 'x' sekundi ESP šalje request na server.
Server vraca: wait, scan ili execute
*/
app.get("/arduino", (req, res) => {
  if (status === "wait") {
    res.status(200).send("wait");
  } else if (status === "scan") {
    status = "wait"
    res.status(201).send("scan");
  } else if (status === "execute") {
    status = "wait"
    if (executeCommandID === -1)
      console.error("Execute command ID is not properly set!")

    res.status(202).send("execute:" + executeCommandID)
  }
})

app.get("/", (req, res) => {
  console.log("Returning index.html!");
  res.sendFile(path.join(__dirname, "client/out/index.html"));
});

app.get("/addCommand", (req, res) => {
  console.log("Returning addCommand.html!");
  res.sendFile(path.join(__dirname, "client/out/addCommand.html"));
});

export default app;
