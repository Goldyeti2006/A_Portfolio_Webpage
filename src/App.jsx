import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import ModelPage from './ModelPage.jsx'; // Import the new page
import Home from "./Home.jsx";

function App() {
  return (
    <div className='pt-20'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model" element={<ModelPage />} />
      </Routes>
    </div>
  );
}

export default App;
