import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import FormInput from '../components/forms/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const LoginRegister = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Customer' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const getFirebaseErrorMessage = (error) => {
    const messageByCode = {
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/user-not-found': 'No account found for this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/weak-password': 'Password must be at least 6 characters.',
    };

    return messageByCode[error?.code] || 'Unable to complete this request right now.';
  };

  const redirectByRole = (roleKey) => {
    if (roleKey === 'partner') {
      navigate('/partner');
      return;
    }
    if (roleKey === 'admin') {
      navigate('/admin');
      return;
    }
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      const userData = isLogin
        ? await login({ email: payload.email, password: payload.password })
        : await register(payload);

      redirectByRole(userData.roleKey);
    } catch (error) {
      setSubmitError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="font-extrabold text-gray-800 text-2xl">Fix Buddy</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Welcome back!' : 'Create account'}</h2>
          <p className="text-gray-500 text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Join Fix Buddy today'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setErrors({}); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrors({}); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            {!isLogin && (
              <div className="relative">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                  required
                />
                <FiUser className="absolute right-3 top-9 text-gray-400 w-4 h-4" />
              </div>
            )}

            <div className="relative">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
                required
              />
              <FiMail className="absolute right-3 top-9 text-gray-400 w-4 h-4" />
            </div>

            <div className="relative">
              <FormInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                error={errors.password}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Register as <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Customer', 'Partner'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, role }))}
                      className={`py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        form.role === role
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {role === 'Customer' ? '👤' : '🔧'} {role}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!!submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 mb-3">
                {submitError}
              </div>
            )}

            {isLogin && (
              <div className="text-right mb-2">
                <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
              </div>
            )}

            <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-xl text-xs text-indigo-700">
              <strong>Tip:</strong> Sign up first, then log in with the same credentials.
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to our{' '}
          <a href="#" className="text-indigo-600 hover:underline">Terms</a> &{' '}
          <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};
export default LoginRegister;
