import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-extrabold text-white text-xl">Fix Buddy</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">India's most trusted home services platform. Quality services at your doorstep.</p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {['Cleaning Services', 'Appliance Repair', 'Beauty Services', 'Plumbing', 'Electrical', 'Painting'].map((s) => (
                <li key={s}><a href="#" className="hover:text-indigo-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[['About Us', '#'], ['Careers', '#'], ['Blog', '#'], ['Partner With Us', '/login'], ['Privacy Policy', '#'], ['Terms of Service', '#']].map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-indigo-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>support@fixbuddy.in</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Available on</p>
              <div className="flex gap-2">
                <div className="bg-gray-800 rounded-lg px-3 py-2 text-xs text-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="font-semibold text-white">App Store</div>
                </div>
                <div className="bg-gray-800 rounded-lg px-3 py-2 text-xs text-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="font-semibold text-white">Play Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Fix Buddy. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
