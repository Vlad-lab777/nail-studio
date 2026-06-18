import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { api, type ApiService } from '../lib/api'
import { SERVICE_ICONS } from '../lib/serviceIcons'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

function formatDuration(m: number) {
  const h = Math.floor(m / 60)
  const min = m % 60
  return h ? (min ? `${h}г ${min}хв` : `${h}г`) : `${m}хв`
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function formatDateUa(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface FormData {
  serviceIds: string[]
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes: string
}

const EMPTY: FormData = {
  serviceIds: [], date: '', time: '', name: '', phone: '', email: '', notes: '',
}

type FieldErrors = Partial<Record<keyof FormData | 'serviceIds', string>>

export function BookingPage() {
  const location = useLocation()
  const preselectedId = (location.state as { serviceId?: string } | null)?.serviceId ?? ''

  const [services, setServices] = useState<ApiService[]>([])
  const [form,      setForm]     = useState<FormData>({ ...EMPTY, serviceIds: preselectedId ? [preselectedId] : [] })
  const [errors,    setErrors]   = useState<FieldErrors>({})
  const [submitting,  setSubmitting]  = useState(false)
  const [submitted,   setSubmitted]   = useState(false)

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error)
  }, [])

  const selectedServices = services.filter((s) => form.serviceIds.includes(s.id))
  const totalPrice    = selectedServices.reduce((sum, s) => sum + s.price, 0)
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0)

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id)
        ? f.serviceIds.filter((x) => x !== id)
        : [...f.serviceIds, id],
    }))
    setErrors((e) => ({ ...e, serviceIds: undefined }))
  }

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const e: FieldErrors = {}
    if (!form.serviceIds.length) e.serviceIds = 'Оберіть хоча б одну послугу'
    if (!form.date) e.date = 'Оберіть дату'
    if (!form.time) e.time = 'Оберіть час'
    if (!form.name.trim()) e.name = "Введіть ваше ім'я"
    if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone)) e.phone = 'Введіть коректний номер телефону'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Введіть коректний email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Демо-форма: заявка нікуди не надсилається, лише імітує відправку.
    await api.createBooking()
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-rose-50 pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-lg w-full bg-white border border-rose-100 rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Дякуємо, заявку прийнято!</h2>
          <p className="text-stone-500 mb-8">Ми зв'яжемось з вами найближчим часом для підтвердження.</p>
          <div className="bg-rose-50 rounded-2xl p-5 text-left space-y-3 mb-8">
            <Row label="Послуги" value={selectedServices.map((s) => s.name).join(', ')} />
            <Row label="Дата"    value={formatDateUa(form.date)} />
            <Row label="Час"     value={form.time} />
            <Row label="Клієнт"  value={form.name} />
            <Row label="Телефон" value={form.phone} />
            <Row label="Тривалість" value={formatDuration(totalDuration)} />
            <Row label="Вартість" value={`${totalPrice} грн`} />
          </div>
          <button
            onClick={() => { setForm({ ...EMPTY, serviceIds: preselectedId ? [preselectedId] : [] }); setSubmitted(false) }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-lg shadow-rose-300/30 hover:shadow-rose-300/50 transition-shadow"
          >
            Записатись ще раз
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">Запис</p>
          <h1 className="text-4xl font-extrabold text-stone-800">Запишіться на манікюр</h1>
          <p className="text-stone-500 mt-3">Заповніть форму — ми передзвонимо для підтвердження.</p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Services */}
          <Section title="Послуги (можна обрати декілька)">
            {services.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-rose-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => {
                  const selected = form.serviceIds.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                        selected
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-rose-100 bg-white hover:border-rose-200'
                      }`}
                    >
                      <div className={`shrink-0 transition-colors ${selected ? 'text-rose-500' : 'text-stone-400'}`}>
                        {SERVICE_ICONS[s.id] ?? s.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">{s.name}</p>
                        <p className="text-xs text-stone-500">{formatDuration(s.duration)} · {s.priceLabel}</p>
                      </div>
                      <div className={`ml-auto w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                        selected ? 'bg-rose-500 border-rose-500' : 'border-rose-300'
                      }`}>
                        {selected && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <polyline points="1 4 3 6 7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
            <FieldError msg={errors.serviceIds} />
          </Section>

          {/* Date & Time */}
          <Section title="Дата і час">
            <div className="mb-4">
              <label className="text-xs text-stone-500 mb-1.5 block">Дата</label>
              <input
                type="date"
                min={getTodayStr()}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className={inputCls(!!errors.date)}
              />
              <FieldError msg={errors.date} />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Час</label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set('time', t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      form.time === t
                        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md shadow-rose-300/30'
                        : 'bg-white border border-rose-200 text-stone-500 hover:text-stone-800 hover:border-rose-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <FieldError msg={errors.time} />
            </div>
          </Section>

          {/* Contact */}
          <Section title="Контактні дані">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Ім'я та прізвище *" error={errors.name}>
                <input type="text" placeholder="Олена Іваненко" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls(!!errors.name)} />
              </Field>
              <Field label="Телефон *" error={errors.phone}>
                <input type="tel" placeholder="+38 (067) 000-00-00" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls(!!errors.phone)} />
              </Field>
              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls(!!errors.email)} />
              </Field>
            </div>
          </Section>

          {/* Notes */}
          <Section title="Додаткові побажання">
            <textarea
              rows={4}
              placeholder="Особливі побажання, форма нігтів, колір, що турбує..."
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-rose-200 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-rose-400 transition-colors resize-none"
            />
          </Section>

          {/* Summary */}
          <AnimatePresence>
            {selectedServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3"
              >
                {selectedServices.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-rose-500 shrink-0">{SERVICE_ICONS[s.id] ?? s.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-stone-800">{s.name}</p>
                        <p className="text-xs text-stone-500">{formatDuration(s.duration)}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-stone-800 shrink-0">{s.priceLabel}</p>
                  </div>
                ))}
                {selectedServices.length > 1 && (
                  <div className="pt-3 border-t border-rose-200 flex items-center justify-between">
                    <p className="text-xs text-stone-500">Разом · {formatDuration(totalDuration)}</p>
                    <p className="text-xl font-bold text-stone-800">{totalPrice} грн</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-base shadow-2xl shadow-rose-300/40 hover:shadow-rose-300/60 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {submitting ? 'Відправляємо...' : 'Підтвердити запис'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-rose-100 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wider mb-5">{title}</h2>
      {children}
    </motion.div>
  )
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs text-stone-500 mb-1.5 block">{label}</label>
      {children}
      <FieldError msg={error} />
    </div>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1.5">{msg}</p>
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-stone-500">{label}</span>
      <span className="text-sm text-stone-800 font-medium text-right">{value}</span>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl bg-white border text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-rose-400 transition-colors ${hasError ? 'border-red-400' : 'border-rose-200'}`
}
