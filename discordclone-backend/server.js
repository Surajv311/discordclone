//jshint esversion:6
// after creating cluster on mongodb for backend...

// importing -> app config -> middleware -> DB config ->... -> api routes -> .... & also listener....

//importing
// on adding
// "type": "module", (in package.json file we can import modules rather than require)
// import express from 'express';
// Note: throwing error in my current node version 12.16.2
// hence using require ...

// importing
const express = require("express");
const mongoose = require("mongoose");

// app config

const app = express();
const port = process.env.PORT || 4000;

// middleware

// DB config

// api routes

// listener

app.listen(port, () => console.log(`server running on port: ${port}`));
