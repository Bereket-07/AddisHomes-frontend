import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedIcon, BathIcon, RulerIcon, MapPinIcon } from 'lucide-react'

function PropertyCard({ property }) {
  return (
    <motion.div
      className="bg-indigo-900 rounded-lg shadow-md overflow-hidden text-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={property.image_urls[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={property.property_type}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-white text-indigo-900 px-2 py-1 rounded-full text-xs font-bold">
          {property.property_type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{property.location.site}, {property.location.region}</h3>
        <p className="text-2xl font-bold text-gold-400 mb-2">{property.price_etb.toLocaleString()} ETB</p>
        <div className="flex items-center text-sm mb-4">
          <BedIcon size={14} className="mr-1" /> {property.bedrooms} Beds
          <BathIcon size={14} className="ml-4 mr-1" /> {property.bathrooms} Baths
          <RulerIcon size={14} className="ml-4 mr-1" /> {property.size_sqm} m²
          <MapPinIcon size={14} className="ml-4 mr-1" /> {property.status}
        </div>
        <Link
          to={`/properties/${property.pid}`}
          className="block bg-purple-600 text-white text-center py-2 rounded-md hover:bg-purple-700 transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard
