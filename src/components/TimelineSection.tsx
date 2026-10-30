import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG, type TimelineIconType } from '../i18n';
import { OneRingSvg, StrawHatSvg, SimpsonsDonutSvg } from './icons/GeekIcons';

const HeartSvg: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const TimelineSection: React.FC = () => {
  const { t } = useI18n();

  const renderIcon = (type: TimelineIconType) => {
    switch (type) {
      case 'ring':
        return <OneRingSvg className="w-12 h-12 md:w-14 md:h-14 text-[#C59B57]" />;
      case 'ship':
        return <StrawHatSvg className="w-12 h-12 md:w-14 md:h-14 text-[#B86B4B]" />;
      case 'donut':
        return <SimpsonsDonutSvg className="w-12 h-12 md:w-14 md:h-14 text-[#DC798B]" />;
    }
  };

  return (
    <section
      id="programa"
      className="relative pt-20 pb-20 md:pt-28 md:pb-28 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-md mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-sans-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#555B2F]/60 mb-2">
            {t.timeline.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-[#555B2F]">
            {t.timeline.title}
          </h2>
        </motion.div>

        {/* Fresco Calendar Strip (11 · 12 · [♥ 13] · 14 · 15) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5 sm:gap-7 mb-14"
        >
          {WEDDING_CONFIG.date.calendarStripDays.map((dayNum) => {
            const isWeddingDay = dayNum === WEDDING_CONFIG.date.highlightDay;
            return isWeddingDay ? (
              <div
                key={dayNum}
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 -mx-1"
              >
                <div className="absolute inset-0 heart-pulse">
                  <HeartSvg className="w-full h-full translate-y-[2px]" />
                </div>
                <span className="relative z-10 font-display text-xl md:text-2xl text-[#FCF8F0] pt-0.5">
                  {dayNum}
                </span>
              </div>
            ) : (
              <span
                key={dayNum}
                className="font-display text-xl md:text-2xl text-[#555B2F]/60"
              >
                {dayNum}
              </span>
            );
          })}
        </motion.div>

        {/* Alternating Vertical Timeline with Heart Nodes (Fresco Style) */}
        <div className="relative max-w-[350px] sm:max-w-[390px] mx-auto">
          {/* Center Vertical Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[#555B2F]/25"
          />

          <div className="space-y-12 md:space-y-14">
            {t.timeline.items.map((item, idx) => {
              const isLeftText = idx % 2 === 0;
              return (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative min-h-[84px] flex items-center"
                >
                  {/* Center Heart Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#FCF8F0] p-1 rounded-full">
                    <div className="heart-pulse">
                      <HeartSvg className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`w-[calc(50%-1.5rem)] ${
                      isLeftText ? 'text-right pr-1' : 'ml-auto text-left pl-1'
                    }`}
                  >
                    <p className="font-sans-label text-[11px] font-semibold tracking-[0.22em] uppercase text-[#B86B4B] mb-1">
                      {item.time}
                    </p>
                    <h3 className="font-display text-2xl md:text-[26px] leading-tight text-[#555B2F]">
                      {item.title}
                    </h3>
                    <p className="font-editorial text-base md:text-lg leading-snug text-[#555B2F]/80 mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Subtle Decorative Line-Art Ornament (Opposite Side) */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 w-[calc(50%-1.5rem)] flex items-center justify-center ${
                      isLeftText ? 'right-0' : 'left-0'
                    }`}
                  >
                    {renderIcon(item.iconType)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
