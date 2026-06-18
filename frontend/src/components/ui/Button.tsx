import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
}

const variantClass: Record<Variant, string> = {
  primary:   'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-300/30 hover:shadow-rose-300/50',
  secondary: 'bg-white text-stone-700 hover:bg-rose-50 border border-rose-200',
  danger:    'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100',
  ghost:     'text-stone-500 hover:text-stone-800 hover:bg-rose-50',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export function Button({ variant = 'primary', size = 'md', children, loading, icon, className = '', disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as object)}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </motion.button>
  )
}
