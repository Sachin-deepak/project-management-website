import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList({ role }) {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://project-management-website-rr6e.onrender.com/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = projects.filter((p) => {
    const query = search.toLowerCase();
    const matchesSearch = (
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.teamName && p.teamName.toLowerCase().includes(query)) ||
      (p.contestName && p.contestName.toLowerCase().includes(query)) ||
      (p.technologies && Array.isArray(p.technologies) &&
        p.technologies.join(', ').toLowerCase().includes(query))
    );
    const matchesYear = selectedYear ? String(p.year) === selectedYear : true;
    return matchesSearch && matchesYear;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === 'year') return (a.year || 0) - (b.year || 0);
    const valA = a[sortField]?.toLowerCase() || '';
    const valB = b[sortField]?.toLowerCase() || '';
    return valA.localeCompare(valB);
  });

  const handleEdit = () => {
    setEditData({
      ...selectedProject,
      technologies: selectedProject.technologies?.join(', ') || '',
      teamMembers: selectedProject.teamMembers?.join(', ') || '',
      finalsDate: selectedProject.finalsDate?.substring(0, 10) || '',
    });
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async () => {
    const payload = {
      ...editData,
      technologies: editData.technologies.split(',').map(t => t.trim()),
      teamMembers: editData.teamMembers.split(',').map(m => m.trim()),
      year: editData.year ? parseInt(editData.year) : undefined,
      finalsDate: editData.finalsDate || undefined,
    };

    try {
      await axios.put(`https://project-management-website-rr6e.onrender.com/api/projects/${selectedProject._id}`, payload);
      setEditMode(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Update failed:", err);
      alert('Update failed ❌');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`https://project-management-website-rr6e.onrender.com/api/projects/${selectedProject._id}`);
      alert('Project deleted ✅');
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert('Delete failed ❌');
    }
  };

  const handleExportCSV = () => {
    const csvHeader = [
      "Title", "Description", "Technologies", "Team", "Leader",
      "Guide", "Members", "Contest", "Year", "Finals Date",
      "GitHub", "Status", "Submitted On"
    ];

    const csvRows = filtered.map((p) => [
      p.title,
      p.description,
      p.technologies?.join(', '),
      p.teamName,
      p.leaderName,
      p.guideName,
      p.teamMembers?.join(', '),
      p.contestName,
      p.year,
      p.finalsDate ? new Date(p.finalsDate).toLocaleDateString() : '',
      p.githubLink,
      p.status,
      new Date(p.createdAt).toLocaleString()
    ]);

    const content = [csvHeader, ...csvRows]
      .map(row => row.map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0, 10);
    link.download = `PDC_Projects_${selectedYear || 'All'}_${date}.csv`;
    link.click();
  };

  const allYears = Array.from(new Set(projects.map(p => p.year).filter(Boolean))).sort();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-extrabold mb-6 text-red-700 text-center">Project details</h3>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Years</option>
          {allYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="contestName">Contest</option>
          <option value="teamName">Team</option>
          <option value="year">Year</option>
        </select>
        {role === 'admin' && (
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Download report
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((project, idx) => (
          <div
            key={idx}
            className={`relative p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition border-2 ${
              project.status === 'Winner'
                ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-400'
                : project.status === 'Runner-up'
                ? 'bg-gradient-to-br from-gray-100 to-white border-gray-400'
                : 'bg-white border-gray-200'
            }`}
            onClick={() => {
              setSelectedProject(project);
              setEditMode(false);
            }}
          >
            <h3 className="text-xl font-bold text-red-800">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.teamName}</p>
            {project.status === 'Winner' && (
              <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">🏆 Winner</span>
            )}
            {project.status === 'Runner-up' && (
              <span className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">🥈 Runner-up</span>
            )}
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>
            {!editMode ? (
              <>
                <h3 className="text-2xl font-bold mb-4 text-red-700">{selectedProject.title}</h3>
                <div className="space-y-2 text-sm text-gray-800">
                  <p><strong>Description:</strong> {selectedProject.description || 'N/A'}</p>
                  <p><strong>Technologies:</strong> {selectedProject.technologies?.join(', ') || 'N/A'}</p>
                  <p><strong>Team:</strong> {selectedProject.teamName}</p>
                  <p><strong>Leader:</strong> {selectedProject.leaderName}</p>
                  <p><strong>Members:</strong> {selectedProject.teamMembers?.join(', ') || 'N/A'}</p>
                  <p><strong>Guide:</strong> {selectedProject.guideName || 'N/A'}</p>
                  <p><strong>Contest:</strong> {selectedProject.contestName}</p>
                  <p><strong>Year:</strong> {selectedProject.year || 'N/A'}</p>
                  <p><strong>Finals:</strong> {selectedProject.finalsDate ? new Date(selectedProject.finalsDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Status:</strong> {selectedProject.status}</p>
                  <p className="text-red-600 underline break-words">
                    <strong>GitHub:</strong>{' '}
                    {selectedProject.githubLink ? (
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                        {selectedProject.githubLink}
                      </a>
                    ) : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(selectedProject.createdAt).toLocaleString()}
                  </p>
                </div>
                {role === 'admin' && (
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4 text-red-700">Edit Project</h3>
                <div className="space-y-2">
                  {['title', 'description', 'technologies', 'teamName', 'leaderName', 'teamMembers', 'guideName', 'contestName', 'githubLink'].map(field => (
                    <input
                      key={field}
                      name={field}
                      value={editData[field]}
                      onChange={handleChange}
                      placeholder={field}
                      className="w-full p-2 border rounded"
                    />
                  ))}
                  <input type="number" name="year" value={editData.year} onChange={handleChange} className="w-full p-2 border rounded" />
                  <input type="date" name="finalsDate" value={editData.finalsDate} onChange={handleChange} className="w-full p-2 border rounded" />
                  <select name="status" value={editData.status} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Winner">Winner</option>
                    <option value="Runner-up">Runner-up</option>
                  </select>
                  <button
                    onClick={handleUpdate}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;