import React, { useState } from 'react';
import axios from 'axios';

function ProjectForm({ role }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    teamName: '',
    contestName: '',
    githubLink: '',
    leaderName: '',
    guideName: '',
    teamMembers: '',
    finalsDate: '',
    year: '',
    status: 'Pending',
  });

  if (role === 'guest') {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techArray = formData.technologies.split(',').map(t => t.trim());
    const teamArray = formData.teamMembers.split(',').map(t => t.trim());

    const payload = {
      ...formData,
      technologies: techArray,
      teamMembers: teamArray.length === 1 && teamArray[0] === '' ? [] : teamArray,
      guideName: formData.guideName.trim() === '' ? undefined : formData.guideName,
      finalsDate: formData.finalsDate || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
    };

    try {
      await axios.post('https://project-management-website-rr6e.onrender.com/api/projects', payload);
      alert('Project submitted ✅');
      setFormData({
        title: '',
        description: '',
        technologies: '',
        teamName: '',
        contestName: '',
        githubLink: '',
        leaderName: '',
        guideName: '',
        teamMembers: '',
        finalsDate: '',
        year: '',
        status: 'Pending',
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-2xl font-extrabold mb-6 text-red-700 text-center">Add new project</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="p-2 border rounded" />
        <input name="teamName" placeholder="Team Name" value={formData.teamName} onChange={handleChange} className="p-2 border rounded" />
        <input name="contestName" placeholder="Contest Name" value={formData.contestName} onChange={handleChange} className="p-2 border rounded" />
        <input name="leaderName" placeholder="Leader Name" value={formData.leaderName} onChange={handleChange} className="p-2 border rounded" />
        <input name="githubLink" placeholder="GitHub Repository Link" value={formData.githubLink} onChange={handleChange} className="p-2 border rounded" />
        <input name="guideName" placeholder="Guide Name" value={formData.guideName} onChange={handleChange} className="p-2 border rounded" />
        <input name="teamMembers" placeholder="Team Members (comma separated)" value={formData.teamMembers} onChange={handleChange} className="p-2 border rounded" />
        <input name="technologies" placeholder="Technologies (comma separated)" value={formData.technologies} onChange={handleChange} className="p-2 border rounded" />
        <input type="number" name="year" placeholder="Contest Year" value={formData.year} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="finalsDate" placeholder="Finals Date" value={formData.finalsDate} onChange={handleChange} className="p-2 border rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Winner">Winner</option>
          <option value="Runner-up">Runner-up</option>
        </select>
      </div>

      <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />

      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Submit Project</button>
    </form>
  );
}

export default ProjectForm;
