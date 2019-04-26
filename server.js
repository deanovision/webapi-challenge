const express = require("express");
const server = express();
const projectsRouter = require("./routers/project-router");
const actionsRouter = require("./routers/actions-router");
server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);
module.exports = server;
