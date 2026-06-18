import type { Client, Service, Review } from '../types'

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Олексій Петренко', phone: '+38 (067) 123-45-67', email: 'petrenk@gmail.com', initials: 'ОП' },
  { id: 'c2', name: 'Марія Коваленко', phone: '+38 (050) 987-65-43', email: 'm.kovalenko@ukr.net', initials: 'МК' },
  { id: 'c3', name: 'Дарина Сидоренко', phone: '+38 (073) 456-78-90', email: 'dsydorenko@gmail.com', initials: 'ДС' },
  { id: 'c4', name: 'Анна Мельник', phone: '+38 (063) 321-09-87', email: 'anna.melnyk@ukr.net', initials: 'АМ' },
  { id: 'c5', name: 'Ірина Бондаренко', phone: '+38 (096) 654-32-10', email: 'bondar.iryna@gmail.com', initials: 'ІБ' },
  { id: 'c6', name: 'Тетяна Шевченко', phone: '+38 (068) 789-01-23', email: 'tshevchenko@gmail.com', initials: 'ТШ' },
]

export const SERVICES: Service[] = [
  {
    id: 's1', name: 'Манікюр класичний', category: 'manicure',
    description: 'Обробка кутикули, надання формі нігтя, шліфування. Базовий догляд без покриття.',
    duration: 60, price: 250, priceLabel: '250 грн', gradient: 'from-rose-400 to-pink-500', icon: '💅', active: true,
  },
  {
    id: 's2', name: 'Манікюр + гель-лак', category: 'manicure',
    description: 'Класичний манікюр та стійке покриття гель-лаком у будь-якому кольорі з каталогу.',
    duration: 90, price: 400, priceLabel: '400 грн', gradient: 'from-pink-400 to-fuchsia-500', icon: '✨', active: true,
  },
  {
    id: 's3', name: 'Педикюр класичний', category: 'pedicure',
    description: 'Обробка стоп та кутикули, видалення мозолів, надання формі нігтя. Без покриття.',
    duration: 75, price: 450, priceLabel: '450 грн', gradient: 'from-amber-300 to-rose-300', icon: '🦶', active: true,
  },
  {
    id: 's4', name: 'Педикюр + покриття', category: 'pedicure',
    description: 'Повний догляд за стопами та стійке гель-лакове покриття на ваш вибір.',
    duration: 105, price: 600, priceLabel: '600 грн', gradient: 'from-amber-400 to-orange-400', icon: '🌸', active: true,
  },
  {
    id: 's5', name: 'Нарощування нігтів', category: 'extension',
    description: 'Моделювання нігтів гелем будь-якої довжини та форми. Міцний і легкий результат.',
    duration: 150, price: 700, priceLabel: '700 грн', gradient: 'from-fuchsia-400 to-pink-600', icon: '💎', active: true,
  },
  {
    id: 's6', name: 'Дизайн/розпис', category: 'design',
    description: 'Авторський дизайн, розпис, втирки, стрази та інші декоративні техніки — за вашим бажанням.',
    duration: 30, price: 50, priceLabel: 'від 50 грн', gradient: 'from-rose-300 to-amber-300', icon: '🎨', active: true,
  },
  {
    id: 's7', name: 'Зняття покриття', category: 'removal',
    description: 'Акуратне зняття гель-лаку чи нарощених нігтів без шкоди натуральній нігтьовій пластині.',
    duration: 30, price: 100, priceLabel: '100 грн', gradient: 'from-stone-300 to-rose-300', icon: '🧽', active: true,
  },
  {
    id: 's8', name: 'SPA-догляд для рук', category: 'spa',
    description: 'Пілінг, живильна маска, масаж рук і парафінотерапія для м\'якої та доглянутої шкіри.',
    duration: 45, price: 300, priceLabel: '300 грн', gradient: 'from-amber-300 to-pink-300', icon: '🤲', active: true,
  },
]

export const REVIEWS: Review[] = [
  { id: 'r1', clientId: 'c2', rating: 5, text: 'Гель-лак тримається вже третій тиждень без жодної сколини! Майстер дуже акуратно зробила кутикулу, давно так не доглядали за моїми руками.', createdAt: '2026-05-03T10:00:00Z', reply: 'Дякуємо, Маріє! Раді, що покриття вас порадувало. Чекаємо знову через 3 тижні 💕' },
  { id: 'r2', clientId: 'c4', rating: 5, text: 'Зробила нарощування вперше в житті — боялась, що буде незручно, але нігті виглядають максимально природно і легкі. Форму підібрали ідеально під мою руку.', createdAt: '2026-05-04T14:00:00Z' },
  { id: 'r3', clientId: 'c3', rating: 4, text: 'Педикюр з покриттям — дуже задоволена, ноги як після відпустки. Трохи довше чекала на вільний час, але результат вартий очікування.', createdAt: '2026-04-29T11:00:00Z', reply: 'Дякуємо за відгук! Радимо записуватись на вихідні заздалегідь, у цей час найбільше бажаючих.' },
  { id: 'r4', clientId: 'c6', rating: 5, text: 'Дизайн із втиркою та стразами вийшов просто космос — майстриня запропонувала кілька варіантів і допомогла обрати найкращий під образ. Вже записалась на наступний місяць.', createdAt: '2026-05-05T09:00:00Z' },
  { id: 'r5', clientId: 'c5', rating: 5, text: 'SPA-догляд для рук — це знахідка. Парафінотерапія і масаж зняли всю втому, шкіра стала м\'якою наче після відпустки. Однозначно найкраща студія в місті!', createdAt: '2026-04-22T15:00:00Z', reply: 'Ірино, дуже приємно це чути! Завжди раді бачити вас у нас.' },
  { id: 'r6', clientId: 'c1', rating: 4, text: 'Перший раз робив класичний манікюр у салоні — дуже приємне враження, чисто, акуратно, жодного дискомфорту. Тепер буду ходити регулярно.', createdAt: '2026-05-05T16:00:00Z' },
  { id: 'r7', clientId: 'c2', rating: 5, text: 'Зняття старого нарощування пройшло швидко і зовсім не пошкодило нігтьову пластину, хоча в іншому салоні мене лякали, що буде довго відновлюватись. Дуже професійний підхід.', createdAt: '2026-05-09T12:00:00Z' },
  { id: 'r8', clientId: 'c6', rating: 3, text: 'Манікюр класичний зроблено добре, але хотілося б трохи більше уваги до бокових валиків. Загалом задоволена, але є куди рости.', createdAt: '2026-05-08T10:00:00Z', reply: 'Дякуємо за чесний відгук! Врахуємо ваші побажання.' },
]
