import { useEffect, useRef, useState } from 'react'
import FolderIcon from '../assets/Folder.svg'

const ARCHIVE_ITEMS = [
  { id: 'moheetik', name: 'Moheetik' },
  { id: 'qaffatek', name: 'Qaffatek' },
  { id: 'reclab', name: 'RECLAB' },
  { id: 'brewcha', name: 'BrewCha' },
]

/**
 * Side B — archive folders; double-click opens album window for that project.
 */
export default function SideBFolderContent({ openOrFocusWindow }) {
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
      <div className="grid grid-cols-4 content-start gap-x-12 gap-y-16 p-10 justify-items-start">
        {ARCHIVE_ITEMS.map((item) => {
          const isSelected = selectedId === item.id
          const ariaLabel = `Side B_${item.name}`
          return (
            <button
              key={item.id}
              type="button"
              data-icon-item
              aria-label={ariaLabel}
              className={`group flex min-w-0 cursor-default flex-col items-center gap-2 rounded-xl border px-3 py-2.5 text-center outline-none transition-colors ${
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
                openOrFocusWindow?.({
                  id: `side-b-album-${item.id}`,
                  title: `Side B — ${item.name}`,
                  variant: 'side-b-album',
                  sideBAlbumKey: item.id,
                })
              }}
            >
              <div className="flex w-full flex-col items-center text-center">
                <img
                  src={FolderIcon}
                  alt=""
                  draggable={false}
                  className="h-[90px] w-[90px] shrink-0 object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="mt-1 flex w-full max-w-[7.5rem] flex-col items-center text-center">
                  <span className="text-[11px] font-medium leading-tight text-gray-800">
                    Side B_
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-gray-800">
                    {item.name}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
