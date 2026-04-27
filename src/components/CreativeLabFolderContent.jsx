import { useEffect, useRef, useState } from 'react'
import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'

/**
 * Minimal folder surface — Brewcha launcher only.
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
  const rootRef = useRef(null)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) return
      if (!e.target.closest('[data-icon-item]')) setSelected(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <div ref={rootRef} className="h-full overflow-auto bg-white">
      <div className="p-6">
        <button
          type="button"
          data-icon-item
          aria-label="Brewcha — double-click to open project"
          className={`group flex w-[140px] cursor-default flex-col items-center gap-2 rounded-xl border p-2 text-center outline-none transition-colors ${
            selected
              ? 'bg-[#6B3FA0]/10 border-[#6B3FA0]/20'
              : 'bg-transparent border-transparent hover:bg-black/5'
          } focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2`}
          onClick={(e) => {
            e.stopPropagation()
            setSelected(true)
          }}
          onDoubleClick={(e) => {
            e.stopPropagation()
            setSelected(true)
            onOpenProject?.('Brewcha')
          }}
        >
          <img
            src={BrewchaLauncherIcon}
            alt=""
            draggable={false}
            className="h-[90px] w-[90px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <span className="text-[12px] font-medium leading-tight text-gray-800">
            Brewcha
          </span>
        </button>
      </div>
    </div>
  )
}
