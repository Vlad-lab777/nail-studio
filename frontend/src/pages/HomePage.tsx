import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SERVICE_IMAGES } from '../lib/serviceImages'

const HERO_INTRO_KEY = 'lumiere-hero-intro-played'
const DOOR_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number]

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
  {
    serviceId: 's1', label: 'Манікюр', priceLabel: 'від 600 грн', duration: '1г 30хв', img: SERVICE_IMAGES.s1,
    description: 'Класичний або апаратний манікюр з доглядовим кремом',
  },
  {
    serviceId: 's2', label: 'Манікюр + гель-лак', priceLabel: 'від 900 грн', duration: '2г', img: SERVICE_IMAGES.s2,
    description: 'Манікюр з покриттям гель-лаком, тримається до 3 тижнів',
  },
  {
    serviceId: 's5', label: 'Нарощування нігтів', priceLabel: 'від 1300 грн', duration: '2г 30хв', img: SERVICE_IMAGES.s5,
    description: 'Нарощування гелем або акрилом, будь-яка форма та довжина',
  },
  {
    serviceId: 's4', label: 'Педикюр', priceLabel: 'від 1100 грн', duration: '1г 30хв', img: SERVICE_IMAGES.s4,
    description: 'Класичний педикюр з доглядовою програмою для ніг',
  },
  {
    serviceId: 's6', label: 'Дизайн нігтів', priceLabel: 'від 700 грн', duration: '30хв', img: SERVICE_IMAGES.s6,
    description: 'Авторський дизайн, втирки, стрази, художній розпис',
  },
  {
    serviceId: 's8', label: 'SPA догляд', priceLabel: 'від 500 грн', duration: '45хв', img: SERVICE_IMAGES.s8,
    description: 'Пілінг, маска та парафінотерапія для рук',
  },
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

const ABOUT_PHOTO = `${G}/6899550/pexels-photo-6899550.jpeg?auto=compress&cs=tinysrgb&w=700&h=600&fit=crop`

const STATS = [
  { value: '5', label: 'років роботи' },
  { value: '1200+', label: 'щасливих клієнток' },
  { value: '100+', label: 'відтінків гель-лаків' },
  { value: '4.9★', label: 'рейтинг салону' },
]

const REVIEWS_SHOWCASE = [
  { text: 'Найкращий манікюр у місті! Тримається більше місяця і завжди ідеально виглядає.', author: 'Олена К.' },
  { text: 'Дуже атмосферний салон та професійні майстри. Завжди задоволена результатом.', author: 'Ірина М.' },
  { text: 'Після першого візиту стала постійною клієнткою. Рекомендую всім!', author: 'Катерина Л.' },
]

const MASTER_OPTIONS = ['Будь-який', ...MASTERS.map((m) => m.name)]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const FAQ_ITEMS = [
  { q: 'Скільки тримається покриття?', a: 'Гель-лак тримається в середньому 3 тижні за умови дотримання рекомендацій по догляду.' },
  { q: 'Чи стерилізуються інструменти?', a: 'Так, всі інструменти проходять повну дезінфекцію та стерилізацію в автоклаві після кожного клієнта.' },
  { q: 'Чи можна записатися онлайн?', a: 'Звичайно! Просто заповніть форму запису на сайті, і ми зв\'яжемося з вами для підтвердження.' },
  { q: 'Чи є парковка біля салону?', a: 'Так, біля входу є зручна парковка для відвідувачів.' },
  { q: 'Які матеріали ви використовуєте?', a: 'Тільки сертифіковані гель-лаки та матеріали провідних світових брендів.' },
  { q: 'Чи робите ви укріплення нігтів?', a: 'Так, пропонуємо укріплення біогелем та іншими сучасними технологіями.' },
]

const INPUT_CLASS = 'w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-colors'

function scrollToBookingForm() {
  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
}

export function HomePage() {
  const [selectedService, setSelectedService] = useState('')
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())

  const [hasPlayedIntro] = useState(() => sessionStorage.getItem(HERO_INTRO_KEY) === 'true')
  const [isDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const [opened, setOpened] = useState(hasPlayedIntro)

  useEffect(() => {
    if (hasPlayedIntro) return
    document.body.style.overflow = 'hidden'
    const startTimer = setTimeout(() => {
      setOpened(true)
      sessionStorage.setItem(HERO_INTRO_KEY, 'true')
    }, 350)
    return () => {
      clearTimeout(startTimer)
      document.body.style.overflow = ''
    }
  }, [hasPlayedIntro])

  useEffect(() => {
    if (hasPlayedIntro || !opened) return
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = ''
    }, isDesktop ? 1100 : 900)
    return () => clearTimeout(unlockTimer)
  }, [opened, hasPlayedIntro, isDesktop])

  const heroDelays = hasPlayedIntro
    ? [0.05, 0.15, 0.25, 0.35]
    : isDesktop
      ? [0.7, 0.85, 1.05, 1.2]
      : [0.55, 0.68, 0.82, 0.95]

  const toggleFaq = (i: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-rose-50 text-stone-800">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl" />

        {!hasPlayedIntro && (
          <>
            {/* Desktop door panels (horizontal split) */}
            <motion.div
              initial={false}
              animate={{ x: opened ? '-100%' : 0 }}
              transition={{ duration: 1.1, ease: DOOR_EASE }}
              aria-hidden="true"
              className="hidden md:flex absolute inset-y-0 left-0 w-1/2 z-40 items-center justify-center bg-gradient-to-br from-rose-950 to-stone-900"
            >
              <motion.span
                animate={{ opacity: opened ? 0 : 1 }}
                transition={{ duration: 0.45, ease: DOOR_EASE }}
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
              >
                ✦ Lumière
              </motion.span>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ x: opened ? '100%' : 0 }}
              transition={{ duration: 1.1, ease: DOOR_EASE }}
              aria-hidden="true"
              className="hidden md:flex absolute inset-y-0 right-0 w-1/2 z-40 items-center justify-center bg-gradient-to-br from-rose-950 to-stone-900"
            >
              <motion.span
                animate={{ opacity: opened ? 0 : 1 }}
                transition={{ duration: 0.45, ease: DOOR_EASE }}
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
              >
                Nails
              </motion.span>
            </motion.div>

            {/* Mobile door panels (vertical split) */}
            <motion.div
              initial={false}
              animate={{ y: opened ? '-100%' : 0 }}
              transition={{ duration: 0.9, ease: DOOR_EASE }}
              aria-hidden="true"
              className="flex md:hidden absolute inset-x-0 top-0 h-1/2 z-40 bg-gradient-to-br from-rose-950 to-stone-900"
            />
            <motion.div
              initial={false}
              animate={{ y: opened ? '100%' : 0 }}
              transition={{ duration: 0.9, ease: DOOR_EASE }}
              aria-hidden="true"
              className="flex md:hidden absolute inset-x-0 bottom-0 h-1/2 z-40 bg-gradient-to-br from-rose-950 to-stone-900"
            />
            <motion.div
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ duration: 0.35, ease: DOOR_EASE }}
              aria-hidden="true"
              className="flex md:hidden absolute inset-0 z-40 items-center justify-center"
            >
              <span className="text-xl font-bold text-white tracking-wide">✦ Lumière Nails</span>
            </motion.div>
          </>
        )}

        <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

            {/* Left — text */}
            <div className="flex-1 min-w-0">
              <motion.p {...fadeUp(heroDelays[0])} className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                Преміальний салон манікюру
              </motion.p>

              <motion.h1 {...fadeUp(heroDelays[1])} className="font-marck text-5xl sm:text-6xl lg:text-7xl text-stone-800 leading-[1.1] tracking-tight mb-5">
                Манікюр, що{' '}
                <span className="text-rose-500">говорить за вас</span>
              </motion.h1>

              <motion.p {...fadeUp(heroDelays[2])} className="text-base sm:text-lg text-stone-500 leading-relaxed mb-8 max-w-lg">
                Манікюр, педикюр, нарощування та авторський дизайн нігтів у затишній студії
                в центрі Києва. Доглянуті руки — це завжди про вас.
              </motion.p>

              <motion.div {...fadeUp(heroDelays[3])} className="flex flex-col sm:flex-row gap-3">
                <button onClick={scrollToBookingForm} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-xl shadow-rose-300/40 hover:shadow-rose-300/60 transition-all duration-300 hover:-translate-y-0.5">
                  Записатися онлайн
                </button>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-800 font-semibold hover:bg-rose-50 hover:border-rose-200 transition-all">
                  Переглянути роботи
                </button>
              </motion.div>
            </div>

            {/* Right — photo */}
            <motion.div
              initial={hasPlayedIntro ? { opacity: 0, x: 40 } : { opacity: 1, scale: 1.08 }}
              animate={hasPlayedIntro ? { opacity: 1, x: 0 } : { scale: opened ? 1 : 1.08 }}
              transition={hasPlayedIntro
                ? { delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
                : { duration: 1.4, ease: DOOR_EASE }
              }
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
            {SERVICE_CARDS.map(({ serviceId, label, priceLabel, duration, description, img }, i) => (
              <motion.div
                key={serviceId}
                {...fadeUpInView(i * 0.05)}
                className="shrink-0 w-[230px] sm:w-[250px] text-left group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                  <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="font-semibold text-stone-800 text-sm mb-1">{label}</p>
                <p className="text-xs text-stone-500 leading-snug mb-3 line-clamp-2 min-h-[2.2em]">{description}</p>
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-base font-bold text-stone-800 whitespace-nowrap">{priceLabel}</p>
                    <p className="text-[11px] text-stone-400">{duration}</p>
                  </div>
                  <button
                    onClick={() => { setSelectedService(label); scrollToBookingForm() }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-semibold shadow-sm shadow-rose-300/40 hover:shadow-rose-300/60 transition-shadow whitespace-nowrap"
                  >
                    Записатись
                  </button>
                </div>
              </motion.div>
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

      {/* ─── ABOUT SALON ─── */}
      <section className="py-20 lg:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

            {/* Left — photo */}
            <motion.div {...fadeUpInView()} className="flex-shrink-0 w-full lg:w-[460px]">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 aspect-[4/5] lg:aspect-auto lg:h-96">
                <img
                  src={ABOUT_PHOTO}
                  alt="Інтер'єр студії Lumière Nails"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right — text + stats */}
            <div className="flex-1 min-w-0">
              <motion.div {...fadeUpInView(0.05)} className="flex items-center gap-4 mb-5">
                <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
                <h2 className="text-3xl font-bold text-stone-800">Про салон</h2>
              </motion.div>

              <motion.p {...fadeUpInView(0.1)} className="text-base text-stone-500 leading-relaxed mb-8 max-w-lg">
                Lumière Nails — затишна студія в центрі Києва, де кожна деталь продумана для вашого
                комфорту. Наші майстри використовують лише сертифіковані матеріали провідних брендів
                і регулярно вдосконалюють навички. Тут ви не просто робите манікюр — ви проводите час для себе.
              </motion.p>

              <motion.div {...fadeUpInView(0.2)} className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="min-w-0">
                    <p className="text-2xl sm:text-3xl font-extrabold text-rose-500 mb-1 whitespace-nowrap">{value}</p>
                    <p className="text-[10px] sm:text-xs text-stone-500 leading-tight">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Відгуки наших клієнтів</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS_SHOWCASE.map(({ text, author }, i) => (
              <motion.div key={author} {...fadeUpInView(i * 0.08)} className="h-full bg-white rounded-2xl shadow-md shadow-rose-100/50 p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#F472B6">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-5">{text}</p>
                <p className="text-sm font-semibold text-stone-800">{author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING FORM ─── */}
      <section id="booking-form" className="py-20 lg:py-24 bg-white/60 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Запишіться зараз</h2>
            <p className="text-stone-500">Оберіть зручний час і ми підтвердимо запис</p>
          </motion.div>

          <motion.form
            {...fadeUpInView(0.1)}
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-3xl shadow-xl shadow-rose-100/60 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Ваше ім'я</label>
                <input type="text" placeholder="Ім'я" className={INPUT_CLASS} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Телефон</label>
                <input type="tel" placeholder="+380 __ ___ __ __" className={INPUT_CLASS} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Послуга</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className={INPUT_CLASS}>
                  <option value="">Оберіть послугу</option>
                  {SERVICE_CARDS.map(({ serviceId, label }) => (
                    <option key={serviceId} value={label}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Майстер</label>
                <select className={INPUT_CLASS}>
                  {MASTER_OPTIONS.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Дата</label>
                <input type="date" className={INPUT_CLASS} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">Час</label>
                <select className={INPUT_CLASS}>
                  {TIME_SLOTS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="w-full px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-xl shadow-rose-300/40 hover:shadow-rose-300/60 transition-all duration-300">
              Записатись
            </button>
          </motion.form>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Ми в Instagram</h2>
            <p className="text-stone-500">
              Підписуйтесь на нас <span className="text-rose-500 font-semibold">@lumiere.nails</span>
            </p>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div key={src} {...fadeUpInView(i * 0.04)} className="shrink-0 w-[160px] sm:w-[180px] aspect-square rounded-2xl overflow-hidden">
                <img
                  src={src}
                  alt={`Instagram-публікація Lumière Nails ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUpInView()} className="flex items-center gap-4 mb-10">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-rose-400 to-pink-500 shrink-0" />
            <h2 className="text-3xl font-bold text-stone-800">Часті запитання</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
            {FAQ_ITEMS.map(({ q, a }, i) => {
              const isOpen = openFaqs.has(i)
              return (
                <motion.div key={q} {...fadeUpInView(i * 0.05)} className="bg-white rounded-2xl shadow-md shadow-rose-100/50 p-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between gap-3 text-left cursor-pointer font-semibold text-stone-800 text-sm"
                  >
                    {q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-rose-500 transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : ''}`}>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-stone-500 leading-relaxed pt-3">{a}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
