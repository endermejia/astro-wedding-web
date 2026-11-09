import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { CatPawsSvg } from './icons/GeekIcons';

export const FooterSection: React.FC = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pb-28 pt-10 text-center px-6 overflow-hidden bg-gradient-to-b from-transparent to-[#F5EFE2]/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Subtle Pawprints Ornament */}
        <div aria-hidden="true" className="text-[#B86B4B]/70 mb-4">
          <CatPawsSvg className="w-7 h-7" />
        </div>

        {/* Closing Heartfelt Message from Invitation */}
        <p className="font-script text-4xl sm:text-5xl md:text-6xl text-[#555B2F] leading-tight">
          {t.footer.closingQuote}
        </p>

        {/* Fresco Mediterranean Arch Emblem */}
        <div className="mt-10 relative w-64 sm:w-72 py-10 px-6 rounded-t-[140px] border border-[#555B2F]/35 bg-[#FCF8F0] shadow-xs flex flex-col items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-1.5 rounded-t-[135px] border border-[#C59B57]/35"
          />

          <p className="font-display text-3xl sm:text-4xl text-[#555B2F] leading-none">
            {t.couple.partner1}
          </p>
          <p className="font-editorial italic text-xl text-[#B86B4B] my-1">
            {t.couple.symbolicConjunction}
          </p>
          <p className="font-display text-3xl sm:text-4xl text-[#555B2F] leading-none">
            {t.couple.partner2}
          </p>

          <div className="w-10 h-px bg-[#555B2F]/25 my-3" />

          <p className="font-sans-label text-[10px] tracking-[0.28em] uppercase text-[#555B2F]/75">
            {t.date.fullDateLabel}
          </p>
          <p className="font-sans-label text-[9px] tracking-[0.22em] uppercase text-[#555B2F]/55 mt-1">
            {t.footer.locationLabel}
          </p>
        </div>

        {/* Back to Top */}
        <div className="mt-10 flex flex-col items-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 font-sans-label text-[10px] tracking-[0.22em] uppercase text-[#555B2F]/75 hover:text-[#555B2F] border-b border-[#555B2F]/30 pb-1 cursor-pointer transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            <span>{t.footer.backToTop}</span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
