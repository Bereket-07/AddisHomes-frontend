import { useState } from 'react'
import imageService from '../services/imageService'

function ImageDebugger({ property }) {
  const [showDebug, setShowDebug] = useState(false)

  if (!property?.image_urls) return null

  return (
    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
      >
        {showDebug ? 'Hide' : 'Show'} Image Debug Info
      </button>
      
      {showDebug && (
        <div className="mt-2 text-xs text-yellow-800">
          <p><strong>Total Images:</strong> {property.image_urls.length}</p>
          {property.image_urls.map((url, idx) => (
            <div key={idx} className="mt-2 p-2 bg-yellow-50 rounded">
              <p><strong>Image {idx + 1}:</strong></p>
              <p><strong>URL:</strong> {url}</p>
              <p><strong>Is Telegram File ID:</strong> {imageService.isTelegramFileId(url) ? 'Yes' : 'No'}</p>
              <p><strong>Safe URL:</strong> {imageService.getSafeImageUrl(url)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageDebugger
