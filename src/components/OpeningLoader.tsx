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
  const [flapOpenedPastHalf, setFlapOpenedPastHalf] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 650;
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

      // Once the top flap rotates past 90deg, bring the inner letter to the front
      window.setTimeout(() => {
        setFlapOpenedPastHalf(true);
      }, 280);

      // Complete entrance after the letter slides out of the envelope
      window.setTimeout(() => {
        onEnter(withMusic);
      }, 1250);
    },
    [isOpening, onStartAudio, onEnter]
  );

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCF8F0] text-[#555B2F] px-5 py-6 md:py-10 overflow-hidden select-none"
        >
          {/* Outer Architectural Double Border */}
          <div className="pointer-events-none absolute inset-3 md:inset-6 border border-[#555B2F]/20" />
          <div className="pointer-events-none absolute inset-4 md:inset-7 border border-[#C59B57]/25" />

          {/* Subtle Corner Botanical Accents */}
          <img
            src={storyBorders.hatTopLeft}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-3 md:top-6 md:left-8 w-28 sm:w-36 md:w-48 opacity-40 object-contain"
          />
          <img
            src={storyBorders.snitchTopRight}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-3 right-3 md:top-6 md:right-8 w-28 sm:w-36 md:w-48 opacity-40 object-contain"
          />

          {/* Language Switcher Top Right */}
          <div className="fixed top-5 right-5 md:top-9 md:right-10 z-30">
            <LanguageSwitcher />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto">
            {/* Subtle Pawprints & Envelope Eyebrow */}
            <motion.div
              animate={isOpening ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center mb-4 sm:mb-5"
            >
              <div aria-hidden="true" className="flex items-center gap-2.5 mb-2 text-[#B86B4B]/75">
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
              <span className="font-sans-label text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#555B2F]/75">
                {t.loader.envelopeLabel}
              </span>
            </motion.div>

            {/* 3D Interactive Wedding Envelope */}
            <div
              className="relative w-full max-w-[440px] sm:max-w-[490px] aspect-[16/11]"
              style={{ perspective: '1400px' }}
            >
              {/* Envelope Back / Interior Cavity */}
              <motion.div
                animate={
                  isOpening
                    ? { y: 36, scale: 0.97, opacity: 0.35 }
                    : { y: 0, scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-xl bg-[#DFD3BC] border border-[#555B2F]/25 shadow-[0_28px_60px_-15px_rgba(68,72,38,0.28)] overflow-visible"
              />

              {/* Inner Invitation Letter Card (Slides out when envelope opens) */}
              <motion.div
                initial={{ y: 0, scale: 0.96 }}
                animate={
                  isOpening
                    ? {
                        y: [0, -85, -35],
                        scale: [0.96, 1.03, 1.08],
                      }
                    : { y: 0, scale: 0.96 }
                }
                transition={{
                  duration: 0.95,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute inset-x-4 sm:inset-x-6 top-3 bottom-3 rounded-lg bg-[#FCF8F0] border border-[#C59B57]/45 shadow-[0_14px_35px_-10px_rgba(44,48,24,0.22)] flex flex-col items-center justify-center p-5 text-center ${
                  flapOpenedPastHalf ? 'z-30' : 'z-10'
                }`}
              >
                <div className="pointer-events-none absolute inset-2 border border-[#555B2F]/15 rounded-md" />
                <span className="font-sans-label text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#B86B4B] mb-2">
                  {t.date.fullDateLabel}
                </span>
                <p className="font-display text-3xl sm:text-4xl text-[#555B2F] leading-tight">
                  {t.couple.partner1}{' '}
                  <span className="font-editorial italic text-2xl sm:text-3xl text-[#B86B4B]">
                    {t.couple.symbolicConjunction}
                  </span>{' '}
                  {t.couple.partner2}
                </p>
                <div className="my-2.5 flex items-center gap-2 text-[#C59B57]">
                  <span className="h-px w-8 bg-[#555B2F]/25" />
                  <span className="text-xs">♥</span>
                  <span className="h-px w-8 bg-[#555B2F]/25" />
                </div>
                <p className="font-editorial italic text-lg sm:text-xl text-[#555B2F]/85">
                  {t.loader.letterGreeting}
                </p>
              </motion.div>

              {/* Envelope Front Pocket (Side Flaps + Lower Flap with Couple Names & Date) */}
              <motion.div
                animate={
                  isOpening
                    ? { y: 42, opacity: 0.25 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 z-20 rounded-xl overflow-hidden"
              >
                <svg
                  viewBox="0 0 520 360"
                  className="w-full h-full block"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="envLeft" x1="0%" y1="0%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#EFE6D4" />
                      <stop offset="100%" stopColor="#E4D8C1" />
                    </linearGradient>
                    <linearGradient id="envRight" x1="100%" y1="0%" x2="0%" y2="50%">
                      <stop offset="0%" stopColor="#EFE6D4" />
                      <stop offset="100%" stopColor="#E4D8C1" />
                    </linearGradient>
                    <linearGradient id="envBottom" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#F6EFE2" />
                      <stop offset="100%" stopColor="#EAE0CC" />
                    </linearGradient>
                  </defs>

                  {/* Left Flap */}
                  <polygon
                    points="0,0 260,185 0,360"
                    fill="url(#envLeft)"
                    stroke="#555B2F"
                    strokeOpacity="0.16"
                    strokeWidth="1"
                  />
                  {/* Right Flap */}
                  <polygon
                    points="520,0 260,185 520,360"
                    fill="url(#envRight)"
                    stroke="#555B2F"
                    strokeOpacity="0.16"
                    strokeWidth="1"
                  />
                  {/* Bottom Flap */}
                  <polygon
                    points="0,360 260,162 520,360"
                    fill="url(#envBottom)"
                    stroke="#C59B57"
                    strokeOpacity="0.38"
                    strokeWidth="1.2"
                  />
                  {/* Subtle Gold Inner Trim along Bottom Flap */}
                  <polyline
                    points="18,354 260,174 502,354"
                    fill="none"
                    stroke="#555B2F"
                    strokeOpacity="0.14"
                    strokeWidth="0.8"
                  />
                </svg>

                {/* Couple Names & Date printed once on the lower flap of the envelope */}
                <div className="absolute inset-x-0 bottom-3.5 sm:bottom-5 flex flex-col items-center text-center px-4">
                  <h1 className="font-display text-2xl sm:text-3xl md:text-[34px] text-[#555B2F] leading-none tracking-wide">
                    {t.couple.partner1}{' '}
                    <span className="italic font-editorial text-xl sm:text-2xl text-[#B86B4B]">
                      {t.couple.symbolicConjunction}
                    </span>{' '}
                    {t.couple.partner2}
                  </h1>
                  <p className="font-sans-label text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#555B2F]/70 mt-1.5">
                    {t.date.dottedFormat}
                  </p>
                </div>
              </motion.div>

              {/* Top Triangular Envelope Flap (Folds open 180deg in 3D) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className={`pointer-events-none absolute inset-x-0 top-0 h-[56%] ${
                  flapOpenedPastHalf ? 'z-0' : 'z-30'
                }`}
              >
                <svg
                  viewBox="0 0 520 202"
                  className="w-full h-full block drop-shadow-[0_8px_14px_rgba(44,48,24,0.14)]"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="envTopFlap" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#EFE6D5" />
                      <stop offset="100%" stopColor="#E2D5BC" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,0 520,0 260,196"
                    fill="url(#envTopFlap)"
                    stroke="#C59B57"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                  />
                  <polyline
                    points="18,6 260,184 502,6"
                    fill="none"
                    stroke="#555B2F"
                    strokeOpacity="0.16"
                    strokeWidth="0.9"
                  />
                </svg>
              </motion.div>

              {/* Central Interactive 3D Wax Seal (Monogram Only — No Repeated Date) */}
              <motion.div
                animate={
                  isOpening
                    ? { scale: 1.18, opacity: 0, y: -18 }
                    : { scale: 1, opacity: 1, y: 0 }
                }
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              >
                <motion.button
                  type="button"
                  onClick={() => triggerOpen(true)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={t.loader.sealAriaLabel}
                  className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#5B6232] via-[#454A24] to-[#2F3318] text-[#FCF8F0] shadow-[0_12px_28px_-4px_rgba(44,48,24,0.55),inset_0_2px_4px_rgba(255,255,255,0.2)] border-2 border-[#C59B57]/75 flex flex-col items-center justify-center cursor-pointer"
                >
                  <span className="pointer-events-none absolute inset-1.5 rounded-full border border-[#C59B57]/40" />
                  <span className="pointer-events-none absolute inset-2.5 rounded-full border border-dashed border-[#FCF8F0]/20" />
                  <OneRingSvg className="w-5 h-5 text-[#C59B57] opacity-85 mb-0.5 transition-transform duration-500 group-hover:rotate-12" />
                  <span className="font-display text-lg sm:text-xl tracking-[0.18em] leading-none text-[#FCF8F0]">
                    {t.couple.monogram}
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Hint & Action Buttons Below the Envelope */}
            <motion.div
              animate={isOpening ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 sm:mt-6 w-full flex flex-col items-center justify-center gap-3"
            >
              <p className="font-editorial italic text-base sm:text-lg text-[#555B2F]/75">
                {t.loader.tapSealHint}
              </p>

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
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full mt-1">
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
                    className="btn-fresco-outline w-full sm:w-auto min-w-[185px] !py-2.5"
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
