import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'

/**
 * macOS-style folder window: grid of project icons.
 * Double-click Brewcha opens the full BrewchaContent window.
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-wide text-gray-400">
          Items
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-8">
          <button
            type="button"
            aria-label="Brewcha — double-click to open project"
            className="group flex w-[88px] cursor-default flex-col items-center gap-1.5 border-0 bg-transparent p-0 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2"
            onDoubleClick={(e) => {
              e.stopPropagation()
              onOpenProject?.('Brewcha')
            }}
          >
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg p-1 transition-colors group-hover:bg-black/[0.04]">
              <img
                src={BrewchaLauncherIcon}
                alt=""
                draggable={false}
                className="h-14 w-14 object-contain drop-shadow-sm"
              />
            </div>
            <span className="line-clamp-2 text-[12px] font-medium leading-tight text-gray-800">
              Brewcha
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
