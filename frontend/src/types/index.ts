export type ServiceCategory = 'manicure' | 'pedicure' | 'extension' | 'design' | 'removal' | 'spa'

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  initials: string
}

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description: string
  duration: number
  price: number
  priceLabel: string
  gradient: string
  icon: string
  active: boolean
}

export interface Review {
  id: string
  clientId: string
  rating: number
  text: string
  createdAt: string
  reply?: string
}
