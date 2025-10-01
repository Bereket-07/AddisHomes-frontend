import api from '../api'

export const propertyService = {
    // Get all properties with optional filters
    async getProperties(filters = {}) {
        try {
            // Clean up filters - remove empty values
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
            )

            // Convert boolean strings to actual booleans for API
            const booleanFields = [
                'filter_is_commercial', 'filter_has_elevator', 'filter_has_private_rooftop',
                'filter_is_two_story_penthouse', 'filter_has_private_entrance'
            ]

            booleanFields.forEach(field => {
                if (cleanFilters[field] === 'true') cleanFilters[field] = true
                if (cleanFilters[field] === 'false') cleanFilters[field] = false
            })

            const params = new URLSearchParams(cleanFilters).toString()
            const response = await api.get(`/properties?${params}`)
            return response.data || []
        } catch (error) {
            console.error('Error fetching properties:', error)
            throw error
        }
    },

    // Get a single property by ID
    async getPropertyById(propertyId) {
        try {
            const response = await api.get(`/properties/${propertyId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching property:', error)
            throw error
        }
    },

    // Submit a new property (for brokers)
    async submitProperty(propertyData) {
        try {
            const response = await api.post('/properties', propertyData)
            return response.data
        } catch (error) {
            console.error('Error submitting property:', error)
            throw error
        }
    },

    // Get properties by broker (for brokers)
    async getMyProperties() {
        try {
            const response = await api.get('/properties/me')
            return response.data || []
        } catch (error) {
            console.error('Error fetching my properties:', error)
            throw error
        }
    },

    // Helper function to build filter query string
    buildFilterQuery(filters) {
        const cleanFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        )

        return new URLSearchParams(cleanFilters).toString()
    },

    // Helper function to validate filters
    validateFilters(filters) {
        const errors = []

        if (filters.min_price && filters.max_price && parseFloat(filters.min_price) > parseFloat(filters.max_price)) {
            errors.push('Minimum price cannot be greater than maximum price')
        }

        if (filters.min_bedrooms && filters.max_bedrooms && parseInt(filters.min_bedrooms) > parseInt(filters.max_bedrooms)) {
            errors.push('Minimum bedrooms cannot be greater than maximum bedrooms')
        }

        return errors
    }
}

export default propertyService

// --- Car Service ---
export const carService = {
    async getCars(filters = {}) {
        try {
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
            )
            const params = new URLSearchParams(cleanFilters).toString()
            const response = await api.get(`/cars?${params}`)
            return response.data || []
        } catch (error) {
            console.error('Error fetching cars:', error)
            throw error
        }
    },

    async getCarById(carId) {
        try {
            const response = await api.get(`/cars/${carId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching car:', error)
            throw error
        }
    },

    async submitCar(carData) {
        try {
            const response = await api.post('/cars', carData)
            return response.data
        } catch (error) {
            console.error('Error submitting car:', error)
            throw error
        }
    }
}