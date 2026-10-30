import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CalendarPlus, Download, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useCountdown } from '../hooks/useCountdown';
import { buildGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { GoldenSnitchSvg } from './icons/GeekIcons';

const FALLING_LEAVES = [
  { left: '10%', size: 18, fall: 15, sway: 3.4, delay: 0 },
  { left: '24%', size: 14, fall: 18, sway: 2.8, delay: 3.5 },
  { left: '42%', size: 20, fall: 16, sway: 3.8, delay: 7 },
  { left: '61%', size: 15, fall: 19, sway: 3.1, delay: 2 },
  { left: '78%', size: 19, fall: 15.5, sway: 3.5, delay: 5.5 },
  { left: '90%', size: 14, fall: 17, sway: 2.9, delay: 9 },
];

export const HeroSection: React.FC = () => {
  const { t } = useI18n();
  const countdown = useCountdown();
  const googleCalendarUrl = buildGoogleCalendarUrl('full', t.calendar.full);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const calendarMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (calendarMenuRef.current && !calendarMenuRef.current.contains(e.target as Node)) {
        setCalendarMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCalendarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [calendarMenuOpen]);

  const scrollToNext = () => {
    const el = document.getElementById('historia');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden px-5 pt-16 pb-8 md:pt-20 md:pb-12"
    >
      {/* Subtle Falling Olive Leaves (Fresco Atmosphere) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {FALLING_LEAVES.map((leaf, idx) => (
          <div
            key={idx}
            className="petal-fall absolute top-0 text-[#555B2F]/25"
            style={{
              left: leaf.left,
              animationDuration: `${leaf.fall}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="petal-sway block"
              style={{
                width: leaf.size,
                height: leaf.size,
                animationDuration: `${leaf.sway}s`,
              }}
            >
              <path d="M19 4C11 4 5 10 4 19C13 18 19 12 19 4Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Ornate Fresco Architectural Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-6 md:inset-10 border border-[#555B2F]/20 z-0"
      >
        <div className="absolute inset-1.5 border border-[#C59B57]/25" />
      </div>

      {/* Main Editorial Centerpiece + Integrated Live Countdown */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto my-auto py-4">
        {/* Subtle Decorative Snitch Line-Art Ornament */}
        <div aria-hidden="true" className="mb-3 text-[#C59B57]/85 float-slow">
          <GoldenSnitchSvg className="w-10 h-7 mx-auto" />
        </div>

        {/* Names in Fresco Antic Didone Stacked Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[94px] text-[#555B2F] leading-[0.92] tracking-tight flex flex-col items-center"
        >
          <span>{t.couple.partner1}</span>
          <span className="font-editorial italic text-3xl sm:text-4xl md:text-5xl text-[#B86B4B] my-1 md:my-2">
            {t.couple.symbolicConjunction}
          </span>
          <span>{t.couple.partner2}</span>
        </motion.h1>

        {/* Invitation Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-sans-label text-[10px] sm:text-xs tracking-[0.26em] uppercase text-[#555B2F]/80 max-w-xs sm:max-w-md leading-relaxed mt-5"
        >
          {t.hero.invitationIntro}
        </motion.p>

        {/* Fresco Date Lockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mt-5 text-[#555B2F]"
        >
          <div className="flex flex-col items-center min-w-[78px] sm:min-w-[92px]">
            <div className="w-full h-px bg-[#555B2F]/35 mb-1.5" />
            <span className="font-sans-label text-[10px] sm:text-xs tracking-[0.28em] uppercase">
              {t.date.monthName}
            </span>
            <div className="w-full h-px bg-[#555B2F]/35 mt-1.5" />
          </div>

          <span className="font-display text-5xl sm:text-6xl md:text-7xl leading-none text-[#555B2F]">
            {t.date.day}
          </span>

          <div className="flex flex-col items-center min-w-[78px] sm:min-w-[92px]">
            <div className="w-full h-px bg-[#555B2F]/35 mb-1.5" />
            <span className="font-sans-label text-[10px] sm:text-xs tracking-[0.28em] uppercase">
              {t.date.year}
            </span>
            <div className="w-full h-px bg-[#555B2F]/35 mt-1.5" />
          </div>
        </motion.div>

        {/* Live Header Countdown with Seconds */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 w-full max-w-md bg-[#F5EFE2]/85 backdrop-blur-xs border border-[#555B2F]/25 px-4 py-3.5 sm:px-6 sm:py-4 shadow-[0_10px_30px_-12px_rgba(85,91,47,0.18)]"
        >
          <div className="grid grid-cols-4 divide-x divide-[#555B2F]/15">
            {[
              { value: countdown.days, label: t.hero.units.days },
              { value: String(countdown.hours).padStart(2, '0'), label: t.hero.units.hours },
              { value: String(countdown.minutes).padStart(2, '0'), label: t.hero.units.minutes },
              { value: String(countdown.seconds).padStart(2, '0'), label: t.hero.units.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center px-2">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl text-[#555B2F] tabular-nums leading-none">
                  {unit.value}
                </span>
                <span className="font-sans-label text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#555B2F]/65 mt-1.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Single "Add to Calendar" Button with Expandable Options */}
        <motion.div
          ref={calendarMenuRef}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="relative z-30 mt-5 flex flex-col items-center"
        >
          <button
            type="button"
            onClick={() => setCalendarMenuOpen((prev) => !prev)}
            aria-expanded={calendarMenuOpen}
            className="btn-fresco-olive !py-2.5 !px-5 !text-[10px]"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#C59B57]" />
            <span>{t.hero.ctaAddToCalendar}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#FCF8F0]/80 transition-transform duration-200 ${
                calendarMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {calendarMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#FCF8F0] border border-[#555B2F]/35 p-2 shadow-[0_14px_30px_-10px_rgba(44,48,24,0.28)] z-30"
              >
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="btn-fresco-outline !py-2 !px-3.5 !text-[10px] whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#B86B4B]" />
                  <span>{t.hero.ctaGoogleCalendar}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    downloadIcsFile('full', t.calendar.full);
                    setCalendarMenuOpen(false);
                  }}
                  className="btn-fresco-outline !py-2 !px-3.5 !text-[10px] whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 text-[#555B2F]" />
                  <span>{t.hero.ctaIcsDownload}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll Down Indicator (Fresco Style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="relative z-10 flex flex-col items-center pb-1"
      >
        <button
          type="button"
          onClick={scrollToNext}
          aria-label={t.hero.scrollDownAria}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F5EFE2] border border-[#555B2F]/20 text-[#555B2F]/80 hover:text-[#555B2F] hover:border-[#555B2F]/50 transition-all cursor-pointer shadow-xs"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
