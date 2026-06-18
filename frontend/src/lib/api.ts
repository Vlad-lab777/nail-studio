import { SERVICES, REVIEWS, CLIENTS } from '../data/mock'

export interface ApiService {
  id: string
  name: string
  category: string
  description: string
  duration: number
  price: number
  priceLabel: string
  gradient: string
  icon: string
  active: boolean
}

export interface ApiReview {
  id: number
  clientName: string
  clientInitials: string
  rating: number
  text: string
  reply: string | null
  createdAt: string
}

const tick = <T>(value: T, delay = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay))

export const api = {
  getServices: () => tick<ApiService[]>(SERVICES as ApiService[]),

  getReviews: () => {
    const reviews: ApiReview[] = REVIEWS.map((r, i) => {
      const client = CLIENTS.find((c) => c.id === r.clientId)
      return {
        id: i + 1,
        clientName: client?.name ?? 'Клієнтка',
        clientInitials: client?.initials ?? '–',
        rating: r.rating,
        text: r.text,
        reply: r.reply ?? null,
        createdAt: r.createdAt,
      }
    })
    return tick<ApiReview[]>(reviews)
  },

  // Демо-форма: ніякого реального запиту не виконується, заявка нікуди не надсилається.
  createBooking: () => tick<{ ok: boolean }>({ ok: true }, 600),
}
