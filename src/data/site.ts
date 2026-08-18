import type { Accommodation, Experience, FooterColumn, NavItem, Testimonial } from '../types/estate';

export const estate = {
  name: 'The Tea Bungalow',
  address: 'Moragolla Rd, Galaha, Sri Lanka',
  phone: '+94 77 123 4567',
  phoneAlt: '+94 81 234 5678',
  email: 'stay@theteabungalow.lk',
  region: 'Galaha, Sri Lanka'
};

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'The Estate', href: '/explore' },
  { label: 'Stay', href: '/chambers' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Private Estate', href: '/buyout' },
  { label: 'Destination', href: '/destination' },
  { label: 'Direct Booking', href: '/book' },
  { label: 'Plan Your Stay', href: '/plan' }
];


export const footerColumns: FooterColumn[] = [
  {
    title: 'The House',
    links: [
      { label: 'The Estate', href: '/explore' },
      { label: 'Estate Buyout', href: '/buyout' },
      { label: 'Destination Galaha', href: '/destination' },
      { label: 'Ask Concierge', href: '/plan' }
    ]
  },
  {
    title: 'Chambers',
    links: [
      { label: "Founder's Suite", href: '/chambers/founders' },
      { label: 'Highlands Suite', href: '/chambers/highlands' },
      { label: 'Carriage House', href: '/chambers/carriage' },
      { label: 'All Chambers', href: '/chambers' }
    ]
  },
  {
    title: 'Experiences',
    links: [
      { label: 'Tea Estate Walk', href: '/experiences' },
      { label: 'Private Tea Tasting', href: '/experiences' },
      { label: 'Pekoe Trail', href: '/experiences' },
      { label: 'Plan Your Stay', href: '/plan' }
    ]
  },
  {
    title: 'Distribution & Direct',
    links: [
      { label: 'Direct Booking Engine', href: '/book' },
      { label: 'Distribution Architecture', href: '/distribution' },
      { label: 'Send Stay Enquiry', href: '/enquire' }
    ]
  }
];


export const imagery = {
  teaFields: "/cf383538-79e1-4bf6-ae95-0d8bf85299d8.jpg",
  bungalow: "/ffa30956-5233-4a2e-ace3-4e70258c1c0e.jpg",
  chamber: "/2a93977e-3121-4e08-8afd-57ed2f8b6949.jpg",
  teaService: "/972f618b-45a5-42c0-8f54-7bfd9c42ff35.jpg",
  verandah: "/b1552e7e-6fb1-4932-a707-e1187fb27300.jpg"
};

export const experiences: Experience[] = [
{
  id: 'tea-walks',
  category: 'Mornings',
  title: 'Tea Estate Walks',
  description:
  "Guided walks through our century-old tea terraces. Witness the morning plucking and learn the art of the 'two leaves and a bud'.",
  image: imagery.teaFields,
  imageAlt: 'Mist lifting from highland tea terraces at dawn',
  icon: 'leaf'
},
{
  id: 'pekoe-trail',
  category: 'Adventure',
  title: 'Pekoe Trail Access',
  description:
  "Direct access to one of the world's most scenic long-distance walking trails, winding through the heart of Ceylon tea country.",
  image: imagery.bungalow,
  imageAlt: 'The heritage bungalow set among tea bushes and garden',
  icon: 'trail'
},
{
  id: 'tea-tastings',
  category: 'Curated',
  title: 'Private Tea Tastings',
  description:
  "A sensory journey through Ceylon's finest grades, hosted on the verandah overlooking the mist-covered valleys.",
  image: imagery.teaService,
  imageAlt: 'Ceylon tea poured from a white porcelain teapot in the garden',
  icon: 'tea'
}];


export const chambers: Accommodation[] = [
{
  id: 'founders',
  index: '01',
  name: "The Founder's Suite",
  description:
  'The principal chamber. A private verandah opens toward the hills, with direct steps to The Private Pool. Morning tea may be served here in complete privacy.',
  meta: ['Private verandah', 'Pool access', 'Two guests']
},
{
  id: 'highlands',
  index: '02',
  name: 'The Highlands Suite',
  description:
  'Spacious and fully accessible, with the ability to connect internally to The Pekoe Room, forming a private family wing when desired.',
  meta: ['Step-free', 'Connecting', 'Three guests']
},
{
  id: 'verandah',
  index: '03',
  name: 'Verandah Chamber',
  description:
  'Along the verandah, rooted in the quiet language of tea country. Direct garden access and the gentle rhythm of hill mornings.',
  meta: ['Garden access', 'Two guests']
}];


export const featuredChamber: Accommodation = {
  id: 'carriage-house',
  index: '07',
  name: 'The Carriage House',
  description:
  'A fully stepless two-bedroom residence set slightly apart within the grounds, with its own living and dining space. A retreat within the retreat.',
  image: imagery.chamber,
  imageAlt: 'Antique carved bed and warm lamplight in a colonial chamber',
  meta: ['Two bedrooms', 'Private living room', 'Four guests']
};

export const testimonial: Testimonial = {
  id: 'wolfe',
  quote:
  'The tea field walk at dawn was unlike anything I have experienced. Our guide knew every plant, every bird, every cloud formation. The bungalow itself feels like time has been kept on purpose.',
  author: 'James & Catherine Wolfe',
  location: 'Edinburgh, Scotland',
  source: 'Tripadvisor'
};