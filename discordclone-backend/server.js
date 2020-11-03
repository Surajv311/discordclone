//jshint esversion:6
// after creating cluster on mongodb for backend...

// importing -> app config -> middleware -> DB config ->... -> api routes -> .... & also listener....

//importing
// on adding
// "type": "module", (in package.json file we can import modules rather than require)
// import express from 'express';
// Note: throwing error in my current node version 12.16.2
// hence using require ...

// **** importing
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoData = require("./mongoData");

// **** app config

const app = express();
const port = process.env.PORT || 4000;

// middleware - mediates between frontend & backend...
// we would be able to handle json files & send/receive projects...

// **** middleware
app.use(express.json());

// / adding header...
// app.use((req,res , next) => {

// / allowing request to come from any endpoint
// res.setHeader("Access-Control-Allow-Origin","*");
// res.setHeader("Access-Control-Allow-Headers","*");
// next() ;
// })
// [**OR USE THE CORS PACKAGE**]

app.use(cors());

//  **** DB config

// mongodb+srv://admin:<password>@cluster0.qa9j4.mongodb.net/<dbname>?retryWrites=true&w=majority
const connection_url =
  "mongodb+srv://admin:9G5z29mSBzwF1GDr@cluster0.sczjl.mongodb.net/discordclonedb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  // to connect smoothly to my mongodb

  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// **** api routes

// https code 200 -> OK
app.get("/", (req, res) => res.status(200).send("working"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      // if error then we send internal server error
      res.status(500).send(err);
    } else {
      // send data that we just added in the DB
      res.status(201).send({ data });
    }
  });
});

app.get("/get/channelList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      // if error then we send internal server error
      res.status(500).send(err);
    } else {
      let channels = [];
      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });

      // send data that we just added in the DB
      res.status(200).send(channels);
    }
  });
});

// **** listener

app.listen(port, () => console.log(`server running on port: ${port}`));
