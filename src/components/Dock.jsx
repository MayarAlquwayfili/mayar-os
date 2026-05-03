import { AnimatePresence, motion } from 'framer-motion'
import AppIconMoheetik from '../assets/Moheetik/AppIconMoheetik.svg'
import AppIconQaffatek from '../assets/AppIconQaffatek.svg'
import AppIconRECLAB from '../assets/RECLAB/AppIconRECLAB.svg'
import ManualFolderIconLight from '../assets/ManuaFloder.svg'
import ManualFolderIconDark from '../assets/ManuaFloderDark.svg'
import { accentTokens } from '../utils/windowContentTheme'

const DOCK_APPS = [
  { id: 'Moheetik', label: 'Moheetik', icon: AppIconMoheetik, iconFit: 'cover' },
  { id: 'Qaffatek', label: 'Qaffatek', icon: AppIconQaffatek, iconFit: 'cover' },
  { id: 'RECLAB', label: 'RECLAB', icon: AppIconRECLAB, iconFit: 'cover' },
  {
    id: 'How to Work with Me',
    label: 'Manual',
    icon: ManualFolderIconLight,
    iconFit: 'contain',
  },
]

const DOCK_CORE_APPS = DOCK_APPS.filter((a) => a.id !== 'How to Work with Me')
const DOCK_MANUAL_APP = DOCK_APPS.find((a) => a.id === 'How to Work with Me')

function isWindowOpenOnDesktop(openWindows, id) {
  const w = openWindows.find((o) => o.id === id)
  return Boolean(w && !w.minimized)
}

function DockTile({
  id,
  label,
  icon,
  openWindows,
  onOpen,
  iconFit = 'cover',
  uiTheme = 'light',
}) {
  const A = accentTokens(uiTheme)
  const resolvedIcon =
    id === 'How to Work with Me'
      ? uiTheme === 'dark'
        ? ManualFolderIconDark
        : ManualFolderIconLight
      : icon

  return (
    <div className="group relative flex flex-col items-center">
      <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 select-none opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <div
          className="relative whitespace-nowrap rounded-lg bg-white/90 px-3 py-1 text-[11px] font-medium text-[#23262D]"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)' }}
        >
          {label}
          <span
            className="absolute -bottom-[5px] left-1/2 h-0 w-0 -translate-x-1/2"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(255,255,255,0.9)',
            }}
          />
        </div>
      </div>

      <button
        type="button"
        aria-label={`Open ${label}`}
        className="h-[54px] w-[54px] rounded-[12px] transition-[transform] duration-500 hover:-translate-y-2 hover:scale-[1.3] focus:outline-none active:scale-100"
        style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
        onClick={() => onOpen?.(id)}
      >
        <img
          src={resolvedIcon}
          alt={label}
          draggable={false}
          className={`h-full w-full rounded-[12px] ${iconFit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      </button>

      <span
        className={`mt-1.5 h-1 w-1 rounded-full transition-all duration-500 group-hover:scale-125 ${
          isWindowOpenOnDesktop(openWindows, id) ? `${A.pulseDot} opacity-100` : 'opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
      />
    </div>
  )
}

const manualEnter = { opacity: 0, scale: 0.72, y: 18 }
const manualAnim = { opacity: 1, scale: 1, y: 0 }
const manualExit = { opacity: 0, scale: 0.72, y: 14 }

export default function Dock({
  openWindows = [],
  onOpen,
  supplementalApps = [],
  uiTheme = 'light',
  manualUnlocked = false,
}) {
  const sepCls = uiTheme === 'dark' ? 'bg-[#F9F9F7]/15' : 'bg-[#23262D]/12'
  return (
    <div
      className={`fixed bottom-4 left-1/2 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-nowrap items-end justify-center gap-5 rounded-[22px] border px-5 py-2 ${
        uiTheme === 'dark' ? 'border-white/15' : 'border-white/30'
      }`}
      style={{
        zIndex: 5000,
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 1.5px 0 rgba(255,255,255,0.35) inset',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {DOCK_CORE_APPS.map((app) => (
        <motion.div key={app.id} layout="position" transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
          <DockTile
            {...app}
            openWindows={openWindows}
            onOpen={onOpen}
            iconFit={app.iconFit ?? 'cover'}
            uiTheme={uiTheme}
          />
        </motion.div>
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        {manualUnlocked && DOCK_MANUAL_APP ? (
          <motion.div
            key="dock-manual"
            layout="position"
            initial={manualEnter}
            animate={manualAnim}
            exit={manualExit}
            transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.65 }}
          >
            <DockTile
              {...DOCK_MANUAL_APP}
              openWindows={openWindows}
              onOpen={onOpen}
              iconFit={DOCK_MANUAL_APP.iconFit ?? 'contain'}
              uiTheme={uiTheme}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {supplementalApps.length > 0 && (
        <>
          <div className={`mx-2 h-8 w-[1px] shrink-0 self-center ${sepCls}`} role="separator" aria-orientation="vertical" />
          {supplementalApps.map((app) => (
            <motion.div key={app.id} layout="position" transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
              <DockTile
                {...app}
                openWindows={openWindows}
                onOpen={onOpen}
                iconFit="contain"
                uiTheme={uiTheme}
              />
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}
