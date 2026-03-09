// Brand Colors (for reference - actual colors in globals.css)
export const COLORS = {
  primary: '#00A86B',
  accent: '#F5A623',
} as const;

// Company Information 
export const COMPANY = {
  name: 'NEXAFIZ',
  tagline: 'Turn Your Daily Life Into Income',
  description: 'A next-generation digital platform that converts your daily purchases — and the purchases made by your network — into a continuous income stream.',
  domain: 'nexafizglobal.com',
  email: 'nexafizglobal@gmail.com',
  supportEmail: 'nexafizglobal@gmail.com',
  phone: '+91 86060 46666',
  offices: [
    {
      name: 'Kollam Office',
      address: 'Nexafiz Global, Masjid Complex, Bypass Road',
      city: 'Kallumthazham PO, Kollam – 691004',
      state: 'Kerala, India',
    }
  ],
  socialLinks: {
    facebook: 'https://facebook.com/nexafizglobal',
    instagram: 'https://instagram.com/nexafizglobal',
    youtube: 'https://youtube.com/@nexafizglobal',
    whatsapp: 'https://wa.me/918606046666',
  },
} as const;

// Navigation Links 
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Shops', href: '/shops' },
  { name: 'Products', href: '/products' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Contact', href: '/contact' },
] as const;

// Stats
export const STATS = [
  { value: '200+', label: 'Partner Shops' },
  { value: '10K+', label: 'Active Members' },
  { value: '₹50L+', label: 'Earnings Distributed' },
  { value: '6+', label: 'Categories' },
] as const;
