import FolderIcon from '../assets/Folder.svg'
import FolderpdfIcon from '../assets/Folderpdf.svg'

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
    title: 'Will Cash Become Obsolete?',
    subtitle: 'Research Project',
    openWindowTitle: 'cash-obsolete-research',
    icon: 'folder',
  },
]

// ─── Desktop folder definitions ───────────────────────────────────────────────

function randomFolderPos() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const x = Math.max(20, Math.floor(Math.random() * vw * 0.72))
  const y = Math.max(20, Math.floor(Math.random() * (vh - 28) * 0.72))
  return { x, y }
}

export const DESKTOP_FOLDERS = [
  {
    id: 'side-b',
    title: 'Side B',
    windowTitle: 'Side B',
    icon: FolderIcon,
    subtitle: 'Behind the Scenes',
    ...randomFolderPos(),
  },
  {
    id: 'lab',
    title: 'Lab',
    windowTitle: 'Lab',
    icon: FolderIcon,
    subtitle: 'Folder',
    contents: LAB_FOLDER_CONTENTS,
    ...randomFolderPos(),
  },
  {
    id: 'cv',
    title: 'Mayar_CV.pdf',
    windowTitle: 'Preview — Mayar_CV.pdf',
    icon: FolderpdfIcon,
    subtitle: 'PDF Document',
    ...randomFolderPos(),
  },
]
