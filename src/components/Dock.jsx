import AppIconMoheetik from '../assets/Moheetik/AppIconMoheetik.svg'
import AppIconQaffatek from '../assets/AppIconQaffatek.svg'
import AppIconRECLAB from '../assets/RECLAB/AppIconRECLAB.svg'
import BrewchaIcon from "../assets/Brewcha/Brewcha's_fav.svg"

const DOCK_APPS = [
  { id: 'Moheetik', label: 'Moheetik', icon: AppIconMoheetik },
  { id: 'Qaffatek', label: 'Qaffatek', icon: AppIconQaffatek },
  { id: 'RECLAB',   label: 'RECLAB',   icon: AppIconRECLAB   },
  { id: 'Brewcha',  label: 'Brewcha',  icon: BrewchaIcon     },
]

export default function Dock({ openWindows = [], onOpen }) {
  const openIds = new Set(openWindows.map((w) => w.id))

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-5 px-5 py-2 rounded-[22px] border border-white/30"
      style={{
        zIndex: 5000,
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 1.5px 0 rgba(255,255,255,0.35) inset',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {DOCK_APPS.map(({ id, label, icon }) => (
        <div key={id} className="relative flex flex-col items-center group">

          {/* Tooltip — fades in above icon on hover */}
          <div className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div
              className="relative bg-white/90 text-black text-[11px] font-medium px-3 py-1 rounded-lg whitespace-nowrap"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)' }}
            >
              {label}
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid rgba(255,255,255,0.9)',
                }}
              />
            </div>
          </div>

          {/* Icon */}
          <button
            type="button"
            aria-label={`Open ${label}`}
            className="w-[54px] h-[54px] rounded-[12px] hover:scale-[1.3] hover:-translate-y-2 active:scale-100 focus:outline-none"
            style={{ transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            onClick={() => onOpen?.(id)}
          >
            <img
              src={icon}
              alt={label}
              draggable={false}
              className="w-full h-full rounded-[12px] object-cover"
            />
          </button>

          {/* Active dot — scales up with icon on hover */}
          <span
            className={`mt-1.5 h-1 w-1 rounded-full transition-all duration-500 group-hover:scale-125 ${
              openIds.has(id) ? 'bg-gray-600 opacity-100' : 'opacity-0'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          />
        </div>
      ))}
    </div>
  )
}
