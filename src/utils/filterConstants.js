// Filter constants matching the Telegram bot implementation

export const PROPERTY_TYPES = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Condominium', label: 'Condominium' },
    { value: 'Building', label: 'Building' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Villa', label: 'Villa' }
]

export const CONDO_SCHEMES = [
    { value: '20/80', label: '20/80' },
    { value: '40/60', label: '40/60' },
    { value: '10/90', label: '10/90' }
]

export const SUPPORTED_SITES = [
    'Piassa', '4 Kilo', 'Legehar', 'Kasanchis', 'Wollo Sefer', 'Olympia',
    'Bethel', 'Bisrate Gebriel', 'Gotera', 'Bole', 'Gerji', 'Ayat',
    'Summit', 'Kality', 'Lebu', 'Jemo', 'Koye Feche', 'Bulbula', 'CMC', 'Asko'
]

export const REGIONS = ['Addis Ababa', 'Amhara', 'Oromia', 'Other']

export const PRICE_RANGES = [
    { label: 'Under 2.5M', min: 0, max: 2500000 },
    { label: '2.5M - 4M', min: 2500000, max: 4000000 },
    { label: '4M - 6M', min: 4000000, max: 6000000 },
    { label: '6M - 8M', min: 6000000, max: 8000000 },
    { label: '8M - 11M', min: 8000000, max: 11000000 },
    { label: '11M - 14M', min: 11000000, max: 14000000 },
    { label: '14M - 17M', min: 14000000, max: 17000000 },
    { label: '17M - 22M', min: 17000000, max: 22000000 },
    { label: '22M - 30M', min: 22000000, max: 30000000 },
    { label: 'Above 30M', min: 30000000, max: 9999999999 }
]

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6]

export const FURNISHING_STATUS = [
    { value: 'Unfurnished', label: 'Unfurnished' },
    { value: 'Semi-furnished', label: 'Semi-furnished' },
    { value: 'Fully-furnished', label: 'Fully-furnished' }
]

export const G_PLUS_OPTIONS = ['G+0', 'G+1', 'G+2', 'G+3', 'G+4', 'G+5+']

export const BOOLEAN_FILTER_FIELDS = [
    'filter_is_commercial',
    'filter_has_elevator',
    'filter_has_private_rooftop',
    'filter_is_two_story_penthouse',
    'filter_has_private_entrance'
]

// Property type specific filter configurations
export const PROPERTY_TYPE_FILTERS = {
    Condominium: ['condominium_scheme'],
    Building: ['filter_is_commercial', 'filter_has_elevator'],
    Penthouse: ['filter_has_private_rooftop', 'filter_is_two_story_penthouse'],
    Duplex: ['filter_has_private_entrance'],
    Villa: ['min_floor_level']
}
