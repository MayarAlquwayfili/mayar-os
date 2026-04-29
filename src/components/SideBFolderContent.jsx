import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

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

const SECTIONS = [
  {
    id: 'moheetik',
    images: [
      { id: 'moheetik-1', src: Moheetik_B_01 },
      { id: 'moheetik-2', src: Moheetik_B_02 },
      { id: 'moheetik-3', src: Moheetik_B_03 },
      { id: 'moheetik-4', src: Moheetik_B_04 },
      { id: 'moheetik-5', src: Moheetik_B_05 },
      { id: 'moheetik-6', src: Moheetik_B_06 },
      { id: 'moheetik-7', src: Moheetik_B_07 },
    ],
  },
  { id: 'pay', images: [{ id: 'pay-1', src: Pay_B_01 }] },
  {
    id: 'brewcha',
    images: [
      { id: 'brewcha-1', src: Brewcha_B_01 },
      { id: 'brewcha-2', src: Brewcha_B_02 },
    ],
  },
  {
    id: 'qaffatek',
    images: [
      { id: 'qaffatek-1', src: Qaffatek_B_01 },
      { id: 'qaffatek-2', src: Qaffatek_B_02 },
      { id: 'qaffatek-3', src: Qaffatek_B_03 },
      { id: 'qaffatek-4', src: Qaffatek_B_04 },
      { id: 'qaffatek-5', src: Qaffatek_B_05 },
      { id: 'qaffatek-6', src: Qaffatek_B_06 },
    ],
  },
  {
    id: 'reclab',
    images: [
      { id: 'reclab-1', src: RECLAB_B_01 },
      { id: 'reclab-2', src: RECLAB_B_02 },
      { id: 'reclab-3', src: RECLAB_B_03 },
      { id: 'reclab-4', src: RECLAB_B_04 },
      { id: 'reclab-5', src: RECLAB_B_05 },
    ],
  },
  {
    id: 'random',
    images: [
      { id: 'random-1', src: Random_B_01 },
      { id: 'random-2', src: Random_B_02 },
      { id: 'random-3', src: Random_B_03 },
      { id: 'random-4', src: Random_B_04 },
      { id: 'random-5', src: Random_B_05 },
      { id: 'random-7', src: Random_B_07 },
    ],
  },
]

const FLAT_GALLERY = SECTIONS.flatMap((s) => s.images)

const chevronShadow = { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.45))' }

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
      <div className="px-2 py-2 sm:px-3 sm:py-3">
        <div className="columns-2 gap-2 sm:columns-3 lg:columns-4">
          {FLAT_GALLERY.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              className="group mb-2 block w-full break-inside-avoid text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-400/70 focus-visible:ring-offset-2"
              onClick={() => openAt(idx)}
            >
              <div className="overflow-hidden rounded-lg shadow-sm shadow-black/10 transition-transform duration-200 group-hover:scale-[1.02]">
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
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
                className="fixed inset-0 z-[9600] flex items-center justify-center p-4 sm:p-6"
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
                  className="relative z-[1] flex max-h-[min(92vh,900px)] w-full max-w-[min(96vw,1100px)] flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    aria-label="Close preview"
                    className="absolute right-2 top-2 z-[2] p-1.5 text-white outline-none transition-opacity hover:opacity-80 sm:right-3 sm:top-3"
                    style={chevronShadow}
                    onClick={closeLightbox}
                  >
                    <X className="text-white" size={22} strokeWidth={1.5} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-1 top-1/2 z-[2] -translate-y-1/2 p-2 text-white outline-none transition-opacity hover:opacity-80 sm:left-2"
                    style={chevronShadow}
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                  >
                    <ChevronLeft className="text-white" size={26} strokeWidth={1.35} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-1 top-1/2 z-[2] -translate-y-1/2 p-2 text-white outline-none transition-opacity hover:opacity-80 sm:right-2"
                    style={chevronShadow}
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                  >
                    <ChevronRight className="text-white" size={26} strokeWidth={1.35} aria-hidden />
                  </button>
                  <img
                    key={active.id}
                    src={active.src}
                    alt=""
                    draggable={false}
                    className="max-h-[min(82vh,860px)] w-full max-w-full object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
