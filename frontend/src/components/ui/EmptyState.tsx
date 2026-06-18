import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-rose-100 flex items-center justify-center text-4xl mb-5">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-stone-700 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 max-w-xs mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-300/30 hover:shadow-rose-300/50 transition-shadow"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  )
}
