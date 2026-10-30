import { es } from './locales/es';
import { va } from './locales/va';
import type { Locale, Translations } from './types';

export * from './types';
export * from './config';

export const DEFAULT_LOCALE: Locale = 'es';
export const AVAILABLE_LOCALES: readonly Locale[] = ['es', 'va'] as const;

export const DICTIONARIES: Record<Locale, Translations> = {
  es,
  va,
};

export function getTranslations(locale: Locale = DEFAULT_LOCALE): Translations {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
