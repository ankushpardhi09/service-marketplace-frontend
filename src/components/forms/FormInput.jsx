const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
          error ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-300 focus:ring-indigo-300 focus:border-indigo-500 bg-white'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
export default FormInput;
