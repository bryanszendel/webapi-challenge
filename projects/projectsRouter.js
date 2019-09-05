const express = require('express')
const projects = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
  projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving projects." })
    })
})

router.get('/:id', (req, res) => {
  
});

router.get('/:id/actions', (req, res) => {
  
});

router.post('/:id', (req, res) => {
  
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  
});

// middleware
function validateProjectId(req, res, next) {
  const id = req.params.id
  projects.get(id)
    .then(project => {
      if (project.id) {
        req.project = project
        next()
      }
    })
    .catch(error => {
      res.status(400).json({ message: "Invalid project ID."})
      next()
    })
}

module.exports = router;