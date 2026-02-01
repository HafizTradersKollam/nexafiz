// Contact Page Constants

export const INQUIRY_TYPES = [
  { value: '', label: 'Select inquiry type' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Shop Partnership' },
  { value: 'support', label: 'Customer Support' },
  { value: 'business', label: 'Business Opportunity' },
  { value: 'feedback', label: 'Feedback' },
] as const;

export const CONTACT_INFO = {
  email: 'hafiztraderstrivandrum@gmail.com',
  supportEmail: 'support@nexafizglobal.com',
  phone: '+91 98765 43210',
  offices: [
    {
      name: 'Kollam Office',
      address: 'Hafiz Fabrics, Masjid Complex, Bypass Road',
      city: 'Kallumthazham PO, Kollam – 691004',
      state: 'Kerala, India',
    },
    {
      name: 'Thiruvananthapuram Office',
      address: 'Nexafiz Support Center, City Centre',
      city: 'Thiruvananthapuram, Kerala',
      state: 'Kerala, India',
    },
  ],
  socialLinks: {
    facebook: 'https://facebook.com/nexafizglobal',
    instagram: 'https://instagram.com/nexafizglobal',
    youtube: 'https://youtube.com/@nexafizglobal',
    whatsapp: 'https://wa.me/919876543210',
  },
} as const;

