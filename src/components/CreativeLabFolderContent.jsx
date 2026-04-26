import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'

/**
 * Minimal folder surface — Brewcha launcher only.
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="flex min-h-full items-start justify-start p-8 sm:p-10">
        <button
          type="button"
          aria-label="Brewcha — double-click to open project"
          className="group flex w-[120px] cursor-default flex-col items-center gap-2 border-0 bg-transparent p-0 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2"
          onDoubleClick={(e) => {
            e.stopPropagation()
            onOpenProject?.('Brewcha')
          }}
        >
          <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-black/[0.03]">
            <img
              src={BrewchaLauncherIcon}
              alt=""
              draggable={false}
              className="h-[90px] w-[90px] object-contain drop-shadow-sm"
            />
          </div>
          <span className="line-clamp-2 text-[12px] font-medium leading-tight text-gray-800">
            Brewcha
          </span>
        </button>
      </div>
    </div>
  )
}
