import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList({ role }) {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('https://project-management-website-rr6e.onrender.com/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (student) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.rollNumber?.toLowerCase().includes(query) ||
      student.department?.toLowerCase().includes(query) ||
      student.description?.toLowerCase().includes(query) ||
      String(student.year).includes(query) ||
      student.skills.some(skill => skill.toLowerCase().includes(query))
    );
  };

  const handleSort = (a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField]?.toString().toLowerCase() || '';
    const valB = b[sortField]?.toString().toLowerCase() || '';
    return valA.localeCompare(valB);
  };

  const handleEditClick = (student) => {
    setEditData({ ...student, skills: student.skills.join(', ') });
    setSelectedStudent(student);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedStudent = {
        ...editData,
        skills: editData.skills.split(',').map(s => s.trim()),
      };
      await axios.put(`https://project-management-website-rr6e.onrender.com/api/students/${editData._id}`, updatedStudent);
      alert('Student updated ✅');
      setEditData(null);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Update failed ❌');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <input
          type="text"
          placeholder="Search by name, skill, roll no, dept, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-2/3"
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="rollNumber">Roll Number</option>
          <option value="department">Department</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.filter(handleSearch).sort(handleSort).map((student, idx) => (
          <div key={idx} className="border p-4 rounded shadow hover:shadow-lg transition relative">
            <h4 className="font-bold text-lg">{student.name}</h4>
            <p><strong>Roll No:</strong> {student.rollNumber}</p>
            <p><strong>Year:</strong> {student.year}</p>
            <p><strong>Dept:</strong> {student.department}</p>
            <p><strong>Skills:</strong> {student.skills.join(', ')}</p>
            <p className="text-sm text-gray-500"><strong>About:</strong> {student.description}</p>
            <p className="text-xs text-gray-400 mt-2">Added on: {new Date(student.createdAt).toLocaleString()}</p>

            {role === 'admin' && (
              <button
                onClick={() => handleEditClick(student)}
                className="absolute top-2 right-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-lg relative">
            <button
              onClick={() => setEditData(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-red-700">Edit Student</h3>

            {['name', 'rollNumber', 'year', 'department', 'skills', 'description'].map((field) => (
              <input
                key={field}
                name={field}
                value={editData[field]}
                onChange={handleEditChange}
                placeholder={field}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
            ))}

            <button
              onClick={handleSaveChanges}
              className="w-full py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
