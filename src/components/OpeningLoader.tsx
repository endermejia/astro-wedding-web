import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CatPawsSvg, OneRingSvg } from './icons/GeekIcons';

interface OpeningLoaderProps {
  isOpen: boolean;
  onEnter: (withMusic: boolean) => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ isOpen, onEnter }) => {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 800;
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        setIsReady(true);
        window.clearInterval(interval);
      }
    }, 30);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCF8F0] text-[#555B2F] px-6 py-8 md:py-12 overflow-hidden select-none"
        >
          {/* Decorative Corner Botanical Borders */}
          <div className="pointer-events-none absolute inset-3 md:inset-6 border border-[#555B2F]/20" />
          <div className="pointer-events-none absolute inset-4 md:inset-7 border border-[#C59B57]/25" />

          {/* Language Switcher Top Right */}
          <div className="fixed top-6 right-6 md:top-10 md:right-10 z-20">
            <LanguageSwitcher />
          </div>

          {/* Center Wax Seal, Names & Enter Buttons */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
            {/* Subtle Pawprints Ornament */}
            <div aria-hidden="true" className="flex items-center gap-3 mb-5 text-[#B86B4B]/75">
              {[0, 1, 2].map((step) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0.2, scale: 0.85 }}
                  animate={{ opacity: [0.25, 0.85, 0.35], scale: [0.9, 1.06, 0.95] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: step * 0.35,
                  }}
                >
                  <CatPawsSvg className="w-4 h-4" />
                </motion.div>
              ))}
            </div>

            {/* Wax Seal / Monogram Emblem */}
            <motion.button
              type="button"
              onClick={() => onEnter(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label={t.loader.sealAriaLabel}
              className="group relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#555B2F] via-[#454A24] to-[#34381B] text-[#FCF8F0] shadow-[0_14px_35px_-8px_rgba(85,91,47,0.5)] border-2 border-[#C59B57]/60 flex flex-col items-center justify-center cursor-pointer mb-6"
            >
              <span className="pointer-events-none absolute inset-1.5 rounded-full border border-[#FCF8F0]/25" />
              <OneRingSvg className="w-6 h-6 text-[#C59B57] opacity-80 mb-0.5 transition-transform duration-500 group-hover:rotate-12" />
              <span className="font-display text-2xl md:text-3xl tracking-widest leading-none">
                {t.couple.monogram}
              </span>
              <span className="font-sans-label text-[8px] tracking-[0.25em] uppercase text-[#C59B57] mt-1">
                {t.date.shortYearFormat}
              </span>
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-[#555B2F] leading-none"
            >
              {t.couple.partner1}{' '}
              <span className="italic font-editorial text-3xl sm:text-4xl text-[#B86B4B]">
                {t.couple.symbolicConjunction}
              </span>{' '}
              {t.couple.partner2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans-label text-[11px] tracking-[0.32em] uppercase text-[#555B2F]/70 mt-3"
            >
              {t.date.dottedFormat}
            </motion.p>

            {/* Progress Bar & Enter Actions */}
            <div className="mt-8 w-full min-h-[104px] flex flex-col items-center justify-center gap-4">
              {!isReady && (
                <div className="w-48 flex flex-col items-center">
                  <div className="w-full h-[2px] bg-[#555B2F]/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#555B2F]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="font-sans-label text-[9px] tracking-[0.26em] uppercase text-[#555B2F]/55 mt-2">
                    {t.loader.loadingProgress}
                  </p>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                <button
                  type="button"
                  onClick={() => onEnter(true)}
                  className="btn-fresco-olive w-full sm:w-auto min-w-[260px] shadow-md"
                >
                  <Volume2 className="w-4 h-4 text-[#C59B57]" />
                  <span>{t.loader.enterWithMusic}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEnter(false)}
                  className="inline-flex items-center gap-1.5 font-sans-label text-[10px] tracking-[0.2em] uppercase text-[#555B2F]/65 hover:text-[#555B2F] underline underline-offset-4 py-1 cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{t.loader.enterWithoutMusic}</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
