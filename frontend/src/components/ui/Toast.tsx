import { AnimatePresence, motion } from 'framer-motion'
import { useToast, type ToastType } from '../../context/ToastContext'

const toastStyle: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  error:   'border-red-200 bg-red-50 text-red-600',
  warning: 'border-amber-200 bg-amber-50 text-amber-600',
  info:    'border-rose-200 bg-rose-50 text-rose-600',
}

const toastIcon: Record<ToastType, string> = {
  success: '✓', error: '✕', warning: '⚠', info: 'ℹ',
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl min-w-64 max-w-sm ${toastStyle[t.type]}`}
          >
            <span className="text-sm font-bold shrink-0">{toastIcon[t.type]}</span>
            <p className="text-sm flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity text-xs"
            >✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
