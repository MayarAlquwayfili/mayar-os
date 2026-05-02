import { motion } from 'framer-motion'
import LightCard from '../assets/HelloCardLight.svg'
import DarkCard from '../assets/HelloCardDark.svg'
import AdminFolderCursorTip from './AdminFolderCursorTip'

const shadowXl =
  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'

/**
 * Desk sticker — parent wraps this for drag + clean click to start the admin / workspace flow.
 */
export default function IdentityNameSticker({ uiTheme = 'light' }) {
  const cardSrc = uiTheme === 'dark' ? DarkCard : LightCard
  return (
    <AdminFolderCursorTip
      label="Mayar ID"
      wrapperClassName="inline-block w-fit cursor-none select-none"
    >
      <motion.div
        className="w-[min(280px,72vw)] select-none overflow-hidden rounded-2xl shadow-lg"
        style={{ rotate: 3 }}
        whileHover={{ y: -4, boxShadow: shadowXl }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      >
        <img
          src={cardSrc}
          alt=""
          draggable={false}
          className="block h-auto w-full"
        />
      </motion.div>
    </AdminFolderCursorTip>
  )
}
