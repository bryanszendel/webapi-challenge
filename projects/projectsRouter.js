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

router.get('/:id', validateProjectId, (req, res) => {
  projects.get(req.project.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the project." })
    })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  projects.getProjectActions(req.project.id)
    .then(projectActions => {
      res.status(200).json(projectActions)
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving the project actions." })
    })
});

router.post('/', validateProject, (req, res) => {
  let newProject = req.body
  projects.insert(newProject)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      res.status(500).json({ error: "Error creating the new project." })
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const id = req.params.id
  const updatedProject = req.body
  projects.update(id, updatedProject)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating the project." })
    })
});

router.delete('/:id', validateProjectId, (req, res) => {
  const id = req.params.id
  projects.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(error => {
      res.status(500).json({ error: "Error removing the project." })
    })
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
      res.status(400).json({ message: "Invalid project ID." })
      next()
    })
}

function validateProject(req, res, next) {
  const project = req.body
  if (!project) {
    res.status(400).json({ message: "Missing project data." })
    next()
  } else if (!project.name) {
    res.status(400).json({ message: "Missing project name." })
    next()
  } else if (!project.description) {
    res.status(400).json({ message: "Missing project description." })
    next()
  } else {
    next()
  }
}

module.exports = router;