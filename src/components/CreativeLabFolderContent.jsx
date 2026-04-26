import BrewchaLauncherIcon from '../assets/Brewcha/Stickers/Brewcha_03.svg'

/**
 * Minimal folder surface — Brewcha launcher only.
 */
export default function CreativeLabFolderContent({ onOpenProject }) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="flex min-h-full items-center justify-center p-10">
        <div className="flex flex-col items-center">
          <div
            role="button"
            tabIndex={0}
            aria-label="Brewcha — open project"
            className="group flex w-[120px] cursor-default flex-col items-center gap-2 rounded-xl p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/40 focus-visible:ring-offset-2"
            onDoubleClick={(e) => {
              e.stopPropagation()
              onOpenProject?.('Brewcha')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onOpenProject?.('Brewcha')
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
          </div>
        </div>
      </div>
    </div>
  )
}
