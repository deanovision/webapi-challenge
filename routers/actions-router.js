///import express
const express = require("express");
/// setup router
const router = express.Router();
/// import database
const db = require("../data/helpers/actionModel");
/// setup GET
router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({
        message: "error retrieving actions"
      });
    });
});
///setup POST
router.post("/", (req, res) => {
  const actionObj = req.body;
  ///check if project_id, description and notes are included in request
  if (!actionObj.project_id || !actionObj.description || !actionObj.notes) {
    res.status(400).json({
      message: "bad request project_id, description and notes are required"
    });
  } else {
    db.insert(actionObj)
      .then(action => {
        console.log(action);
        res.status(201).json({
          action: action,
          message: "action created"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "internal error creating action"
        });
      });
  }
});
///setup PUT request
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const actionObj = req.body;
  ///check if name and description is included in request
  if (!actionObj.project_id || !actionObj.description || !actionObj.notes) {
    res.status(400).json({
      message: "bad request project_id, description and notes are required"
    });
  } else {
    db.update(id, actionObj)
      .then(action => {
        /// check to see if action ID exists in database
        if (!action) {
          res.status(404).json({
            message: "action does not exist"
          });
        } else {
          res.status(201).json({
            action: action,
            message: "action created"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "internal error creating action"
        });
      });
  }
});
///setup DELETE request
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(action => {
      /// check to see if action with the provided id exists
      if (!action) {
        res.status(404).json({
          message: "action does not exist"
        });
      } else {
        res.status(200).json({
          message: "action was deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "internal error deleting action"
      });
    });
});
module.exports = router;
