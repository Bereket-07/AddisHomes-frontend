// src/pages/SubmitProperty.jsx (Updated with File Upload)
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
    image_urls: [],
    // Add other fields as per PropertyCreate model, e.g.
    furnishing_status: '',
    condominium_scheme: '',
    // etc.
  })
  const [images, setImages] = useState([]) // For file objects
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
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
    
    // Assuming backend has an endpoint to upload images and return URLs
    // If not, you'd need to add POST /upload-images that handles multipart/form-data,
    // uploads to GCS/Firestore storage, returns array of URLs.
    
    const uploadForm = new FormData()
    images.forEach(file => uploadForm.append('images', file))
    
    try {
      const res = await api.post('/upload-images', uploadForm, { // Add this endpoint to backend if needed
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      urls.push(...res.data.urls) // Assume response { urls: [] }
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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Submit Property</h2>
      <form onSubmit={handleSubmit}>
        {/* Example fields */}
        <div className="mb-4">
          <label className="block mb-1">Property Type</label>
          <select name="property_type" onChange={handleChange} className="w-full border p-2 rounded">
            <option>Apartment</option>
            <option>Condominium</option>
            <option>Villa</option>
            <option>Building</option>
            <option>Penthouse</option>
            <option>Duplex</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Region</label>
          <input name="location.region" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input name="location.city" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Site</label>
          <input name="location.site" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Bedrooms</label>
          <input name="bedrooms" type="number" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Bathrooms</label>
          <input name="bathrooms" type="number" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Size (sqm)</label>
          <input name="size_sqm" type="number" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price (ETB)</label>
          <input name="price_etb" type="number" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea name="description" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        {/* Add other fields like furnishing_status, condominium_scheme, etc. similarly */}
        
        <div className="mb-4">
          <label className="block mb-1">Images (at least 3)</label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange} 
            className="w-full border p-2 rounded" 
            required 
          />
          {images.length > 0 && <p>{images.length} images selected</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={uploading || images.length < 3} 
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default SubmitProperty