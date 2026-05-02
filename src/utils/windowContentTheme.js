/**
 * Shared classes for Mac window *body* content only (Light / Dark uiTheme).
 * Desktop chrome (dock, menu bar, folders, tooltips) uses brand yellow (#FEF0BC) in components — not these tokens.
 * Project pills: pillStatus (accent bg /50 + theme-aware text), pillDefault (gray /5 + theme text).
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
    /** Status labels — bg /50 (0.5); text follows theme (light bg → charcoal, dark bg → warm white) */
    pillStatus: dark
      ? 'border border-[#ACDEE7]/40 bg-[#ACDEE7]/50 text-[#F9F9F7]'
      : 'border border-[#82ADB5]/30 bg-[#82ADB5]/50 text-[#23262D]',
    /** Tools, roles, tech tags — neutral translucent gray */
    pillDefault: dark
      ? 'border border-[#F9F9F7]/10 bg-[#F9F9F7]/5 text-[#F9F9F7]'
      : 'border border-[#23262D]/10 bg-[#23262D]/5 text-[#23262D]',
    /** Minimal scrollbars — transparent track, subtle gray thumb (project windows + CV) */
    scrollRoot:
      '[scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark
        ? '[scrollbar-color:rgba(249,249,247,0.2)_transparent] [&::-webkit-scrollbar-thumb]:bg-[#F9F9F7]/20'
        : '[scrollbar-color:rgba(35,38,45,0.2)_transparent] [&::-webkit-scrollbar-thumb]:bg-[#23262D]/20'),
    scrollRootThin:
      '[scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark
        ? '[scrollbar-color:rgba(249,249,247,0.2)_transparent] [&::-webkit-scrollbar-thumb]:bg-[#F9F9F7]/20'
        : '[scrollbar-color:rgba(35,38,45,0.2)_transparent] [&::-webkit-scrollbar-thumb]:bg-[#23262D]/20'),
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
