import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { COPY, type Copy, type Lang } from '../data/copy';
import { FINISHES, type FinishId } from '../data/product';

export type Theme = 'light' | 'dark';
export type View = 'overview' | 'specs';
/** Where to land after a view switch. */
export type ScrollTarget = 'top' | 'demo';

interface SiteState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
  theme: Theme;
  toggleTheme: () => void;
  dark: boolean;
  finish: FinishId;
  setFinish: (finish: FinishId) => void;
  finishHex: string;
  view: View;
  setView: (view: View, scroll?: ScrollTarget) => void;
}

export function scrollToDemo() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('demo')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

const SiteCtx = createContext<SiteState | null>(null);

const STORAGE_LANG = 'covisart.lang';
const STORAGE_THEME = 'covisart.theme';

function readStored<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const value = localStorage.getItem(key) as T | null;
    return value && allowed.includes(value) ? value : null;
  } catch {
    return null; // private mode / storage disabled
  }
}

function initialLang(): Lang {
  return readStored<Lang>(STORAGE_LANG, ['en', 'tr']) ?? (navigator.language?.startsWith('tr') ? 'tr' : 'en');
}

function initialTheme(): Theme {
  const stored = readStored<Theme>(STORAGE_THEME, ['light', 'dark']);
  if (stored) return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [finish, setFinish] = useState<FinishId>('black');
  const [view, setViewState] = useState<View>('overview');

  // The prototype flipped a stylesheet's media query; here the dark system is
  // scoped to this attribute (see styles/nocturne.css).
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch {
      /* storage disabled — the theme still applies for this session */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_LANG, lang);
    } catch {
      /* as above */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);

  /* A view switch replaces the whole document body, so it has to be followed
     by a scroll — to the top for navigation, to the demo form for the CTAs.
     The scroll runs in a layout effect so the new view is already laid out. */
  const pendingScroll = useRef<ScrollTarget | null>(null);

  const setView = useCallback(
    (next: View, scroll: ScrollTarget = 'top') => {
      if (next === view) {
        if (scroll === 'demo') scrollToDemo();
        return;
      }
      pendingScroll.current = scroll;
      setViewState(next);
    },
    [view],
  );

  useLayoutEffect(() => {
    const target = pendingScroll.current;
    pendingScroll.current = null;
    if (target === 'top') window.scrollTo({ top: 0, behavior: 'auto' });
    else if (target === 'demo') scrollToDemo();
  }, [view]);

  const value = useMemo<SiteState>(
    () => ({
      lang,
      setLang,
      t: COPY[lang],
      theme,
      toggleTheme,
      dark: theme === 'dark',
      finish,
      setFinish,
      finishHex: (FINISHES.find((f) => f.id === finish) ?? FINISHES[0]).hex,
      view,
      setView,
    }),
    [lang, setLang, theme, toggleTheme, finish, view, setView],
  );

  return <SiteCtx.Provider value={value}>{children}</SiteCtx.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

/* The prototype derived a handful of colours from the active theme so that
   reversed (accent-900) sections read correctly in both systems. */
export function useReverseColors() {
  const { dark } = useSite();
  return useMemo(
    () => ({
      fg: dark ? 'var(--color-text)' : 'var(--color-bg)',
      soft: dark
        ? 'color-mix(in srgb, var(--color-text) 82%, transparent)'
        : 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
      muted: dark
        ? 'color-mix(in srgb, var(--color-text) 68%, transparent)'
        : 'color-mix(in srgb, var(--color-bg) 70%, transparent)',
      faint: dark
        ? 'color-mix(in srgb, var(--color-text) 52%, transparent)'
        : 'color-mix(in srgb, var(--color-bg) 55%, transparent)',
      rule: dark
        ? 'color-mix(in srgb, var(--color-text) 22%, transparent)'
        : 'color-mix(in srgb, var(--color-bg) 24%, transparent)',
    }),
    [dark],
  );
}
