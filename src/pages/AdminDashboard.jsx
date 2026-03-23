import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardCard from '../components/cards/DashboardCard';
import BookingTable from '../components/tables/BookingTable';
import Button from '../components/common/Button';
import Modal from '../components/forms/Modal';
import usersData from '../data/users.json';
import bookingsData from '../data/bookings.json';

const AdminDashboard = ({ authState }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const stats = [
    { title: 'Total Users', value: usersData.customers.length.toString(), icon: '👥', color: 'indigo', change: '+24' },
    { title: 'Total Partners', value: usersData.partners.length.toString(), icon: '🤝', color: 'purple', change: '+6' },
    { title: 'Total Bookings', value: bookingsData.length.toString(), icon: '📅', color: 'green', change: '+18' },
    { title: 'Revenue', value: '₹1.2L', icon: '💰', color: 'yellow', change: '+₹28K' },
  ];

  const tabs = ['overview', 'users', 'partners', 'bookings', 'services'];

  const handleViewDetails = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  return (
    <DashboardLayout role="admin" userName={authState?.name || 'Admin'}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-500 text-sm mt-0.5">Manage your platform from here</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s, i) => <DashboardCard key={i} {...s} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Recent Bookings</h3>
              <BookingTable bookings={bookingsData.slice(0, 4)} showCustomer showPartner />
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Partner Approval Queue</h3>
              <div className="space-y-3">
                {usersData.partners.filter(p => p.status === 'Pending').map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category} • {p.city}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="success">Approve</Button>
                      <Button size="sm" variant="danger">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">All Customers</h3>
            <span className="text-sm text-gray-500">{usersData.customers.length} users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Email', 'Phone', 'City', 'Joined', 'Bookings', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData.customers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3 text-gray-500">{u.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{u.city}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{u.joined}</td>
                    <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">{u.bookings}</span></td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleViewDetails(u)} className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Partners Tab */}
      {activeTab === 'partners' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">All Partners</h3>
            <span className="text-sm text-gray-500">{usersData.partners.length} partners</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Category', 'City', 'Rating', 'Jobs', 'Earnings', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData.partners.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category}</td>
                    <td className="px-4 py-3 text-gray-500">{p.city}</td>
                    <td className="px-4 py-3 text-yellow-600 font-semibold">⭐ {p.rating}</td>
                    <td className="px-4 py-3 text-gray-600">{p.totalJobs}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">₹{p.earnings.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.status === 'Pending' ? (
                        <div className="flex gap-1">
                          <button className="text-xs text-green-600 hover:underline font-medium cursor-pointer">Approve</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-xs text-red-500 hover:underline font-medium cursor-pointer">Reject</button>
                        </div>
                      ) : (
                        <button onClick={() => handleViewDetails(p)} className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">All Bookings</h3>
            <span className="text-sm text-gray-500">{bookingsData.length} bookings</span>
          </div>
          <BookingTable bookings={bookingsData} showCustomer showPartner />
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Service Management</h3>
            <Button size="sm">+ Add Service</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Service', 'Category', 'Price', 'Rating', 'Reviews', 'Popular', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: 1, title: 'Deep Home Cleaning', category: 'Cleaning', price: 1499, rating: 4.8, reviews: 2340, popular: true },
                  { id: 2, title: 'AC Service & Repair', category: 'Appliance Repair', price: 799, rating: 4.9, reviews: 3120, popular: true },
                  { id: 3, title: 'Haircut & Styling', category: 'Beauty Services', price: 399, rating: 4.8, reviews: 2100, popular: true },
                  { id: 4, title: 'Bathroom Cleaning', category: 'Cleaning', price: 499, rating: 4.7, reviews: 1890, popular: true },
                  { id: 5, title: 'Washing Machine Repair', category: 'Appliance Repair', price: 599, rating: 4.7, reviews: 980, popular: false },
                ].map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{s.title}</td>
                    <td className="px-4 py-3"><span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{s.category}</span></td>
                    <td className="px-4 py-3 font-semibold text-gray-800">₹{s.price}</td>
                    <td className="px-4 py-3 text-yellow-600">⭐ {s.rating}</td>
                    <td className="px-4 py-3 text-gray-500">{s.reviews.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${s.popular ? 'text-green-600' : 'text-gray-400'}`}>{s.popular ? '✅ Yes' : '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer">Edit</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-xs text-red-500 hover:underline font-medium cursor-pointer">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Details">
        {modalContent && (
          <div className="space-y-2">
            {Object.entries(modalContent).map(([key, val]) => (
              <div key={key} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-500 capitalize">{key}</span>
                <span className="text-gray-800 font-medium">{String(val)}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};
export default AdminDashboard;
