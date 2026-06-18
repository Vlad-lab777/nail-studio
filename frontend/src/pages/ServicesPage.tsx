import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api, type ApiService } from '../lib/api'
import { SERVICE_IMAGES } from '../lib/serviceImages'
import type { ServiceCategory } from '../types'

const CATEGORY_LABELS: Record<ServiceCategory | 'all', string> = {
  all: 'Всі послуги', manicure: 'Манікюр', pedicure: 'Педикюр',
  extension: 'Нарощування', design: 'Дизайн', removal: 'Зняття покриття', spa: 'SPA',
}

function formatDuration(m: number) {
  const h = Math.floor(m / 60)
  const min = m % 60
  return h ? (min ? `${h}г ${min}хв` : `${h}г`) : `${m}хв`
}

export function ServicesPage() {
  const navigate = useNavigate()
  const [services, setServices] = useState<ApiService[]>([])
  const [loading,  setLoading]  = useState(true)
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all')

  useEffect(() => {
    api.getServices()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = category === 'all'
    ? services
    : services.filter((s) => s.category === category)

  return (
    <div className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">Каталог</p>
          <h1 className="text-4xl font-extrabold text-stone-800 mb-4">Наші послуги</h1>
          <p className="text-stone-500 max-w-xl">
            Весь спектр нігтьового сервісу — від класичного манікюру до авторського дизайну та SPA-догляду.
            Обирайте те, що підходить саме вам.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {(Object.entries(CATEGORY_LABELS) as [ServiceCategory | 'all', string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setCategory(val)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === val
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-300/30'
                  : 'bg-white border border-rose-200 text-stone-500 hover:text-stone-800 hover:border-rose-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-rose-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-32 bg-rose-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-rose-100 rounded w-3/4" />
                  <div className="h-3 bg-rose-100 rounded w-full" />
                  <div className="h-3 bg-rose-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-rose-100 rounded-2xl overflow-hidden group flex flex-col"
              >
                <div className="h-40 relative overflow-hidden shrink-0">
                  {SERVICE_IMAGES[s.id] ? (
                    <img
                      src={SERVICE_IMAGES[s.id]}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                      <span className="text-5xl">{s.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-stone-800 mb-1">{s.name}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4 flex-1">{s.description}</p>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-4">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {formatDuration(s.duration)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-rose-100">
                    <p className="text-lg font-bold text-stone-800">{s.priceLabel}</p>
                    <button
                      onClick={() => navigate('/booking', { state: { serviceId: s.id } })}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-300/30 hover:shadow-rose-300/50 transition-shadow"
                    >
                      Записатись
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
