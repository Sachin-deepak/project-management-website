import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectForm />} />
        <Route path="/projects" element={<ProjectList />} />
      </Routes>
    </Router>
  );
}

export default App;
