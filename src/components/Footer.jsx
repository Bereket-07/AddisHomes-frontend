// src/components/Footer.jsx
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-theme-secondary border-t border-theme mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-theme-accent">ADDISHOME</h3>
            <p className="text-theme-secondary leading-relaxed">
              Your trusted partner in finding the perfect property in Ethiopia.
              We connect you with premium real estate opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/submit" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Submit Property
                </a>
              </li>
              <li>
                <a href="/my-listings" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  My Listings
                </a>
              </li>
              <li>
                <a href="/admin" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary">Property Types</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Apartments
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Houses
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Land
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  Commercial
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="text-theme-accent mr-3" />
                <a
                  href="tel:+251984863868"
                  className="text-theme-secondary hover:text-theme-accent transition-colors duration-200"
                >
                  +251 984 863 868
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-theme-accent mr-3" />
                <a
                  href="mailto:info@addishome.com"
                  className="text-theme-secondary hover:text-theme-accent transition-colors duration-200"
                >
                  info@addishome.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-theme-accent mr-3" />
                <span className="text-theme-secondary">
                  Addis Ababa, Ethiopia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-theme-secondary text-sm">
              &copy; {new Date().getFullYear()} ADDISHOME. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer