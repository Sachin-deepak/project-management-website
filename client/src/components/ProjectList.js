import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Submitted Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <h3>{project.title}</h3>
              <p><b>Description:</b> {project.description}</p>
              <p><b>Technologies:</b> {project.technologies.join(', ')}</p>
              <p><b>Team:</b> {project.teamName}</p>
              <p><b>Contest:</b> {project.contestName}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
