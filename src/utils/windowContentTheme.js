/**
 * Shared classes for Mac windows and scrollable inner content (Light / Dark uiTheme).
 * Theme-aware accent: Light #82ADB5 (readable on #F9F9F7), Dark #ACDEE7.
 * Highlight #FEF0BC unchanged elsewhere via components / globals.
 */

const ACCENT_LIGHT = '#82ADB5'
const ACCENT_DARK = '#ACDEE7'

/** Tailwind class fragments for interactive accent UI (pills, buttons, pulses). */
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
    text: dark ? 'text-[#F9F9F7]' : 'text-[#23262D]',
    textMuted: dark ? 'text-[#F9F9F7]/75' : 'text-gray-600',
    textSubtle: dark ? 'text-[#F9F9F7]/50' : 'text-gray-400',
    textStrong: dark ? 'text-[#F9F9F7]' : 'text-gray-900',
    border: dark ? 'border-white/10' : 'border-gray-100',
    borderMuted: dark ? 'border-white/15' : 'border-gray-200',
    pill: dark ? 'bg-white/12 text-[#F9F9F7]/90' : 'bg-gray-100 text-gray-600',
    scrollRoot:
      '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark
        ? '[&::-webkit-scrollbar-thumb]:bg-white/20'
        : '[&::-webkit-scrollbar-thumb]:bg-gray-300'),
    scrollRootThin:
      '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ' +
      (dark ? '[&::-webkit-scrollbar-thumb]:bg-white/18' : '[&::-webkit-scrollbar-thumb]:bg-gray-200'),
    /** Apply on scroll roots in dark mode together with `surface` for gray-* overrides */
    darkProse: dark ? 'window-content-dark' : '',
  }
}
