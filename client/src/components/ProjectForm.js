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
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange} /><br />
      <input type="text" name="technologies" placeholder="Technologies (comma separated)" onChange={handleChange} /><br />
      <input type="text" name="teamName" placeholder="Team Name" onChange={handleChange} /><br />
      <input type="text" name="contestName" placeholder="Contest Name" onChange={handleChange} /><br />
      <button type="submit">Submit Project</button>
    </form>
  );
}

export default ProjectForm;
