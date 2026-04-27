import { useEffect, useRef, useState } from 'react'
import { SIDE_B_ALBUM_IMAGES } from '../constants/projects'

/**
 * Side B — album grid for one project; thumbnails select on click, preview on double-click.
 */
export default function SideBAlbumContent({ projectKey, onOpenPreview }) {
  const items = SIDE_B_ALBUM_IMAGES[projectKey] ?? []
  const rootRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) return
      if (!e.target.closest('[data-album-tile]')) setSelectedId(null)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <div ref={rootRef} className="h-full overflow-auto bg-white">
      <div className="grid grid-cols-3 gap-4 p-6 sm:grid-cols-4 sm:gap-5">
        {items.map((item) => {
          const isSelected = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              data-album-tile
              aria-label={`${item.caption} — double-click to preview`}
              className={`group flex w-full cursor-default flex-col gap-1.5 rounded-xl border p-1.5 text-center outline-none transition-colors ${
                isSelected
                  ? 'border-[#6B3FA0]/20 bg-[#6B3FA0]/10'
                  : 'border-transparent hover:bg-black/5'
              } focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2`}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                setSelectedId(item.id)
                onOpenPreview?.(item)
              }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {item.src ? (
                  <img
                    src={item.src}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-medium leading-snug text-gray-600">
                    {item.placeholder}
                  </div>
                )}
              </div>
              <span className="px-0.5 text-center text-[10px] text-gray-500">
                {item.caption}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
