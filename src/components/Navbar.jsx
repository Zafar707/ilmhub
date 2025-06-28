 import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

function Navbar() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('uz');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <nav className="bg-ilm-blue text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <div className="text-2xl font-bold">Ilm Hub</div>
      </div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-ilm-green">Home</Link></li>
        <li><Link to="/about" className="hover:text-ilm-green">About</Link></li>
        <li><Link to="/team" className="hover:text-ilm-green">Team</Link></li>
        <li><Link to="/projects" className="hover:text-ilm-green">Projects</Link></li>
        <li><Link to="/contact" className="hover:text-ilm-green">Contact</Link></li>
      </ul>
      <div className="flex space-x-4">
        <button onClick={toggleTheme} className="px-3 py-1 bg-gray-700 rounded">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <Link to="/contact" className="px-3 py-1 bg-ilm-green rounded hover:bg-green-600">Bog'lanish</Link>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-ilm-blue text-white rounded"
        >
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;