import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 bg-[#FA8112]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto text-white">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <ul className="flex gap-4">
          <li><Link to="/" className="hover:text-[#F5E7C6]">Home</Link></li>
          {/* This link now takes you to the 3D scene */}
          <li><Link to="/model" className="hover:text-[#F5E7C6]">View Model</Link></li>
        </ul>
      </nav>
    </header>
  );
}