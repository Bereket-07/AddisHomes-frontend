# Advanced Property Filter System

This document describes the comprehensive property filter system that matches the Telegram bot functionality.

## Overview

The filter system provides a sophisticated property search interface with:
- Dynamic property type-specific filters
- Comprehensive location filtering
- Price range selection
- Advanced property features
- Real-time validation and error handling

## Architecture

### Components

1. **AdvancedFilterForm** (`src/components/AdvancedFilterForm.jsx`)
   - Main filter interface component
   - Dynamic field rendering based on property type
   - Collapsible advanced options
   - Real-time validation

2. **Property Service** (`src/services/propertyService.js`)
   - API communication layer
   - Filter validation and cleaning
   - Error handling

3. **Filter Hook** (`src/hooks/usePropertyFilters.js`)
   - State management for properties
   - Loading and error states
   - Filter operations

4. **Filter Constants** (`src/utils/filterConstants.js`)
   - Centralized filter options
   - Property type configurations
   - Reusable constants

### Backend Integration

The system integrates with the backend API endpoint:
```
GET /properties?{filter_parameters}
```

Supported filter parameters:
- `property_type`: PropertyType enum
- `location_region`: String
- `location_site`: String
- `min_price`/`max_price`: Float
- `min_bedrooms`: Integer
- `condominium_scheme`: CondoScheme enum
- `furnishing_status`: String
- `min_floor_level`: Integer
- `filter_is_commercial`: Boolean
- `filter_has_elevator`: Boolean
- `filter_has_private_rooftop`: Boolean
- `filter_is_two_story_penthouse`: Boolean
- `filter_has_private_entrance`: Boolean

## Property Type Specific Filters

### Apartment
- Basic filters: location, price, bedrooms
- No specific additional filters

### Condominium
- **Condo Scheme**: 20/80, 40/60, 10/90
- All basic filters

### Building
- **Commercial**: Yes/No
- **Has Elevator**: Yes/No
- All basic filters

### Penthouse
- **Private Rooftop**: Yes/No
- **Two Story**: Yes/No
- All basic filters

### Duplex
- **Private Entrance**: Yes/No
- All basic filters

### Villa
- **Structure (G+)**: G+0, G+1, G+2, G+3, G+4, G+5+
- All basic filters

## Filter Options

### Location Filters
- **Regions**: Addis Ababa, Amhara, Oromia, Other
- **Sites**: 20+ locations including Piassa, Bole, Gerji, etc.
- **Custom Site**: Text input for specific areas

### Price Ranges
- Under 2.5M
- 2.5M - 4M
- 4M - 6M
- 6M - 8M
- 8M - 11M
- 11M - 14M
- 14M - 17M
- 17M - 22M
- 22M - 30M
- Above 30M

### Bedroom Options
- 1, 2, 3, 4, 5, 6+ bedrooms

### Advanced Filters
- **Furnishing Status**: Furnished, Semi-Furnished, Unfurnished
- **Min Floor Level**: Ground, 1-10+, 10+ floors

## Usage

### Basic Usage
```jsx
import AdvancedFilterForm from '../components/AdvancedFilterForm'

function PropertySearch() {
  const handleFilter = (filters) => {
    // Process filters
    console.log('Applied filters:', filters)
  }

  const handleReset = () => {
    // Reset filters
  }

  return (
    <AdvancedFilterForm 
      onFilter={handleFilter} 
      onReset={handleReset} 
    />
  )
}
```

### With Custom Hook
```jsx
import usePropertyFilters from '../hooks/usePropertyFilters'

function PropertySearch() {
  const { 
    properties, 
    loading, 
    error, 
    fetchProperties, 
    resetFilters 
  } = usePropertyFilters()

  return (
    <div>
      <AdvancedFilterForm 
        onFilter={fetchProperties} 
        onReset={resetFilters} 
      />
      {/* Display properties */}
    </div>
  )
}
```

## Validation

The system includes comprehensive validation:
- Price range validation (min ≤ max)
- Bedroom count validation
- Required field validation
- Type-specific filter validation

## Error Handling

- Network error handling
- Validation error display
- Loading states
- Empty state messages

## Testing

Use the test utilities in `src/utils/filterTest.js`:
```javascript
import { testFilterScenarios, validateFilterData } from '../utils/filterTest'

// Validate filter data integrity
const validation = validateFilterData()
console.log('Filter data valid:', validation.isValid)

// Test specific filter scenarios
testFilterScenarios.forEach(scenario => {
  console.log(`Testing: ${scenario.name}`)
  // Apply scenario.filters and verify results
})
```

## Future Enhancements

1. **Saved Searches**: Allow users to save and reuse filter combinations
2. **Filter Presets**: Quick filter buttons for common searches
3. **Advanced Search**: Full-text search with filters
4. **Filter Analytics**: Track popular filter combinations
5. **Mobile Optimization**: Touch-friendly filter interface

## Migration from Old System

The new filter system is a complete replacement for the old `FilterForm.jsx`:
- More comprehensive filtering options
- Better user experience
- Improved performance
- Better error handling
- Mobile responsive design

To migrate:
1. Replace `FilterForm` import with `AdvancedFilterForm`
2. Update filter handling logic to use new service
3. Test all filter combinations
4. Remove old `FilterForm.jsx` file
