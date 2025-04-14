// src/components/StudentManager.js
import React from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function StudentManager({ role }) {
  if (role !== 'admin') {
    return (
      <div className="text-center text-red-600 font-semibold text-lg mt-10">
        ❌ Access Denied. Only Admin can view this page.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <h3 className="text-2xl font-extrabold mb-6 text-red-700 text-center">Student Skill Directory</h3>
      <StudentForm />
      <StudentList />
    </div>
  );
}

export default StudentManager;
