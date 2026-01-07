import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import ModelPage from './ModelPage.jsx'; // Import the new page

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/model" element={<ModelPage />} />
      </Routes>
    </div>
  );
}

export default App;
