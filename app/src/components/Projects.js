import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(res => {
        setProjects(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <p>{project.name}</p>
            <p>{project.description}</p>
            <p>{project.completed}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Projects;