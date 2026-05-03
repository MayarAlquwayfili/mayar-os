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

// ─── Desktop grid (fixed columns, consistent vertical gap) ───────────────────

/**
 * Desktop icon layout: 130px vertical rhythm; left column workspace/research, right column identity/CV.
 * Coordinates are viewport-based; use `getDesktopFolderPositions` / admin helpers with live `innerWidth`/`innerHeight`.
 */
export const DESKTOP_GRID = {
  GAP_Y: 130,
  LEFT_COL_X: 50,
  ROW_TOP: 50,
  /** Distance from viewport right used as folder **left** x (`vw - offset`), clamped so icons stay on-screen. */
  RIGHT_COL_OFFSET: 150,
  MIN_X: 16,
  /** Dock + breathing room when pinning Brewcha to the bottom (mirrors App DOCK_SAFE_PX). */
  DOCK_SAFE_PX: 96,
  /** Approx. desktop folder stack height (label + icon). */
  FOLDER_STACK_H: 128,
}

export function desktopLeftColumnX() {
  return DESKTOP_GRID.LEFT_COL_X
}

/** Right-column folder left edge: `innerWidth - offset`, clamped. */
export function desktopRightColumnLeft(vw) {
  return Math.max(DESKTOP_GRID.MIN_X, vw - DESKTOP_GRID.RIGHT_COL_OFFSET)
}

/**
 * @param {number} vw
 * @param {number} vh
 * @returns {Record<string, { x: number, y: number }>}
 */
export function getDesktopFolderPositions(vw, vh) {
  const G = DESKTOP_GRID
  const lx = desktopLeftColumnX()
  const rx = desktopRightColumnLeft(vw)
  const TOP = G.ROW_TOP
  const gap = G.GAP_Y

  const maxY = vh - G.DOCK_SAFE_PX - G.FOLDER_STACK_H - 16
  let brewchaY = Math.min(TOP + 4 * gap, maxY)
  brewchaY = Math.min(Math.max(brewchaY, TOP + 2 * gap), maxY)

  return {
    'side-b': { x: lx, y: TOP + 2 * gap },
    'cash-obsolete-research': { x: lx, y: TOP + 3 * gap },
    brewcha: { x: lx, y: brewchaY },
    cv: { x: rx, y: TOP + gap },
  }
}

// ─── Desktop folder definitions (positions from grid — see getDesktopFolderPositions) ─

export const DESKTOP_FOLDERS = [
  {
    id: 'side-b',
    title: 'Side B',
    windowTitle: 'Side B',
    icon: SideBFolderIcon,
    cursorTipLabel: 'behind the screen',
    x: 50,
    y: 310,
  },
  {
    id: 'brewcha',
    title: 'Brewcha',
    windowTitle: 'Brewcha',
    icon: BrwchaFolderIcon,
    cursorTipLabel: 'Matcha & V60 Workshop',
    x: 50,
    y: 570,
  },
  {
    id: 'cash-obsolete-research',
    title: 'Digital Payments Research',
    windowTitle: 'cash-obsolete-research',
    icon: PayFolderIcon,
    cursorTipLabel: 'Economics Research',
    x: 50,
    y: 440,
  },
  {
    id: 'cv',
    title: 'Mayar_CV.pdf',
    windowTitle: 'Preview — Mayar_CV.pdf',
    icon: PdfFloderIcon,
    cursorTipLabel: 'PNU x ADA',
    x: 1050,
    y: 180,
  },
]
