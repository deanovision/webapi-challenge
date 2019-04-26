const express = require("express");
const server = express();
const projectsRouter = require("./routers/project-router");
server.use(express.json());
server.use("/api/projects", projectsRouter);
module.exports = server;
