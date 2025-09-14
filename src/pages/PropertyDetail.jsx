import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { motion } from 'framer-motion'
import { BedIcon, BathIcon, RulerIcon, MapPinIcon } from 'lucide-react'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    api.get(`/properties/${id}`).then(res => setProperty(res.data))
  }, [id])

  if (!property) return <div className="text-center py-8">Loading...</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl"
    >
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-gold-300">
        {property.property_type} in {property.location.site}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {property.image_urls.map((url, idx) => (
          <img key={idx} src={url} alt={`Image ${idx + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <span className="flex items-center text-lg"><MapPinIcon size={20} className="mr-2 text-gold-500" /> {property.location.region}</span>
        <span className="flex items-center text-lg"><BedIcon size={20} className="mr-2 text-gold-500" /> {property.bedrooms} Beds</span>
        <span className="flex items-center text-lg"><BathIcon size={20} className="mr-2 text-gold-500" /> {property.bathrooms} Baths</span>
        <span className="flex items-center text-lg"><RulerIcon size={20} className="mr-2 text-gold-500" /> {property.size_sqm} m²</span>
        <span className="flex items-center text-lg">Floor: {property.floor_level}</span>
        <span className="flex items-center text-lg">Title Deed: {property.title_deed ? 'Yes' : 'No'}</span>
      </div>

      <p className="text-2xl font-bold text-gold-500 mb-4">{property.price_etb.toLocaleString()} ETB</p>
      <p className="mb-6">{property.description}</p>

      {property.sold_date && (
        <p className="mb-4 text-red-500">Sold on: {new Date(property.sold_date).toLocaleDateString()}</p>
      )}

      <button className="bg-gold-500 text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 transition">
        Contact Agent
      </button>
    </motion.div>
  )
}

export default PropertyDetail
