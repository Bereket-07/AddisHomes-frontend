import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import { motion } from 'framer-motion'
import { BedIcon, BathIcon, RulerIcon, MapPinIcon, ArrowLeft, Phone, Mail, Calendar, Home } from 'lucide-react'
import PropertyImage from '../components/PropertyImage'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/properties/${id}`)
        setProperty(res.data)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent mx-auto mb-4"></div>
          <p className="text-theme-secondary">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <Home size={48} className="text-theme-muted mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-theme-primary mb-2">Property Not Found</h2>
          <p className="text-theme-secondary mb-6">The property you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-theme-accent text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-theme-primary py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          to="/properties"
          className="inline-flex items-center text-theme-accent hover:text-yellow-500 mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Properties
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-theme-secondary rounded-2xl shadow-2xl border border-theme overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-theme">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-theme-primary mb-2">
                  {property.property_type} in {property.location.site}
                </h1>
                <p className="text-theme-secondary text-lg">
                  {property.location.region} • Listed on {new Date(property.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-3xl font-bold text-theme-accent">
                  {property.price_etb.toLocaleString()} ETB
                </p>
                <p className="text-theme-secondary text-sm">
                  {(property.price_etb / property.size_sqm).toFixed(2)} ETB per m²
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-theme-primary mb-4">Property Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.image_urls && property.image_urls.length > 0 ? (
                property.image_urls.map((url, idx) => (
                  <PropertyImage
                    key={idx}
                    src={url}
                    alt={`Property image ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    fallbackText={`Image ${idx + 1}`}
                  />
                ))
              ) : (
                <div className="col-span-full bg-theme-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="text-theme-secondary">No images available</p>
                </div>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8 border-t border-theme">
            <h2 className="text-2xl font-bold text-theme-primary mb-6">Property Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <MapPinIcon size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Location</p>
                  <p className="text-theme-primary font-semibold">{property.location.region}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <BedIcon size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Bedrooms</p>
                  <p className="text-theme-primary font-semibold">{property.bedrooms}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <BathIcon size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Bathrooms</p>
                  <p className="text-theme-primary font-semibold">{property.bathrooms}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <RulerIcon size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Size</p>
                  <p className="text-theme-primary font-semibold">{property.size_sqm} m²</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <Home size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Floor Level</p>
                  <p className="text-theme-primary font-semibold">{property.floor_level}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                <Calendar size={24} className="text-theme-accent mr-3" />
                <div>
                  <p className="text-theme-secondary text-sm">Title Deed</p>
                  <p className="text-theme-primary font-semibold">{property.title_deed ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-theme-primary mb-4">Additional Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-3 rounded-lg text-center ${property.is_commercial ? 'bg-green-100 text-green-800' : 'bg-theme-muted text-theme-secondary'}`}>
                  Commercial: {property.is_commercial ? 'Yes' : 'No'}
                </div>
                <div className={`p-3 rounded-lg text-center ${property.has_elevator ? 'bg-green-100 text-green-800' : 'bg-theme-muted text-theme-secondary'}`}>
                  Elevator: {property.has_elevator ? 'Yes' : 'No'}
                </div>
                <div className={`p-3 rounded-lg text-center ${property.has_private_rooftop ? 'bg-green-100 text-green-800' : 'bg-theme-muted text-theme-secondary'}`}>
                  Rooftop: {property.has_private_rooftop ? 'Yes' : 'No'}
                </div>
                <div className={`p-3 rounded-lg text-center ${property.is_two_story_penthouse ? 'bg-green-100 text-green-800' : 'bg-theme-muted text-theme-secondary'}`}>
                  Penthouse: {property.is_two_story_penthouse ? 'Yes' : 'No'}
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-theme-primary mb-4">Description</h3>
                <p className="text-theme-secondary leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Status */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-theme-primary mb-4">Status</h3>
              <div className="flex items-center">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${property.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  property.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    property.status === 'SOLD' ? 'bg-red-100 text-red-800' :
                      'bg-theme-muted text-theme-secondary'
                  }`}>
                  {property.status}
                </span>
                {property.sold_date && (
                  <span className="ml-4 text-theme-secondary">
                    Sold on: {new Date(property.sold_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 bg-theme-muted border-t border-theme">
            <h3 className="text-2xl font-bold text-theme-primary mb-6">Interested in this property?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center bg-theme-accent text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 hover:scale-105">
                <Phone size={20} className="mr-2" />
                Call +251984863868
              </button>
              <button className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                <Mail size={20} className="mr-2" />
                Send Message
              </button>
              <button className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105">
                Schedule Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PropertyDetail