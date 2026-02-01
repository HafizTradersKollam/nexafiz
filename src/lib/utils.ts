import { clsx, type ClassValue } from 'clsx';

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency in Indian Rupees
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with Indian number system (lakhs, crores)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Calculate discount percentage
export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

// Generate stars for rating
export function generateStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

