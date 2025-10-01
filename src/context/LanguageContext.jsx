// src/context/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

// Translation data
const translations = {
    en: {
        // Navigation & Header
        'home': 'Home',
        'login': 'Login',
        'signup': 'Sign Up',
        'logout': 'Logout',
        'my_listings': 'My Listings',
        'submit_property': 'Submit Property',
        'admin_panel': 'Admin Panel',
        'language': 'Language',
        'theme': 'Theme',
        'dark_mode': 'Dark Mode',
        'light_mode': 'Light Mode',

        // Home Page
        'welcome_to_addis_home': 'Welcome to Addis Home',
        'discover_premium_properties': 'Discover premium properties in Ethiopia',
        'cards': 'Cards',
        'table': 'Table',
        'loading_properties': 'Loading properties...',
        'no_properties_match_filters': 'No properties match your filters',
        'no_properties_available': 'No properties available',
        'try_adjusting_search_criteria': 'Try adjusting your search criteria',
        'check_back_later': 'Check back later for new listings',

        // Property Card translations
        'property_image': 'Property Image',
        'per_sqm': 'Per SQM',
        'bedrooms': 'Bedrooms',
        'bathrooms': 'Bathrooms',
        'size': 'Size',
        'floor': 'Floor',
        'view_details': 'View Details',
        'not_available': 'N/A',

        // Property types
        'apartment': 'Apartment',
        'condominium': 'Condominium',
        'villa': 'Villa',
        'building': 'Building',
        'penthouse': 'Penthouse',
        'duplex': 'Duplex',

        // Status
        'approved': 'Approved',
        'pending': 'Pending',
        'rejected': 'Rejected',
        'sold': 'Sold',

        // Filter Form
        'filters': 'Filters',
        'property_type': 'Property Type',
        'price_range': 'Price Range',
        'bedrooms_count': 'Bedrooms',
        'bathrooms_count': 'Bathrooms',
        'min_price': 'Min Price',
        'max_price': 'Max Price',
        'apply_filters': 'Apply Filters',
        'reset_filters': 'Reset Filters',
        'clear_filters': 'Clear Filters',
        'more_options': 'More Options',
        'less_options': 'Less Options',

        // Filters - labels/placeholders
        'region': 'Region',
        'site_area': 'Site/Area',
        'any': 'Any',
        'any_region': 'Any Region',
        'any_site': 'Any Site',
        'any_price': 'Any Price',
        'select_property_type': 'Select Property Type',
        'status': 'Status',
        'approved_status': 'Approved',
        'pending_status': 'Pending',
        'sold_status': 'Sold',
        'commercial': 'Commercial',
        'has_elevator': 'Has Elevator',
        'private_rooftop': 'Private Rooftop',
        'two_story': 'Two Story',
        'private_entrance': 'Private Entrance',
        'structure_g_plus': 'Structure (G+)',
        'advanced_filters': 'Advanced Filters',
        'furnishing_status': 'Furnishing Status',
        'min_floor_level': 'Min Floor Level',
        'ground_floor': 'Ground Floor',
        'floor_n': 'Floor {n}',
        'ten_plus_floors': '10+ Floors',
        'other_specify': 'Other (Specify)',
        'custom_site': 'Custom Site',
        'condo_scheme': 'Condo Scheme',
        'any_scheme': 'Any Scheme',
        'enter_specific_area': 'Enter specific area',
        'yes': 'Yes',
        'no': 'No',

        // Footer
        'quick_links': 'Quick Links',
        'property_types': 'Property Types',
        'contact_us': 'Contact Us',
        'privacy_policy': 'Privacy Policy',
        'terms_of_service': 'Terms of Service',
        'cookie_policy': 'Cookie Policy',
        'all_rights_reserved': 'All rights reserved.',
        'company_tagline': 'Your trusted partner in finding the perfect property in Ethiopia. We connect you with premium real estate opportunities.',

        // Common
        'search': 'Search term',
        'cars': 'Cars',
        'submit_car': 'Submit Car',
        'choose_category': 'What are you looking for?',
        'choose_home': 'Home',
        'choose_car': 'Car',
        'submit': 'Submit',
        'cancel': 'Cancel',
        'save': 'Save',
        'edit': 'Edit',
        'delete': 'Delete',
        'close': 'Close',
        'back': 'Back',
        'next': 'Next',
        'previous': 'Previous',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success',
        'warning': 'Warning',
        'info': 'Information'
        ,
        // Users/Admin
        'users': 'Users',
        'manage_users': 'Manage Users',
        'profile': 'Profile',
        'save_changes': 'Save Changes',
        'change_password': 'Change Password',
        'current_password': 'Current Password',
        'new_password': 'New Password',
        'confirm_password': 'Confirm Password',
        'update_success': 'Updated successfully',
        'update_failed': 'Update failed',
        'role': 'Role',
        'status': 'Status',
        'active': 'Active',
        'inactive': 'Inactive',
        'set_admin': 'Set Admin',
        'remove_admin': 'Remove Admin',
        'deactivate_user': 'Deactivate',
        'activate_user': 'Activate',
        'delete_user': 'Delete User',
        'search': 'Search',
        'display_name': 'Display Name (Optional)',
        'phone_number': 'Phone Number'
    },
    am: {
        // Navigation & Header
        'home': 'መነሻ',
        'login': 'ግባ',
        'signup': 'ተመዝግብ',
        'logout': 'ውጣ',
        'my_listings': 'የኔ ዝርዝሮች',
        'submit_property': 'ንብረት አስገባ',
        'admin_panel': 'የአስተዳደር ፓነል',
        'language': 'ቋንቋ',
        'theme': 'ጭብጥ',
        'dark_mode': 'ጨለማ ሁነታ',
        'light_mode': 'ብርሃን ሁነታ',

        // Home Page
        'welcome_to_addis_home': 'ወደ አዲስ ሆም እንኳን ደህና መጡ',
        'discover_premium_properties': 'በኢትዮጵያ ውስጥ የሚገኙ የላቀ ንብረቶችን ያግኙ',
        'cards': 'ካርዶች',
        'table': 'ሠንጠረዥ',
        'loading_properties': 'ንብረቶች በመጫን ላይ...',
        'no_properties_match_filters': 'ንብረቶች ከፍልግልግዎ ጋር አይዛመዱም',
        'no_properties_available': 'ንብረቶች አይገኙም',
        'try_adjusting_search_criteria': 'የፍለጋ መስፈርቶችዎን ይለውጡ',
        'check_back_later': 'ለአዲስ ዝርዝሮች ቆይተው ይመለሱ',

        // Property Card translations
        'property_image': 'የንብረት ምስል',
        'per_sqm': 'በካሬ ሜትር',
        'bedrooms': 'መኝታ ክፍሎች',
        'bathrooms': 'መታጠቢያ ክፍሎች',
        'size': 'መጠን',
        'floor': 'ፎቅ',
        'view_details': 'ዝርዝሮችን ይመልከቱ',
        'not_available': 'የለም',

        // Property types
        'apartment': 'አፓርታማ',
        'condominium': 'ኮንዶሚኒየም',
        'villa': 'ቪላ',
        'building': 'ህንጻ',
        'penthouse': 'ፔንትሃውስ',
        'duplex': 'ዱፕሌክስ',

        // Status
        'approved': 'ተፀድቋል',
        'pending': 'በመጠባበቅ ላይ',
        'rejected': 'ተቋጥቷል',
        'sold': 'ተሸጧል',

        // Filter Form
        'filters': 'ፍልግልግዎች',
        'property_type': 'የንብረት አይነት',
        'price_range': 'የዋጋ ክልል',
        'bedrooms_count': 'መኝታ ክፍሎች',
        'bathrooms_count': 'መታጠቢያ ክፍሎች',
        'min_price': 'ዝቅተኛ ዋጋ',
        'max_price': 'ከፍተኛ ዋጋ',
        'apply_filters': 'ፍልግልግዎችን ተግብር',
        'reset_filters': 'ፍልግልግዎችን ዳግም አስጀምር',
        'clear_filters': 'ፍልግልግዎችን አጽዳ',
        'more_options': 'ተጨማሪ አማራጮች',
        'less_options': 'ተጨማሪ አማራጮች አይደሉም',

        // Filters - labels/placeholders
        'region': 'ክልል',
        'site_area': 'ጣቢያ/አካባቢ',
        'any': 'ማንኛውም',
        'any_region': 'ማንኛውም ክልል',
        'any_site': 'ማንኛውም ጣቢያ',
        'any_price': 'ማንኛውም ዋጋ',
        'select_property_type': 'የንብረት አይነት ይምረጡ',
        'status': 'ሁኔታ',
        'approved_status': 'ተፀድቋል',
        'pending_status': 'በመጠባበቅ ላይ',
        'sold_status': 'ተሸጧል',
        'commercial': 'ንግድ',
        'has_elevator': 'ሊፍት አለ',
        'private_rooftop': 'የግል ጣራ ላይ',
        'two_story': 'ባለ ሁለት ፎቅ',
        'private_entrance': 'የግል መግቢያ',
        'structure_g_plus': 'አወቃቀር (G+)',
        'advanced_filters': 'የረቂቅ ፍልግልግዎች',
        'furnishing_status': 'የቤት ዕቃ ሁኔታ',
        'min_floor_level': 'ዝቅተኛ የፎቅ ደረጃ',
        'ground_floor': 'የመሬት ፎቅ',
        'floor_n': 'ፎቅ {n}',
        'ten_plus_floors': '10+ ፎቆች',
        'other_specify': 'ሌላ (ይግለጹ)',
        'custom_site': 'ብቻዎ ያስገቡ ጣቢያ',
        'condo_scheme': 'የኮንዶ አቀራረብ',
        'any_scheme': 'ማንኛውም አቀራረብ',
        'enter_specific_area': 'የተወሰነ አካባቢ ያስገቡ',
        'yes': 'አዎ',
        'no': 'አይ',

        // Footer
        'quick_links': 'ቀላል አገናኞች',
        'property_types': 'የንብረት አይነቶች',
        'contact_us': 'አግኙን',
        'privacy_policy': 'የግላዊነት መመሪያ',
        'terms_of_service': 'የአገልግሎት ውሎች',
        'cookie_policy': 'የኩኪ መመሪያ',
        'all_rights_reserved': 'መብቶች ሁሉ ተጠብቀዋል።',
        'company_tagline': 'በኢትዮጵያ ውስጥ ተስማሚ ንብረት ለማግኘት የሚረዳዎ አማካሪ። ከፍተኛ የሆኑ የንብረት እድሎችን እናገናኛችኋለን።',

        // Common
        'search': 'የፍለጋ ቃል',
        'cars': 'መኪናዎች',
        'submit_car': 'መኪና አስገባ',
        'choose_category': 'ምን ትፈልጋለህ?',
        'choose_home': 'ቤት',
        'choose_car': 'መኪና',
        'submit': 'አስገባ',
        'cancel': 'ሰርዝ',
        'save': 'አስቀምጥ',
        'edit': 'አርትዖ',
        'delete': 'ሰርዝ',
        'close': 'ዝጋ',
        'back': 'ተመለስ',
        'next': 'ቀጣይ',
        'previous': 'ቀዳሚ',
        'loading': 'በመጫን ላይ...',
        'error': 'ስህተት',
        'success': 'ተሳክቷል',
        'warning': 'ማስጠንቀቂያ',
        'info': 'መረጃ'
        ,
        // Users/Admin
        'users': 'ተጠቃሚዎች',
        'manage_users': 'ተጠቃሚዎችን አስተዳድር',
        'profile': 'መገለፃ መረጃ',
        'save_changes': 'ለውጦችን አስቀምጥ',
        'change_password': 'የይለፍ ቃል ቀይር',
        'current_password': 'የአሁኑ የይለፍ ቃል',
        'new_password': 'አዲስ የይለፍ ቃል',
        'confirm_password': 'የይለፍ ቃል አረጋግጥ',
        'update_success': 'በስኬት ተዘምኗል',
        'update_failed': 'ማዘመን አልተሳካም',
        'role': 'ሚና',
        'status': 'ሁኔታ',
        'active': 'ንቁ',
        'inactive': 'እንቅስቃሴ የለሽ',
        'set_admin': 'አስተዳዳሪ አድርግ',
        'remove_admin': 'ከአስተዳዳሪነት አስወግድ',
        'deactivate_user': 'ማቦዘን',
        'activate_user': 'አንቃ',
        'delete_user': 'ተጠቃሚን ሰርዝ',
        'search': 'ፍለጋ',
        'display_name': 'የሚታይ ስም (አማራጭ)',
        'phone_number': 'ስልክ ቁጥር'
    }
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language')
        return saved || 'en'
    })

    // Save language preference to localStorage
    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    // Set document direction based on language
    useEffect(() => {
        // Only true RTL languages should switch layout direction
        const RTL_LANGS = ['ar', 'he', 'fa', 'ur']
        const isRTL = RTL_LANGS.includes(language)
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
        document.documentElement.lang = language
    }, [language])

    const t = (key, fallback = key) => {
        return translations[language]?.[key] || translations['en']?.[key] || fallback
    }

    const switchLanguage = (lang) => {
        setLanguage(lang)
    }

    const RTL_LANGS = ['ar', 'he', 'fa', 'ur']
    const isRTL = RTL_LANGS.includes(language)

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: switchLanguage,
            t,
            isRTL,
            direction: isRTL ? 'rtl' : 'ltr'
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
