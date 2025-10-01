import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Calendar, Gauge, Fuel } from 'lucide-react'
import { useContext } from 'react'
import imageService from '../services/imageService'
import LanguageContext from '../context/LanguageContext'

function CarCard({ car }) {
    const { t } = useContext(LanguageContext)

    // Helper function to translate car type
    const translateCarType = (type) => {
        const typeMap = {
            'Sedan': t('sedan') || 'Sedan',
            'Automobile': t('automobile') || 'Automobile',
            'Van/Minivan': t('van_minivan') || 'Van/Minivan',
            'Pickup Truck': t('pickup_truck') || 'Pickup Truck',
            'Electric/Hybrid': t('electric_hybrid') || 'Electric/Hybrid',
            'Luxury/Premium': t('luxury_premium') || 'Luxury/Premium'
        }
        return typeMap[type] || type
    }

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 group"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="relative overflow-hidden">
                <div className="w-full h-52 md:h-64 bg-gray-100 dark:bg-gray-700">
                    {car.images && car.images[0] ? (
                        <img
                            src={imageService.getSafeImageUrl(car.images[0])}
                            alt={car.model_name || 'Car'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Car size={48} />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    {translateCarType(car.car_type)}
                </div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                            {car.manufacturer} {car.model_name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <div className="mb-4">
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {car.manufacturer} {car.model_name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            {Number(car.price_etb).toLocaleString()} ETB
                        </p>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('year') || 'Year'}</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                                {car.model_year || '-'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg mr-3">
                            <Car size={16} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('type') || 'Type'}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{car.car_type}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                            <Gauge size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('power') || 'Power'}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{car.power_hp || '-'} hp</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                            <Fuel size={16} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('transmission') || 'Transmission'}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{car.transmission || '-'}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                            <Calendar size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('mileage') || 'Mileage'}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{car.mileage_km || '-'} km</p>
                        </div>
                    </div>
                </div>

                <Link
                    to={`/cars/${car.cid}`}
                    className="block w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group/btn"
                >
                    <span className="relative z-10 text-white">{t('view_details') || 'View Details'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Link>
            </div>
        </motion.div>
    )
}

export default CarCard


