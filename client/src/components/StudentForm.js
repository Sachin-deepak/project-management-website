// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    rollNumber: '',
    department: '',
    skills: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
    };

    try {
      await axios.post('https://project-management-website-rr6e.onrender.com/api/students', payload);
      alert('Student added ✅');
      setFormData({
        name: '',
        year: '',
        rollNumber: '',
        department: '',
        skills: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add student ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded" />
        <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} required className="p-2 border rounded" />
        <input name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required className="p-2 border rounded" />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required className="p-2 border rounded" />
        <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} required className="p-2 border rounded" />
      </div>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Add Student</button>
    </form>
  );
}

export default StudentForm;
