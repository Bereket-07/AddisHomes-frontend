import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedIcon, BathIcon, RulerIcon, MapPinIcon } from 'lucide-react'

function PropertyCard({ property }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={property.image_urls[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={property.property_type}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
          {property.property_type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
          {property.location.site}, {property.location.region}
        </h3>
        <p className="text-xl font-bold text-yellow-500 mb-3">
          {property.price_etb.toLocaleString()} ETB
        </p>
        <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <BedIcon size={14} className="mr-1" /> {property.bedrooms} Beds
          <BathIcon size={14} className="ml-4 mr-1" /> {property.bathrooms} Baths
          <RulerIcon size={14} className="ml-4 mr-1" /> {property.size_sqm} m²
          <MapPinIcon size={14} className="ml-4 mr-1" /> {property.status}
        </div>
        <Link
          to={`/properties/${property.pid}`}
          className="block text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-full font-medium hover:shadow-lg transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard
