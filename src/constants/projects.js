import FolderIcon from '../assets/Folder.svg'
import FolderpdfIcon from '../assets/Folderpdf.svg'

// ─── Tool stacks ──────────────────────────────────────────────────────────────

export const MOHEETIK_TOOLS = ['SwiftUI', 'CoreML', 'ARKit', 'Figma', 'Cursor (AI)']

export const RECLAB_TOOLS = ['Figma', 'SwiftUI', 'SwiftData', 'UIKit', 'ImageIO', 'Cursor (AI)']

export const QAFFATEK_TOOLS = ['Figma', 'SwiftUI', 'SwiftData', 'UIKit', 'ImageIO', 'Cursor']

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
