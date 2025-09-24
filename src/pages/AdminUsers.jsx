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
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{t('manage_users')}</h1>

            <div className="mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search')}
                    className="w-full rounded-lg border border-gray-300 p-2"
                />
            </div>

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2">ID</th>
                            <th className="text-left px-4 py-2">{t('display_name')}</th>
                            <th className="text-left px-4 py-2">{t('phone_number')}</th>
                            <th className="text-left px-4 py-2">{t('role')}</th>
                            <th className="text-left px-4 py-2">{t('status')}</th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(u => (
                            <tr key={u.uid} className="border-t">
                                <td className="px-4 py-2">{u.uid}</td>
                                <td className="px-4 py-2">{u.display_name || '-'}</td>
                                <td className="px-4 py-2">{u.phone_number}</td>
                                <td className="px-4 py-2">{(u.roles || []).join(', ') || '-'}</td>
                                <td className="px-4 py-2">{u.active ? t('active') : t('inactive')}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button className="px-2 py-1 rounded bg-blue-600 text-white" onClick={() => setRole(u.uid, 'admin', true)}>{t('set_admin')}</button>
                                    <button className="px-2 py-1 rounded bg-gray-600 text-white" onClick={() => setRole(u.uid, 'admin', false)}>{t('remove_admin')}</button>
                                    <button className="px-2 py-1 rounded bg-yellow-600 text-white" onClick={() => setActive(u.uid, !u.active)}>{u.active ? t('deactivate_user') : t('activate_user')}</button>
                                    <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => remove(u.uid)}>{t('delete_user')}</button>
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



