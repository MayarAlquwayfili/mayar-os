/**
 * Shared classes for Mac windows and scrollable inner content (Light / Dark uiTheme).
 * Theme-aware accent: Light #82ADB5 (readable on #F9F9F7), Dark #ACDEE7.
 * Highlight #FEF0BC unchanged elsewhere via components / globals.
 */

const ACCENT_LIGHT = '#82ADB5'
const ACCENT_DARK = '#ACDEE7'

/** Tailwind class fragments for interactive accent UI (buttons, pulses; informational chips use contentTokens.pill*). */
export function accentTokens(uiTheme) {
  const dark = uiTheme === 'dark'
  return {
    hex: dark ? ACCENT_DARK : ACCENT_LIGHT,
    /** Labels on accent fills — dark charcoal reads on both aqua/teal surfaces */
    textOnAccent: 'text-[#23262D]',
    pillBg: dark ? 'bg-[#ACDEE7]' : 'bg-[#82ADB5]',
    pillBorder: dark ? 'border-[#ACDEE7]/40' : 'border-[#82ADB5]/40',
    btnSolid: dark ? 'bg-[#ACDEE7]' : 'bg-[#82ADB5]',
    btnTint: dark ? 'bg-[#ACDEE7]/15' : 'bg-[#82ADB5]/15',
    borderAccent: dark ? 'border-[#ACDEE7]/35' : 'border-[#82ADB5]/35',
    borderAccentSoft: dark ? 'border-[#ACDEE7]/25' : 'border-[#82ADB5]/25',
    ringAccentTop: dark ? 'border-t-2 border-t-[#ACDEE7]' : 'border-t-2 border-t-[#82ADB5]',
    spinnerRingAccent: dark ? 'border-t-[#ACDEE7]' : 'border-t-[#82ADB5]',
    pulseDot: dark ? 'bg-[#ACDEE7]' : 'bg-[#82ADB5]',
  }
}

export function windowChrome(uiTheme) {
  const dark = uiTheme === 'dark'
  return {
    shell: dark
      ? 'border border-white/10 bg-[#2E3137] text-[#F9F9F7] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.55)]'
      : 'border border-black/10 bg-[#F9F9F7] text-[#23262D] shadow-2xl',
    titleBar: dark
      ? 'border-b border-white/10 bg-[#2E3137]'
      : 'border-b border-black/[0.06] bg-[#F9F9F7]',
    body: dark ? 'bg-[#2E3137]' : 'bg-[#F9F9F7]',
    bodyImagePreview: dark ? 'bg-[#1e2128]' : 'bg-[#fafafa]',
  }
}

/** Tailwind class fragments for explicit theme-aware content (small components). */
export function contentTokens(uiTheme) {
  const dark = uiTheme === 'dark'
  return {
    surface: dark ? 'bg-[#2E3137]' : 'bg-[#F9F9F7]',
    surfaceAlt: dark ? 'bg-[#363b44]' : 'bg-white',
    /** Primary body / headings */
    text: dark ? 'text-[#F9F9F7]' : 'text-[#23262D]',
    /** Secondary labels, dates, supporting lines */
    textMuted: dark ? 'text-[#F9F9F7]/70' : 'text-[#23262D]/70',
    /** Meta / tertiary (explicit hex on light for stable contrast) */
    textSubtle: dark ? 'text-[#A3A6AD]' : 'text-[#4A4D55]',
    /** Emphasis titles — same as primary, never pure black */
    textStrong: dark ? 'text-[#F9F9F7]' : 'text-[#23262D]',
    border: dark ? 'border-[#F9F9F7]/10' : 'border-[#23262D]/10',
    borderMuted: dark ? 'border-[#F9F9F7]/15' : 'border-[#23262D]/15',
    /** Status / success chips (MVP, completed badges) — soft green tint, charcoal label */
    pillStatus: dark
      ? 'border border-[#F9F9F7]/12 bg-emerald-400/18 text-[#23262D]'
      : 'border border-[#23262D]/10 bg-emerald-500/12 text-[#23262D]',
    /** Tools / tech tags — neutral tint */
    pillTools: dark
      ? 'border border-[#F9F9F7]/12 bg-[#F9F9F7]/10 text-[#23262D]'
      : 'border border-[#23262D]/10 bg-[#23262D]/5 text-[#23262D]',
    /** Role / prototype labels — muted tone */
    pillRole: dark
      ? 'border border-[#F9F9F7]/12 bg-[#F9F9F7]/10 text-[#23262D]'
      : 'border border-[#23262D]/10 bg-[#4A4D55]/10 text-[#23262D]',
    scrollRoot:
      '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark
        ? '[&::-webkit-scrollbar-thumb]:bg-[#F9F9F7]/22'
        : '[&::-webkit-scrollbar-thumb]:bg-[#23262D]/22'),
    scrollRootThin:
      '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark
        ? '[&::-webkit-scrollbar-thumb]:bg-[#F9F9F7]/20'
        : '[&::-webkit-scrollbar-thumb]:bg-[#23262D]/20'),
    /** Remap Tailwind gray utilities inside Mac window bodies (Light + Dark) */
    contentProse: dark ? 'window-content-dark' : 'window-content-light',

    /** Content accent — checklists, selection chrome, CV bullets (Light #82ADB5 / Dark #ACDEE7) */
    contentAccentHex: dark ? ACCENT_DARK : ACCENT_LIGHT,
    contentAccentText: dark ? 'text-[#ACDEE7]' : 'text-[#82ADB5]',
    contentAccentTintBg: dark ? 'bg-[#ACDEE7]/12' : 'bg-[#82ADB5]/12',
    contentAccentTintBorder: dark ? 'border-[#ACDEE7]/25' : 'border-[#82ADB5]/25',
    /** CV / custom ::before list dot */
    contentAccentBulletBefore: dark ? 'before:bg-[#ACDEE7]' : 'before:bg-[#82ADB5]',
  }
}
