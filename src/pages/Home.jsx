import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ServiceCard from '../components/cards/ServiceCard';
import CategoryCard from '../components/cards/CategoryCard';
import Button from '../components/common/Button';
import servicesData from '../data/services.json';
import categoriesData from '../data/categories.json';

const Home = ({ authState, onLogout }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroSearch, setHeroSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  useEffect(() => {
    let result = servicesData;
    if (activeCategory !== 'All') {
      result = result.filter(s => s.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredServices(result);
  }, [activeCategory, searchQuery]);

  const categories = ['All', ...categoriesData.map(c => c.name)];
  const popularServices = servicesData.filter(s => s.popular);
  const cleaningServices = servicesData.filter(s => s.category === 'Cleaning');
  const applianceServices = servicesData.filter(s => s.category === 'Appliance Repair');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setSearchQuery(heroSearch);
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-indigo-600 font-semibold">Loading Fix Buddy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authState={authState} onLogout={onLogout} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Home Services at <span className="text-yellow-300">Your Doorstep</span>
          </h1>
          <p className="text-indigo-100 text-lg mb-8">Trusted professionals for cleaning, repairs, beauty & more</p>
          <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl px-4 py-3 flex-1">
              <FiMapPin className="text-yellow-300 w-5 h-5 flex-shrink-0" />
              <input type="text" placeholder="Your city..." className="bg-transparent text-white placeholder-indigo-200 text-sm w-full outline-none" />
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 flex-1">
              <FiSearch className="text-indigo-400 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="What service do you need?"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="bg-transparent text-gray-700 text-sm w-full outline-none"
              />
            </div>
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center cursor-pointer">
              <FiSearch className="w-5 h-5" />
              Search
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
            {['Cleaning', 'AC Repair', 'Beauty', 'Plumbing'].map(t => (
              <button key={t} onClick={() => setSearchQuery(t)} className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full border border-white/30 transition-colors cursor-pointer">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Service Categories</h2>
          <button className="flex items-center gap-1 text-sm text-indigo-600 font-semibold hover:underline cursor-pointer">
            View all <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesData.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onClick={() => setActiveCategory(cat.name)} />
          ))}
        </div>
      </section>

      {/* Most Booked Services */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Most Booked Services</h2>
              <p className="text-gray-500 text-sm mt-1">Top rated services loved by our customers</p>
            </div>
            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              View All <FiArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* All Services with Filter */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Services</h2>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
            <FiSearch className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm w-full outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No services found</p>
            <p className="text-sm mt-2">Try a different search term or category</p>
            <Button variant="ghost" className="mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Cleaning Essentials */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">🧹 Cleaning Essentials</h2>
              <p className="text-gray-500 text-sm mt-1">Professional cleaning for every corner of your home</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cleaningServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* Appliance Repair */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">🔧 Appliance Repair & Services</h2>
              <p className="text-gray-500 text-sm mt-1">Expert repair for all home appliances</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applianceServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Become a Service Partner</h2>
          <p className="text-indigo-100 mb-6">Join thousands of professionals earning with Fix Buddy</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" className="border-white text-indigo-700">
              Register as Partner
            </Button>
            <Button size="lg" className="bg-white/20 border border-white hover:bg-white/30 text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Home;
