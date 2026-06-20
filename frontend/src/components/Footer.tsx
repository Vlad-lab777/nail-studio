import { NavLink } from 'react-router-dom'

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="#FFE4E9"/>
      <path d="M16 5 L18.4 13.6 L27 16 L18.4 18.4 L16 27 L13.6 18.4 L5 16 L13.6 13.6 Z" fill="#E11D74"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer id="contacts" className="bg-rose-50 border-t border-rose-100 py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BrandMark />
              <span className="font-bold text-stone-800">Lumière Nails</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              Манікюрний салон у Києві.<br />
              Манікюр, що говорить за вас.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Навігація</p>
            <ul className="space-y-2">
              {[['/', 'Головна'], ['/services', 'Послуги'], ['/booking', 'Записатись'], ['/reviews', 'Відгуки']].map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm text-stone-500 hover:text-stone-800 transition-colors">{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Контакти</p>
            <ul className="space-y-3">
              {[
                { icon: '📞', text: '+380 67 000 00 00' },
                { icon: '📍', text: 'Київ, вул. Хрещатик 22' },
                { icon: '🕐', text: 'Пн–Нд: 9:00 – 20:00' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-stone-500">
                  <span>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">© 2026 Lumière Nails. Всі права захищено.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-stone-500 hover:text-stone-800 transition-colors">Instagram</a>
            <a href="#" className="text-xs text-stone-500 hover:text-stone-800 transition-colors">Facebook</a>
            <a href="#" className="text-xs text-stone-500 hover:text-stone-800 transition-colors">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
