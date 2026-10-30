import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, CalendarPlus, Copy, Check, Map } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG, type VenueId } from '../i18n';
import { buildGoogleCalendarUrl } from '../utils/calendar';

export const VenuesSection: React.FC = () => {
  const { t } = useI18n();
  const [openMapId, setOpenMapId] = useState<VenueId | null>(null);
  const [copiedId, setCopiedId] = useState<VenueId | null>(null);

  const handleCopyAddress = async (id: VenueId, address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2400);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <section
      id="lugares"
      className="relative isolate bg-[#555B2F] text-[#FCF8F0] pt-20 pb-24 md:pt-28 md:pb-32 px-5 sm:px-6 overflow-hidden"
    >
      {/* Top Scalloped / Arch Decorative Transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-[#FCF8F0]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 25%, 50% 100%, 0 25%)',
        }}
      />

      {/* Subtle Background Botanical Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #FCF8F0 1px, transparent 1px), radial-gradient(circle at 80% 70%, #C59B57 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Title (Fresco Olive Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-sans-label text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#FCF8F0]/70 mb-3">
            {t.venues.eyebrow}
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#FCF8F0] leading-none">
            {t.venues.title}
          </h2>
        </motion.div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {t.venues.items.map((venue, idx) => {
            const isMapOpen = openMapId === venue.id;
            const isCopied = copiedId === venue.id;
            const venueConfig = WEDDING_CONFIG.venues[venue.id];
            const calUrl = buildGoogleCalendarUrl(venue.id, t.calendar[venue.id]);

            return (
              <motion.article
                key={venue.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="relative flex flex-col justify-between border border-[#FCF8F0]/25 bg-[#484E27]/75 backdrop-blur-xs p-5 sm:p-7 md:p-8 shadow-[0_24px_48px_-15px_rgba(0,0,0,0.3)]"
              >
                {/* Inner Delicate Gold Frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 border border-[#C59B57]/25"
                />

                <div>
                  {/* Venue Illustration Header */}
                  <div className="relative mb-6 overflow-hidden rounded-lg border border-[#FCF8F0]/20 bg-[#FCF8F0] aspect-[16/10]">
                    <img
                      src={venueConfig.image}
                      alt={venue.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#555B2F]/95 text-[#FCF8F0] border border-[#C59B57]/50 px-3.5 py-1.5 font-sans-label text-[11px] tracking-[0.22em] uppercase shadow-md">
                      {venue.time}
                    </div>
                  </div>

                  {/* Venue Title & Address */}
                  <div className="text-center px-2">
                    <h3 className="font-display text-4xl sm:text-5xl text-[#FCF8F0] leading-tight">
                      {venue.title}
                    </h3>

                    <div className="w-10 h-px bg-[#C59B57]/50 mx-auto my-4" />

                    <h4 className="font-display text-2xl sm:text-3xl text-[#FCF8F0] tracking-wide">
                      {venue.venueName}
                    </h4>

                    <p className="font-sans-label text-xs tracking-[0.18em] uppercase text-[#FCF8F0]/80 mt-3 leading-relaxed">
                      {venue.addressLine1}
                      <br />
                      {venue.addressLine2}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Maps, Interactive Map Toggle, Copy Address & Calendar */}
                <div className="relative z-10 mt-7 pt-5 border-t border-[#FCF8F0]/15 flex flex-col gap-3">
                  {/* Primary CTA: Open in Google Maps */}
                  <a
                    href={venueConfig.mapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#FCF8F0] text-[#555B2F] hover:bg-[#F5EFE2] px-5 py-3.5 font-sans-label text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-sm"
                  >
                    <Navigation className="w-4 h-4 text-[#B86B4B]" />
                    <span>{t.venues.ctaOpenMaps}</span>
                  </a>

                  {/* Secondary Actions Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenMapId(isMapOpen ? null : venue.id)}
                      className="btn-fresco-on-olive !px-2 !py-2.5 !text-[9px] !tracking-[0.15em]"
                    >
                      <Map className="w-3.5 h-3.5 shrink-0 text-[#C59B57]" />
                      <span>{isMapOpen ? t.venues.ctaHideMap : t.venues.ctaShowMap}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyAddress(venue.id, venue.fullAddress)}
                      className="btn-fresco-on-olive !px-2 !py-2.5 !text-[9px] !tracking-[0.15em]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                          <span>{t.venues.ctaCopiedAddress}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 shrink-0 text-[#C59B57]" />
                          <span>{t.venues.ctaCopyAddress}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={calUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-fresco-on-olive !px-2 !py-2.5 !text-[9px] !tracking-[0.15em]"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 shrink-0 text-[#C59B57]" />
                      <span>{t.venues.ctaCalendar}</span>
                    </a>
                  </div>

                  {/* Collapsible Interactive Google Map Preview */}
                  <AnimatePresence>
                    {isMapOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 230 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden rounded-lg border border-[#FCF8F0]/25 mt-2 bg-[#FCF8F0]"
                      >
                        <iframe
                          title={venue.mapIframeTitle}
                          src={venueConfig.mapsEmbedUrl}
                          className="w-full h-[230px] border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Bottom Scalloped / Arch Decorative Transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-[#FCF8F0]"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 75%, 50% 0, 0 75%)',
        }}
      />
    </section>
  );
};
