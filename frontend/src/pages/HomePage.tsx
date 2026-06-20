import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICE_IMAGES } from '../lib/serviceImages'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const PERKS = [
  {
    title: 'Стерильність 100%', desc: 'Інструменти в автоклаві щоразу',
    icon: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />,
  },
  {
    title: 'Преміум матеріали', desc: 'Гель-лаки провідних брендів',
    icon: <path d="M6 3h12l4 6-10 12L2 9z" />,
  },
  {
    title: 'Майстри з досвідом', desc: 'Від 5 років практики',
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" /></>,
  },
  {
    title: 'Гарантія на покриття', desc: 'До 3 тижнів без сколювань',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
  },
  {
    title: 'Онлайн запис 24/7', desc: 'Записатись будь-якої миті',
    icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  },
]

const SERVICE_CARDS = [
  { serviceId: 's1', label: 'Манікюр', priceLabel: 'від 600 грн', img: SERVICE_IMAGES.s1 },
  { serviceId: 's2', label: 'Манікюр + гель-лак', priceLabel: 'від 900 грн', img: SERVICE_IMAGES.s2 },
  { serviceId: 's5', label: 'Нарощування нігтів', priceLabel: 'від 1300 грн', img: SERVICE_IMAGES.s5 },
  { serviceId: 's4', label: 'Педикюр', priceLabel: 'від 1100 грн', img: SERVICE_IMAGES.s4 },
  { serviceId: 's6', label: 'Дизайн нігтів', priceLabel: 'від 700 грн', img: SERVICE_IMAGES.s6 },
  { serviceId: 's8', label: 'SPA догляд', priceLabel: 'від 500 грн', img: SERVICE_IMAGES.s8 },
]

const G = 'https://images.pexels.com/photos'
const GQ = '?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
const GALLERY_IMAGES = [
  `${G}/7230841/pexels-photo-7230841.jpeg${GQ}`,
  `${G}/17010955/pexels-photo-17010955.jpeg${GQ}`,
  `${G}/7755212/pexels-photo-7755212.jpeg${GQ}`,
  `${G}/939835/pexels-photo-939835.jpeg${GQ}`,
  `${G}/5874876/pexels-photo-5874876.jpeg${GQ}`,
  `${G}/17010952/pexels-photo-17010952.jpeg${GQ}`,
  `${G}/3997384/pexels-photo-3997384.jpeg${GQ}`,
  `${G}/7755652/pexels-photo-7755652.jpeg${GQ}`,
]

const MQ = '?auto=compress&cs=tinysrgb&w=400&h=480&fit=crop'
const MASTERS = [
  { name: 'Анна', role: 'Senior Nail Artist', experience: 7, photo: `${G}/30004322/pexels-photo-30004322.jpeg${MQ}` },
  { name: 'Марина', role: 'Top Master', experience: 6, photo: `${G}/3791554/pexels-photo-3791554.jpeg${MQ}` },
  { name: 'Софія', role: 'Nail Designer', experience: 5, photo: `${G}/16152597/pexels-photo-16152597.jpeg${MQ}` },
]

const PROMOTIONS = [
  {
    badge: '-20%', title: 'На перший візит', desc: 'Знайомство з нашим салоном за приємною ціною',
    icon: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/></>,
  },
  {
    badge: null, title: 'Приведи подругу', desc: 'Отримай 300 грн бонусів на наступний візит',
    icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  },
  {
    badge: null, title: 'День народження', desc: 'Знижка 15% у свій день народження',
    icon: <><circle cx="12" cy="7" r="1.3" fill="currentColor" stroke="none"/><path d="M12 13.5V9"/><path d="M20 21v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7"/><path d="M4 21h16"/><path d="M6 17c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0"/></>,
  },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-rose-50 text-stone-800">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

            {/* Left — text */}
            <div className="flex-1 min-w-0">
              <motion.p {...fadeUp(0.05)} className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                Преміальний салон манікюру
              </motion.p>

              <motion.h1 {...fadeUp(0.15)} className="font-marck text-5xl sm:text-6xl lg:text-7xl text-stone-800 leading-[1.1] tracking-tight mb-5">
                Манікюр, що{' '}
                <span className="text-rose-500">говорить за вас</span>
              </motion.h1>

              <motion.p {...fadeUp(0.25)} className="text-base sm:text-lg text-stone-500 leading-relaxed mb-8 max-w-lg">
                Манікюр, педикюр, нарощування та авторський дизайн нігтів у затишній студії
                в центрі Києва. Доглянуті руки — це завжди про вас.
              </motion.p>

              <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/booking')} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-xl shadow-rose-300/40 hover:shadow-rose-300/60 transition-all duration-300 hover:-translate-y-0.5">
                  Записатися онлайн
                </button>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-800 font-semibold hover:bg-rose-50 hover:border-rose-200 transition-all">
                  Переглянути роботи
                </button>
              </motion.div>
            </div>

            {/* Right — photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex-shrink-0 w-full lg:w-[460px]"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 aspect-[4/5] lg:aspect-auto lg:h-96">
                <img
                  src="/hero-manicure.jpg"
                  alt="Lumière Nails — манікюр"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── PERKS ─── */}
      <section className="py-8 lg:py-10 bg-white border-y border-rose-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
            {PERKS.map(({ title, desc, icon }, i) => (
              <motion.div key={title} {...fadeUpInView(i * 0.05)} className="flex items-center gap-2.5 min-w-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-rose-500">
                  {icon}
                </svg>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-stone-800 leading-tight truncate">{title}</p>
                  <p className="text-[11px] text-stone-500 leading-tight">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES (horizontal scroll strip) ─── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Наші послуги</h2>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {SERVICE_CARDS.map(({ serviceId, label, priceLabel, img }, i) => (
              <motion.button
                key={serviceId}
                {...fadeUpInView(i * 0.05)}
                onClick={() => navigate('/booking', { state: { serviceId } })}
                className="shrink-0 w-[200px] sm:w-[220px] text-left group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                  <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="font-semibold text-stone-800 text-sm mb-1">{label}</p>
                <p className="text-xs text-stone-500">{priceLabel}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-20 lg:py-24 bg-white/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Галерея робіт</h2>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div key={src} {...fadeUpInView(i * 0.04)} className="shrink-0 w-[180px] sm:w-[220px] aspect-square rounded-2xl overflow-hidden">
                <img
                  src={src}
                  alt={`Робота Lumière Nails ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MASTERS ─── */}
      <section className="py-20 lg:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Наші майстри</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MASTERS.map(({ name, role, experience, photo }, i) => (
              <motion.div key={name} {...fadeUpInView(i * 0.08)} className="h-full bg-white rounded-3xl overflow-hidden shadow-md shadow-rose-100/50">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={photo} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-stone-800 text-lg mb-1">{name}</p>
                  <p className="text-sm text-stone-500 mb-2">{role}</p>
                  <p className="text-xs text-stone-400 mb-3">Досвід: {experience} років</p>
                  <span className="text-sm font-semibold text-rose-500">Детальніше →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONS ─── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Акції та спеціальні пропозиції</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROMOTIONS.map(({ badge, title, desc, icon }, i) => (
              <motion.div key={title} {...fadeUpInView(i * 0.08)} className="h-full flex items-start justify-between gap-4 bg-white rounded-2xl shadow-md shadow-rose-100/50 p-6">
                <div className="min-w-0">
                  {badge && <p className="text-3xl font-extrabold text-rose-500 leading-none mb-2">{badge}</p>}
                  <p className={`font-semibold text-stone-800 mb-1.5 ${badge ? '' : 'text-lg'}`}>{title}</p>
                  <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
                </div>
                <div className="shrink-0 w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 {...fadeUpInView()} className="text-3xl font-bold text-stone-800 mb-4">
            Готові доглянути ваші руки?
          </motion.h2>
          <motion.div {...fadeUpInView(0.1)}>
            <button onClick={() => navigate('/booking')} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-base shadow-2xl shadow-rose-300/40 hover:shadow-rose-300/60 hover:-translate-y-0.5 transition-all duration-300">
              Записатись зараз
            </button>
          </motion.div>
          <motion.div {...fadeUpInView(0.2)} className="flex items-center justify-center gap-4 mt-8">
            <a href="#" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Telegram" className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5 2.5 11.8c-1 .4-1 1.5 0 1.8l4.8 1.5L18 8.2c.4-.3.9.1.5.4l-8.6 7.8v.1l-.3 4.2c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.2-.5-1.8-1.3-1.5z"/></svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
