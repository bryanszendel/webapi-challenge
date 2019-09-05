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

module.exports = router;