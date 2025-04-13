import React, { useState } from 'react';
import axios from 'axios';

function ProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    teamName: '',
    contestName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.technologies.split(',').map(t => t.trim());

    try {
      const response = await axios.post('http://localhost:5000/api/projects', {
        ...formData,
        technologies: techArray
      });
      alert('Project submitted ✅');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert('Something went wrong ❌');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Submit Your Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Project Title" required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <textarea name="description" onChange={handleChange} placeholder="Project Description" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="technologies" onChange={handleChange} placeholder="Technologies (comma separated)" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="teamName" onChange={handleChange} placeholder="Team Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="contestName" onChange={handleChange} placeholder="Contest Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}

export default ProjectForm;
