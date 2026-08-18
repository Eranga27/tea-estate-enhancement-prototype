export interface ConciergeQA {
  id: string;
  question: string;
  category: 'chambers' | 'experiences' | 'buyout' | 'travel' | 'dining';
  answer: string;
  relatedLink?: { label: string; href: string };
}

export const conciergeDatabase: ConciergeQA[] = [
  {
    id: 'privacy-chamber',
    question: 'Which chamber is best for complete privacy?',
    category: 'chambers',
    answer: "The Founder's Suite offers the maximum privacy within the house, featuring a secluded private verandah with direct steps down to the garden pool. Alternatively, The Carriage House is a detached two-bedroom cottage set apart in the grounds.",
    relatedLink: { label: "Explore Founder's Suite", href: '/chambers/founders' }
  },
  {
    id: 'three-night-stay',
    question: 'What can we do during a three-night stay?',
    category: 'travel',
    answer: 'A ideal 3-night rhythm includes: Day 1 - Mist-watching on the verandah & private lantern dinner. Day 2 - Early morning tea terrace walk, afternoon Ceylon tea tasting, and evening snooker in the Billiards Room. Day 3 - Guided Pekoe Trail walk, garden lunch, and relaxation by the garden pool.',
    relatedLink: { label: 'Plan Your Stay', href: '/plan' }
  },
  {
    id: 'tea-experiences',
    question: 'What tea experiences are available on the estate?',
    category: 'experiences',
    answer: 'Guests can experience dawn plucking with tea estate workers, guided walks through 100-year-old tea terraces, private tea tasting flights of Ceylon white, green, and orthodox black teas on the verandah, and visits to nearby working orthodox tea factories.',
    relatedLink: { label: 'View Experiences', href: '/experiences' }
  },
  {
    id: 'galaha-exploration',
    question: 'What can we explore around Galaha?',
    category: 'travel',
    answer: 'Galaha is the gateway to the historic Pekoe Trail. Nearby highlights include Hantana Mountain Ridge, traditional tea factories, Peradeniya Royal Botanical Gardens (18 km), and the cultural heritage of Kandy (24 km).',
    relatedLink: { label: 'Discover Galaha', href: '/destination' }
  },
  {
    id: 'full-buyout',
    question: 'Can I reserve the entire estate exclusively?',
    category: 'buyout',
    answer: 'Yes, The Tea Bungalow can be reserved in full for up to 12 guests across six chambers and the Carriage House. A private buyout includes exclusive access to all grounds, pool, verandah, and customized dining with the estate chef.',
    relatedLink: { label: 'Private Estate Buyout', href: '/buyout' }
  },
  {
    id: 'transport-transfers',
    question: 'Can transport and airport transfers be arranged?',
    category: 'travel',
    answer: 'Chauffeur transfers can be arranged directly from Colombo Bandaranaike International Airport (approx. 4 hours), Kandy Train Station, or Nuwara Eliya. Private estate vehicles are available for local day excursions.',
    relatedLink: { label: 'Make an Enquiry', href: '/enquire' }
  },
  {
    id: 'family-connecting',
    question: 'Are there connecting rooms for families?',
    category: 'chambers',
    answer: 'Yes, The Highlands Suite and The Pekoe Room connect internally to form a private, step-free family wing within the main house suitable for up to 5 guests.',
    relatedLink: { label: 'View Family Wing', href: '/chambers' }
  },
  {
    id: 'dining-dietary',
    question: 'How does dining work at the estate?',
    category: 'dining',
    answer: 'Dining is personal and flexible—there are no rigid dining hours or fixed menus. Dishes are prepared daily using estate-grown produce, fresh local highland vegetables, and traditional hill-country recipes tailored to your dietary preferences.',
    relatedLink: { label: 'Plan Dining', href: '/plan' }
  }
];
