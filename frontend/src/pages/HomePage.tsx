import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api, type ApiService, type ApiReview } from '../lib/api'
import { SERVICE_IMAGES } from '../lib/serviceImages'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const USP = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Преміум якість', desc: 'Використовуємо тільки сертифіковані гель-лаки та матеріали провідних брендів.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Точно в строк', desc: 'Поважаємо ваш час. Записуємо із запасом, щоб приділити увагу кожній деталі.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Гарантія стійкості', desc: 'Гарантуємо стійкість гель-лак покриття до 3 тижнів без сколювань.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Зручне розташування', desc: 'Знаходимось у самому центрі Києва, на вул. Хрещатик 22.',
  },
]

const AVATAR_GRADIENTS = [
  'from-rose-400 to-pink-500', 'from-amber-300 to-orange-400',
  'from-fuchsia-400 to-pink-500', 'from-rose-300 to-amber-400', 'from-pink-400 to-rose-500',
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? '#F59E0B' : 'none'}
          stroke={i < rating ? '#F59E0B' : '#D6D3D1'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

function formatDuration(m: number) {
  const h = Math.floor(m / 60)
  const min = m % 60
  return h ? (min ? `${h}г ${min}хв` : `${h}г`) : `${m}хв`
}

export function HomePage() {
  const navigate = useNavigate()
  const [services, setServices] = useState<ApiService[]>([])
  const [reviews,  setReviews]  = useState<ApiReview[]>([])
  useEffect(() => {
    api.getServices().then(setServices).catch(console.error)
    api.getReviews().then(setReviews).catch(console.error)
  }, [])

  const featuredServices = services.slice(0, 3)
  const recentReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)

  return (
    <div className="min-h-screen bg-rose-50 text-stone-800">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-rose-50 to-rose-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-12 lg:pt-32 lg:pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">

            {/* Left — text */}
            <div className="flex-1 min-w-0 order-2 lg:order-1">
              <motion.div>
                <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Манікюрна студія · Київ
                </motion.div>

                <motion.h1 {...fadeUp(0.2)} className="text-5xl sm:text-6xl font-extrabold text-stone-800 leading-tight tracking-tight mb-5">
                  Манікюр, що{' '}
                  <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">говорить за вас</span>
                </motion.h1>

                <motion.p {...fadeUp(0.3)} className="text-base text-stone-500 leading-relaxed mb-7 max-w-lg">
                  Манікюр, педикюр, нарощування та авторський дизайн нігтів у затишній студії
                  в центрі Києва. Доглянуті руки — це завжди про вас.
                </motion.p>
              </motion.div>

              {/* Feature mini-cards */}
              <motion.div {...fadeUp(0.35)} className="grid grid-cols-2 gap-3 mb-8">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                      </svg>
                    ),
                    title: 'Преміум якість', desc: 'Сертифіковані гель-лаки',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                    title: 'Стерильність', desc: 'Інструменти стерилізуються щоразу',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/>
                      </svg>
                    ),
                    title: 'Авторський дизайн', desc: 'Індивідуальний підхід до кожного нігтя',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    title: 'Стійке покриття', desc: 'Гель-лак тримається до 3 тижнів',
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 bg-white/70 border border-rose-100 rounded-xl p-3 backdrop-blur-sm">
                    <div className="shrink-0 mt-0.5 text-rose-500">{icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-stone-800">{title}</p>
                      <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/booking')} className="flex-1 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-2xl shadow-rose-300/40 hover:shadow-rose-300/60 transition-all duration-300 hover:-translate-y-0.5">
                  Записатись зараз
                </button>
                <button onClick={() => navigate('/services')} className="flex-1 px-8 py-3.5 rounded-2xl bg-white border border-rose-200 text-stone-800 font-semibold hover:bg-rose-50 transition-all">
                  Наші послуги →
                </button>
              </motion.div>
            </div>

            {/* Right — photo + stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex-shrink-0 w-full lg:w-[440px] order-1 lg:order-2 flex flex-col"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/60 aspect-[4/5]">
                <img
                  src="/hero-manicure.jpg"
                  alt="Lumière Nails — манікюр"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats */}
              <motion.div {...fadeUp(0.5)} className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { value: '5', label: 'років досвіду' },
                  { value: '1200+', label: 'клієнток' },
                  { value: '4.9★', label: 'середній рейтинг' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center bg-white/80 border border-rose-100 rounded-xl py-4 px-2 backdrop-blur-sm">
                    <p className="text-2xl font-extrabold text-stone-800">{value}</p>
                    <p className="text-[11px] text-stone-500 leading-tight mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
              {/* Social links */}
              <motion.div {...fadeUp(0.6)} className="flex gap-3 mt-3">
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-white/80 border border-rose-100 rounded-xl py-3 text-sm font-semibold text-stone-800 hover:bg-white backdrop-blur-sm transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-white/80 border border-rose-100 rounded-xl py-3 text-sm font-semibold text-stone-800 hover:bg-white backdrop-blur-sm transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Facebook
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-white/80 border border-rose-100 rounded-xl py-3 text-sm font-semibold text-stone-800 hover:bg-white backdrop-blur-sm transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5 2.5 11.8c-1 .4-1 1.5 0 1.8l4.8 1.5L18 8.2c.4-.3.9.1.5.4l-8.6 7.8v.1l-.3 4.2c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.2-.5-1.8-1.3-1.5z"/></svg>
                  Telegram
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── USP ─── */}
      <section className="pt-8 pb-24 lg:py-24 bg-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">Чому обирають нас</p>
            <h2 className="text-3xl font-bold text-stone-800">Стандарт якості, якому довіряють</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USP.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="bg-white border border-rose-100 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200 flex items-center justify-center text-rose-500 mb-4">{icon}</div>
                <h3 className="text-sm font-semibold text-stone-800 mb-2">{title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">Послуги</p>
              <h2 className="text-3xl font-bold text-stone-800">Популярні послуги</h2>
            </div>
            <button onClick={() => navigate('/services')} className="text-sm text-stone-500 hover:text-stone-800 transition-colors">Всі послуги →</button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="bg-white border border-rose-100 rounded-2xl overflow-hidden group">
                <div className="h-44 relative overflow-hidden">
                  {SERVICE_IMAGES[s.id] ? (
                    <img src={SERVICE_IMAGES[s.id]} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                      <span className="text-6xl">{s.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-stone-800 mb-2">{s.name}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-stone-800">{s.priceLabel}</p>
                      <p className="text-[11px] text-stone-400">{formatDuration(s.duration)}</p>
                    </div>
                    <button onClick={() => navigate('/booking', { state: { serviceId: s.id } })} className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-semibold shadow-lg shadow-rose-300/30 hover:shadow-rose-300/50 transition-shadow">
                      Записатись
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">Відгуки</p>
              <h2 className="text-3xl font-bold text-stone-800">Що кажуть клієнтки</h2>
            </div>
            <button onClick={() => navigate('/reviews')} className="text-sm text-stone-500 hover:text-stone-800 transition-colors">Всі відгуки →</button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentReviews.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-rose-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                    {r.clientInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{r.clientName}</p>
                    <Stars rating={r.rating} />
                  </div>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 to-amber-300 p-12 text-center">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">Готові до ідеального манікюру?</h2>
              <p className="text-white/90 mb-8 max-w-md mx-auto">Запишіться вже сьогодні та переконайтесь у якості нашої роботи особисто.</p>
              <button onClick={() => navigate('/booking')} className="px-10 py-4 rounded-2xl bg-white text-rose-600 font-bold text-base shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                Записатись зараз
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
