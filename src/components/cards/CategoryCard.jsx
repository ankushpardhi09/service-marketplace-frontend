const CategoryCard = ({ category, onClick }) => {
  const { name, icon, description, image } = category;
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-sm">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{description}</p>
      </div>
    </div>
  );
};
export default CategoryCard;
