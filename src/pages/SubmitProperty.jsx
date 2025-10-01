// src/pages/SubmitProperty.jsx
import { useState, useContext, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { PROPERTY_TYPES, CONDO_SCHEMES, FURNISHING_STATUS, SUPPORTED_SITES, REGIONS } from '../utils/filterConstants'
import ThemeContext from '../context/ThemeContext'
import LanguageContext from '../context/LanguageContext'
import AuthContext from '../context/AuthContext'

function SubmitProperty() {
  const { darkMode } = useContext(ThemeContext)
  const { t } = useContext(LanguageContext)
  const { user, loading: authLoading } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    property_type: 'Apartment',
    location: { region: 'Addis Ababa', city: 'Addis Ababa', site: '' },
    bedrooms: 1,
    bathrooms: 1,
    size_sqm: 0,
    price_etb: 0,
    description: '',
    furnishing_status: '',
    condominium_scheme: '',
    image_urls: [],
  })
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const navigate = useNavigate()

  // Check if user is authenticated and has broker role
  useEffect(() => {
    if (!authLoading && (!user || !user.roles?.includes('broker'))) {
      alert(t('broker_only') || 'You need to be logged in as a broker to submit properties. Please login first.')
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length < 3) {
      alert(t('upload_at_least_three') || 'Please upload at least 3 images')
      return
    }
    setImages(files)
  }

  const uploadImages = async () => {
    if (images.length === 0) return []
    setUploading(true)
    const urls = []

    const uploadForm = new FormData()
    images.forEach((file) => uploadForm.append('images', file))

    try {
      const res = await api.post('/properties/upload-images', uploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      urls.push(...res.data.urls)
    } catch (err) {
      console.error('Image upload error:', err)
      alert(`Image upload failed: ${err.response?.data?.detail || err.message}`)
      throw err
    } finally {
      setUploading(false)
    }

    return urls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.property_type || !formData.location.region || !formData.location.city ||
      !formData.bedrooms || !formData.bathrooms || !formData.size_sqm ||
      !formData.price_etb || !formData.description) {
      alert(t('fill_required_fields') || 'Please fill in all required fields')
      return
    }

    if (images.length < 3) {
      alert(t('upload_at_least_three') || 'Please upload at least 3 images')
      return
    }

    try {
      const uploadedUrls = await uploadImages()

      // Prepare the data according to the backend schema
      const submitData = {
        property_type: formData.property_type,
        location: {
          region: formData.location.region,
          city: formData.location.city,
          site: formData.location.site || null
        },
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        size_sqm: parseFloat(formData.size_sqm),
        price_etb: parseFloat(formData.price_etb),
        description: formData.description,
        image_urls: uploadedUrls,
        furnishing_status: formData.furnishing_status || null,
        condominium_scheme: formData.condominium_scheme || null,
        // Add other optional fields as needed
        title_deed: false,
        parking_spaces: 0,
        water_tank: false
      }

      console.log('Submitting data:', submitData) // Debug log
      console.log('Data types:', {
        property_type: typeof submitData.property_type,
        bedrooms: typeof submitData.bedrooms,
        bathrooms: typeof submitData.bathrooms,
        size_sqm: typeof submitData.size_sqm,
        price_etb: typeof submitData.price_etb
      })

      await api.post('/properties', submitData)
      alert(t('submit_property_success') || 'Property submitted successfully!')
      navigate('/my-listings')
    } catch (err) {
      console.error('Submission error:', err)
      console.error('Error response:', err.response?.data) // Debug log
      alert(`Submission failed: ${err.response?.data?.detail || err.message}`)
    }
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    )
  }

  // Show message if user is not authenticated or not a broker
  if (!user || !user.roles?.includes('broker')) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {t('access_denied') || 'Access Denied'}
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            {t('broker_only') || 'You need to be logged in as a broker to submit properties.'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('login')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
          <div className="p-8">
            <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gold-400' : 'text-blue-900'}`}>
              {t('submit_property')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('property_type')} *
                  </label>
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  >
                    {PROPERTY_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('region')} *
                  </label>
                  <select
                    name="location.region"
                    value={formData.location.region}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  >
                    {REGIONS.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('city') || 'City'} *
                  </label>
                  <input
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  />
                </div>

                {/* Site */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('site_area')}
                  </label>
                  <select
                    name="location.site"
                    value={formData.location.site}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                  >
                    <option value="">{t('select_site') || 'Select Site'}</option>
                    {SUPPORTED_SITES.map(site => (
                      <option key={site} value={site}>{site}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('bedrooms_count')} *
                  </label>
                  <input
                    name="bedrooms"
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  />
                </div>

                {/* Bathrooms */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('bathrooms_count')} *
                  </label>
                  <input
                    name="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  />
                </div>

                {/* Size */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('size')} (sqm) *
                  </label>
                  <input
                    name="size_sqm"
                    type="number"
                    min="1"
                    value={formData.size_sqm}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('price_range') || 'Price (ETB)'} *
                  </label>
                  <input
                    name="price_etb"
                    type="number"
                    min="1"
                    value={formData.price_etb}
                    onChange={handleChange}
                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300 bg-gray-50 text-gray-900'
                      }`}
                    required
                  />
                </div>
              </div>

              {/* Property-specific fields */}
              {formData.property_type === 'Condominium' && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {t('condominium_details') || 'Condominium Details'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {t('condo_scheme')}
                      </label>
                      <select
                        name="condominium_scheme"
                        value={formData.condominium_scheme}
                        onChange={handleChange}
                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-100'
                          : 'border-gray-300 bg-gray-50 text-gray-900'
                          }`}
                      >
                        <option value="">{t('any_scheme')}</option>
                        {CONDO_SCHEMES.map(scheme => (
                          <option key={scheme.value} value={scheme.value}>{scheme.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Options */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {t('advanced_filters')}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${darkMode
                      ? 'text-blue-400 hover:bg-gray-600'
                      : 'text-blue-600 hover:bg-gray-200'
                      }`}
                  >
                    {showAdvanced ? t('less_options') : t('more_options')}
                  </button>
                </div>

                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {t('furnishing_status')}
                      </label>
                      <select
                        name="furnishing_status"
                        value={formData.furnishing_status}
                        onChange={handleChange}
                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-100'
                          : 'border-gray-300 bg-gray-50 text-gray-900'
                          }`}
                      >
                        <option value="">Select Status</option>
                        {FURNISHING_STATUS.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {t('description') || 'Description'} *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100'
                    : 'border-gray-300 bg-gray-50 text-gray-900'
                    }`}
                  rows="4"
                  placeholder={t('describe_property') || 'Describe the property, its features, and any special details...'}
                  required
                />
              </div>

              {/* Images */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {t('upload_images_min3') || 'Upload Images (at least 3) *'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full text-sm rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100'
                    : 'border-gray-300 bg-gray-50 text-gray-900'
                    }`}
                  required
                />
                {images.length > 0 && (
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {images.length} {t('images_selected') || 'images selected'}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={uploading || images.length < 3}
                  className={`w-full font-semibold py-4 rounded-lg shadow-lg transition-all duration-300 ${uploading || images.length < 3
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
                    }`}
                >
                  {uploading ? (t('uploading') || 'Uploading...') : t('submit_property')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitProperty
