import type { ReactElement } from 'react'

export const SERVICE_ICONS: Record<string, ReactElement> = {
  s1: ( // Манікюр класичний — nail file
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="20" rx="3"/>
    </svg>
  ),
  s2: ( // Манікюр + гель-лак — polish bottle
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4"/>
      <path d="M10 2v3a2 2 0 0 1-.6 1.4L8 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-1.4-1.6A2 2 0 0 1 14 5V2"/>
    </svg>
  ),
  s3: ( // Педикюр класичний — foot
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-2.2 0-4-1.3-4-3.5 0-1.6.9-2.4.9-4.3 0-2.3-1.4-3.2-1.4-5.7a4.5 4.5 0 0 1 9 0c0 2.5-1.4 3.4-1.4 5.7 0 1.9.9 2.7.9 4.3 0 2.2-1.8 3.5-4 3.5z"/>
    </svg>
  ),
  s4: ( // Педикюр + покриття — foot with shine accent
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 21c-2.2 0-4-1.3-4-3.5 0-1.6.9-2.4.9-4.3 0-2.3-1.4-3.2-1.4-5.7a4.5 4.5 0 0 1 9 0c0 2.5-1.4 3.4-1.4 5.7 0 1.9.9 2.7.9 4.3 0 2.2-1.8 3.5-4 3.5z"/>
      <path d="m19 3 .6 1.6L21 5l-1.4.4L19 7l-.6-1.6L17 5l1.4-.4z"/>
    </svg>
  ),
  s5: ( // Нарощування нігтів — gem
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9z"/>
    </svg>
  ),
  s6: ( // Дизайн/розпис — paintbrush
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.06 11.9 19 2l3 3-9.94 9.06"/>
      <path d="M9 16c-1.5 1.5-1.5 3-3 4.5-1 1-2.5 1-3.5 0-1-1-1-2.5 0-3.5C4 15.5 5.5 15.5 7 14z"/>
    </svg>
  ),
  s7: ( // Зняття покриття — remover drop
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.7s6 7.3 6 11.3a6 6 0 0 1-12 0c0-4 6-11.3 6-11.3z"/>
    </svg>
  ),
  s8: ( // SPA-догляд для рук — heart
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z"/>
    </svg>
  ),
}
