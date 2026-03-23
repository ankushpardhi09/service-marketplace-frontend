import { FiStar, FiClock, FiShoppingCart } from 'react-icons/fi';
import Button from '../common/Button';

const ServiceCard = ({ service }) => {
  const { title, price, rating, reviews, image, duration, category } = service;
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'; }}
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-yellow-400 fill-yellow-400 w-3.5 h-3.5" />
          <span className="text-xs font-semibold text-gray-700">{rating}</span>
          <span className="text-xs text-gray-400">({reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <FiClock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Starting at</span>
            <p className="text-lg font-bold text-indigo-600">₹{price}</p>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <FiShoppingCart className="w-3.5 h-3.5" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
