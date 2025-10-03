// src/pages/Profile.jsx
import { useContext, useEffect, useMemo, useState } from 'react'
import api from '../api'
import AuthContext from '../context/AuthContext'
import LanguageContext from '../context/LanguageContext'

function Profile() {
    const { user, loading } = useContext(AuthContext)
    const { t } = useContext(LanguageContext)
    const [form, setForm] = useState({ display_name: '', phone_number: '' })
    const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
    const [saving, setSaving] = useState(false)
    const [changingPwd, setChangingPwd] = useState(false)
    const [banner, setBanner] = useState({ type: '', message: '' })

    useEffect(() => {
        if (user) setForm({ display_name: user.display_name || '', phone_number: user.phone_number || '' })
    }, [user])

    if (loading) return null

    const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

    const phoneError = useMemo(() => {
        if (!form.phone_number) return ''
        const re = /^\+?[0-9\s-]{7,15}$/
        return re.test(form.phone_number) ? '' : (t('invalid_phone') || 'Enter a valid phone number')
    }, [form.phone_number])

    const isProfileDirty = useMemo(() => {
        if (!user) return false
        return (form.display_name || '') !== (user.display_name || '') || (form.phone_number || '') !== (user.phone_number || '')
    }, [form, user])

    const save = async () => {
        if (phoneError) {
            setBanner({ type: 'error', message: phoneError })
            return
        }
        setSaving(true)
        setBanner({ type: '', message: '' })
        try {
            await api.put('/auth/users/me', form, { headers: headers() })
            setBanner({ type: 'success', message: t('update_success') || 'Profile updated successfully' })
        } catch (e) {
            setBanner({ type: 'error', message: t('update_failed') || 'Failed to update profile' })
        } finally {
            setSaving(false)
        }
    }

    const changePassword = async () => {
        if (!pwd.current || !pwd.next || !pwd.confirm) {
            setBanner({ type: 'error', message: t('fill_required_fields') || 'Please fill all password fields' })
            return
        }
        if (pwd.next !== pwd.confirm) {
            setBanner({ type: 'error', message: t('password_mismatch') || 'Passwords do not match' })
            return
        }
        setChangingPwd(true)
        setBanner({ type: '', message: '' })
        try {
            await api.post('/auth/users/change-password', { current_password: pwd.current, new_password: pwd.next }, { headers: headers() })
            setBanner({ type: 'success', message: t('update_success') || 'Password updated successfully' })
            setPwd({ current: '', next: '', confirm: '' })
        } catch (e) {
            setBanner({ type: 'error', message: t('update_failed') || 'Failed to change password' })
        } finally {
            setChangingPwd(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-transparent rounded-xl">
            {banner.message && (
                <div className={`mb-4 rounded-lg px-4 py-3 text-sm ${banner.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-700'}`}>
                    {banner.message}
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('profile')}</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('profile_subheading') || 'Update your basic information to keep your account up to date.'}</p>
                </div>
                <div className="px-6 py-6 grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">{t('display_name')}</label>
                        <input
                            placeholder={t('display_name') || 'Display Name'}
                            className={`mt-1 w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${'border-gray-300 dark:border-gray-600'}`}
                            value={form.display_name}
                            onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">{t('phone_number')}</label>
                        <input
                            placeholder={t('phone_placeholder') || '+251 9xx xxx xxx'}
                            className={`mt-1 w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'}`}
                            value={form.phone_number}
                            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                        />
                        {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <button
                            onClick={save}
                            disabled={saving || !isProfileDirty || !!phoneError}
                            className={`w-full justify-center inline-flex items-center gap-2 rounded-lg py-2.5 px-4 font-medium text-white transition ${saving || !isProfileDirty || !!phoneError ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} `}
                        >
                            {saving ? (t('saving') || 'Saving...') : (t('save_changes') || 'Save Changes')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('change_password')}</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('password_requirements') || 'Use at least 8 characters with a mix of letters and numbers.'}</p>
                </div>
                <div className="px-6 py-6 grid gap-4">
                    <input
                        type="password"
                        placeholder={t('current_password')}
                        value={pwd.current}
                        onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder={t('new_password')}
                        value={pwd.next}
                        onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder={t('confirm_password')}
                        value={pwd.confirm}
                        onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={changePassword}
                        disabled={changingPwd}
                        className={`w-full justify-center inline-flex items-center gap-2 rounded-lg py-2.5 px-4 font-medium text-white transition ${changingPwd ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {changingPwd ? (t('saving') || 'Saving...') : (t('save_changes') || 'Save Changes')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile



