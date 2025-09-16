// src/pages/SubmitProperty.jsx
import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

function SubmitProperty() {
  const [formData, setFormData] = useState({
    property_type: 'Apartment',
    location: { region: '', city: '', site: '' },
    bedrooms: 0,
    bathrooms: 0,
    size_sqm: 0,
    price_etb: 0,
    description: '',
    furnishing_status: '',
    condominium_scheme: '',
    image_urls: [],
  })
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

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
      alert('Please upload at least 3 images')
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
      const res = await api.post('/upload-images', uploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      urls.push(...res.data.urls)
    } catch (err) {
      alert('Image upload failed')
      throw err
    } finally {
      setUploading(false)
    }

    return urls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const uploadedUrls = await uploadImages()
      const submitData = { ...formData, image_urls: uploadedUrls }
      await api.post('/properties', submitData)
      navigate('/my-listings')
    } catch (err) {
      alert('Submission failed')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900 dark:text-gold-400">
        Submit Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Property Type
          </label>
          <select
            name="property_type"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Apartment</option>
            <option>Condominium</option>
            <option>Villa</option>
            <option>Building</option>
            <option>Penthouse</option>
            <option>Duplex</option>
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Region
          </label>
          <input
            name="location.region"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            name="location.city"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Site */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Site
          </label>
          <input
            name="location.site"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bedrooms
          </label>
          <input
            name="bedrooms"
            type="number"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bathrooms
          </label>
          <input
            name="bathrooms"
            type="number"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Size (sqm)
          </label>
          <input
            name="size_sqm"
            type="number"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price (ETB)
          </label>
          <input
            name="price_etb"
            type="number"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Images (at least 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full text-sm text-gray-600 dark:text-gray-400"
            required
          />
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {images.length} images selected
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading || images.length < 3}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 transition"
        >
          {uploading ? 'Uploading...' : 'Submit Property'}
        </button>
      </form>
    </div>
  )
}

export default SubmitProperty
