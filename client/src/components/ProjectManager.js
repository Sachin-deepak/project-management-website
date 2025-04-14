// src/components/ProjectManager.js
import React from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

function ProjectManager({ role }) {
  if (role !== 'admin' && role !== 'guest') {
    return (
      <div className="text-center text-red-600 font-semibold text-lg mt-10">
        ❌ Access Denied.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      {role === 'admin' && (
        <>
          <ProjectForm role={role} />
        </>
      )}
      <ProjectList role={role} />
    </div>
  );
}

export default ProjectManager;
