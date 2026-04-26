import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'

/**
 * Minimal folder surface — Brewcha launcher only.
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="flex min-h-full items-center justify-center p-10">
        <button
          type="button"
          aria-label="Brewcha — double-click to open project"
          className="group flex w-[140px] cursor-default flex-col items-center gap-2 rounded-xl border-0 bg-transparent p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2"
          onDoubleClick={(e) => {
            e.stopPropagation()
            onOpenProject?.('Brewcha')
          }}
        >
          <img
            src={BrewchaLauncherIcon}
            alt=""
            draggable={false}
            className="h-[100px] w-[100px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <span className="text-[12px] font-medium leading-tight text-gray-800">
            Brewcha
          </span>
        </button>
      </div>
    </div>
  )
}
