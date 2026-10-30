import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

export const StorySection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section
      id="historia"
      className="relative isolate pt-10 pb-20 md:pt-16 md:pb-28 px-6 overflow-hidden"
    >
      <OliveBranchDivider withPaw />

      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#555B2F]/65 mb-3"
        >
          {t.story.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-[#555B2F] leading-[1.08] max-w-xl mx-auto"
        >
          {t.story.welcomeHeading}
        </motion.h2>

        {/* Paragraphs from the physical invitation (Fresco Editorial Spacing) */}
        <div className="mt-10 md:mt-12 space-y-6 md:space-y-8">
          {t.story.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 + idx * 0.1 }}
              className={`font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed text-[#555B2F]/90 mx-auto max-w-lg ${
                idx === 2 ? 'italic text-[#B86B4B] font-medium' : ''
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Handwritten Signature (Fresco Reenie Beanie Style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <span className="font-hand inline-flex items-baseline justify-center text-4xl sm:text-5xl md:text-6xl leading-none text-[#555B2F]">
            {t.couple.partner1}
            <span className="mx-3 md:mx-4 text-[#B86B4B]">{t.couple.conjunction}</span>
            {t.couple.partner2}
          </span>
        </motion.div>

        {/* Editorial Olive Tree Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-12 md:mt-16 relative mx-auto max-w-2xl"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[#555B2F]/20 bg-[#FCF8F0] shadow-[0_20px_50px_-15px_rgba(85,91,47,0.18)] p-2 sm:p-3">
            <img
              src={WEDDING_CONFIG.images.oliveTreeStory}
              alt={t.story.illustrationAlt}
              loading="lazy"
              className="w-full h-auto rounded-xl block select-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
