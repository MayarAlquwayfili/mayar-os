import { useEffect, useRef, useState } from 'react'
import FolderIcon from '../assets/Folder.svg'

const ARCHIVE_ITEMS = [
  { id: 'moheetik', label: 'Side B_Moheetik', windowTitle: 'Moheetik' },
  { id: 'qaffatek', label: 'Side B_Qaffatek', windowTitle: 'Qaffatek' },
  { id: 'reclab', label: 'Side B_RECLAB', windowTitle: 'RECLAB' },
  { id: 'brewcha', label: 'Side B_BrewCha', windowTitle: 'Brewcha' },
]

/**
 * Side B — archive folders opening main project windows.
 */
export default function SideBFolderContent({ onOpenProject }) {
  const rootRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) return
      if (!e.target.closest('[data-icon-item]')) setSelectedId(null)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <div ref={rootRef} className="h-full overflow-auto bg-white">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-6">
        {ARCHIVE_ITEMS.map((item) => {
          const isSelected = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              data-icon-item
              aria-label={`${item.label} — double-click to open`}
              className={`group flex cursor-default flex-col items-center gap-2 rounded-xl border p-2 text-center outline-none transition-colors ${
                isSelected
                  ? 'bg-[#6B3FA0]/10 border-[#6B3FA0]/20'
                  : 'bg-transparent border-transparent hover:bg-black/5'
              } focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2`}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
                onOpenProject?.(item.windowTitle)
              }}
            >
              <img
                src={FolderIcon}
                alt=""
                draggable={false}
                className="h-[72px] w-[72px] shrink-0 object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="max-w-[140px] break-words text-[11px] font-medium leading-tight text-gray-800">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
