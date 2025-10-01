import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { carService } from '../services/propertyService'
import imageService from '../services/imageService'
import { motion } from 'framer-motion'
import { Car, Calendar, Gauge, Fuel, ArrowLeft, Phone, Mail, MapPin, Wrench, Palette, Hash } from 'lucide-react'

function CarDetail() {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true)
                const data = await carService.getCarById(id)
                setCar(data || null)
                setError('')
            } catch (error) {
                console.error('Error fetching car:', error)
                setError('Failed to load car details')
            } finally {
                setLoading(false)
            }
        }
        fetchCar()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-theme-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent mx-auto mb-4"></div>
                    <p className="text-theme-secondary">Loading car details...</p>
                </div>
            </div>
        )
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-theme-primary flex items-center justify-center">
                <div className="text-center">
                    <Car size={48} className="text-theme-muted mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-theme-primary mb-2">Car Not Found</h2>
                    <p className="text-theme-secondary mb-6">{error || "The car you're looking for doesn't exist."}</p>
                    <Link
                        to="/cars"
                        className="bg-theme-accent text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 hover:scale-105"
                    >
                        Back to Cars
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-theme-primary py-8">
            <div className="container mx-auto px-4">
                {/* Back button */}
                <Link
                    to="/cars"
                    className="inline-flex items-center text-theme-accent hover:text-yellow-500 mb-6 transition-colors duration-200"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Cars
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-theme-secondary rounded-2xl shadow-2xl border border-theme overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-theme">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-theme-primary mb-2">
                                    {car.manufacturer} {car.model_name}
                                </h1>
                                <p className="text-theme-secondary text-lg">
                                    {car.car_type} • {car.model_year ? `Model Year ${car.model_year}` : 'Year not specified'}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <p className="text-3xl font-bold text-theme-accent">
                                    {Number(car.price_etb).toLocaleString()} ETB
                                </p>
                                <p className="text-theme-secondary text-sm">
                                    {car.motor_type || 'Engine type not specified'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-theme-primary mb-4">Car Images</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(car.images) && car.images.length > 0 ? (
                                car.images.map((url, idx) => (
                                    <div key={idx} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <img
                                            src={imageService.getSafeImageUrl(url)}
                                            alt={`Car image ${idx + 1}`}
                                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full bg-theme-muted rounded-lg h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <Car size={48} className="text-theme-secondary mx-auto mb-2" />
                                        <p className="text-theme-secondary">No images available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Car Details */}
                    <div className="p-8 border-t border-theme">
                        <h2 className="text-2xl font-bold text-theme-primary mb-6">Car Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Car size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Car Type</p>
                                    <p className="text-theme-primary font-semibold">{car.car_type}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Calendar size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Model Year</p>
                                    <p className="text-theme-primary font-semibold">{car.model_year || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Gauge size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Power</p>
                                    <p className="text-theme-primary font-semibold">{car.power_hp || 'Not specified'} hp</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Fuel size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Transmission</p>
                                    <p className="text-theme-primary font-semibold">{car.transmission || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Wrench size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Engine</p>
                                    <p className="text-theme-primary font-semibold">{car.engine || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Palette size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Color</p>
                                    <p className="text-theme-primary font-semibold">{car.color || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Hash size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Plate Number</p>
                                    <p className="text-theme-primary font-semibold">{car.plate || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <MapPin size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Mileage</p>
                                    <p className="text-theme-primary font-semibold">{car.mileage_km || 'Not specified'} km</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-theme-muted rounded-lg">
                                <Fuel size={24} className="text-theme-accent mr-3" />
                                <div>
                                    <p className="text-theme-secondary text-sm">Fuel Efficiency</p>
                                    <p className="text-theme-primary font-semibold">{car.fuel_efficiency_kmpl || 'Not specified'} km/l</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-theme-primary mb-4">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-theme-muted rounded-lg">
                                    <p className="text-theme-secondary text-sm mb-1">Motor Type</p>
                                    <p className="text-theme-primary font-semibold">{car.motor_type || 'Not specified'}</p>
                                </div>
                                <div className="p-4 bg-theme-muted rounded-lg">
                                    <p className="text-theme-secondary text-sm mb-1">Fuel Type</p>
                                    <p className="text-theme-primary font-semibold">{car.fuel_type || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {car.description && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-theme-primary mb-4">Description</h3>
                                <p className="text-theme-secondary leading-relaxed">{car.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <div className="p-8 bg-theme-muted border-t border-theme">
                        <h3 className="text-2xl font-bold text-theme-primary mb-6">Interested in this car?</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center bg-theme-accent text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 hover:scale-105">
                                <Phone size={20} className="mr-2" />
                                Call {car.broker_phone || '+251984863868'}
                            </button>
                            <button className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                                <Mail size={20} className="mr-2" />
                                Send Message
                            </button>
                            <button className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105">
                                Schedule Test Drive
                            </button>
                        </div>
                        {car.broker_name && (
                            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                                <p className="text-theme-secondary text-sm">Broker: {car.broker_name}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CarDetail


