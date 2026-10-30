import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { locale, setLocale, locales, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.languageSelectorAria}
      className={`inline-flex items-center gap-0.5 rounded-full border border-[#555B2F]/25 bg-[#FCF8F0]/90 backdrop-blur-md p-1 shadow-[0_6px_20px_-6px_rgba(85,91,47,0.18)] ${className}`}
    >
      {locales.map((item) => {
        const isActive = locale === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            title={item.languageName}
            aria-pressed={isActive}
            className={`px-2.5 py-1 rounded-full font-sans-label text-[10px] tracking-[0.2em] uppercase transition-all cursor-pointer ${
              isActive
                ? 'bg-[#555B2F] text-[#FCF8F0] font-semibold shadow-2xs'
                : 'text-[#555B2F]/65 hover:text-[#555B2F]'
            }`}
          >
            {item.shortLabel}
          </button>
        );
      })}
    </div>
  );
};
