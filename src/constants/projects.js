import SideBFolderIcon from '../assets/SideBFolder.svg'
import BrwchaFolderIcon from '../assets/BrwchaFolder.svg'
import PayFolderIcon from '../assets/PayFolder.svg'
import PdfFloderIcon from '../assets/PdfFloder.svg'

// ─── Tool stacks ──────────────────────────────────────────────────────────────

export const MOHEETIK_TOOLS = ['SwiftUI', 'CoreML', 'ARKit', 'Figma', 'Cursor (AI)']

export const RECLAB_TOOLS = ['Figma', 'SwiftUI', 'SwiftData', 'UIKit', 'ImageIO', 'Cursor (AI)']

export const QAFFATEK_TOOLS = ['Figma', 'SwiftUI', 'SwiftData', 'UIKit', 'ImageIO', 'Cursor']

// ─── Side B archive albums (add `src` when assets are ready; omit for gray placeholders) ─

export const moheetik_b_images = [
  { id: 'mk-1', caption: 'Draft 01', placeholder: 'Moheetik Sketch 1' },
  { id: 'mk-2', caption: 'Sketch', placeholder: 'Moheetik Sketch 2' },
  { id: 'mk-3', caption: 'Reference', placeholder: 'Moheetik Reference A' },
  { id: 'mk-4', caption: 'Draft 02', placeholder: 'Moheetik Wire 1' },
  { id: 'mk-5', caption: 'Notes', placeholder: 'Moheetik Process Notes' },
  { id: 'mk-6', caption: 'Exploration', placeholder: 'Moheetik Exploration 1' },
]

export const qaffatek_b_images = [
  { id: 'qf-1', caption: 'Draft 01', placeholder: 'Qaffatek Sketch 1' },
  { id: 'qf-2', caption: 'Sketch', placeholder: 'Qaffatek UI Draft' },
  { id: 'qf-3', caption: 'Reference', placeholder: 'Qaffatek Reference' },
  { id: 'qf-4', caption: 'Iteration', placeholder: 'Qaffatek Iteration 2' },
  { id: 'qf-5', caption: 'Detail', placeholder: 'Qaffatek Detail Pass' },
]

export const reclab_b_images = [
  { id: 'rc-1', caption: 'Draft 01', placeholder: 'RECLAB Lab Flow 1' },
  { id: 'rc-2', caption: 'Sketch', placeholder: 'RECLAB Sketch A' },
  { id: 'rc-3', caption: 'Reference', placeholder: 'RECLAB Reference' },
  { id: 'rc-4', caption: 'Prototype', placeholder: 'RECLAB Prototype Shot' },
  { id: 'rc-5', caption: 'Behind scenes', placeholder: 'RECLAB BTS 1' },
]

export const brewcha_b_images = [
  { id: 'br-1', caption: 'Draft 01', placeholder: 'BrewCha Moodboard 1' },
  { id: 'br-2', caption: 'Sketch', placeholder: 'BrewCha Workshop Sketch' },
  { id: 'br-3', caption: 'Reference', placeholder: 'BrewCha Reference' },
  { id: 'br-4', caption: 'Sticker', placeholder: 'BrewCha Sticker Concept' },
  { id: 'br-5', caption: 'Layout', placeholder: 'BrewCha Layout Draft' },
  { id: 'br-6', caption: 'Photo', placeholder: 'BrewCha Photo Placeholder' },
]

/** Album grid per Side B project folder key (matches SideBFolderContent `id`). */
export const SIDE_B_ALBUM_IMAGES = {
  moheetik: moheetik_b_images,
  qaffatek: qaffatek_b_images,
  reclab: reclab_b_images,
  brewcha: brewcha_b_images,
}

// ─── Lab window — nested projects (double-click opens `openWindowTitle` in App) ─

export const LAB_FOLDER_CONTENTS = [
  {
    id: 'brewcha',
    title: 'Brewcha',
    openWindowTitle: 'Brewcha',
    icon: 'brewcha',
  },
  {
    id: 'cash-obsolete-research',
    title: 'Digital Payments Research',
    subtitle: 'Research Project',
    openWindowTitle: 'cash-obsolete-research',
    icon: 'folder',
  },
]

// ─── Organic desktop placement (percent → safe rect below menu / above dock) ─

/** Mirrors App shell geometry — desktop icons clamp inside this footprint. */
export const DESKTOP_SAFE = {
  MENU_BAR_PX: 28,
  DOCK_SAFE_PX: 96,
  FOLDER_W: 132,
  FOLDER_H: 128,
}

/**
 * Maps design percentages (0–100 along width / height) into pixel `left`/`top` for a ~132×128 folder,
 * clamped so nothing sits under the menu bar or dock.
 */
export function desktopXYFromPercent(pctX, pctY, vw, vh) {
  const M = DESKTOP_SAFE.MENU_BAR_PX
  const D = DESKTOP_SAFE.DOCK_SAFE_PX
  const FW = DESKTOP_SAFE.FOLDER_W
  const FH = DESKTOP_SAFE.FOLDER_H
  const safeW = Math.max(0, vw - FW)
  const safeH = Math.max(0, vh - M - D - FH)
  let x = Math.round((pctX / 100) * safeW)
  let y = Math.round(M + (pctY / 100) * safeH)
  x = Math.max(0, Math.min(x, Math.max(0, vw - FW)))
  y = Math.max(M, Math.min(y, Math.max(M, vh - D - FH)))
  return { x, y }
}

/** Desktop draggable folders — scatter % (see brief). */
export function getOrganicDesktopFolderPositions(vw, vh) {
  return {
    'side-b': desktopXYFromPercent(61, 13, vw, vh),
    cv: desktopXYFromPercent(31, 27, vw, vh),
    brewcha: desktopXYFromPercent(10, 49, vw, vh),
    'cash-obsolete-research': desktopXYFromPercent(16, 69, vw, vh),
  }
}

/** Post-onboarding admin items — scatter % (see brief). */
export function getOrganicAdminLayout(vw, vh) {
  return {
    identitySticker: desktopXYFromPercent(82, 75, vw, vh),
    notion: desktopXYFromPercent(67, 82, vw, vh),
    figma: desktopXYFromPercent(88, 56, vw, vh),
    v60: desktopXYFromPercent(71, 59, vw, vh),
  }
}

// ─── Desktop folder definitions (fallback x/y ≈ 1200×800 viewport; live positions from getOrganicDesktopFolderPositions)

export const DESKTOP_FOLDERS = [
  {
    id: 'side-b',
    title: 'Side B',
    windowTitle: 'Side B',
    icon: SideBFolderIcon,
    cursorTipLabel: 'behind the screen',
    x: 652,
    y: 99,
  },
  {
    id: 'brewcha',
    title: 'Brewcha',
    windowTitle: 'Brewcha',
    icon: BrwchaFolderIcon,
    cursorTipLabel: 'Matcha & V60 Workshop',
    x: 107,
    y: 296,
  },
  {
    id: 'cash-obsolete-research',
    title: 'Digital Payments Research',
    windowTitle: 'cash-obsolete-research',
    icon: PayFolderIcon,
    cursorTipLabel: 'Economics Research',
    x: 171,
    y: 406,
  },
  {
    id: 'cv',
    title: 'Mayar_CV.pdf',
    windowTitle: 'Preview — Mayar_CV.pdf',
    icon: PdfFloderIcon,
    cursorTipLabel: 'PNU x ADA',
    x: 331,
    y: 176,
  },
]
