import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import type { SectionId } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FloatingControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
}

const SECTION_IDS: readonly SectionId[] = [
  'inicio',
  'historia',
  'lugares',
  'programa',
  'alojamiento',
  'asistencia',
  'regalo',
] as const;

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  isPlaying,
  isMuted,
  onToggleMusic,
}) => {
  const { t } = useI18n();
  const soundActive = isPlaying && !isMuted;
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { id: 'inicio' as const, href: '#inicio', label: t.nav.items.home },
      { id: 'historia' as const, href: '#historia', label: t.nav.items.story },
      { id: 'lugares' as const, href: '#lugares', label: t.nav.items.venues },
      { id: 'programa' as const, href: '#programa', label: t.nav.items.timeline },
      { id: 'alojamiento' as const, href: '#alojamiento', label: t.nav.items.accommodation },
      { id: 'asistencia' as const, href: '#asistencia', label: t.nav.items.rsvp },
      { id: 'regalo' as const, href: '#regalo', label: t.nav.items.gift },
    ],
    [t]
  );

  // ScrollSpy: detect which section is currently in the primary viewport zone
  useEffect(() => {
    const updateActiveSection = () => {
      const triggerLine = window.innerHeight * 0.36;
      let current: SectionId = 'inicio';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          current = id;
        }
      }

      // If scrolled to the very bottom of the page, highlight the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = 'regalo';
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleNavigate = useCallback((id: SectionId, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const activeItem = navItems.find((item) => item.id === activeSection) ?? navItems[0];

  return (
    <>
      {/* Top Navigation Header (Desktop Pill + Mobile Compact Bar) */}
      <header className="fixed top-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
        {/* DESKTOP NAVBAR (md and up) */}
        <div className="hidden md:flex items-center justify-center gap-3">
          <nav
            aria-label={t.nav.ariaLabel}
            className="pointer-events-auto flex items-center gap-1 rounded-full border border-[#555B2F]/25 bg-[#FCF8F0]/92 backdrop-blur-md p-1.5 shadow-[0_10px_30px_-8px_rgba(85,91,47,0.22)]"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavigate(item.id, e)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full font-sans-label text-[10px] tracking-[0.18em] uppercase transition-colors ${
                    isActive
                      ? 'text-[#FCF8F0] font-semibold'
                      : 'text-[#555B2F]/75 hover:text-[#555B2F]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#555B2F] shadow-xs -z-10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pointer-events-auto shrink-0">
            <LanguageSwitcher />
          </div>
        </div>

        {/* MOBILE NAVBAR (< md): Compact Active-Section Trigger + Language Switcher */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenuAria : t.nav.openMenuAria}
            className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-[#555B2F]/30 bg-[#FCF8F0]/95 backdrop-blur-md pl-3 pr-3.5 py-2 shadow-[0_8px_24px_-6px_rgba(85,91,47,0.22)] text-[#555B2F] active:scale-95 transition-all cursor-pointer"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#555B2F] text-[#FCF8F0]">
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </span>
            <span className="font-display text-xs tracking-[0.16em] text-[#555B2F]/70">
              {t.couple.monogram}
            </span>
            <span className="h-3 w-px bg-[#555B2F]/25" aria-hidden="true" />
            <span className="font-sans-label text-[10px] font-semibold tracking-[0.18em] uppercase text-[#555B2F]">
              {activeItem.label}
            </span>
          </button>

          <div className="pointer-events-auto shrink-0">
            <LanguageSwitcher />
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU SHEET */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="mobile-nav-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="pointer-events-auto fixed inset-0 bg-[#2C3018]/25 backdrop-blur-[2px] -z-10 md:hidden"
              />

              {/* Editorial Menu Card */}
              <motion.nav
                key="mobile-nav-sheet"
                aria-label={t.nav.ariaLabel}
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto md:hidden relative mt-2.5 rounded-2xl border border-[#555B2F]/35 bg-[#FCF8F0] p-4 shadow-[0_22px_50px_-12px_rgba(44,48,24,0.32)] overflow-hidden"
              >
                {/* Inner Delicate Gold Frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#C59B57]/35"
                />

                <div className="relative z-10 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavigate(item.id, e)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 font-sans-label text-[11px] tracking-[0.22em] uppercase transition-all ${
                          isActive
                            ? 'bg-[#555B2F] text-[#FCF8F0] font-semibold shadow-xs'
                            : 'text-[#555B2F]/80 hover:bg-[#F5EFE2] hover:text-[#555B2F]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="text-[#C59B57] text-xs leading-none" aria-hidden="true">
                            ✦
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Bottom Right: Discreet Floating Music Toggle */}
      <motion.button
        type="button"
        onClick={onToggleMusic}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        aria-label={soundActive ? t.music.ariaMute : t.music.ariaUnmute}
        className="fixed bottom-5 right-4 sm:right-6 z-30 inline-flex items-center gap-2 rounded-full bg-[#F5EFE2]/95 backdrop-blur-sm border border-[#555B2F]/30 px-3.5 py-2.5 shadow-lg text-[#555B2F] hover:bg-[#555B2F] hover:text-[#FCF8F0] hover:scale-105 transition-all cursor-pointer group"
      >
        {soundActive ? (
          <Volume2 className="w-4 h-4 text-[#B86B4B] group-hover:text-[#C59B57]" />
        ) : (
          <VolumeX className="w-4 h-4 opacity-70" />
        )}
        <span className="font-sans-label text-[9px] tracking-[0.2em] uppercase">
          {soundActive ? t.music.playingLabel : t.music.mutedLabel}
        </span>
      </motion.button>
    </>
  );
};
