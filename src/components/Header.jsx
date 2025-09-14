// src/components/Header.jsx
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react' // Correct imports
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
    <Disclosure as="nav" className="bg-gradient-to-r from-indigo-900 to-indigo-700 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="text-gold-400 font-extrabold text-2xl tracking-wide">GEORGE MEELALII</Link>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="text-white hover:text-gold-300 p-2 rounded-full hover:bg-indigo-800"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />} {/* Corrected to Sun and Moon */}
                </button>
                {user ? (
                  <button onClick={logout} className="text-white hover:bg-indigo-800 px-3 py-1 rounded-md text-sm font-medium">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/signup" className="bg-gold-500 text-indigo-900 px-3 py-1 rounded-md text-sm font-bold hover:bg-gold-400">
                      Register as an agent
                    </Link>
                    <Link to="/submit" className="bg-gold-500 text-indigo-900 px-3 py-1 rounded-md text-sm font-bold hover:bg-gold-400">
                      + To Sell Your Property
                    </Link>
                    <a href="tel:+25195345555" className="flex items-center text-gold-300 hover:text-gold-200">
                      <Phone size={16} className="mr-1" /> +25195345555
                    </a>
                  </>
                )}
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white hover:bg-indigo-800 rounded-md">
                    <span className="sr-only">Open main menu</span>
                    {open ? <X size={24} /> : <Menu size={24} />} {/* Corrected to X and Menu */}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.filter(item => !item.role || (user && user.roles.includes(item.role))).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-base font-medium"
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