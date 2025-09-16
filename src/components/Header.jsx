import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'
import AuthContext from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext'

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
    <Disclosure as="nav" className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-gold-400 font-extrabold text-2xl tracking-wide">
                  GEORGE MEELALII
                </Link>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-4">
                {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-gold-300 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Dark mode toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="text-white hover:text-gold-300 p-2 rounded-full hover:bg-blue-800 dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Auth buttons */}
                {user ? (
                  <button onClick={logout} className="text-white hover:text-gold-300 px-3 py-1 rounded-md text-sm font-medium">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/signup" className="bg-gold-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold hover:bg-gold-400">
                      Register as Agent
                    </Link>
                    <Link to="/submit" className="bg-gold-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold hover:bg-gold-400">
                      + Sell Property
                    </Link>
                    <a href="tel:+25195345555" className="flex items-center text-gold-300 hover:text-gold-200">
                      <Phone size={16} className="mr-1" /> +25195345555
                    </a>
                  </>
                )}

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white hover:bg-blue-800 rounded-md">
                    {open ? <X size={24} /> : <Menu size={24} />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile nav panel */}
          <Disclosure.Panel className="md:hidden bg-blue-800 dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-white hover:text-gold-300 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
