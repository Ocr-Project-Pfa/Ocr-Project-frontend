// src/components/Navbar.jsx
import { FileText, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText size={18} className="text-blue-600" />
            <span className="font-semibold text-gray-900">OCR System</span>
          </Link>
          <div className="md:hidden">
            <Menu size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
