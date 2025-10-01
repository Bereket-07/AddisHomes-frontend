// src/pages/Home.jsx
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LanguageContext from '../context/LanguageContext'

function Home() {
  const { t } = useContext(LanguageContext)

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10 px-4"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-700 dark:text-gold-400 mb-3">
            {t('welcome_to_addis_home')}
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-400">
            {t('choose_home')} {t('or')} {t('choose_car')}
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/properties" className="block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center shadow hover:shadow-lg transition">
          <div className="text-7xl mb-4 mx-auto">🏠</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('homes')}</div>
        </Link>
        <Link to="/cars" className="block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center shadow hover:shadow-lg transition">
          <div className="text-7xl mb-4 mx-auto">🚗</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('cars')}</div>
        </Link>
      </div>
    </div>
  );
}

export default Home