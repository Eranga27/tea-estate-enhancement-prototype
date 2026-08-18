import { photography } from './homepage';

export type JourneyIntention =
  | 'all'
  | 'tea-heritage'
  | 'culture'
  | 'trails'
  | 'nature'
  | 'highlands'
  | 'slow';

export interface BeyondDestination {
  id: string;
  index: string;
  name: string;
  region: string;
  /** Short tagline – one evocative line */
  tagline: string;
  description: string;
  /** Why it is worth the journey */
  appeal: string;
  /** Travel context from the Bungalow – keep vague, no exact times */
  travelContext: string;
  image: string;
  imageAlt: string;
  /** Which journeyIntention tags match */
  intentions: JourneyIntention[];
  /** Optional advisory note */
  advisory?: string;
  /** CTA label if applicable */
  ctaLabel?: string;
  ctaHref?: string;
}

export const beyondDestinations: BeyondDestination[] = [
  {
    id: 'the-bungalow',
    index: '00',
    name: 'The Tea Bungalow',
    region: 'Moragolla Road, Galaha',
    tagline: 'The origin point of every journey.',
    description:
      'At 3,000 feet above the Kandy basin, the estate sits at the edge of one of the last great working tea landscapes in Sri Lanka. The bungalow is not simply a place to sleep – it is the beginning of a highland passage.',
    appeal:
      'The verandah stretches the full length of the house. From it, the tea terraces fall away into the valley and the mist arrives, on most evenings, before the sun.',
    travelContext: 'Your origin. Everything begins here.',
    image: photography.bungalow,
    imageAlt: 'The Tea Bungalow set among tea gardens in the Galaha highlands',
    intentions: ['all', 'slow', 'tea-heritage'],
    ctaLabel: 'Explore the Estate',
    ctaHref: '/explore',
  },
  {
    id: 'galaha',
    index: '01',
    name: 'Galaha & Tea Country',
    region: 'Galaha District',
    tagline: 'The working heart of highland tea.',
    description:
      'The village of Galaha and its surrounding valleys form one of the most intact working tea landscapes in Ceylon. Leaf is still weighed at dusk beside the road. Orthodox factories hum through the night.',
    appeal:
      'The landscape here is not a museum. It is an active, living industry with the texture of another century — smoke from factory chimneys, the smell of withering leaf drifting down the ridge.',
    travelContext: 'Within the estate grounds and minutes from the gate.',
    image: photography.teaFields,
    imageAlt: 'Tea terraces at dawn above Galaha village in the Sri Lankan highlands',
    intentions: ['all', 'tea-heritage', 'nature', 'slow'],
    ctaLabel: 'The Tea Journey',
    ctaHref: '/tea-journey',
  },
  {
    id: 'kandy',
    index: '02',
    name: 'Kandy',
    region: 'The Hill Capital',
    tagline: 'The last royal capital of the Kandyan kingdom.',
    description:
      "Below the highland passes, Kandy sits beside its lake at the centre of the island's cultural life. The Temple of the Tooth, the Kandyan arts, the market quarter — each demands unhurried time.",
    appeal:
      "The city rewards those who arrive slowly and without an itinerary. The lake walk at dawn, the spice market off Dalada Street, and the evening puja at the temple are experiences that belong to no guidebook.",
    travelContext: 'Reachable from the estate in under an hour, conditions permitting.',
    image: '/kandy.jpg',
    imageAlt: 'The Temple of the Tooth and Kandy Lake in the cultural capital of Sri Lanka',
    intentions: ['culture', 'slow', 'highlands'],
    ctaLabel: 'Ask the Concierge',
    ctaHref: '/enquire',
  },
  {
    id: 'loolkandura',
    index: '03',
    name: 'Loolkandura & the Pekoe Trail',
    region: 'Above Galaha, Hantana Ridge',
    tagline: "The world's oldest tea bushes, still yielding.",
    description:
      "Loolkandura Estate contains some of the oldest commercially planted tea bushes in the world, set within a ridge landscape that remains largely unchanged since the 19th century. The Pekoe Trail passes directly through this terrain.",
    appeal:
      "The combination of deep tea heritage and challenging ridge walking is unique in Sri Lanka. Few guests reach Loolkandura. Those who do rarely forget it.",
    travelContext:
      'A half-day walk from the estate gate, or arrange transport to the trailhead.',
    image: '/loolkandura.png',
    imageAlt: 'Loolkandura Estate and the Pekoe Trail winding through ancient tea terraces',
    intentions: ['tea-heritage', 'trails', 'nature'],
    advisory:
      'Trail conditions on the Pekoe Trail may change seasonally. Verify current status before departure. Our team can advise on conditions at time of stay.',
    ctaLabel: 'Pekoe Trail Access',
    ctaHref: '/experiences',
  },
  {
    id: 'ramboda',
    index: '04',
    name: 'Ramboda',
    region: 'Ramboda Pass & Falls',
    tagline: 'Where the highlands become dramatic.',
    description:
      'The Ramboda Pass carries the highland road to Nuwara Eliya through one of the most dramatic landscape transitions in the island. The falls at Ramboda, one of the highest in Sri Lanka, mark the change in altitude.',
    appeal:
      'There is a particular quality of light in the Ramboda gorge – slanted and green, caught in spray from the falls. The road itself, switchbacking through working estates, is a journey in its own right.',
    travelContext:
      'En route to Nuwara Eliya. A natural stopping point on the highland road.',
    image: '/ramboda.jpg',
    imageAlt: 'Ramboda Falls and the dramatic highland pass on the road to Nuwara Eliya',
    intentions: ['highlands', 'nature', 'slow'],
  },
  {
    id: 'nuwara-eliya',
    index: '05',
    name: 'Nuwara Eliya',
    region: 'The High Country',
    tagline: 'Little England, at 6,000 feet.',
    description:
      "The highest town in Sri Lanka carries the ghost of the British planting era – post offices, racecourses, gentleman's clubs, and rose gardens at altitude. The surrounding tea estates produce Ceylon's most delicate, high-grown teas.",
    appeal:
      'Cold mornings, log fires, and the strange elegance of a colonial hill station that time has preserved more than abandoned. Walk the Victoria Park at dawn, when the fog still holds the flower beds.',
    travelContext:
      'A long morning drive from the estate through some of the most extraordinary highland scenery in Asia.',
    image: '/nuwaraeliya.png',
    imageAlt: 'Nuwara Eliya — the high-country colonial town surrounded by Ceylon tea estates',
    intentions: ['highlands', 'culture', 'tea-heritage', 'slow'],
    ctaLabel: 'Design This Journey',
    ctaHref: '/plan',
  },
  {
    id: 'wider-highlands',
    index: '06',
    name: 'The Wider Highlands',
    region: 'Central Province, Sri Lanka',
    tagline: 'A landscape that takes a week to begin to read.',
    description:
      "Beyond the named destinations, the Central Highlands of Sri Lanka offer a landscape of extraordinary depth – Horton Plains, the world's end escarpment, Ella, and the ancient forests of Knuckles Range.",
    appeal:
      "This is the territory for guests returning for a second or third stay; for those who understand that the most valuable itinerary is the one that leaves room to change course after breakfast.",
    travelContext:
      'Multi-day excursions. Best arranged with the concierge well in advance of arrival.',
    image: '/thewiderhighlands.jpg',
    imageAlt: 'The sweeping Central Highlands of Sri Lanka — a vast landscape of tea, forest and mist',
    intentions: ['highlands', 'trails', 'nature', 'slow'],
    ctaLabel: 'Design My Escape',
    ctaHref: '/plan',
  },
];

export const intentionLabels: Record<JourneyIntention, string> = {
  all: 'All Journeys',
  'tea-heritage': 'Tea & Heritage',
  culture: 'Culture',
  trails: 'Walking & Trails',
  nature: 'Nature',
  highlands: 'Highland Landscapes',
  slow: 'Slow Travel',
};

export interface CuratedRoute {
  id: string;
  name: string;
  tagline: string;
  stops: string[]; // destination names
  character: string;
}

export const curatedRoutes: CuratedRoute[] = [
  {
    id: 'tea-country',
    name: 'Tea Country',
    tagline: 'The deep leaf road.',
    stops: ['The Tea Bungalow', 'Galaha', 'Loolkandura', 'Nuwara Eliya'],
    character:
      'Two to three days. Unhurried. Walk the trail sections between factory visits. End in the cold air of Nuwara Eliya.',
  },
  {
    id: 'cultural-highlands',
    name: 'Cultural Highlands',
    tagline: 'Capital and estate.',
    stops: ['The Tea Bungalow', 'Kandy', 'Peradeniya', 'Return to the estate'],
    character:
      'A day and a half. Kandy in the morning, Peradeniya Gardens in the afternoon, back for verandah sundowners.',
  },
  {
    id: 'high-country',
    name: 'High Country',
    tagline: 'The pass and the cold.',
    stops: ['The Tea Bungalow', 'Ramboda Pass', 'Nuwara Eliya'],
    character:
      'A full day into the high altitude. Log fires that evening. Return the following morning through different valleys.',
  },
  {
    id: 'grand-highland',
    name: 'The Grand Highland Journey',
    tagline: 'A week that changes your sense of scale.',
    stops: [
      'The Tea Bungalow',
      'Kandy',
      'Tea Country & Loolkandura',
      'Nuwara Eliya',
      'The Wider Highlands',
    ],
    character:
      'Five to seven days. Begin here, let the highland roads determine the route. Return with different eyes.',
  },
];
