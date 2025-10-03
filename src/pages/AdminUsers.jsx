// src/pages/AdminUsers.jsx
import { useEffect, useState, useContext } from 'react'
import api from '../api'
import LanguageContext from '../context/LanguageContext'

function AdminUsers() {
    const { t } = useContext(LanguageContext)
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const token = localStorage.getItem('token')

    const headers = { Authorization: `Bearer ${token}` }

    const load = async () => {
        const res = await api.get('/admin/users', { headers })
        setUsers(res.data || [])
    }

    useEffect(() => { if (token) load() }, [token])

    const setRole = async (uid, role, enable) => {
        await api.post(`/admin/users/${uid}/role`, { role, enable }, { headers })
        load()
    }
    const setActive = async (uid, active) => {
        await api.post(`/admin/users/${uid}/active`, { active }, { headers })
        load()
    }
    const remove = async (uid) => {
        if (!confirm('Delete user?')) return
        await api.delete(`/admin/users/${uid}`, { headers })
        load()
    }

    const filtered = users.filter(u =>
        !query || (u.display_name || '').toLowerCase().includes(query.toLowerCase()) ||
        (u.phone_number || '').includes(query)
    )

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 dark:bg-transparent rounded-xl">
            <h1 className="text-2xl font-bold mb-4">{t('manage_users')}</h1>

            <div className="mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search')}
                    className="w-full rounded-lg border border-gray-300 p-2"
                />
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-gray-900 dark:text-gray-100">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                            <th className="text-left px-4 py-2">ID</th>
                            <th className="text-left px-4 py-2">{t('display_name')}</th>
                            <th className="text-left px-4 py-2">{t('phone_number')}</th>
                            <th className="text-left px-4 py-2">{t('role')}</th>
                            <th className="text-left px-4 py-2">{t('status')}</th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filtered.map(u => (
                            <tr key={u.uid} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/80">
                                <td className="px-4 py-2 align-top">{u.uid}</td>
                                <td className="px-4 py-2 align-top">{u.display_name || '-'}</td>
                                <td className="px-4 py-2 align-top">{u.phone_number}</td>
                                <td className="px-4 py-2 align-top">{(u.roles || []).join(', ') || '-'}</td>
                                <td className="px-4 py-2 align-top">
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${u.active ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300'}`}>{u.active ? t('active') : t('inactive')}</span>
                                </td>
                                <td className="px-4 py-2 align-top space-x-2 whitespace-nowrap">
                                    <button className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setRole(u.uid, 'admin', true)}>{t('set_admin')}</button>
                                    <button className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white" onClick={() => setRole(u.uid, 'admin', false)}>{t('remove_admin')}</button>
                                    <button className="px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => setActive(u.uid, !u.active)}>{u.active ? t('deactivate_user') : t('activate_user')}</button>
                                    <button className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white" onClick={() => remove(u.uid)}>{t('delete_user')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers



