// src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react'
import api from '../api'
import AuthContext from '../context/AuthContext'
import LanguageContext from '../context/LanguageContext'

function Profile() {
    const { user, loading } = useContext(AuthContext)
    const { t } = useContext(LanguageContext)
    const [form, setForm] = useState({ display_name: '', phone_number: '' })
    const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })

    useEffect(() => {
        if (user) setForm({ display_name: user.display_name || '', phone_number: user.phone_number || '' })
    }, [user])

    if (loading) return null

    const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

    const save = async () => {
        try {
            await api.put('/users/me', form, { headers: headers() })
            alert(t('update_success'))
        } catch (e) {
            alert(t('update_failed'))
        }
    }

    const changePassword = async () => {
        if (pwd.next !== pwd.confirm) return alert('Passwords do not match')
        try {
            await api.post('/users/change-password', { current_password: pwd.current, new_password: pwd.next }, { headers: headers() })
            alert(t('update_success'))
            setPwd({ current: '', next: '', confirm: '' })
        } catch (e) {
            alert(t('update_failed'))
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{t('profile')}</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">{t('display_name')}</label>
                    <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2"
                        value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">{t('phone_number')}</label>
                    <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2"
                        value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
                </div>
                <button onClick={save} className="w-full bg-blue-600 text-white rounded-lg py-2">{t('save_changes')}</button>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-3">{t('change_password')}</h2>
            <div className="space-y-3">
                <input type="password" placeholder={t('current_password')} value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2" />
                <input type="password" placeholder={t('new_password')} value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2" />
                <input type="password" placeholder={t('confirm_password')} value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2" />
                <button onClick={changePassword} className="w-full bg-indigo-600 text-white rounded-lg py-2">{t('save_changes')}</button>
            </div>
        </div>
    )
}

export default Profile



