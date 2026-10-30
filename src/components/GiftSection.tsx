import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Copy, Check, Gift } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

export const GiftSection: React.FC = () => {
  const { t } = useI18n();
  const [copiedMode, setCopiedMode] = useState<'formatted' | 'raw' | null>(null);
  const { gift } = t;
  const { ibanFormatted, ibanRaw } = WEDDING_CONFIG.gift;

  const handleCopyIban = async (mode: 'formatted' | 'raw') => {
    const textToCopy = mode === 'formatted' ? ibanFormatted : ibanRaw;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedMode(mode);
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.75 },
        colors: ['#555B2F', '#C59B57', '#B86B4B', '#DC798B'],
      });
      setTimeout(() => setCopiedMode(null), 3200);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 3200);
    }
  };

  return (
    <section
      id="regalo"
      className="relative overflow-hidden px-5 pt-12 pb-20 md:pt-20 md:pb-28"
    >
      <div className="mx-auto max-w-xl text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-sans-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#555B2F]/65 mb-2">
            {gift.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-[#555B2F] leading-[1.05]">
            {gift.title}
          </h2>
          <p className="mx-auto mt-5 max-w-md font-editorial italic text-xl md:text-2xl leading-relaxed text-[#555B2F]/85">
            «{gift.message}»
          </p>
        </motion.div>

        {/* Ornate Fresco Gift & IBAN Frame */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative mx-auto mt-10 border border-[#555B2F]/50 bg-[#F5EFE2]/80 px-5 py-9 sm:px-9 sm:py-11 shadow-[0_20px_50px_-15px_rgba(85,91,47,0.18)]"
        >
          {/* Inner Gold Border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-[#C59B57]/40"
          />

          {/* Top Emblem */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              aria-hidden="true"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FCF8F0] border border-[#C59B57]/50 text-[#555B2F] mb-4 shadow-2xs"
            >
              <Gift className="w-5 h-5" />
            </div>

            <p className="font-sans-label text-[10px] uppercase tracking-[0.25em] text-[#555B2F]/70">
              {gift.holdersLabel} <strong>{gift.holdersValue}</strong>
            </p>

            {/* IBAN Display Box */}
            <div className="mt-6 w-full bg-[#FCF8F0] border border-[#555B2F]/30 px-4 py-5 sm:px-6 shadow-inner">
              <p className="font-sans-label text-[9px] uppercase tracking-[0.28em] text-[#B86B4B] mb-2">
                {gift.ibanBoxLabel}
              </p>
              <p className="font-display text-xl sm:text-2xl md:text-[28px] tracking-[0.08em] text-[#555B2F] select-all break-all sm:break-normal font-medium">
                {ibanFormatted}
              </p>
            </div>

            {/* Copy Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={() => handleCopyIban('formatted')}
                className="btn-fresco-olive w-full sm:w-auto min-w-[235px]"
              >
                {copiedMode === 'formatted' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{gift.ctaCopiedFormatted}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#C59B57]" />
                    <span>{gift.ctaCopyFormatted}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleCopyIban('raw')}
                className="btn-fresco-outline w-full sm:w-auto"
              >
                {copiedMode === 'raw' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#555B2F]" />
                    <span>{gift.ctaCopiedRaw}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B86B4B]" />
                    <span>{gift.ctaCopyRaw}</span>
                  </>
                )}
              </button>
            </div>

            {/* Confirmation Toast Inline */}
            {copiedMode && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-sans-label text-[10px] tracking-[0.2em] uppercase text-[#555B2F] bg-[#FCF8F0] px-3 py-1.5 border border-[#C59B57]/50"
              >
                ✦ {gift.toastCopiedPrefix} {ibanFormatted} ✦
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      <OliveBranchDivider withPaw className="mt-8" />
    </section>
  );
};
