import { useState, useEffect, useContext } from 'react'
import { FilterIcon, RotateCcwIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import LanguageContext from '../context/LanguageContext'
import {
    PROPERTY_TYPES,
    CONDO_SCHEMES,
    SUPPORTED_SITES,
    REGIONS,
    PRICE_RANGES,
    BEDROOM_OPTIONS,
    FURNISHING_STATUS,
    G_PLUS_OPTIONS,
    BOOLEAN_FILTER_FIELDS,
    PROPERTY_TYPE_FILTERS
} from '../utils/filterConstants'

function AdvancedFilterForm({ onFilter, onReset }) {
    const { t } = useContext(LanguageContext)
    const [filters, setFilters] = useState({
        property_type: '',
        location_region: '',
        location_site: '',
        min_price: '',
        max_price: '',
        min_bedrooms: '',
        condominium_scheme: '',
        furnishing_status: '',
        min_floor_level: '',
        filter_is_commercial: '',
        filter_has_elevator: '',
        filter_has_private_rooftop: '',
        filter_is_two_story_penthouse: '',
        filter_has_private_entrance: '',
        custom_site: ''
    })

    const [showAdvanced, setShowAdvanced] = useState(false)
    const [showCustomSite, setShowCustomSite] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters({ ...filters, [name]: value })

        // Handle special cases
        if (name === 'location_site' && value === 'Other') {
            setShowCustomSite(true)
        } else if (name === 'location_site' && value !== 'Other') {
            setShowCustomSite(false)
            setFilters(prev => ({ ...prev, custom_site: '' }))
        }
    }

    const handlePriceRangeChange = (e) => {
        const selectedRange = PRICE_RANGES.find(range => range.label === e.target.value)
        if (selectedRange) {
            setFilters({
                ...filters,
                min_price: selectedRange.min,
                max_price: selectedRange.max
            })
        } else {
            setFilters({
                ...filters,
                min_price: '',
                max_price: ''
            })
        }
    }

    const getCurrentPriceRange = () => {
        if (!filters.min_price || !filters.max_price) return ''
        const range = PRICE_RANGES.find(r => r.min === parseInt(filters.min_price) && r.max === parseInt(filters.max_price))
        return range ? range.label : ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Clean up filters - remove empty values
        const cleanFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        )

        // Use custom_site if provided, otherwise use location_site
        if (cleanFilters.custom_site) {
            cleanFilters.location_site = cleanFilters.custom_site
            delete cleanFilters.custom_site
        }

        onFilter(cleanFilters)
    }

    const handleReset = () => {
        setFilters({
            property_type: '',
            location_region: '',
            location_site: '',
            min_price: '',
            max_price: '',
            min_bedrooms: '',
            condominium_scheme: '',
            furnishing_status: '',
            min_floor_level: '',
            filter_is_commercial: '',
            filter_has_elevator: '',
            filter_has_private_rooftop: '',
            filter_is_two_story_penthouse: '',
            filter_has_private_entrance: '',
            custom_site: ''
        })
        setShowCustomSite(false)
        onReset()
    }

    // Show property-specific filters based on selected property type
    const showPropertySpecificFilters = () => {
        const propType = filters.property_type
        return propType && ['Condominium', 'Building', 'Penthouse', 'Duplex', 'Villa'].includes(propType)
    }

    // Get available filters for the selected property type
    const getAvailableFilters = () => {
        const propType = filters.property_type
        return PROPERTY_TYPE_FILTERS[propType] || []
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-theme-secondary p-6 rounded-2xl shadow-lg border border-theme mb-8 transition-colors duration-300"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center text-theme-primary">
                    <FilterIcon size={22} className="mr-2 text-blue-500" /> {t('filters')}
                </h3>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center text-sm font-medium px-4 py-2 rounded-full border border-theme text-theme-secondary hover:text-theme-primary hover:bg-theme-muted transition-colors duration-200"
                    >
                        {showAdvanced ? <ChevronUpIcon size={16} className="mr-2" /> : <ChevronDownIcon size={16} className="mr-2" />}
                        {showAdvanced ? t('less_options') : t('more_options')}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center text-sm font-medium px-4 py-2 rounded-full border border-theme text-theme-secondary hover:text-theme-primary hover:bg-theme-muted transition-colors duration-200"
                    >
                        <RotateCcwIcon size={16} className="mr-2" /> {t('reset_filters')}
                    </button>
                </div>
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm text-theme-secondary mb-1">{t('property_type')} *</label>
                    <select
                        name="property_type"
                        value={filters.property_type}
                        onChange={handleChange}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                    >
                        <option value="">{t('select_property_type')}</option>
                        {PROPERTY_TYPES.map(type => (
                            <option key={type.value} value={type.value}>{t(type.value.toLowerCase())}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-theme-secondary mb-1">{t('region')}</label>
                    <select
                        name="location_region"
                        value={filters.location_region}
                        onChange={handleChange}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                        <option value="">{t('any_region')}</option>
                        {REGIONS.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-theme-secondary mb-1">{t('site_area')}</label>
                    <select
                        name="location_site"
                        value={filters.location_site}
                        onChange={handleChange}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                        <option value="">{t('any_site')}</option>
                        {SUPPORTED_SITES.map(site => (
                            <option key={site} value={site}>{site}</option>
                        ))}
                        <option value="Other">{t('other_specify')}</option>
                    </select>
                </div>

                {showCustomSite && (
                    <div className="flex flex-col">
                        <label className="text-sm text-theme-secondary mb-1">{t('custom_site')}</label>
                        <input
                            type="text"
                            name="custom_site"
                            value={filters.custom_site}
                            onChange={handleChange}
                            placeholder={t('enter_specific_area')}
                            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                )}

                <div className="flex flex-col">
                    <label className="text-sm text-theme-secondary mb-1">{t('price_range')}</label>
                    <select
                        value={getCurrentPriceRange()}
                        onChange={handlePriceRangeChange}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                        <option value="">{t('any_price')}</option>
                        {PRICE_RANGES.map(range => (
                            <option key={range.label} value={range.label}>{range.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-theme-secondary mb-1">{t('bedrooms_count')}</label>
                    <select
                        name="min_bedrooms"
                        value={filters.min_bedrooms}
                        onChange={handleChange}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                        <option value="">{t('any')}</option>
                        {BEDROOM_OPTIONS.map(bedrooms => (
                            <option key={bedrooms} value={bedrooms}>
                                {bedrooms === 6 ? '6+' : `${bedrooms} ${t('bedrooms')}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Property-specific filters */}
            {showPropertySpecificFilters() && (
                <div className="mb-6 p-4 bg-theme-muted rounded-lg">
                    <h4 className="font-semibold text-theme-primary mb-4">{t('filters')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getAvailableFilters().includes('condominium_scheme') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('condo_scheme')}</label>
                                <select
                                    name="condominium_scheme"
                                    value={filters.condominium_scheme}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any_scheme')}</option>
                                    {CONDO_SCHEMES.map(scheme => (
                                        <option key={scheme.value} value={scheme.value}>{scheme.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('filter_is_commercial') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('commercial')}</label>
                                <select
                                    name="filter_is_commercial"
                                    value={filters.filter_is_commercial}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    <option value="true">{t('yes')}</option>
                                    <option value="false">{t('no')}</option>
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('filter_has_elevator') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('has_elevator')}</label>
                                <select
                                    name="filter_has_elevator"
                                    value={filters.filter_has_elevator}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    <option value="true">{t('yes')}</option>
                                    <option value="false">{t('no')}</option>
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('filter_has_private_rooftop') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('private_rooftop')}</label>
                                <select
                                    name="filter_has_private_rooftop"
                                    value={filters.filter_has_private_rooftop}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    <option value="true">{t('yes')}</option>
                                    <option value="false">{t('no')}</option>
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('filter_is_two_story_penthouse') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('two_story')}</label>
                                <select
                                    name="filter_is_two_story_penthouse"
                                    value={filters.filter_is_two_story_penthouse}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    <option value="true">{t('yes')}</option>
                                    <option value="false">{t('no')}</option>
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('filter_has_private_entrance') && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('private_entrance')}</label>
                                <select
                                    name="filter_has_private_entrance"
                                    value={filters.filter_has_private_entrance}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    <option value="true">{t('yes')}</option>
                                    <option value="false">{t('no')}</option>
                                </select>
                            </div>
                        )}

                        {getAvailableFilters().includes('min_floor_level') && filters.property_type === 'Villa' && (
                            <div className="flex flex-col">
                                <label className="text-sm text-theme-secondary mb-1">{t('structure_g_plus')}</label>
                                <select
                                    name="min_floor_level"
                                    value={filters.min_floor_level}
                                    onChange={handleChange}
                                    className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                >
                                    <option value="">{t('any')}</option>
                                    {G_PLUS_OPTIONS.map(option => (
                                        <option key={option} value={option.replace('G+', '').replace('+', '')}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="mb-6 p-4 bg-theme-muted rounded-lg">
                    <h4 className="font-semibold text-theme-primary mb-4">{t('advanced_filters')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm text-theme-secondary mb-1">{t('furnishing_status')}</label>
                            <select
                                name="furnishing_status"
                                value={filters.furnishing_status}
                                onChange={handleChange}
                                className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="">{t('any')}</option>
                                {FURNISHING_STATUS.map(status => (
                                    <option key={status.value} value={status.value}>{status.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-theme-secondary mb-1">{t('min_floor_level')}</label>
                            <select
                                name="min_floor_level"
                                value={filters.min_floor_level}
                                onChange={handleChange}
                                className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="">{t('any')}</option>
                                <option value="0">{t('ground_floor')}</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                                    <option key={level} value={level}>{t('floor_n').replace('{n}', level)}</option>
                                ))}
                                <option value="10">{t('ten_plus_floors')}</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    {t('apply_filters')}
                </button>
            </div>
        </form>
    )
}

export default AdvancedFilterForm
