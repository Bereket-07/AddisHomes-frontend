// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Properties from './pages/Properties'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyDetail from './pages/PropertyDetail'
import CarDetail from './pages/CarDetail'
import SubmitProperty from './pages/SubmitProperty'
import SubmitCar from './pages/SubmitCar'
import MyListings from './pages/MyListings'
import AdminPanel from './pages/AdminPanel'
import AdminUsers from './pages/AdminUsers'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            {/* Removed bg-white, text-gray-900, dark:bg-gray-900, dark:text-gray-100 */}
            {/* min-h-screen is kept for layout, flex-col is often needed for sticky footer layouts */}
            <div className="min-h-screen flex flex-col">
              <Header />
              {/* Main content with proper container margins */}
              <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/cars" element={<Cars />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetail />} />
                  <Route path="/cars/:id" element={<CarDetail />} />
                  <Route path="/submit" element={
                    <PrivateRoute roles={['broker']}>
                      <SubmitProperty />
                    </PrivateRoute>
                  } />
                  <Route path="/submit-car" element={
                    <PrivateRoute roles={['broker']}>
                      <SubmitCar />
                    </PrivateRoute>
                  } />
                  <Route path="/my-listings" element={
                    <PrivateRoute roles={['broker']}>
                      <MyListings />
                    </PrivateRoute>
                  } />
                  <Route path="/admin" element={
                    <PrivateRoute roles={['admin']}>
                      <AdminPanel />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/users" element={
                    <PrivateRoute roles={['admin']}>
                      <AdminUsers />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute roles={['admin', 'broker', 'buyer']}>
                      <Profile />
                    </PrivateRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App