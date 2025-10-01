// src/components/Footer.jsx
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'

function Footer() {
  const { t } = useContext(LanguageContext)
  return (
    <footer className="bg-theme-secondary border-t border-theme mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-theme-accent">ADDISHOME</h3>
            <p className="text-theme-secondary leading-relaxed">
              {t('company_tagline')}
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
            <h4 className="text-lg font-semibold text-theme-primary">{t('quick_links')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/properties" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('homes')}
                </a>
              </li>
              <li>
                <a href="/cars" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('cars')}
                </a>
              </li>
              <li>
                <a href="/submit" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('submit_property')}
                </a>
              </li>
              <li>
                <a href="/my-listings" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('my_listings')}
                </a>
              </li>
              <li>
                <a href="/admin" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('admin_panel')}
                </a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary">{t('property_types')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('apartment')}
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('villa')}
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('building')}
                </a>
              </li>
              <li>
                <a href="#" className="text-theme-secondary hover:text-theme-accent transition-colors duration-200">
                  {t('commercial')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary">{t('contact_us')}</h4>
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
              &copy; {new Date().getFullYear()} ADDISHOME. {t('all_rights_reserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                {t('privacy_policy')}
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                {t('terms_of_service')}
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-accent text-sm transition-colors duration-200">
                {t('cookie_policy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer