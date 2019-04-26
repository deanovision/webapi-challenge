///import express
const express = require("express");
/// setup router
const router = express.Router();
/// import database
const db = require("../data/helpers/projectModel");
/// setup GET
router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: "error retrieving projects"
      });
    });
});
///setup POST
router.post("/", (req, res) => {
  const projectObj = req.body;
  ///check if name and description is included in request
  if (!projectObj.name || !projectObj.description) {
    res.status(400).json({
      message: "bad request name and description required"
    });
  } else {
    db.insert(projectObj)
      .then(project => {
        console.log(project);
        res.status(201).json({
          project: project,
          message: "project created"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "internal error creating project"
        });
      });
  }
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projectObj = req.body;
  ///check if name and description is included in request
  if (!projectObj.name || !projectObj.description) {
    res.status(400).json({
      message: "bad request name and description required"
    });
  } else {
    db.update(id, projectObj)
      .then(project => {
        /// check to see if project with the provided id exists
        if (!project) {
          res.status(404).json({
            message: "project does not exist"
          });
        } else {
          res.status(200).json(project);
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "internal error posting project"
        });
      });
  }
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      /// check to see if project with the provided id exists
      if (!project) {
        res.status(404).json({
          message: "project does not exist"
        });
      } else {
        res.status(200).json({
          message: "project was deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "internal error deleting project"
      });
    });
});
router.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  db.getProjectActions(id)
    .then(actions => {
      /// this method returns an array so to check if there are actions
      ///for the given ID I checked the length of the array that was returned.
      if (actions.length === 0) {
        res.status(404).json({
          message: "actions do not exist"
        });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "internal error retrieving actions"
      });
    });
});

module.exports = router;
