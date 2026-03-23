const DashboardCard = ({ title, value, icon, color = 'indigo', change }) => {
  const colors = {
    indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-100 text-indigo-600', border: 'border-indigo-200' },
    green: { bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-100 text-yellow-600', border: 'border-yellow-200' },
    red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-600', border: 'border-red-200' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
  };
  const c = colors[color] || colors.indigo;
  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-5 flex items-center gap-4`}>
      <div className={`${c.icon} p-3 rounded-xl text-2xl w-14 h-14 flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {change && (
          <p className={`text-xs font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
            {change} this month
          </p>
        )}
      </div>
    </div>
  );
};
export default DashboardCard;
