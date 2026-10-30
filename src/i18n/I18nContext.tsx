import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  DICTIONARIES,
  getTranslations,
  type Locale,
  type Translations,
} from './index';

const STORAGE_KEY = 'boda-iris-adela-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: Translations;
  locales: readonly { code: Locale; shortLabel: string; languageName: string }[];
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function isValidLocale(val: string | null): val is Locale {
  return val === 'es' || val === 'va';
}

export const I18nProvider: React.FC<{
  children: React.ReactNode;
  initialLocale?: Locale;
}> = ({ children, initialLocale = DEFAULT_LOCALE }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (isValidLocale(urlLang)) {
        setLocaleState(urlLang);
        window.localStorage.setItem(STORAGE_KEY, urlLang);
        return;
      }

      if (initialLocale !== DEFAULT_LOCALE) {
        setLocaleState(initialLocale);
        window.localStorage.setItem(STORAGE_KEY, initialLocale);
        return;
      }

      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidLocale(stored)) {
        setLocaleState(stored);
      }
    } catch {
      // Ignore storage access errors
    }
  }, [initialLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useMemo(() => getTranslations(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.meta.title;
  }, [t]);

  const locales = useMemo(
    () =>
      AVAILABLE_LOCALES.map((code) => ({
        code,
        shortLabel: DICTIONARIES[code].shortLabel,
        languageName: DICTIONARIES[code].languageName,
      })),
    []
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      locales,
    }),
    [locale, setLocale, t, locales]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
