import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CatPawsSvg, OneRingSvg } from './icons/GeekIcons';

interface OpeningLoaderProps {
  isOpen: boolean;
  onStartAudio?: (withMusic: boolean) => void;
  onEnter: (withMusic: boolean) => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({
  isOpen,
  onStartAudio,
  onEnter,
}) => {
  const { t } = useI18n();
  const { storyBorders } = WEDDING_CONFIG;
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 600;
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        setIsReady(true);
        window.clearInterval(interval);
      }
    }, 25);
    return () => window.clearInterval(interval);
  }, []);

  const triggerOpen = useCallback(
    (withMusic: boolean) => {
      if (isOpening) return;
      setIsOpening(true);
      // Start audio immediately inside the user click gesture
      onStartAudio?.(withMusic);

      // Unmount overlay once the envelope flaps have opened to reveal HeroSection
      window.setTimeout(() => {
        onEnter(withMusic);
      }, 1150);
    },
    [isOpening, onStartAudio, onEnter]
  );

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ perspective: '1600px' }}
          className={`fixed inset-0 z-50 overflow-hidden select-none ${
            isOpening ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* LEFT ENVELOPE FLAP */}
          <motion.div
            initial={{ x: '0%', rotateY: 0 }}
            animate={
              isOpening
                ? { x: '-104%', rotateY: -22, opacity: 0.9 }
                : { x: '0%', rotateY: 0, opacity: 1 }
            }
            transition={{
              duration: 0.95,
              delay: 0.16,
              ease: [0.32, 0, 0.2, 1],
            }}
            style={{ transformOrigin: 'left center' }}
            className="absolute inset-0 z-10 pointer-events-none drop-shadow-[6px_0_18px_rgba(44,48,24,0.12)]"
          >
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <defs>
                <linearGradient id="flapLeftGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F3EBDD" />
                  <stop offset="100%" stopColor="#E4D7BF" />
                </linearGradient>
              </defs>
              <polygon
                points="0,0 580,500 0,1000"
                fill="url(#flapLeftGrad)"
                stroke="#C59B57"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <polyline
                points="16,28 545,500 16,972"
                fill="none"
                stroke="#555B2F"
                strokeOpacity="0.15"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* RIGHT ENVELOPE FLAP */}
          <motion.div
            initial={{ x: '0%', rotateY: 0 }}
            animate={
              isOpening
                ? { x: '104%', rotateY: 22, opacity: 0.9 }
                : { x: '0%', rotateY: 0, opacity: 1 }
            }
            transition={{
              duration: 0.95,
              delay: 0.16,
              ease: [0.32, 0, 0.2, 1],
            }}
            style={{ transformOrigin: 'right center' }}
            className="absolute inset-0 z-10 pointer-events-none drop-shadow-[-6px_0_18px_rgba(44,48,24,0.12)]"
          >
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <defs>
                <linearGradient id="flapRightGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#F3EBDD" />
                  <stop offset="100%" stopColor="#E4D7BF" />
                </linearGradient>
              </defs>
              <polygon
                points="1000,0 420,500 1000,1000"
                fill="url(#flapRightGrad)"
                stroke="#C59B57"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <polyline
                points="984,28 455,500 984,972"
                fill="none"
                stroke="#555B2F"
                strokeOpacity="0.15"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* BOTTOM ENVELOPE POCKET FLAP */}
          <motion.div
            initial={{ y: '0%', rotateX: 0 }}
            animate={
              isOpening
                ? { y: '104%', rotateX: -28, opacity: 0.95 }
                : { y: '0%', rotateX: 0, opacity: 1 }
            }
            transition={{
              duration: 0.95,
              delay: 0.14,
              ease: [0.32, 0, 0.2, 1],
            }}
            style={{ transformOrigin: 'bottom center' }}
            className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_-10px_24px_rgba(44,48,24,0.15)]"
          >
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <defs>
                <linearGradient id="flapBottomGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#F8F2E6" />
                  <stop offset="100%" stopColor="#EAE0CC" />
                </linearGradient>
              </defs>
              <polygon
                points="0,1000 0,880 500,410 1000,880 1000,1000"
                fill="url(#flapBottomGrad)"
                stroke="#C59B57"
                strokeOpacity="0.45"
                strokeWidth="2"
              />
              <polyline
                points="24,982 24,892 500,440 976,892 976,982"
                fill="none"
                stroke="#555B2F"
                strokeOpacity="0.16"
                strokeWidth="1.2"
              />
            </svg>

            {/* Subtle Botanical Corner Vignettes on Bottom Flap */}
            <img
              src={storyBorders.booksBottomLeft}
              alt=""
              aria-hidden="true"
              className="absolute bottom-3 left-3 sm:bottom-6 sm:left-8 w-28 sm:w-40 md:w-48 opacity-45 object-contain"
            />
            <img
              src={storyBorders.suitcaseBottomRight}
              alt=""
              aria-hidden="true"
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-8 w-28 sm:w-40 md:w-48 opacity-45 object-contain"
            />
          </motion.div>

          {/* TOP ENVELOPE FLAP (Folds open upward first when unsealed) */}
          <motion.div
            initial={{ y: '0%', rotateX: 0 }}
            animate={
              isOpening
                ? { y: '-104%', rotateX: 65, opacity: 0.95 }
                : { y: '0%', rotateX: 0, opacity: 1 }
            }
            transition={{
              duration: 0.88,
              delay: 0.04,
              ease: [0.36, 0, 0.2, 1],
            }}
            style={{ transformOrigin: 'top center' }}
            className="absolute inset-0 z-30 pointer-events-none drop-shadow-[0_14px_28px_rgba(44,48,24,0.2)]"
          >
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <defs>
                <linearGradient id="flapTopGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#F5EFE1" />
                  <stop offset="100%" stopColor="#E1D4BB" />
                </linearGradient>
              </defs>
              <polygon
                points="0,0 1000,0 1000,120 500,555 0,120"
                fill="url(#flapTopGrad)"
                stroke="#C59B57"
                strokeOpacity="0.55"
                strokeWidth="2.2"
              />
              <polyline
                points="24,18 976,18 976,108 500,525 24,108 24,18"
                fill="none"
                stroke="#555B2F"
                strokeOpacity="0.18"
                strokeWidth="1.2"
              />
            </svg>

            {/* Subtle Botanical Corner Vignettes on Top Flap */}
            <img
              src={storyBorders.hatTopLeft}
              alt=""
              aria-hidden="true"
              className="absolute top-3 left-3 sm:top-6 sm:left-8 w-32 sm:w-44 md:w-56 opacity-55 object-contain"
            />
            <img
              src={storyBorders.snitchTopRight}
              alt=""
              aria-hidden="true"
              className="absolute top-3 right-3 sm:top-6 sm:right-8 w-32 sm:w-44 md:w-56 opacity-55 object-contain"
            />

            {/* Top Envelope Label & Couple Names (Above the Wax Seal on Top Flap) */}
            <div className="absolute inset-x-0 top-[14%] sm:top-[16%] flex flex-col items-center text-center px-4">
              <div
                aria-hidden="true"
                className="flex items-center gap-2.5 mb-2 text-[#B86B4B]/75"
              >
                {[0, 1, 2].map((step) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 0.85, 0.35] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: step * 0.35,
                    }}
                  >
                    <CatPawsSvg className="w-3.5 h-3.5" />
                  </motion.div>
                ))}
              </div>
              <span className="font-sans-label text-[10px] sm:text-xs tracking-[0.36em] uppercase text-[#555B2F]/75">
                {t.loader.envelopeLabel}
              </span>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-[#555B2F] leading-none tracking-tight">
                {t.couple.partner1}{' '}
                <span className="font-editorial italic text-3xl sm:text-4xl md:text-5xl text-[#B86B4B]">
                  {t.couple.symbolicConjunction}
                </span>{' '}
                {t.couple.partner2}
              </h1>
            </div>
          </motion.div>

          {/* Language Switcher Top Right */}
          <motion.div
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="fixed top-5 right-5 md:top-8 md:right-10 z-50"
          >
            <LanguageSwitcher />
          </motion.div>

          {/* CENTRAL WAX SEAL & OPEN CONTROLS */}
          <div className="relative z-40 w-full h-full flex flex-col items-center justify-center px-5">
            {/* 3D Embossed Wax Seal sitting at the tip of the Top Flap */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 1.22, opacity: 0, y: -30 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="mt-12 sm:mt-14"
            >
              <motion.button
                type="button"
                onClick={() => triggerOpen(true)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                aria-label={t.loader.sealAriaLabel}
                className="group relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-[#5B6232] via-[#454A24] to-[#2C3016] text-[#FCF8F0] shadow-[0_16px_34px_-6px_rgba(44,48,24,0.6),inset_0_2px_5px_rgba(255,255,255,0.22)] border-2 border-[#C59B57]/80 flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="pointer-events-none absolute inset-1.5 rounded-full border border-[#C59B57]/45" />
                <span className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-[#FCF8F0]/20" />
                <OneRingSvg className="w-8 h-8 sm:w-9 sm:h-9 text-[#C59B57] opacity-90 transition-transform duration-500 group-hover:rotate-12" />
              </motion.button>
            </motion.div>

            {/* Open Controls on the Lower Envelope Flap */}
            <motion.div
              animate={isOpening ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-7 sm:mt-9 flex flex-col items-center text-center gap-3.5"
            >
              {!isReady ? (
                <div className="w-44 flex flex-col items-center py-2">
                  <div className="w-full h-[2px] bg-[#555B2F]/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#555B2F]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="font-sans-label text-[9px] tracking-[0.24em] uppercase text-[#555B2F]/55 mt-1.5">
                    {t.loader.loadingProgress}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => triggerOpen(true)}
                    className="btn-fresco-olive w-full sm:w-auto min-w-[215px] shadow-md"
                  >
                    <Volume2 className="w-4 h-4 text-[#C59B57]" />
                    <span>{t.loader.enterWithMusic}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerOpen(false)}
                    className="btn-fresco-outline w-full sm:w-auto min-w-[185px] !py-2.5 bg-[#FCF8F0]/70"
                  >
                    <VolumeX className="w-3.5 h-3.5 text-[#555B2F]/75" />
                    <span>{t.loader.enterWithoutMusic}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
