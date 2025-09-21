import { useState, useEffect } from 'react'
import imageService from '../services/imageService'

function PropertyImage({ 
  src, 
  alt = 'Property image', 
  className = 'w-full h-56 object-cover',
  fallbackText = 'Property Image'
}) {
  const [imageSrc, setImageSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!src) {
      setImageSrc(imageService.getSafeImageUrl(''))
      setIsLoading(false)
      return
    }

    // Check if it's a Telegram file ID
    if (imageService.isTelegramFileId(src)) {
      // For now, show a placeholder for Telegram file IDs
      setImageSrc(`https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${fallbackText}`)
      setIsLoading(false)
      return
    }

    // For regular URLs, try to load them
    setImageSrc(imageService.getSafeImageUrl(src))
    setIsLoading(false)
  }, [src, fallbackText])

  const handleError = () => {
    setHasError(true)
    setImageSrc(`https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Image+Error`)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  )
}

export default PropertyImage
