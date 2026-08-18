import { imagery } from './site';
import type { Experience, Testimonial } from '../types/estate';

export const photography = {
  hero: "/2e9f6192-750c-45ff-ae3f-a2f33a14061a.jpg",
  billiards: "/13dde97b-4778-4fe4-a681-86d9ec3c0136.jpg",
  pavilion: "/d31c77ff-2b39-45ba-9eb1-ff576c1f4fb1.jpg",
  garden: "/c4f92475-de9f-4646-b687-3383a709f81d.jpg",
  carriage: "/89a621ec-aa22-49ce-ac21-1dfa708b59bc.jpg",
  foundersSuite: "/a34982e4-24e2-49e9-9fba-210ad0a261a8.jpg",
  highlandsSuite: "/526c067a-6693-4b97-b6e8-7c3aa393067c.jpg",
  verandahChamber: "/340ecad5-2e6a-4988-8855-14b0cca39862.jpg",
  teaFactory: "/a1272a53-c3dc-4279-97fd-b3f60f4da86e.jpg",
  pekoeTrail: "/11534c39-3068-4ff9-806e-10f2b26a0119.jpg",
  ...imagery
};

export interface Destination {
  id: string;
  index: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  note: string;
}

export const destinations: Destination[] = [
{
  id: 'residence',
  index: '01',
  name: 'The Main Residence',
  eyebrow: 'The House',
  description:
  'Built in 1899 for the estate founder and lived in ever since. Tall shuttered rooms, polished timber floors, and a hall that still smells faintly of tea chests.',
  image: photography.bungalow,
  imageAlt: 'The heritage bungalow set among tea bushes and garden planting',
  note: 'Circa 1899 · Six chambers'
},
{
  id: 'verandah',
  index: '02',
  name: 'The Verandah',
  eyebrow: 'Quiet Observation',
  description:
  'A shaded corridor running the length of the house. Mornings begin here with bed tea; afternoons end here with the mist coming up the valley.',
  image: photography.verandah,
  imageAlt: 'Lantern-lit verandah with cane furniture looking over misty hills',
  note: 'Open all hours · Valley aspect'
},
{
  id: 'pavilion',
  index: '03',
  name: 'Tea Pavilion',
  eyebrow: 'The Long Table',
  description:
  'Covered, open-sided, and set for long meals. Estate breakfasts in the morning; live cooking and lantern-lit feasts once the light goes.',
  image: photography.pavilion,
  imageAlt: 'Garden dining pavilion with a long table set with linen and lanterns',
  note: 'Seats twelve · Live cooking'
},
{
  id: 'billiards',
  index: '04',
  name: 'Billiards Room',
  eyebrow: 'Rainy Afternoons',
  description:
  'Once the estate kitchen, now given over to play. Panelled walls, a full-size table, and the unhurried hours that highland weather insists upon.',
  image: photography.billiards,
  imageAlt: 'Colonial billiards room with antique snooker table and brass lamps',
  note: 'Full-size table · Evening bar'
},
{
  id: 'garden',
  index: '05',
  name: 'The Garden & Pool',
  eyebrow: 'Sanctuaries',
  description:
  'Terraced planting, natural stone, and an intimate pool just beyond the Founder’s verandah. Small by design, private by consequence.',
  image: photography.garden,
  imageAlt: 'Terraced tropical garden with an intimate stone-framed pool',
  note: 'Private access · Garden tea'
},
{
  id: 'chambers',
  index: '06',
  name: 'The Chambers',
  eyebrow: 'Within the House',
  description:
  'Six rooms, each named for the estate and each with its own character. Two connect internally to form a private family wing.',
  image: photography.foundersSuite,
  imageAlt: 'Four-poster bed and open french doors onto a private verandah',
  note: 'Six chambers · Up to twelve guests'
},
{
  id: 'carriage',
  index: '07',
  name: 'The Carriage House',
  eyebrow: 'Within the Grounds',
  description:
  'The former estate outbuilding, set slightly apart. A fully stepless two-bedroom residence with its own living and dining space — a retreat within the retreat.',
  image: photography.carriage,
  imageAlt: 'Detached colonial cottage with shuttered windows and stone garden path',
  note: 'Two bedrooms · Stepless'
}];


export interface Chamber {
  id: string;
  index: string;
  name: string;
  aspect: string;
  description: string;
  image: string;
  imageAlt: string;
  meta: string[];
}

export const chamberCollection: Chamber[] = [
{
  id: 'founders',
  index: '01',
  name: "Founder's Suite",
  aspect: 'Private verandah · Pool steps',
  description:
  'The principal chamber. A private verandah opens toward the hills, with direct steps down to the pool. Morning tea may be served here in complete privacy.',
  image: photography.foundersSuite,
  imageAlt: 'Four-poster bed with french doors opening to a private verandah',
  meta: ['Two guests', 'King bed', 'Valley aspect']
},
{
  id: 'highlands',
  index: '02',
  name: 'Highlands Suite',
  aspect: 'Step-free · Connecting',
  description:
  'Spacious and fully accessible, able to connect internally with the Pekoe Room to form a private family wing when desired.',
  image: photography.highlandsSuite,
  imageAlt: 'Bright colonial bedroom with twin antique carved beds',
  meta: ['Three guests', 'Twin or king', 'Garden aspect']
},
{
  id: 'verandah',
  index: '03',
  name: 'Verandah Chamber',
  aspect: 'Direct garden access',
  description:
  'Along the verandah, rooted in the quiet language of tea country. Direct garden access and the gentle rhythm of hill mornings.',
  image: photography.verandahChamber,
  imageAlt: 'Colonial bedroom opening onto a garden verandah',
  meta: ['Two guests', 'Queen bed', 'Garden aspect']
},
{
  id: 'pekoe',
  index: '04',
  name: 'Pekoe Room',
  aspect: 'Connects to Highlands',
  description:
  'Named for the finest of the leaf grades. Connects to the Highlands Suite for families seeking a private wing within the house.',
  image: photography.chamber,
  imageAlt: 'Antique carved bed and warm lamplight in a colonial chamber',
  meta: ['Two guests', 'Twin beds']
},
{
  id: 'camellia',
  index: '05',
  name: 'Camellia Room',
  aspect: 'Views into the garden',
  description:
  'Named for the tea plant itself. A serene chamber along the verandah with views into the estate garden.',
  image: photography.verandah,
  imageAlt: 'Cane seating on the estate verandah at dusk',
  meta: ['Two guests', 'Queen bed']
},
{
  id: 'galaha',
  index: '06',
  name: 'Galaha Room',
  aspect: 'Set within the landscape',
  description:
  'Named for the village that frames the estate. Grounded, calm, and wholly present in the landscape beyond the verandah.',
  image: photography.teaFields,
  imageAlt: 'Mist lifting from the Galaha tea terraces at first light',
  meta: ['Two guests', 'Queen bed']
},
{
  id: 'carriage',
  index: '07',
  name: 'The Carriage House',
  aspect: 'Detached · Two bedrooms',
  description:
  'A stepless two-bedroom residence within the grounds, with its own living and dining space. Ideal for families and longer stays.',
  image: photography.carriage,
  imageAlt: 'Detached colonial cottage within the estate grounds',
  meta: ['Four guests', 'Two bedrooms', 'Own living room']
}];


export const estateExperiences: Experience[] = [
{
  id: 'tea-walks',
  category: 'Mornings',
  title: 'Tea Estate Walks',
  description:
  "Guided walks through century-old terraces at first light. Witness the morning plucking and the art of the 'two leaves and a bud'.",
  image: photography.teaFields,
  imageAlt: 'Tea terraces at dawn with mist in the valley',
  icon: 'leaf'
},
{
  id: 'pekoe-trail',
  category: 'Adventure',
  title: 'Pekoe Trail Access',
  description:
  "Direct access to one of the world's great long-distance walking trails, winding through the heart of Ceylon tea country.",
  image: photography.pekoeTrail,
  imageAlt: 'Misty highland walking trail through moss-covered forest',
  icon: 'trail'
},
{
  id: 'factory',
  category: 'Heritage',
  title: 'Tea Factory Visits',
  description:
  'Step inside a working factory to follow the transformation of green leaf to black tea by traditional orthodox methods.',
  image: photography.teaFactory,
  imageAlt: 'Old Ceylon tea factory on a misty hillside',
  icon: 'factory'
},
{
  id: 'tastings',
  category: 'Curated',
  title: 'Private Tea Tastings',
  description:
  "A sensory passage through Ceylon's finest grades, hosted on the verandah above the mist-covered valley.",
  image: photography.teaService,
  imageAlt: 'Ceylon tea poured from a white porcelain teapot',
  icon: 'tea'
},
{
  id: 'dining',
  category: 'Gastronomy',
  title: 'Garden Dining',
  description:
  'Al fresco meals in the gardens and pavilion, drawn from estate-grown produce and traditional hill-country recipes.',
  image: photography.pavilion,
  imageAlt: 'Long dining table set beneath the garden pavilion',
  icon: 'dining'
},
{
  id: 'estate-life',
  category: 'Leisure',
  title: 'Snooker & Estate Life',
  description:
  'Evenings in the billiards room, and the seasonal rhythms of estate life — from monsoon mist to golden harvest.',
  image: photography.billiards,
  imageAlt: 'Antique snooker table beneath low brass lamps',
  icon: 'leisure'
}];


export interface JourneyInterest {
  id: string;
  label: string;
  moment: string;
  detail: string;
}

export const journeyInterests: JourneyInterest[] = [
{
  id: 'tea',
  label: 'Tea & Terroir',
  moment: 'Dawn plucking, then a tasting flight',
  detail: 'A field walk at 6.00, followed by silver tips and orange pekoe on the verandah.'
},
{
  id: 'walking',
  label: 'Walking & Trails',
  moment: 'A Pekoe Trail section before breakfast',
  detail: 'Guided from the gate, returning for a highland breakfast in the pavilion.'
},
{
  id: 'table',
  label: 'The Table',
  moment: 'Lantern-lit dinner at the long table',
  detail: 'A tailored menu built with the estate cook around your party and the season.'
},
{
  id: 'quiet',
  label: 'Quiet & Rest',
  moment: 'An afternoon nobody schedules',
  detail: 'Garden, pool, verandah, book. Tea appears when you ask for it, and not before.'
},
{
  id: 'family',
  label: 'Family & Gathering',
  moment: 'A connected wing and the whole garden',
  detail: 'Adjoining chambers, the Carriage House, and meals that run long into the evening.'
},
{
  id: 'heritage',
  label: 'Heritage & Craft',
  moment: 'Factory floor and estate archive',
  detail: 'A working factory visit, then the founder’s ledgers and photographs over tea.'
}];


export const testimonials: Testimonial[] = [
{
  id: 'wolfe',
  quote:
  'The tea field walk at dawn was unlike anything I have experienced. Our guide knew every plant, every bird, every cloud formation. The bungalow itself feels like time has been kept on purpose.',
  author: 'James & Catherine Wolfe',
  location: 'Edinburgh, Scotland',
  source: 'Stayed in the Founder’s Suite'
},
{
  id: 'perera',
  quote:
  'We took the whole house for my mother’s eightieth. Twelve of us, three generations, one long table. Nobody wanted to leave the verandah.',
  author: 'The Perera Family',
  location: 'Colombo, Sri Lanka',
  source: 'Full estate buyout'
},
{
  id: 'nakamura',
  quote:
  'I came to write and barely managed a page. The mist arrives at four and takes the whole valley with it. I simply watched instead.',
  author: 'Aiko Nakamura',
  location: 'Kyoto, Japan',
  source: 'Stayed in the Camellia Room'
}];


export const nearby = [
{ label: 'Galaha Village', distance: '3 km' },
{ label: 'Kandy', distance: '24 km' },
{ label: 'Peradeniya Gardens', distance: '18 km' },
{ label: 'Nuwara Eliya', distance: '62 km' },
{ label: 'Colombo Airport', distance: '4 hrs' }];