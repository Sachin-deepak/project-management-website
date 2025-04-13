import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Submitted Projects</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {projects
          .filter((p) => {
          const query = search.toLowerCase();

          return (
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query)) ||
            (p.teamName && p.teamName.toLowerCase().includes(query)) ||
            (p.contestName && p.contestName.toLowerCase().includes(query)) ||
            (p.technologies && Array.isArray(p.technologies) &&
              p.technologies.join(', ').toLowerCase().includes(query))
          );
        })
          .map((project, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-800">{project.title}</h3>
              <p className="mt-2 text-gray-600">{project.description}</p>
              <p className="mt-2"><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
              <p><strong>Team:</strong> {project.teamName}</p>
              <p><strong>Contest:</strong> {project.contestName}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectList;
