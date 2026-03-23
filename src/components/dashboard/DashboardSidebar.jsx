import { NavLink } from 'react-router-dom';

const DashboardSidebar = ({ role = 'partner', isOpen, onClose }) => {
  const partnerLinks = [
    { to: '/partner', icon: '📊', label: 'Dashboard' },
    { to: '/partner/services', icon: '🛠️', label: 'My Services' },
    { to: '/partner/bookings', icon: '📅', label: 'Bookings' },
    { to: '/partner/earnings', icon: '💰', label: 'Earnings' },
    { to: '/partner/profile', icon: '👤', label: 'Profile' },
  ];
  const adminLinks = [
    { to: '/admin', icon: '📊', label: 'Dashboard' },
    { to: '/admin/users', icon: '👥', label: 'Users' },
    { to: '/admin/partners', icon: '🤝', label: 'Partners' },
    { to: '/admin/bookings', icon: '📅', label: 'Bookings' },
    { to: '/admin/services', icon: '🛠️', label: 'Services' },
  ];
  const links = role === 'admin' ? adminLinks : partnerLinks;
  const title = role === 'admin' ? 'Admin Panel' : 'Partner Hub';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
            <div>
              <h2 className="font-bold text-gray-800">{title}</h2>
              <p className="text-xs text-gray-400">Service Marketplace</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <span>🏠</span>
            Back to Home
          </NavLink>
        </div>
      </aside>
    </>
  );
};
export default DashboardSidebar;
