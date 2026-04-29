// app/products/constants.ts

export const STORE_BASE = 'https://store.nexafizglobal.com';

// All images are free Unsplash photos
export const PRODUCT_CATEGORIES = [
  {
    id: 'grocery',
    name: 'Grocery & Food',
    description: 'Blended masalas, spices, flour, instant mixes, and sweeteners.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    tags: ['Spices', 'Masalas', 'Flour', 'Instant Mix'],
    url: STORE_BASE,
  },
  {
    id: 'textile',
    name: 'Textile Goods',
    description: 'Quality fabrics and textile products for every need.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    tags: ['Fabrics', 'Clothing', 'Textiles'],
    url: STORE_BASE,
  },
  {
    id: 'homecare',
    name: 'Home Care',
    description: 'Floor cleaners, dish wash, laundry and glass cleaners.',
    image: 'https://images.unsplash.com/photo-1649073005971-37babef31983?w=600&q=80',
    tags: ['Floor Cleaner', 'Dish Wash', 'Laundry', 'Fabric Care'],
    url: STORE_BASE,
  },
 {
  id: 'gadgets',
  name: 'Gadgets',
  description: 'Latest electronics, accessories, and smart devices.',
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  tags: ['Electronics', 'Accessories', 'Smart Devices'],
  url: STORE_BASE,
},
  {
    id: 'perfumes',
    name: 'Perfumes & Fragrances',
    description: 'Attars, Arabian perfumes, deodorants and premium fragrances.',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80',
    tags: ['Attars', 'Deodorants', 'Arabian Perfumes'],
    url: STORE_BASE,
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description: 'Skin care, lip care, hand care and health products.',
    image: 'https://images.unsplash.com/photo-1633793566063-52465a148cc7?w=600&q=80',
    tags: ['Skin Care', 'Lip Care', 'Health'],
    url: STORE_BASE,
  },
] as const;