import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

const ACCENT = '#ACDEE7'

function formatHMS(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

/**
 * Desktop timer: glass card, counts up while “on”, coffee-break message on stop.
 */
export default function WorkMoodWidget({ uiTheme = 'light' }) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [coffeeMessage, setCoffeeMessage] = useState(false)
  const coffeeTimeoutRef = useRef(null)

  const isDark = uiTheme === 'dark'
  const textPrimary = isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const textMuted = isDark ? 'text-[#F9F9F7]/90' : 'text-[#23262D]/90'
  const cardCls = isDark
    ? 'border-white/15 bg-white/10'
    : 'border-[#23262D]/10 bg-white/70'
  const playBtnCls = isDark
    ? 'border-[#ACDEE7]/50 bg-[#ACDEE7]/20 text-[#F9F9F7] hover:bg-[#FEF0BC]/25 hover:text-[#23262D] hover:border-[#FEF0BC]/40'
    : 'border-[#ACDEE7]/60 bg-[#ACDEE7]/25 text-[#23262D] hover:bg-[#FEF0BC]/70 hover:border-[#FEF0BC]/50'

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    return () => {
      if (coffeeTimeoutRef.current != null) window.clearTimeout(coffeeTimeoutRef.current)
    }
  }, [])

  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation()
      if (coffeeMessage) return
      if (!running) {
        setElapsed(0)
        setRunning(true)
        return
      }
      setRunning(false)
      setElapsed(0)
      setCoffeeMessage(true)
      if (coffeeTimeoutRef.current != null) window.clearTimeout(coffeeTimeoutRef.current)
      coffeeTimeoutRef.current = window.setTimeout(() => {
        coffeeTimeoutRef.current = null
        setCoffeeMessage(false)
      }, 3000)
    },
    [running, coffeeMessage],
  )

  const showTime = !coffeeMessage
  const secondsDisplay = running ? elapsed : 0

  return (
    <div
      className={`w-[min(260px,85vw)] select-none rounded-2xl border px-4 py-3.5 shadow-lg backdrop-blur-md transition-colors duration-200 ${cardCls}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {running ? (
            <h2 className={`text-[15px] font-bold leading-tight tracking-wide ${textPrimary}`}>
              Work Mood: <span style={{ color: ACCENT }}>ON</span>
            </h2>
          ) : (
            <h2 className={`text-[15px] font-bold leading-tight tracking-wide ${textPrimary}`}>
              Work Mood
            </h2>
          )}
          <div className="mt-2 min-h-[28px]">
            {showTime ? (
              <p
                className={`text-[22px] font-semibold tabular-nums tracking-tight font-mono ${textPrimary}`}
              >
                {formatHMS(secondsDisplay)}
              </p>
            ) : (
              <p className={`text-[13px] font-medium leading-snug tracking-wide ${textMuted}`}>
                Time for a Coffee break? ☕️
              </p>
            )}
          </div>
        </div>
        <motion.button
          type="button"
          aria-label={running ? 'Pause work mood timer' : 'Start work mood timer'}
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${playBtnCls}`}
          whileTap={{ scale: 0.95 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleToggle}
          disabled={coffeeMessage}
        >
          {running ? (
            <Pause className="h-5 w-5" strokeWidth={2} aria-hidden />
          ) : (
            <Play className="h-5 w-5 pl-0.5" strokeWidth={2} aria-hidden />
          )}
        </motion.button>
      </div>
    </div>
  )
}
