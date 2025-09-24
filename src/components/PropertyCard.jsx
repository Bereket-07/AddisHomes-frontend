import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedIcon, BathIcon, RulerIcon, MapPinIcon } from 'lucide-react'
import PropertyImage from './PropertyImage'
import { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'

function PropertyCard({ property }) {
  const { t } = useContext(LanguageContext)

  // Helper function to translate property type
  const translatePropertyType = (type) => {
    const typeMap = {
      'Apartment': t('apartment'),
      'Condominium': t('condominium'),
      'Villa': t('villa'),
      'Building': t('building'),
      'Penthouse': t('penthouse'),
      'Duplex': t('duplex')
    }
    return typeMap[type] || type
  }

  // Helper function to translate status
  const translateStatus = (status) => {
    const statusMap = {
      'approved': t('approved'),
      'pending': t('pending'),
      'rejected': t('rejected'),
      'sold': t('sold')
    }
    return statusMap[status] || status
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden">
        <PropertyImage
          src={property.image_urls?.[0]}
          alt={property.property_type}
          className="w-full h-52 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          fallbackText={t('property_image')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
          {translatePropertyType(property.property_type)}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-gray-200 dark:border-gray-600">
          {translateStatus(property.status)}
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {property.location.site}, {property.location.region}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {property.location.site}, {property.location.region}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {property.price_etb.toLocaleString()} ETB
            </p>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('per_sqm')}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                {Math.round(property.price_etb / property.size_sqm).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg mr-3">
              <BedIcon size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('bedrooms')}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
              <BathIcon size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('bathrooms')}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
              <RulerIcon size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('size')}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.size_sqm} m²</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
              <MapPinIcon size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('floor')}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.floor_level || t('not_available')}</p>
            </div>
          </div>
        </div>

        <Link
          to={`/properties/${property.pid}`}
          className="block w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group/btn"
        >
          <span className="relative z-10">{t('view_details')}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard