import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Phone, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

export const AccommodationSection: React.FC = () => {
  const { t } = useI18n();
  const { accommodation } = t;
  const config = WEDDING_CONFIG.accommodation;

  return (
    <section
      id="alojamiento"
      className="px-6 pb-16 pt-4 md:pb-24 md:pt-8 overflow-hidden"
    >
      <OliveBranchDivider />

      <div className="mx-auto max-w-xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="font-sans-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#555B2F]/65 mb-2">
            {accommodation.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-[#555B2F]">
            {accommodation.title}
          </h2>
        </motion.div>

        {/* Clean Fresco Accommodation Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-10 border border-[#555B2F]/50 bg-[#F5EFE2]/75 px-6 py-10 text-center md:px-10 md:py-12 shadow-[0_18px_45px_-15px_rgba(85,91,47,0.14)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-[#C59B57]/35"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#555B2F]/10 text-[#555B2F] mb-4">
              <BedDouble className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.14em] text-[#555B2F]">
              {accommodation.venueName}
            </h3>

            <div className="mx-auto my-4 h-px w-14 bg-[#555B2F]/30" />

            <p className="font-editorial italic text-xl sm:text-2xl leading-relaxed text-[#555B2F]/90 max-w-md mx-auto">
              «{accommodation.description}»
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={config.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fresco-olive"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C59B57]" />
                <span>{accommodation.ctaWebsite}</span>
              </a>

              <a href={`tel:${config.phoneClean}`} className="btn-fresco-outline">
                <Phone className="w-3.5 h-3.5" />
                <span>
                  {accommodation.ctaCallPrefix} ({config.phoneDisplay})
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
