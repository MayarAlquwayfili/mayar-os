import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Moheetik_B_01 from '../assets/SideB/Moheetik_B_01.png'
import Moheetik_B_02 from '../assets/SideB/Moheetik_B_02.jpg'
import Moheetik_B_03 from '../assets/SideB/Moheetik_B_03.jpg'
import Moheetik_B_04 from '../assets/SideB/Moheetik_B_04.jpg'
import Moheetik_B_05 from '../assets/SideB/Moheetik_B_05.jpg'
import Moheetik_B_06 from '../assets/SideB/Moheetik_B_06.jpg'
import Moheetik_B_07 from '../assets/SideB/Moheetik_B_07.jpg'

import Pay_B_01 from '../assets/SideB/Pay_B_01.jpg'

import Brewcha_B_01 from '../assets/SideB/Brewcha_B_01.jpg'
import Brewcha_B_02 from '../assets/SideB/Brewcha_B_02.jpg'

import Qaffatek_B_01 from '../assets/SideB/Qaffatek_B_01.jpeg'
import Qaffatek_B_02 from '../assets/SideB/Qaffatek_B_02.jpg'
import Qaffatek_B_03 from '../assets/SideB/Qaffatek_B_03.jpeg'
import Qaffatek_B_04 from '../assets/SideB/Qaffatek_B_04.jpg'
import Qaffatek_B_05 from '../assets/SideB/Qaffatek_B_05.jpg'
import Qaffatek_B_06 from '../assets/SideB/Qaffatek_B_06.jpg'

import RECLAB_B_01 from '../assets/SideB/RECLAB_B_01.jpg'
import RECLAB_B_02 from '../assets/SideB/RECLAB_B_02.jpg'
import RECLAB_B_03 from '../assets/SideB/RECLAB_B_03.jpg'
import RECLAB_B_04 from '../assets/SideB/RECLAB_B_04.jpg'
import RECLAB_B_05 from '../assets/SideB/RECLAB_B_05.heic?url'

import Random_B_01 from '../assets/SideB/Random_B_01.jpg'
import Random_B_02 from '../assets/SideB/Random_B_02.jpg'
import Random_B_03 from '../assets/SideB/Random_B_03.jpg'
import Random_B_04 from '../assets/SideB/Random_B_04.jpg'
import Random_B_05 from '../assets/SideB/Random_B_05.jpg'
import Random_B_07 from '../assets/SideB/Random_B_07.heic?url'

/**
 * HEIC: Bundled via Vite `?url` (see imports below). Many browsers still cannot decode
 * .heic in <img>; convert RECLAB_B_05 / Random_B_07 to JPG/PNG in src/assets/SideB/ if needed.
 */

const WORK_ACCENT = '#544EAE'

const SIDE_B_SECTIONS = [
  {
    id: 'moheetik',
    title: '01. Moheetik — Computer Vision',
    images: [
      { id: 'moheetik-1', src: Moheetik_B_01, label: 'Moheetik_B_01.png' },
      { id: 'moheetik-2', src: Moheetik_B_02, label: 'Moheetik_B_02.jpg' },
      { id: 'moheetik-3', src: Moheetik_B_03, label: 'Moheetik_B_03.jpg' },
      { id: 'moheetik-4', src: Moheetik_B_04, label: 'Moheetik_B_04.jpg' },
      { id: 'moheetik-5', src: Moheetik_B_05, label: 'Moheetik_B_05.jpg' },
      { id: 'moheetik-6', src: Moheetik_B_06, label: 'Moheetik_B_06.jpg' },
      { id: 'moheetik-7', src: Moheetik_B_07, label: 'Moheetik_B_07.jpg' },
    ],
  },
  {
    id: 'pay',
    title: '02. Economics Research (Pay)',
    images: [{ id: 'pay-1', src: Pay_B_01, label: 'Pay_B_01.jpg' }],
  },
  {
    id: 'brewcha',
    title: '03. Brewcha',
    images: [
      { id: 'brewcha-1', src: Brewcha_B_01, label: 'Brewcha_B_01.jpg' },
      { id: 'brewcha-2', src: Brewcha_B_02, label: 'Brewcha_B_02.jpg' },
    ],
  },
  {
    id: 'qaffatek',
    title: '04. Qaffatek',
    images: [
      { id: 'qaffatek-1', src: Qaffatek_B_01, label: 'Qaffatek_B_01.jpeg' },
      { id: 'qaffatek-2', src: Qaffatek_B_02, label: 'Qaffatek_B_02.jpg' },
      { id: 'qaffatek-3', src: Qaffatek_B_03, label: 'Qaffatek_B_03.jpeg' },
      { id: 'qaffatek-4', src: Qaffatek_B_04, label: 'Qaffatek_B_04.jpg' },
      { id: 'qaffatek-5', src: Qaffatek_B_05, label: 'Qaffatek_B_05.jpg' },
      { id: 'qaffatek-6', src: Qaffatek_B_06, label: 'Qaffatek_B_06.jpg' },
    ],
  },
  {
    id: 'reclab',
    title: '05. RECLAB',
    images: [
      { id: 'reclab-1', src: RECLAB_B_01, label: 'RECLAB_B_01.jpg' },
      { id: 'reclab-2', src: RECLAB_B_02, label: 'RECLAB_B_02.jpg' },
      { id: 'reclab-3', src: RECLAB_B_03, label: 'RECLAB_B_03.jpg' },
      { id: 'reclab-4', src: RECLAB_B_04, label: 'RECLAB_B_04.jpg' },
      { id: 'reclab-5', src: RECLAB_B_05, label: 'RECLAB_B_05.heic' },
    ],
  },
  {
    id: 'random',
    title: '06. Random Experiments',
    images: [
      { id: 'random-1', src: Random_B_01, label: 'Random_B_01.jpg' },
      { id: 'random-2', src: Random_B_02, label: 'Random_B_02.jpg' },
      { id: 'random-3', src: Random_B_03, label: 'Random_B_03.jpg' },
      { id: 'random-4', src: Random_B_04, label: 'Random_B_04.jpg' },
      { id: 'random-5', src: Random_B_05, label: 'Random_B_05.jpg' },
      { id: 'random-7', src: Random_B_07, label: 'Random_B_07.heic' },
    ],
  },
]

function buildFlatGallery() {
  const out = []
  for (const section of SIDE_B_SECTIONS) {
    for (const img of section.images) {
      out.push({
        ...img,
        sectionTitle: section.title,
        sectionId: section.id,
      })
    }
  }
  return out
}

const FLAT_GALLERY = buildFlatGallery()

/**
 * Side B — unified categorized image archive with full-screen lightbox.
 */
export default function SideBFolderContent() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openAt = useCallback((globalIndex) => {
    setLightboxIndex(globalIndex)
  }, [])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i == null) return i
      return (i - 1 + FLAT_GALLERY.length) % FLAT_GALLERY.length
    })
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i == null) return i
      return (i + 1) % FLAT_GALLERY.length
    })
  }, [])

  const globalIndexById = useMemo(() => {
    const m = new Map()
    FLAT_GALLERY.forEach((item, idx) => m.set(item.id, idx))
    return m
  }, [])

  useEffect(() => {
    if (lightboxIndex == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, goPrev, goNext])

  const active = lightboxIndex != null ? FLAT_GALLERY[lightboxIndex] : null

  return (
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-200"
    >
      <div className="p-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1
            className="text-[18px] font-bold leading-tight tracking-tight"
            style={{ color: WORK_ACCENT }}
          >
            Side B
          </h1>
          <p className="mt-0.5 text-[12px]" style={{ color: '#8e8e93' }}>
            Unified process archive — {FLAT_GALLERY.length} frames
          </p>
        </motion.div>

        {SIDE_B_SECTIONS.map((section) => (
          <section key={section.id} className="mb-12">
            <h2
              className="mb-4 text-[18px] font-bold leading-tight tracking-tight"
              style={{ color: WORK_ACCENT }}
            >
              {section.title}
            </h2>
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              {section.images.map((img) => {
                const gIdx = globalIndexById.get(img.id) ?? 0
                return (
                  <button
                    key={img.id}
                    type="button"
                    className="group mb-4 block w-full break-inside-avoid text-left outline-none focus-visible:ring-2 focus-visible:ring-[#544EAE]/40 focus-visible:ring-offset-2"
                    onClick={() => openAt(gIdx)}
                  >
                    <div
                      className="overflow-hidden rounded-lg shadow-md shadow-black/10 transition-transform duration-200 group-hover:scale-[1.02]"
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        draggable={false}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-1.5 truncate text-[11px] font-medium text-gray-500">{img.label}</p>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {active && lightboxIndex != null && (
              <motion.div
                key="side-b-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label="Image preview"
                className="fixed inset-0 z-[9600] flex items-center justify-center p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <motion.button
                  type="button"
                  aria-label="Close"
                  className="absolute inset-0 bg-black/55 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeLightbox}
                />
                <motion.div
                  className="relative z-[1] flex max-h-[min(92vh,900px)] w-full max-w-[min(96vw,1100px)] flex-col"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative flex min-h-0 flex-1 items-center justify-center rounded-2xl bg-black/20 p-2 shadow-2xl ring-1 ring-white/15">
                    <button
                      type="button"
                      aria-label="Close preview"
                      className="absolute right-3 top-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg font-semibold text-gray-800 shadow-md transition hover:bg-white"
                      onClick={closeLightbox}
                    >
                      ×
                    </button>
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-black/55 sm:left-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        goPrev()
                      }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-black/55 sm:right-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        goNext()
                      }}
                    >
                      ›
                    </button>
                    <img
                      key={active.id}
                      src={active.src}
                      alt={active.label}
                      draggable={false}
                      className="max-h-[min(78vh,820px)] w-full max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-3 text-center text-[13px] font-medium text-white drop-shadow-md">
                    <span className="text-white/85">{active.sectionTitle}</span>
                    <span className="mx-2 text-white/50">·</span>
                    <span>{active.label}</span>
                    <span className="ml-2 text-white/60">
                      ({lightboxIndex + 1} / {FLAT_GALLERY.length})
                    </span>
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
