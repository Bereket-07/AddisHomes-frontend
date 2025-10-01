// Service to handle image URLs, including Telegram file ID conversion
import api from '../api'

export const imageService = {
  // Check if a string is a Telegram file ID
  isTelegramFileId: (url) => {
    if (!url || typeof url !== 'string') return false

    // Telegram file IDs typically start with specific patterns
    return (
      url.startsWith('AgACAgQAAxkBAAI') || // Common Telegram file ID pattern
      url.startsWith('BAADBAAD') || // Another common pattern
      url.startsWith('CAAQAAAD') || // Another pattern
      url.startsWith('AgACAgIAAxkBAAI') || // Another pattern
      (url.length > 50 && !url.includes('http') && !url.includes('.')) // Long string without http or dots
    )
  },

  // Convert Telegram file ID to proper image URL
  convertTelegramFileId: async (fileId) => {
    try {
      // Use the backend endpoint to convert Telegram file IDs
      const response = await api.post('/properties/convert-telegram-images', [fileId])
      return response.data.converted_urls[0] || 'https://via.placeholder.com/400x300?text=Image+Error'

    } catch (error) {
      console.error('Error converting Telegram file ID:', error)
      return 'https://via.placeholder.com/400x300?text=Image+Error'
    }
  },

  // Process an array of image URLs, converting Telegram file IDs
  processImageUrls: async (imageUrls) => {
    if (!Array.isArray(imageUrls)) return []

    const processedUrls = await Promise.all(
      imageUrls.map(async (url) => {
        if (imageService.isTelegramFileId(url)) {
          return await imageService.convertTelegramFileId(url)
        }
        return url
      })
    )

    return processedUrls
  },

  // Get a safe image URL for display (supports http(s), data:, blob:, and /uploads/*)
  getSafeImageUrl: (url, fallback = 'https://via.placeholder.com/400x300?text=No+Image') => {
    if (!url) return fallback

    // If it's a Telegram file ID, return a more informative placeholder
    if (imageService.isTelegramFileId(url)) {
      return `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Property+Image`
    }

    // If it's a valid absolute URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    // Support data URLs and blob URLs produced by file readers or object URLs
    if (url.startsWith('data:image/') || url.startsWith('blob:')) {
      return url
    }

    // If it's a relative path starting with /uploads, make it absolute
    if (url.startsWith('/uploads/')) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
      return `${baseUrl}${url}`
    }

    // If it looks like a relative path, return as is (browser will resolve)
    if (url.startsWith('/') || url.startsWith('./')) return url

    // Otherwise, return fallback
    return fallback
  },

  // Validate image URL (broad support of formats)
  isValidImageUrl: (url) => {
    if (!url) return false
    if (imageService.isTelegramFileId(url)) return true
    const lower = url.toLowerCase()
    return (
      lower.startsWith('http://') || lower.startsWith('https://') ||
      lower.startsWith('data:image/') || lower.startsWith('blob:') ||
      lower.startsWith('/uploads/') ||
      lower.endsWith('.jpg') || lower.endsWith('.jpeg') ||
      lower.endsWith('.png') || lower.endsWith('.gif') || lower.endsWith('.webp')
    )
  }
}

export default imageService
