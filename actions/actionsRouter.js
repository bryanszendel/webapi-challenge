const express = require('express')
const actions = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', (req, res) => {
  actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving actions." })
    })
})

router.get('/:id', validateActionId, (req, res) => {
  actions.get(req.action.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the user." })
    })
});

router.post('/', validateAction, (req, res) => {
  let newAction = req.body
  actions.insert(newAction)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      res.status(500).json({ error: "Error creating the new action." })
    })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
  const id = req.params.id
  const updatedAction = req.body
  actions.update(id, updatedAction)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating the action." })
    })
});

router.delete('/:id', validateActionId, (req, res) => {
  const id = req.params.id
  actions.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(error => {
      res.status(500).json({ error: "Error removing the action." })
    })
});

// middleware
function validateActionId(req, res, next) {
  const id = req.params.id
  actions.get(id)
    .then(action => {
      if (action.id) {
        req.action = action
        next()
      }
    })
    .catch(error => {
      res.status(400).json({ message: "Invalid action ID."})
      next()
    })
}

function validateAction(req, res, next) {
  const action = req.body
  if (!action) {
    res.status(400).json({ message: "Missing action data." })
  } else if (!action.project_id) {
    res.status(400).json({ message: "Missing required project ID." })
  } else if (!action.description) {
    res.status(400).json({ message: "Missing required action description." })
  } else if (!action.notes) {
    res.status(400).json({ message: "Missing required action notes." })
  } else {
    next()
  }
}

module.exports = router;