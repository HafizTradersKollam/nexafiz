'use client';

import { useCallback, useSyncExternalStore, useEffect, useRef } from 'react';

type Theme = 'dark' | 'light';

// External store for theme - always returns 'dark' for SSR consistency
function getThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('nexafiz-theme') as Theme | null;
  return stored || 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

// Mounted state store for hydration safety
let mountedState = false;
const mountedListeners = new Set<() => void>();

function getMountedSnapshot(): boolean {
  return mountedState;
}

function getMountedServerSnapshot(): boolean {
  return false;
}

function subscribeToMounted(callback: () => void): () => void {
  mountedListeners.add(callback);
  return () => mountedListeners.delete(callback);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(subscribeToMounted, getMountedSnapshot, getMountedServerSnapshot);
  const hasInitialized = useRef(false);

  // Set mounted state after hydration
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      mountedState = true;
      mountedListeners.forEach(listener => listener());
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('nexafiz-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    window.dispatchEvent(new Event('storage'));
  }, [theme]);

  const setThemeValue = useCallback((newTheme: Theme) => {
    localStorage.setItem('nexafiz-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    window.dispatchEvent(new Event('storage'));
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    mounted,
    isDark: theme === 'dark',
  };
}

