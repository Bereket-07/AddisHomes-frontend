import { useState, useContext, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import AdvancedFilterForm from '../components/AdvancedFilterForm'
import { GridIcon, TableIcon, AlertCircleIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import ThemeContext from '../context/ThemeContext'
import LanguageContext from '../context/LanguageContext'
import usePropertyFilters from '../hooks/usePropertyFilters'

function Properties() {
    const [view, setView] = useState('card')
    const { t } = useContext(LanguageContext)
    const { properties, loading, error, filtered, fetchProperties, resetFilters, clearError } = usePropertyFilters()

    const exportToExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Properties')
        XLSX.writeFile(wb, 'properties.xlsx')
    }

    useEffect(() => {
        fetchProperties()
    }, [fetchProperties])

    return (
        <div className="w-full">
            <div className="text-center mb-6 md:mb-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-indigo-700 dark:text-gold-400 mb-2">
                        {t('discover_premium_properties')}
                    </h1>
                </div>
            </div>

            <div>
                <AdvancedFilterForm onFilter={fetchProperties} onReset={resetFilters} />
            </div>

            <div className="hidden md:flex justify-end mb-6 px-4">
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 shadow-lg">
                    <button
                        onClick={() => setView('card')}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${view === 'card'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <GridIcon size={16} className="mr-2" />
                        <span>{t('cards')}</span>
                    </button>
                    <button
                        onClick={() => setView('table')}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${view === 'table'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <TableIcon size={16} className="mr-2" />
                        <span>{t('table')}</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="mx-4 mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                    <AlertCircleIcon size={20} className="mr-2" />
                    <span>{error}</span>
                    <button
                        onClick={clearError}
                        className="ml-auto text-red-500 hover:text-red-700 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading_properties')}</p>
                </div>
            )}

            {!loading && (
                <>
                    {view === 'card' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
                            {properties.map(prop => <PropertyCard key={prop.pid} property={prop} />)}
                        </div>
                    ) : (
                        <div className="px-2 md:px-4 overflow-x-auto">
                            <PropertyTable data={properties} onExport={exportToExcel} />
                        </div>
                    )}

                    {properties.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                {filtered ? t('no_properties_match_filters') : t('no_properties_available')}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {filtered ? t('try_adjusting_search_criteria') : t('check_back_later')}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Properties


