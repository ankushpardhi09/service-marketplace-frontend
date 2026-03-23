import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiMapPin, FiLogOut } from 'react-icons/fi';
import Button from './Button';

const Navbar = ({ authState, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-extrabold text-gray-800 text-xl hidden sm:block">ServeHub</span>
          </Link>

          {/* Search bars - desktop */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-36 flex-shrink-0">
              <FiMapPin className="text-indigo-500 w-4 h-4 flex-shrink-0" />
              <input type="text" placeholder="Location" className="bg-transparent text-sm w-full outline-none text-gray-600" />
            </div>
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <FiSearch className="text-gray-400 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-gray-600"
              />
            </form>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">0</span>
            </button>

            {authState?.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                  <FiUser className="text-indigo-600 w-4 h-4" />
                  <span className="text-sm font-medium text-indigo-700 max-w-24 truncate">{authState.name}</span>
                </div>
                {authState.role === 'Partner' && (
                  <Link to="/partner" className="hidden sm:block text-xs font-medium text-indigo-600 hover:underline">Dashboard</Link>
                )}
                {authState.role === 'Admin' && (
                  <Link to="/admin" className="hidden sm:block text-xs font-medium text-indigo-600 hover:underline">Admin</Link>
                )}
                <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Logout">
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">
                  <FiUser className="w-4 h-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <FiMapPin className="text-indigo-500 w-4 h-4" />
              <input type="text" placeholder="Location" className="bg-transparent text-sm w-full outline-none" />
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <FiSearch className="text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
