import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users, Minus, Plus, Check } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG, type RsvpAttendanceOption } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

export const RsvpSection: React.FC = () => {
  const { t } = useI18n();
  const { rsvp } = t;

  const [attendance, setAttendance] = useState<RsvpAttendanceOption>('both');
  const [guests, setGuests] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const isAttending = attendance !== 'decline';

  const attendanceOptions: ReadonlyArray<{
    id: RsvpAttendanceOption;
    label: string;
    desc: string;
  }> = useMemo(
    () => [
      {
        id: 'both',
        label: rsvp.options.both,
        desc: rsvp.options.bothDesc,
      },
      {
        id: 'ceremony',
        label: rsvp.options.ceremony,
        desc: rsvp.options.ceremonyDesc,
      },
      {
        id: 'celebration',
        label: rsvp.options.celebration,
        desc: rsvp.options.celebrationDesc,
      },
      {
        id: 'decline',
        label: rsvp.options.decline,
        desc: rsvp.options.declineDesc,
      },
    ],
    [rsvp]
  );

  const composedMessage = useMemo(() => {
    const trimmedName = name.trim();
    const greeting = trimmedName
      ? rsvp.whatsappMessage.greetingWithName.replace('{name}', trimmedName)
      : rsvp.whatsappMessage.greetingWithoutName;

    const guestsText =
      guests === 1
        ? rsvp.whatsappMessage.guestsSingular
        : rsvp.whatsappMessage.guestsPlural.replace('{count}', String(guests));

    let body = '';
    if (attendance === 'both') {
      body = rsvp.whatsappMessage.both.replace('{guests}', guestsText);
    } else if (attendance === 'ceremony') {
      body = rsvp.whatsappMessage.ceremony.replace('{guests}', guestsText);
    } else if (attendance === 'celebration') {
      body = rsvp.whatsappMessage.celebration.replace('{guests}', guestsText);
    } else {
      body = rsvp.whatsappMessage.decline;
    }

    const trimmedNotes = notes.trim();
    const notesPart = trimmedNotes
      ? `\n${rsvp.whatsappMessage.notesPrefix} ${trimmedNotes}`
      : '';

    return `${greeting} ${body}${notesPart}`;
  }, [name, guests, attendance, notes, rsvp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = WEDDING_CONFIG.rsvp.whatsappPhone.replace(/\D/g, '');
    const baseUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}`
      : 'https://wa.me/';
    const url = `${baseUrl}?text=${encodeURIComponent(composedMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="asistencia"
      className="relative overflow-hidden px-5 pt-8 pb-16 md:pt-14 md:pb-24"
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
            {rsvp.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-[#555B2F] leading-[1.05]">
            {rsvp.title}
          </h2>
          <p className="mx-auto mt-5 max-w-md font-editorial italic text-xl md:text-2xl leading-relaxed text-[#555B2F]/85">
            «{rsvp.subtitle}»
          </p>
        </motion.div>

        {/* Ornate Fresco RSVP Form Card */}
        <motion.form
          onSubmit={handleSubmit}
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

          <div className="relative z-10 flex flex-col gap-6">
            {/* Top Emblem */}
            <div className="flex justify-center">
              <div
                aria-hidden="true"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FCF8F0] border border-[#C59B57]/50 text-[#555B2F] shadow-2xs"
              >
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>

            {/* 1. Attendance Option Selector (Default: 'both') */}
            <div>
              <label className="block text-center font-sans-label text-[10px] uppercase tracking-[0.24em] text-[#555B2F]/80 mb-3">
                {rsvp.attendanceLabel}
              </label>

              <div
                role="radiogroup"
                aria-label={rsvp.attendanceLabel}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {attendanceOptions.map((option) => {
                  const selected = attendance === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setAttendance(option.id)}
                      className={`group relative flex flex-col items-start text-left p-3.5 sm:p-4 border transition-all cursor-pointer ${
                        selected
                          ? 'border-[#555B2F] bg-[#555B2F] text-[#FCF8F0] shadow-xs'
                          : 'border-[#555B2F]/30 bg-[#FCF8F0]/90 text-[#555B2F] hover:border-[#555B2F]/65 hover:bg-[#FCF8F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="font-sans-label text-[11px] font-semibold uppercase tracking-[0.16em]">
                          {option.label}
                        </span>
                        <span
                          className={`flex items-center justify-center w-4 h-4 rounded-full border transition-colors shrink-0 ${
                            selected
                              ? 'border-[#C59B57] bg-[#C59B57] text-[#3B401E]'
                              : 'border-[#555B2F]/40 bg-transparent'
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      </div>
                      <span
                        className={`mt-1 font-editorial text-base leading-snug ${
                          selected ? 'text-[#FCF8F0]/85' : 'text-[#555B2F]/75'
                        }`}
                      >
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Guests Stepper (Shown when attending) */}
            <AnimatePresence initial={false}>
              {isAttending && (
                <motion.div
                  key="guests-stepper"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#FCF8F0] border border-[#555B2F]/30 px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[#555B2F]">
                      <Users className="w-4 h-4 text-[#B86B4B]" />
                      <span className="font-sans-label text-[10px] uppercase tracking-[0.22em]">
                        {rsvp.guestsLabel}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                        disabled={guests <= 1}
                        aria-label={rsvp.decreaseGuestsAria}
                        className="w-9 h-9 inline-flex items-center justify-center border border-[#555B2F]/40 bg-[#F5EFE2]/70 text-[#555B2F] hover:bg-[#555B2F] hover:text-[#FCF8F0] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="min-w-[110px] text-center">
                        <span className="font-display text-2xl sm:text-3xl font-medium text-[#555B2F]">
                          {guests}
                        </span>
                        <span className="ml-1.5 font-editorial italic text-lg text-[#555B2F]/80">
                          {guests === 1 ? rsvp.guestSingular : rsvp.guestPlural}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setGuests((prev) => Math.min(20, prev + 1))}
                        aria-label={rsvp.increaseGuestsAria}
                        className="w-9 h-9 inline-flex items-center justify-center border border-[#555B2F]/40 bg-[#F5EFE2]/70 text-[#555B2F] hover:bg-[#555B2F] hover:text-[#FCF8F0] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. Guest Name(s) Input */}
            <div>
              <label
                htmlFor="rsvp-name"
                className="block font-sans-label text-[10px] uppercase tracking-[0.22em] text-[#555B2F]/80 mb-2"
              >
                {rsvp.nameLabel}
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={rsvp.namePlaceholder}
                className="w-full bg-[#FCF8F0] border border-[#555B2F]/35 px-4 py-3 font-editorial text-xl text-[#555B2F] placeholder:text-[#555B2F]/40 focus:outline-none focus:border-[#555B2F] transition-colors"
              />
            </div>

            {/* 4. Optional Notes / Dietary Input */}
            {isAttending && (
              <div>
                <label
                  htmlFor="rsvp-notes"
                  className="block font-sans-label text-[10px] uppercase tracking-[0.22em] text-[#555B2F]/80 mb-2"
                >
                  {rsvp.notesLabel}
                </label>
                <input
                  id="rsvp-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={rsvp.notesPlaceholder}
                  className="w-full bg-[#FCF8F0] border border-[#555B2F]/35 px-4 py-3 font-editorial text-xl text-[#555B2F] placeholder:text-[#555B2F]/40 focus:outline-none focus:border-[#555B2F] transition-colors"
                />
              </div>
            )}

            {/* 5. Message Preview Box */}
            <div className="bg-[#FCF8F0]/80 border border-[#C59B57]/45 px-4 py-3.5 text-left">
              <p className="font-sans-label text-[9px] uppercase tracking-[0.24em] text-[#B86B4B] mb-1">
                {rsvp.messagePreviewLabel}
              </p>
              <p className="font-editorial italic text-lg sm:text-xl text-[#555B2F]/90 whitespace-pre-line leading-snug">
                «{composedMessage}»
              </p>
            </div>

            {/* 6. Submit WhatsApp Button */}
            <div className="pt-1 flex justify-center">
              <button
                type="submit"
                className="btn-fresco-olive w-full sm:w-auto min-w-[260px]"
              >
                <MessageCircle className="w-4 h-4 text-[#C59B57]" />
                <span>{rsvp.submitCta}</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
