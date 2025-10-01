import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { carService } from '../services/propertyService'
import CarCard from '../components/CarCard'
import { GridIcon, TableIcon, AlertCircleIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import LanguageContext from '../context/LanguageContext'
import imageService from '../services/imageService'

function Cars() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState('card')
    const [filters, setFilters] = useState({ car_type: '', min_price: '', max_price: '' })
    const { t } = useContext(LanguageContext)

    const fetchCars = async (f = filters) => {
        setLoading(true)
        try {
            const data = await carService.getCars(f)
            setCars(data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchCars() }, [])

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const applyFilters = (e) => {
        e.preventDefault()
        fetchCars(filters)
    }

    const resetFilters = () => {
        const empty = { car_type: '', min_price: '', max_price: '' }
        setFilters(empty)
        fetchCars(empty)
    }

    const exportToExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Cars')
        XLSX.writeFile(wb, 'cars.xlsx')
    }

    return (
        <div className="w-full">
            <div className="text-center mb-6 md:mb-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-indigo-700 dark:text-gold-400 mb-2">
                        {t('discover_premium_cars') || 'Discover Premium Cars'}
                    </h1>
                </div>
            </div>

            <form onSubmit={applyFilters} className="bg-theme-secondary p-4 rounded-xl border border-theme mb-6 mx-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select name="car_type" onChange={handleChange} value={filters.car_type}
                        className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2">
                        <option value="">All Types</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Van/Minivan">Van/Minivan</option>
                        <option value="Pickup Truck">Pickup Truck</option>
                        <option value="Electric/Hybrid">Electric/Hybrid</option>
                        <option value="Luxury/Premium">Luxury/Premium</option>
                    </select>
                    <select name="price_range" onChange={(e) => {
                        const [min, max] = e.target.value.split('-')
                        setFilters({ ...filters, min_price: min || '', max_price: max || '' })
                    }} className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2">
                        <option value="">Any Price</option>
                        <option value="0-1000000">Under 1M</option>
                        <option value="1000000-1500000">1M – 1.5M</option>
                        <option value="1500000-2000000">1.5M – 2M</option>
                        <option value="2000000-">2M+</option>
                    </select>
                    <button type="submit" className="bg-indigo-600 text-white rounded-lg px-4">Apply</button>
                    <button type="button" onClick={resetFilters} className="border border-theme rounded-lg px-4">Reset</button>
                </div>
            </form>

            {/* Desktop View toggle */}
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

            {/* Mobile View toggle */}
            <div className="fixed top-20 right-4 z-40 md:hidden">
                <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
                    <button
                        onClick={() => setView('card')}
                        className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${view === 'card'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <GridIcon size={16} className="mr-1.5" />
                        <span className="font-medium">{t('cards')}</span>
                    </button>
                    <button
                        onClick={() => setView('table')}
                        className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${view === 'table'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <TableIcon size={16} className="mr-1.5" />
                        <span className="font-medium">{t('table')}</span>
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading_cars') || 'Loading cars...'}</p>
                </div>
            )}

            {/* Cars */}
            {!loading && (
                <>
                    {view === 'card' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
                            {cars.map(car => <CarCard key={car.cid} car={car} />)}
                        </div>
                    ) : (
                        <div className="px-2 md:px-4 overflow-x-auto">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Car</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Year</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {cars.map((car) => (
                                                <tr key={car.cid} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="h-12 w-12 flex-shrink-0">
                                                            {car.images && car.images[0] ? (
                                                                <img className="h-12 w-12 rounded-lg object-cover" src={imageService.getSafeImageUrl(car.images[0])} alt={car.model_name} />
                                                            ) : (
                                                                <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                                                    <span className="text-xs text-gray-500">No image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {car.manufacturer} {car.model_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{car.motor_type || car.engine}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {car.car_type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                        ETB {Number(car.price_etb).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {car.model_year || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link to={`/cars/${car.cid}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing {cars.length} cars
                                    </span>
                                    <button
                                        onClick={() => exportToExcel(cars)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                    >
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {cars.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                {t('no_cars_available') || 'No cars available'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {t('check_back_later') || 'Check back later for new listings'}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Cars


