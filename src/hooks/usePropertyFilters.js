import { useState, useCallback } from 'react'
import propertyService from '../services/propertyService'

export const usePropertyFilters = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filtered, setFiltered] = useState(false)

    const fetchProperties = useCallback(async (filters = {}) => {
        setLoading(true)
        setError(null)

        try {
            // Validate filters
            const validationErrors = propertyService.validateFilters(filters)
            if (validationErrors.length > 0) {
                setError(validationErrors.join(', '))
                setLoading(false)
                return
            }

            const data = await propertyService.getProperties(filters)
            setProperties(data)
            setFiltered(Object.keys(filters).length > 0)
        } catch (err) {
            console.error('Error fetching properties:', err)
            setError('Failed to fetch properties. Please try again.')
            setProperties([])
        } finally {
            setLoading(false)
        }
    }, [])

    const resetFilters = useCallback(() => {
        fetchProperties()
    }, [fetchProperties])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        properties,
        loading,
        error,
        filtered,
        fetchProperties,
        resetFilters,
        clearError
    }
}

export default usePropertyFilters
