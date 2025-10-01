import { useState, useContext, useEffect } from 'react'
import { carService } from '../services/propertyService'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'
import LanguageContext from '../context/LanguageContext'
import AuthContext from '../context/AuthContext'

function SubmitCar() {
    const navigate = useNavigate()
    const { darkMode } = useContext(ThemeContext)
    const { t } = useContext(LanguageContext)
    const { user, loading: authLoading } = useContext(AuthContext)

    const [form, setForm] = useState({
        car_type: 'Sedan',
        price_etb: '',
        manufacturer: '',
        model_name: '',
        model_year: '',
        color: '',
        plate: '',
        engine: '',
        power_hp: '',
        transmission: '',
        fuel_efficiency_kmpl: '',
        motor_type: '',
        mileage_km: '',
        description: ''
    })

    const [custom, setCustom] = useState({
        car_type_other: '',
        manufacturer_other: '',
        transmission_other: '',
        motor_type_other: '',
        color_other: ''
    })

    const [images, setImages] = useState([])
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!authLoading && (!user || !user.roles?.includes('broker'))) {
            alert(t('broker_only') || 'You need to be logged in as a broker to submit cars. Please login first.')
            navigate('/login')
        }
    }, [user, authLoading, navigate])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCustomChange = (e) => {
        setCustom({ ...custom, [e.target.name]: e.target.value })
    }

    const effectiveValue = (value, other) => (value === 'Other' ? (other || '') : value)

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length < 3) {
            alert(t('upload_at_least_three') || 'Please upload at least 3 images')
            return
        }
        setImages(files)
    }

    const uploadImages = async () => {
        if (images.length === 0) return []
        setUploading(true)
        const uploaded = []
        const uploadForm = new FormData()
        images.forEach((file) => uploadForm.append('images', file))
        try {
            const res = await api.post('/cars/upload-images', uploadForm, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            uploaded.push(...(res.data?.urls || []))
        } catch (err) {
            console.error('Image upload error:', err)
            alert(`Image upload failed: ${err.response?.data?.detail || err.message}`)
            throw err
        } finally {
            setUploading(false)
        }
        return uploaded
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!form.price_etb || !form.model_name || !form.manufacturer) {
            alert(t('fill_required_fields') || 'Please fill in all required fields')
            return
        }
        if (images.length < 3) {
            alert(t('upload_at_least_three') || 'Please upload at least 3 images')
            return
        }

        setSubmitting(true)
        try {
            const uploadedUrls = await uploadImages()

            const submitPayload = {
                car_type: effectiveValue(form.car_type, custom.car_type_other),
                manufacturer: effectiveValue(form.manufacturer, custom.manufacturer_other),
                model_name: form.model_name,
                model_year: form.model_year ? Number(form.model_year) : undefined,
                color: effectiveValue(form.color, custom.color_other) || undefined,
                plate: form.plate || undefined,
                engine: form.engine || undefined,
                power_hp: form.power_hp ? Number(form.power_hp) : undefined,
                transmission: effectiveValue(form.transmission, custom.transmission_other) || undefined,
                fuel_efficiency_kmpl: form.fuel_efficiency_kmpl ? Number(form.fuel_efficiency_kmpl) : undefined,
                motor_type: effectiveValue(form.motor_type, custom.motor_type_other) || undefined,
                mileage_km: form.mileage_km ? Number(form.mileage_km) : undefined,
                price_etb: Number(form.price_etb),
                description: form.description || undefined,
                images: uploadedUrls,
            }

            const car = await carService.submitCar(submitPayload)
            alert(t('submit_car_success') || 'Car submitted successfully!')
            navigate(`/cars/${car.cid}`)
        } catch (err) {
            console.error('Car submission error:', err)
            alert(`Submission failed: ${err.response?.data?.detail || err.message}`)
        } finally {
            setSubmitting(false)
        }
    }

    if (authLoading) {
        return (
            <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('loading') || 'Loading...'}</p>
                </div>
            </div>
        )
    }

    if (!user || !user.roles?.includes('broker')) {
        return (
            <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {t('access_denied') || 'Access Denied'}
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                        {t('broker_only') || 'You need to be logged in as a broker to submit cars.'}
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t('login')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="max-w-4xl mx-auto p-6">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
                    <div className="p-8">
                        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gold-400' : 'text-blue-900'}`}>
                            {t('submit_car') || 'Submit Car'}
                        </h2>

                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('car_type')} *
                                    </label>
                                    <select
                                        name="car_type"
                                        value={form.car_type}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                        required
                                    >
                                        <option value="Sedan">Sedan</option>
                                        <option value="Automobile">Automobile</option>
                                        <option value="Van/Minivan">Van/Minivan</option>
                                        <option value="Pickup Truck">Pickup Truck</option>
                                        <option value="Electric/Hybrid">Electric/Hybrid</option>
                                        <option value="Luxury/Premium">Luxury/Premium</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.car_type === 'Other' && (
                                        <input
                                            name="car_type_other"
                                            value={custom.car_type_other}
                                            onChange={handleCustomChange}
                                            placeholder={t('enter_custom') || 'Enter custom'}
                                            className={`mt-2 w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                                ? 'border-gray-600 bg-gray-700 text-gray-100'
                                                : 'border-gray-300 bg-gray-50 text-gray-900'
                                                }`}
                                            required
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('price_range') || 'Price (ETB)'} *
                                    </label>
                                    <input
                                        name="price_etb"
                                        type="number"
                                        min="1"
                                        value={form.price_etb}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('manufacturer')} *
                                    </label>
                                    <select
                                        name="manufacturer"
                                        value={form.manufacturer}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                        required
                                    >
                                        <option value="">{t('select') || 'Select'}</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Kia">Kia</option>
                                        <option value="Volkswagen">Volkswagen</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.manufacturer === 'Other' && (
                                        <input
                                            name="manufacturer_other"
                                            value={custom.manufacturer_other}
                                            onChange={handleCustomChange}
                                            placeholder={t('enter_custom') || 'Enter custom'}
                                            className={`mt-2 w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                                ? 'border-gray-600 bg-gray-700 text-gray-100'
                                                : 'border-gray-300 bg-gray-50 text-gray-900'
                                                }`}
                                            required
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('model_name') || 'Model name'} *
                                    </label>
                                    <input
                                        name="model_name"
                                        value={form.model_name}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('model_year') || 'Model year'}
                                    </label>
                                    <input
                                        name="model_year"
                                        type="number"
                                        min="1900"
                                        value={form.model_year}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('color') || 'Color'}
                                    </label>
                                    <select
                                        name="color"
                                        value={form.color}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    >
                                        <option value="">{t('select') || 'Select'}</option>
                                        <option value="Black">Black</option>
                                        <option value="White">White</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Red">Red</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.color === 'Other' && (
                                        <input
                                            name="color_other"
                                            value={custom.color_other}
                                            onChange={handleCustomChange}
                                            placeholder={t('enter_custom') || 'Enter custom'}
                                            className={`mt-2 w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                                ? 'border-gray-600 bg-gray-700 text-gray-100'
                                                : 'border-gray-300 bg-gray-50 text-gray-900'
                                                }`}
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('plate') || 'Plate'}
                                    </label>
                                    <input
                                        name="plate"
                                        value={form.plate}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('engine') || 'Engine'}
                                    </label>
                                    <input
                                        name="engine"
                                        value={form.engine}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('power_hp') || 'Power (hp)'}
                                    </label>
                                    <input
                                        name="power_hp"
                                        type="number"
                                        min="0"
                                        value={form.power_hp}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('transmission') || 'Transmission'}
                                    </label>
                                    <select
                                        name="transmission"
                                        value={form.transmission}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    >
                                        <option value="">{t('select') || 'Select'}</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.transmission === 'Other' && (
                                        <input
                                            name="transmission_other"
                                            value={custom.transmission_other}
                                            onChange={handleCustomChange}
                                            placeholder={t('enter_custom') || 'Enter custom'}
                                            className={`mt-2 w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                                ? 'border-gray-600 bg-gray-700 text-gray-100'
                                                : 'border-gray-300 bg-gray-50 text-gray-900'
                                                }`}
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('fuel_efficiency') || 'Fuel efficiency (km/l)'}
                                    </label>
                                    <input
                                        name="fuel_efficiency_kmpl"
                                        type="number"
                                        min="0"
                                        value={form.fuel_efficiency_kmpl}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('motor_type') || 'Motor type'}
                                    </label>
                                    <select
                                        name="motor_type"
                                        value={form.motor_type}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    >
                                        <option value="">{t('select') || 'Select'}</option>
                                        <option value="ICE">ICE</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.motor_type === 'Other' && (
                                        <input
                                            name="motor_type_other"
                                            value={custom.motor_type_other}
                                            onChange={handleCustomChange}
                                            placeholder={t('enter_custom') || 'Enter custom'}
                                            className={`mt-2 w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                                ? 'border-gray-600 bg-gray-700 text-gray-100'
                                                : 'border-gray-300 bg-gray-50 text-gray-900'
                                                }`}
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {t('mileage_km') || 'Mileage (km)'}
                                    </label>
                                    <input
                                        name="mileage_km"
                                        type="number"
                                        min="0"
                                        value={form.mileage_km}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                                            : 'border-gray-300 bg-gray-50 text-gray-900'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                    {t('description') || 'Description'} *
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                        ? 'border-gray-600 bg-gray-700 text-gray-100'
                                        : 'border-gray-300 bg-gray-50 text-gray-900'
                                        }`}
                                    rows="4"
                                    placeholder={t('describe_car') || 'Describe the car, its condition and features...'}
                                    required
                                />
                            </div>

                            {/* Images */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                    {t('upload_images_min3') || 'Upload Images (at least 3) *'}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`w-full text-sm rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${darkMode
                                        ? 'border-gray-600 bg-gray-700 text-gray-100'
                                        : 'border-gray-300 bg-gray-50 text-gray-900'
                                        }`}
                                    required
                                />
                                {images.length > 0 && (
                                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {images.length} {t('images_selected') || 'images selected'}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={uploading || submitting || images.length < 3}
                                    className={`w-full font-semibold py-4 rounded-lg shadow-lg transition-all duration-300 ${uploading || submitting || images.length < 3
                                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
                                        }`}
                                >
                                    {uploading || submitting ? (t('uploading') || 'Uploading...') : (t('submit_car') || 'Submit Car')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitCar


