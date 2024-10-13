// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import Onboarding from './components/Onboarding';
import EssayEditor from './components/ParentEditor';
import TestEssayEditor from './components/TestEssayEditor';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar /> {/* Navbar displayed at the top */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Onboarding />} /> {/* Home route for Orientation */}
            <Route path="/essay-editor" element={<EssayEditor />} /> {/* Route for Essay Editor */}
            <Route path="/test-essay-editor" element={<TestEssayEditor />} /> {/* Purely for debugging */}
            <Route path="/about" element={<About />} /> {/*About page*/}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
