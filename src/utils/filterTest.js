// Test utility for filter functionality
import { PROPERTY_TYPES, PRICE_RANGES, SUPPORTED_SITES, REGIONS } from './filterConstants'

export const testFilterScenarios = [
    {
        name: 'Basic Apartment Filter',
        filters: {
            property_type: 'Apartment',
            location_site: 'Bole',
            min_bedrooms: '2'
        },
        expected: 'Should find apartments in Bole with 2+ bedrooms'
    },
    {
        name: 'Condominium with Scheme',
        filters: {
            property_type: 'Condominium',
            condominium_scheme: '20/80',
            location_site: 'Gerji'
        },
        expected: 'Should find condominiums with scheme 20/80 in Gerji'
    },
    {
        name: 'Building Commercial Filter',
        filters: {
            property_type: 'Building',
            filter_is_commercial: 'true',
            filter_has_elevator: 'true'
        },
        expected: 'Should find commercial buildings with elevators'
    },
    {
        name: 'Penthouse with Rooftop',
        filters: {
            property_type: 'Penthouse',
            filter_has_private_rooftop: 'true',
            filter_is_two_story_penthouse: 'false'
        },
        expected: 'Should find single-story penthouses with private rooftops'
    },
    {
        name: 'Duplex with Private Entrance',
        filters: {
            property_type: 'Duplex',
            filter_has_private_entrance: 'true'
        },
        expected: 'Should find duplexes with private entrances'
    },
    {
        name: 'Villa with Structure',
        filters: {
            property_type: 'Villa',
            min_floor_level: '2',
            location_region: 'Addis Ababa'
        },
        expected: 'Should find villas with G+2 structure in Addis Ababa'
    },
    {
        name: 'Price Range Filter',
        filters: {
            property_type: 'Apartment',
            min_price: '4000000',
            max_price: '8000000'
        },
        expected: 'Should find apartments between 4M and 8M ETB'
    },
    {
        name: 'Complex Multi-Filter',
        filters: {
            property_type: 'Condominium',
            location_site: 'Bole',
            condominium_scheme: '40/60',
            min_bedrooms: '3',
            min_price: '6000000',
            max_price: '12000000'
        },
        expected: 'Should find 3+ bedroom condominiums with scheme 40/60 in Bole, 6M-12M ETB'
    }
]

export const validateFilterData = () => {
    const errors = []

    // Check if all property types are defined
    if (PROPERTY_TYPES.length === 0) {
        errors.push('No property types defined')
    }

    // Check if all price ranges have valid min/max values
    PRICE_RANGES.forEach((range, index) => {
        if (range.min >= range.max) {
            errors.push(`Price range ${index} has invalid min/max values: ${range.label}`)
        }
    })

    // Check if all sites are non-empty strings
    SUPPORTED_SITES.forEach((site, index) => {
        if (!site || typeof site !== 'string') {
            errors.push(`Site ${index} is invalid: ${site}`)
        }
    })

    // Check if all regions are non-empty strings
    REGIONS.forEach((region, index) => {
        if (!region || typeof region !== 'string') {
            errors.push(`Region ${index} is invalid: ${region}`)
        }
    })

    return {
        isValid: errors.length === 0,
        errors
    }
}

export const testFilterCombinations = () => {
    const results = []

    // Test all property types with their specific filters
    PROPERTY_TYPES.forEach(propType => {
        const testResult = {
            propertyType: propType.value,
            hasSpecificFilters: false,
            availableSites: SUPPORTED_SITES.length,
            availableRegions: REGIONS.length,
            availablePriceRanges: PRICE_RANGES.length
        }

        // Check if this property type has specific filters
        switch (propType.value) {
            case 'CONDOMINIUM':
                testResult.hasSpecificFilters = true
                testResult.specificFilters = ['condominium_scheme']
                break
            case 'BUILDING':
                testResult.hasSpecificFilters = true
                testResult.specificFilters = ['filter_is_commercial', 'filter_has_elevator']
                break
            case 'PENTHOUSE':
                testResult.hasSpecificFilters = true
                testResult.specificFilters = ['filter_has_private_rooftop', 'filter_is_two_story_penthouse']
                break
            case 'DUPLEX':
                testResult.hasSpecificFilters = true
                testResult.specificFilters = ['filter_has_private_entrance']
                break
            case 'VILLA':
                testResult.hasSpecificFilters = true
                testResult.specificFilters = ['min_floor_level']
                break
        }

        results.push(testResult)
    })

    return results
}

export default {
    testFilterScenarios,
    validateFilterData,
    testFilterCombinations
}
