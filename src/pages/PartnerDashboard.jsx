import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardCard from '../components/cards/DashboardCard';
import BookingTable from '../components/tables/BookingTable';
import Button from '../components/common/Button';
import Modal from '../components/forms/Modal';
import FormInput from '../components/forms/FormInput';
import bookingsData from '../data/bookings.json';

const PartnerDashboard = ({ authState }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({ title: '', category: '', price: '', description: '' });

  const myBookings = bookingsData.slice(0, 4);
  const myServices = [
    { id: 1, title: 'Deep Home Cleaning', category: 'Cleaning', price: 1499, status: 'Active', bookings: 45 },
    { id: 2, title: 'Bathroom Cleaning', category: 'Cleaning', price: 499, status: 'Active', bookings: 32 },
    { id: 3, title: 'Kitchen Cleaning', category: 'Cleaning', price: 699, status: 'Inactive', bookings: 18 },
  ];

  const stats = [
    { title: 'Total Bookings', value: '234', icon: '📅', color: 'indigo', change: '+12' },
    { title: 'Total Earnings', value: '₹45,200', icon: '💰', color: 'green', change: '+₹3,400' },
    { title: 'Average Rating', value: '4.8 ⭐', icon: '🌟', color: 'yellow', change: '+0.2' },
    { title: 'Completed Jobs', value: '218', icon: '✅', color: 'purple', change: '+8' },
  ];

  const tabs = ['overview', 'bookings', 'services', 'earnings'];

  return (
    <DashboardLayout role="partner" userName={authState?.name || 'Partner'}>
      {/* Availability Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Welcome back, {authState?.name || 'Partner'}! 👋</h2>
          <p className="text-gray-500 text-sm mt-0.5">Here's your business overview</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
          <span className="text-sm text-gray-600 font-medium">Availability</span>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isAvailable ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className={`text-xs font-semibold ${isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
            {isAvailable ? 'Available' : 'Away'}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-full sm:w-auto overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-200 whitespace-nowrap cursor-pointer ${
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
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-800 mb-4">Recent Bookings</h3>
            <BookingTable bookings={myBookings} showCustomer />
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">All Bookings</h3>
            <span className="text-sm text-gray-500">{myBookings.length} bookings</span>
          </div>
          <BookingTable bookings={myBookings} showCustomer />
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-800">My Services</h3>
            <Button size="sm" onClick={() => setShowAddModal(true)}>+ Add Service</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myServices.map(s => (
              <div key={s.id} className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{s.title}</h4>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">{s.category}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-800 mb-1">₹{s.price}</p>
                <p className="text-xs text-gray-400 mb-4">{s.bookings} bookings</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DashboardCard title="This Month" value="₹8,500" icon="💰" color="green" />
            <DashboardCard title="Last Month" value="₹12,300" icon="📈" color="indigo" />
            <DashboardCard title="Total Earned" value="₹45,200" icon="🏦" color="purple" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-800 mb-4">Earnings Breakdown</h3>
            <div className="space-y-3">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => {
                const pct = [65, 80, 45, 90, 70][i];
                const amt = [6500, 8000, 4500, 9000, 7000][i];
                return (
                  <div key={month} className="flex items-center gap-3">
                    <span className="w-8 text-xs text-gray-500 font-medium">{month}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-16 text-right">₹{amt.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Service">
        <div className="space-y-1">
          <FormInput label="Service Title" name="title" value={newService.title} onChange={e => setNewService(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Deep Cleaning" required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" value={newService.category} onChange={e => setNewService(p => ({ ...p, category: e.target.value }))}>
              <option value="">Select category</option>
              {['Cleaning', 'Appliance Repair', 'Beauty Services', 'Plumbing', 'Electrical'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <FormInput label="Price (₹)" type="number" name="price" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} placeholder="e.g., 999" required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Describe your service..." value={newService.description} onChange={e => setNewService(p => ({ ...p, description: e.target.value }))} />
          </div>
          <Button className="w-full" onClick={() => setShowAddModal(false)}>Add Service</Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
export default PartnerDashboard;
