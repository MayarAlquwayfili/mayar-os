import { useEffect, useRef, useState } from 'react'
import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'
import FolderIcon from '../assets/Folder.svg'
import { LAB_FOLDER_CONTENTS } from '../constants/projects'

/**
 * Lab folder — nested project launchers (Brewcha, research, …).
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
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
      <div className="flex flex-wrap content-start gap-x-10 gap-y-8 p-6">
        {LAB_FOLDER_CONTENTS.map((item) => {
          const isSelected = selectedId === item.id
          const src = item.icon === 'brewcha' ? BrewchaLauncherIcon : FolderIcon
          return (
            <button
              key={item.id}
              type="button"
              data-icon-item
              aria-label={`${item.title} — double-click to open`}
              className={`group flex w-[128px] cursor-default flex-col items-center gap-1.5 rounded-xl border p-2 text-center outline-none transition-colors ${
                isSelected
                  ? 'bg-[#ACDEE7]/12 border-[#ACDEE7]/25'
                  : 'bg-transparent border-transparent hover:bg-black/5'
              } focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2`}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
                onOpenProject?.(item.openWindowTitle)
              }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="h-[90px] w-[90px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="w-full text-[11px] font-medium leading-tight text-gray-800">
                {item.title}
              </span>
              {item.subtitle ? (
                <span className="w-full text-[10px] font-medium leading-tight text-gray-500">
                  {item.subtitle}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
