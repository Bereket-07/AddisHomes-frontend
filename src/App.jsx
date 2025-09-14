// src/App.jsx (Updated for Dark Mode)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'  // New
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyDetail from './pages/PropertyDetail'
import SubmitProperty from './pages/SubmitProperty'
import MyListings from './pages/MyListings'
import AdminPanel from './pages/AdminPanel'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/submit" element={
                  <PrivateRoute roles={['broker']}>
                    <SubmitProperty />
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
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App