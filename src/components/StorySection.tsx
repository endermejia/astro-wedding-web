import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

export const StorySection: React.FC = () => {
  const { t } = useI18n();
  const { storyBorders } = WEDDING_CONFIG;
  const { borderAlts } = t.story;

  return (
    <section
      id="historia"
      className="relative isolate pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 overflow-hidden"
    >
      <OliveBranchDivider withPaw />

      <div className="relative max-w-6xl mx-auto">
        {/* Mobile Top Arch Frame (Straw Hat & Golden Snitch) */}
        <div
          aria-hidden="true"
          className="story-wind-sway flex md:hidden justify-between items-start -mx-3 sm:mx-0 mb-2 pointer-events-none select-none"
          style={{ animationDelay: '0s' }}
        >
          <motion.img
            src={storyBorders.hatTopLeft}
            alt={borderAlts.hatTopLeft}
            loading="lazy"
            initial={{ opacity: 0, x: -16, y: -6 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="w-36 sm:w-44 h-auto object-contain"
          />
          <motion.img
            src={storyBorders.snitchTopRight}
            alt={borderAlts.snitchTopRight}
            loading="lazy"
            initial={{ opacity: 0, x: 16, y: -6 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="w-36 sm:w-44 h-auto object-contain"
          />
        </div>

        {/* Desktop & Tablet 3-Column Botanical/Geek Frame + Central Story */}
        <div className="relative md:flex md:items-stretch md:justify-between md:gap-6 lg:gap-8">
          {/* Left Illustrated Border Column (Desktop/Tablet) */}
          <div
            className="story-wind-sway hidden md:flex flex-col justify-between items-start w-44 lg:w-60 xl:w-72 shrink-0 select-none pointer-events-none"
            style={{ animationDelay: '4s' }}
          >
            <motion.img
              src={storyBorders.hatTopLeft}
              alt={borderAlts.hatTopLeft}
              loading="lazy"
              initial={{ opacity: 0, x: -24, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="w-44 lg:w-60 xl:w-72 h-auto object-contain lg:translate-x-6"
            />
            <motion.img
              src={storyBorders.treeMidLeft}
              alt={borderAlts.treeMidLeft}
              loading="lazy"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="w-40 lg:w-56 xl:w-64 h-auto object-contain -my-2"
            />
            <motion.img
              src={storyBorders.ringLowLeft}
              alt={borderAlts.ringLowLeft}
              loading="lazy"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
              className="w-36 lg:w-48 xl:w-52 h-auto object-contain lg:translate-x-3"
            />
            <motion.img
              src={storyBorders.booksBottomLeft}
              alt={borderAlts.booksBottomLeft}
              loading="lazy"
              initial={{ opacity: 0, x: -24, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="w-40 lg:w-56 xl:w-64 h-auto object-contain lg:translate-x-4"
            />
          </div>

          {/* Central Narrative Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-2 sm:px-6 md:px-4 lg:px-6 py-2 md:py-16 lg:py-24 max-w-xl mx-auto">
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

            {/* Decorative copper heart divider matching the physical invitation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              aria-hidden="true"
              className="mt-5 mb-2 flex items-center justify-center gap-3 text-[#B86B4B]/75"
            >
              <span className="h-px w-10 bg-[#555B2F]/25" />
              <span className="text-sm">♥</span>
              <span className="h-px w-10 bg-[#555B2F]/25" />
            </motion.div>

            {/* Paragraphs + Mobile Border Vignettes interleaved in flow so they never overlap text */}
            <div className="mt-6 md:mt-10 space-y-6 md:space-y-8 w-full">
              {/* Paragraph 1 */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed text-[#555B2F]/90 mx-auto max-w-lg"
              >
                {t.story.paragraphs[0]}
              </motion.p>

              {/* Mobile Side Borders Pair 1 (Olive Tree & Pink Donut hugging left/right edges between paragraphs) */}
              <div
                aria-hidden="true"
                className="story-wind-sway flex md:hidden justify-between items-center -mx-5 sm:-mx-6 py-1 pointer-events-none select-none"
                style={{ animationDelay: '8s' }}
              >
                <motion.img
                  src={storyBorders.treeMidLeft}
                  alt={borderAlts.treeMidLeft}
                  loading="lazy"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="w-32 sm:w-40 h-auto object-contain"
                />
                <motion.img
                  src={storyBorders.donutMidRight}
                  alt={borderAlts.donutMidRight}
                  loading="lazy"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                  className="w-28 sm:w-36 h-auto object-contain"
                />
              </div>

              {/* Paragraph 2 */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed text-[#555B2F]/90 mx-auto max-w-lg"
              >
                {t.story.paragraphs[1]}
              </motion.p>

              {/* Paragraph 3 */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed italic text-[#B86B4B] font-medium mx-auto max-w-lg"
              >
                {t.story.paragraphs[2]}
              </motion.p>

              {/* Mobile Side Borders Pair 2 (One Ring & Death Star hugging left/right edges before signature) */}
              <div
                aria-hidden="true"
                className="story-wind-sway flex md:hidden justify-between items-center -mx-5 sm:-mx-6 py-1 pointer-events-none select-none"
                style={{ animationDelay: '12s' }}
              >
                <motion.img
                  src={storyBorders.ringLowLeft}
                  alt={borderAlts.ringLowLeft}
                  loading="lazy"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="w-28 sm:w-36 h-auto object-contain"
                />
                <motion.img
                  src={storyBorders.deathstarLowRight}
                  alt={borderAlts.deathstarLowRight}
                  loading="lazy"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                  className="w-28 sm:w-36 h-auto object-contain"
                />
              </div>
            </div>

            {/* Handwritten Signature */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 md:mt-14 flex justify-center"
            >
              <span className="font-hand inline-flex items-baseline justify-center text-4xl sm:text-5xl md:text-6xl leading-none text-[#555B2F]">
                {t.couple.partner1}
                <span className="mx-3 md:mx-4 text-[#B86B4B]">
                  {t.couple.conjunction}
                </span>
                {t.couple.partner2}
              </span>
            </motion.div>

            {/* Closing Invitation Tagline at the base of the frame */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 md:mt-12 font-sans-label text-[10px] sm:text-xs tracking-[0.26em] uppercase text-[#555B2F]/70"
            >
              {t.story.closingTagline}
            </motion.p>
          </div>

          {/* Right Illustrated Border Column (Desktop/Tablet) */}
          <div
            className="story-wind-sway hidden md:flex flex-col justify-between items-end w-44 lg:w-60 xl:w-72 shrink-0 select-none pointer-events-none"
            style={{ animationDelay: '16s' }}
          >
            <motion.img
              src={storyBorders.snitchTopRight}
              alt={borderAlts.snitchTopRight}
              loading="lazy"
              initial={{ opacity: 0, x: 24, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.05, ease: 'easeOut' }}
              className="w-44 lg:w-60 xl:w-72 h-auto object-contain lg:-translate-x-6"
            />
            <motion.img
              src={storyBorders.donutMidRight}
              alt={borderAlts.donutMidRight}
              loading="lazy"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
              className="w-36 lg:w-48 xl:w-52 h-auto object-contain -my-2"
            />
            <motion.img
              src={storyBorders.deathstarLowRight}
              alt={borderAlts.deathstarLowRight}
              loading="lazy"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
              className="w-36 lg:w-48 xl:w-52 h-auto object-contain lg:-translate-x-2"
            />
            <motion.img
              src={storyBorders.suitcaseBottomRight}
              alt={borderAlts.suitcaseBottomRight}
              loading="lazy"
              initial={{ opacity: 0, x: 24, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
              className="w-40 lg:w-56 xl:w-64 h-auto object-contain lg:-translate-x-4"
            />
          </div>
        </div>

        {/* Mobile Bottom Arch Frame (Stack of Books & Travel Suitcase) */}
        <div
          aria-hidden="true"
          className="story-wind-sway flex md:hidden justify-between items-end -mx-2 sm:mx-0 mt-5 pointer-events-none select-none"
          style={{ animationDelay: '20s' }}
        >
          <motion.img
            src={storyBorders.booksBottomLeft}
            alt={borderAlts.booksBottomLeft}
            loading="lazy"
            initial={{ opacity: 0, x: -16, y: 6 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="w-36 sm:w-44 h-auto object-contain"
          />
          <motion.img
            src={storyBorders.suitcaseBottomRight}
            alt={borderAlts.suitcaseBottomRight}
            loading="lazy"
            initial={{ opacity: 0, x: 16, y: 6 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="w-36 sm:w-44 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
