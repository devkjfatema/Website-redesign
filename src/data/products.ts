import type { Product, ProductFilter } from '../types/store';

export const products: Product[] = [
{
  id: 'energy',
  name: 'Energy',
  benefit: 'Clean lift. Zero crash.',
  description:
  'Smooth, jitter-free energy that hits fast and fades gently. Built for 3pm slumps, early flights and late plans.',
  ingredients: ['L-Theanine', 'Caffeine', 'B12'],
  flavor: 'Sour lime',
  price: 18,
  color: '#B8F400',
  onColor: '#0B0B0C',
  category: 'day',
  rating: 4.9,
  reviewCount: 5214,
  badge: 'Best seller',
  status: 'live'
},
{
  id: 'sleep',
  name: 'Sleep',
  benefit: 'Lights out. No grogginess.',
  description:
  'A gentle reminder to get the F to bed. Wind down without the morning fog of heavy sleep aids.',
  ingredients: ['Melatonin', 'L-Theanine', 'GABA'],
  flavor: 'Blackberry mint',
  price: 18,
  color: '#5B21D6',
  onColor: '#FFFFFF',
  category: 'night',
  rating: 4.8,
  reviewCount: 3870,
  status: 'live'
},
{
  id: 'focus',
  name: 'Focus',
  benefit: 'Locked in. For hours.',
  description:
  'Nootropic strips for deep-work sessions, exam weeks and anyone with 47 tabs open.',
  ingredients: ['Alpha GPC', "Lion's Mane", 'L-Tyrosine'],
  flavor: 'Pink grapefruit',
  price: 20,
  color: '#FF2E88',
  onColor: '#0B0B0C',
  category: 'day',
  rating: 4.8,
  reviewCount: 2195,
  status: 'live'
},
{
  id: 'nad',
  name: 'NAD+',
  benefit: 'Cellular energy, daily.',
  description:
  'Longevity support without the IV-bar price tag. Fuel your cells the low-effort way.',
  ingredients: ['NAD+', 'Resveratrol', 'B3'],
  flavor: 'Blue raspberry',
  price: 28,
  color: '#1E4DFF',
  onColor: '#FFFFFF',
  category: 'longevity',
  rating: 4.9,
  reviewCount: 1342,
  badge: 'New',
  status: 'live'
},
{
  id: 'immunity',
  name: 'Immunity',
  benefit: 'Your daily shield.',
  description: 'Vitamin D3, K2 and zinc in one tiny strip. Dropping this winter.',
  ingredients: ['D3', 'K2', 'Zinc'],
  flavor: 'Citrus burst',
  price: 18,
  color: '#FFE14D',
  onColor: '#0B0B0C',
  category: 'longevity',
  rating: 0,
  reviewCount: 0,
  status: 'drop'
}];


export const productFilters: {id: ProductFilter;label: string;}[] = [
{ id: 'all', label: 'All' },
{ id: 'day', label: 'Daytime' },
{ id: 'night', label: 'Night' },
{ id: 'longevity', label: 'Longevity' }];