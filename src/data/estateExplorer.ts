export interface EstateLocation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  atmosphere: string;
  image: string;
  imageAlt: string;
  coordinates: { x: number; y: number }; // Percentage position on map
  type: 'residence' | 'garden' | 'accommodation' | 'leisure';
  relatedExperienceId?: string;
  relatedChamberId?: string;
  highlights: string[];
}

export const estateLocations: EstateLocation[] = [
  {
    id: 'main-residence',
    name: 'The Main Residence',
    tagline: 'Circa 1899 · Colonial Architecture',
    description: 'Built in 1899 for the estate founder, featuring original teak floors, tall shuttered doors, and high ceilings that carry the scent of cured tea leaves.',
    atmosphere: 'Cool, quiet interior filled with soft lamplight and historic estate heirlooms.',
    image: '/ffa30956-5233-4a2e-ace3-4e70258c1c0e.jpg',
    imageAlt: 'Heritage Main Residence surrounded by lush tea gardens',
    coordinates: { x: 48, y: 42 },
    type: 'residence',
    highlights: ['Built in 1899', 'Six principal chambers', 'Founders hallway archive']
  },
  {
    id: 'verandah',
    name: 'The Long Verandah',
    tagline: 'Open-Air Gallery · Valley View',
    description: 'A shaded deep corridor spanning the entire front of the residence. Mornings begin here with bed tea, and afternoons end watching valley mist roll over the hills.',
    atmosphere: 'Un-hurried, gentle breeze, rattan armchairs, and bird song at dawn.',
    image: '/b1552e7e-6fb1-4932-a707-e1187fb27300.jpg',
    imageAlt: 'Lantern-lit verandah with cane seating overlooking highland valley',
    coordinates: { x: 42, y: 52 },
    type: 'residence',
    relatedExperienceId: 'tea-tastings',
    highlights: ['All-day tea service', 'Panoramic Galaha valley view', 'Lantern lit at dusk']
  },
  {
    id: 'tea-pavilion',
    name: 'The Tea Pavilion',
    tagline: 'The Long Table · Al Fresco Dining',
    description: 'A covered garden pavilion with an 18-foot timber dining table. Seats up to 12 guests for estate breakfasts, high teas, and lantern-lit evening dinners.',
    atmosphere: 'Warm, convivial, outdoor dining surrounded by tropical foliage.',
    image: '/d31c77ff-2b39-45ba-9eb1-ff576c1f4fb1.jpg',
    imageAlt: 'Garden dining pavilion set with white linen and lanterns',
    coordinates: { x: 62, y: 35 },
    type: 'dining' as any,
    relatedExperienceId: 'dining',
    highlights: ['Seats up to 12', 'Live garden cooking', 'Candlelit evening feasts']
  },
  {
    id: 'billiards-room',
    name: 'The Billiards Room',
    tagline: 'Full-Size Snooker · Evening Salon',
    description: 'Housed in the original stone kitchen wing, featuring an authentic full-size colonial snooker table, brass lamp fixtures, and a collection of highland malt whiskies.',
    atmosphere: 'Rich timber panelling, quiet clicks of ivory snooker balls, evening relaxation.',
    image: '/13dde97b-4778-4fe4-a681-86d9ec3c0136.jpg',
    imageAlt: 'Colonial billiards room with brass lamps and antique snooker table',
    coordinates: { x: 35, y: 38 },
    type: 'leisure',
    relatedExperienceId: 'estate-life',
    highlights: ['Full-size snooker table', 'Honesty bar & single malts', 'Monsoon games room']
  },
  {
    id: 'private-pool',
    name: 'The Garden & Private Pool',
    tagline: 'Natural Stone · Terraced Sanctuaries',
    description: 'An intimate plunge pool lined with hand-cut local granite, nestled beneath tropical fern trees with direct private steps from the Founder’s Suite.',
    atmosphere: 'Serene, natural water reflection, secluded sunbeds.',
    image: '/c4f92475-de9f-4646-b687-3383a709f81d.jpg',
    imageAlt: 'Terraced tropical garden pool framed by granite stone',
    coordinates: { x: 58, y: 65 },
    type: 'garden',
    relatedChamberId: 'founders',
    highlights: ['Granite stone pool', 'Sun loungers', 'Direct access from Founder Suite']
  },
  {
    id: 'carriage-house',
    name: 'The Carriage House',
    tagline: 'Detached Cottage · Stepless Access',
    description: 'Set slightly apart in the lower garden, this former estate carriage building has been transformed into a stepless two-bedroom private residence.',
    atmosphere: 'Total independence, private living and dining room, quiet garden orchard.',
    image: '/89a621ec-aa22-49ce-ac21-1dfa708b59bc.jpg',
    imageAlt: 'Detached cottage with shuttered windows in garden grounds',
    coordinates: { x: 75, y: 72 },
    type: 'accommodation',
    relatedChamberId: 'carriage',
    highlights: ['Two bedrooms', 'Private living & dining room', 'Fully step-free']
  },
  {
    id: 'tea-terraces',
    name: 'Working Tea Estate Terraces',
    tagline: 'Centuries-Old Camellia Sinensis',
    description: 'Over 15 acres of manicured tea terraces slope downward from the residence. Pluckers gather here at dawn, carrying the harvest to the leaf sheds.',
    atmosphere: 'Crisp morning air, scent of crushed green leaf, sweeping terraced mountain contours.',
    image: '/cf383538-79e1-4bf6-ae95-0d8bf85299d8.jpg',
    imageAlt: 'Mist lifting from highland tea terraces at first light',
    coordinates: { x: 22, y: 75 },
    type: 'garden',
    relatedExperienceId: 'tea-walks',
    highlights: ['Active morning leaf plucking', 'Direct Pekoe Trail access', 'Panoramic mountain ridge']
  }
];
