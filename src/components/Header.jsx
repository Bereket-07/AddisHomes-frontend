import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'
import AuthContext from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext'
import logo from '../assets/logo.jpg'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Submit Property', href: '/submit', role: 'broker' },
  { name: 'My Listings', href: '/my-listings', role: 'broker' },
  { name: 'Admin Panel', href: '/admin', role: 'admin' },
]

function Header() {
  const { user, logout } = useContext(AuthContext)
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  return (
    <Disclosure as="nav" className="bg-theme-secondary shadow-lg border-b border-theme transition-colors duration-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
                  <img
                    src={logo}
                    alt="ADDISHOME Logo"
                    className="h-10 w-10 rounded-full object-cover shadow-md"
                  />
                  <span className="text-theme-accent font-extrabold text-2xl tracking-wide">
                    ADDISHOME
                  </span>
                </Link>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-4">
                {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-theme-primary hover:text-theme-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Actions - Right side */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Auth buttons */}
                {user ? (
                  <button
                    onClick={logout}
                    className="text-theme-primary hover:text-theme-accent px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="bg-theme-accent text-gray-900 px-3 py-1 rounded-full text-sm font-bold hover:bg-yellow-500 transition-all duration-200 hover:scale-105"
                    >
                      Register as Agent
                    </Link>
                    <Link
                      to="/login"
                      className="bg-theme-accent text-gray-900 px-3 py-1 rounded-full text-sm font-bold hover:bg-yellow-500 transition-all duration-200 hover:scale-105"
                    >
                      Login
                    </Link>
                    <a
                      href="tel:+251984863868"
                      className="flex items-center text-theme-accent hover:text-yellow-500 transition-colors duration-200"
                    >
                      <Phone size={16} className="mr-1" /> +251984863868
                    </a>
                  </>
                )}

                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-theme-primary hover:text-theme-accent p-2 rounded-full hover:bg-theme-muted transition-all duration-200"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center space-x-2">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-theme-primary hover:bg-theme-muted rounded-md transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X size={24} className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu size={24} className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile nav panel */}
          <Disclosure.Panel className="md:hidden bg-theme-primary border-t border-theme">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-theme-primary hover:text-theme-accent px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-theme-muted"
                    onClick={() => {
                      // Close mobile menu when link is clicked
                      if (typeof window !== 'undefined') {
                        const button = document.querySelector('[aria-expanded="true"]');
                        if (button) button.click();
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Actions */}
              <div className="border-t border-theme pt-4">
                {/* Dark mode toggle for mobile */}
                <div className="flex items-center justify-between px-3 py-3 mb-3">
                  <span className="text-theme-primary font-medium">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-theme-primary hover:text-theme-accent p-2 rounded-full hover:bg-theme-muted transition-all duration-200"
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                {user ? (
                  <button
                    onClick={logout}
                    className="w-full text-left text-theme-primary hover:text-theme-accent px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-theme-muted"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/signup"
                      className="block w-full bg-theme-accent text-gray-900 px-4 py-3 rounded-lg text-center font-bold hover:bg-yellow-500 transition-all duration-200"
                      onClick={() => {
                        // Close mobile menu when link is clicked
                        if (typeof window !== 'undefined') {
                          const button = document.querySelector('[aria-expanded="true"]');
                          if (button) button.click();
                        }
                      }}
                    >
                      Register as Agent
                    </Link>
                    <Link
                      to="/login"
                      className="block w-full bg-theme-accent text-gray-900 px-4 py-3 rounded-lg text-center font-bold hover:bg-yellow-500 transition-all duration-200"
                      onClick={() => {
                        // Close mobile menu when link is clicked
                        if (typeof window !== 'undefined') {
                          const button = document.querySelector('[aria-expanded="true"]');
                          if (button) button.click();
                        }
                      }}
                    >
                      Login
                    </Link>
                    <a
                      href="tel:+251984863868"
                      className="flex items-center justify-center text-theme-accent hover:text-yellow-500 px-3 py-3 rounded-lg transition-colors duration-200 hover:bg-theme-muted"
                    >
                      <Phone size={18} className="mr-2" /> +251 984 863 868
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header