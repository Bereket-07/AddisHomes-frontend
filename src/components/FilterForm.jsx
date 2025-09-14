// src/components/FilterForm.jsx
import { useState } from 'react'
import { FilterIcon, RotateCcwIcon } from 'lucide-react'

function FilterForm({ onFilter, onReset }) {
  const [filters, setFilters] = useState({
    location_region: '',
    location_site: '',
    property_type: '',
    status: '',
    min_price: '',
    max_price: '',
    min_bedrooms: '',
    max_bedrooms: '',
    min_floor_level: '',
    is_commercial: '',
    has_elevator: '',
    has_private_rooftop: '',
    is_two_story_penthouse: '',
    has_private_entrance: '',
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <FilterIcon size={20} className="mr-2 text-gold-500" /> Filter Properties
        </h3>
        <button type="button" onClick={onReset} className="bg-pink-500 text-white px-4 py-1 rounded flex items-center">
          <RotateCcwIcon size={16} className="mr-2" /> Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Location */}
        <select name="location_region" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">All Regions</option>
          <option value="Addis Ababa">Addis Ababa</option>
        </select>
        <select name="location_site" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">All Places</option>
        </select>

        {/* Type / Status */}
        <select name="property_type" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">All Types</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="LAND">Land</option>
        </select>
        <select name="status" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">All Statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="SOLD">Sold</option>
        </select>

        {/* Price range */}
        <select name="price_range" onChange={(e) => {
          const [min, max] = e.target.value.split('-')
          setFilters({ ...filters, min_price: min, max_price: max })
        }} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Select Price Range</option>
          <option value="0-1000000">Under 1M</option>
          <option value="1000000-3000000">1M – 3M</option>
          <option value="3000000-6000000">3M – 6M</option>
        </select>

        {/* Bedrooms */}
        <select name="bedrooms" onChange={(e) => {
          const [min, max] = e.target.value.split('-')
          setFilters({ ...filters, min_bedrooms: min, max_bedrooms: max })
        }} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Any Bedrooms</option>
          <option value="1-1">1 Bed</option>
          <option value="2-2">2 Beds</option>
          <option value="3-3">3 Beds</option>
        </select>
      </div>

      {/* Boolean filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        <select name="min_floor_level" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Min Floor</option>
          <option value="1">1+</option>
          <option value="5">5+</option>
          <option value="10">10+</option>
        </select>

        <select name="is_commercial" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Commercial?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="has_elevator" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Elevator?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="has_private_rooftop" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Private Rooftop?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="is_two_story_penthouse" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Two-Story Penthouse?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="has_private_entrance" onChange={handleChange} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
          <option value="">Private Entrance?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
        Apply
      </button>
    </form>
  )
}

export default FilterForm
