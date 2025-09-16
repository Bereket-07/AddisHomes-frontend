// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-gray-900 dark:to-gray-800 text-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Real Estate Ethiopia. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

