import Moheetik_B_01 from '../assets/SideB/Moheetik_B_01.webp'
import Moheetik_B_02 from '../assets/SideB/Moheetik_B_02.jpg'
import Moheetik_B_03 from '../assets/SideB/Moheetik_B_03.jpg'
import Moheetik_B_04 from '../assets/SideB/Moheetik_B_04.jpg'
import Moheetik_B_05 from '../assets/SideB/Moheetik_B_05.jpg'
import Moheetik_B_06 from '../assets/SideB/Moheetik_B_06.jpg'
import Moheetik_B_07 from '../assets/SideB/Moheetik_B_07.jpg'

import Pay_B_01 from '../assets/SideB/Pay_B_01.jpg'

import Brewcha_B_01 from '../assets/SideB/Brewcha_B_01.jpg'
import Brewcha_B_02 from '../assets/SideB/Brewcha_B_02.jpg'

import Qaffatek_B_01 from '../assets/SideB/Qaffatek_B_01.jpeg'
import Qaffatek_B_02 from '../assets/SideB/Qaffatek_B_02.jpg'
import Qaffatek_B_03 from '../assets/SideB/Qaffatek_B_03.jpeg'
import Qaffatek_B_04 from '../assets/SideB/Qaffatek_B_04.jpg'
import Qaffatek_B_05 from '../assets/SideB/Qaffatek_B_05.jpg'
import Qaffatek_B_06 from '../assets/SideB/Qaffatek_B_06.jpg'

import RECLAB_B_01 from '../assets/SideB/RECLAB_B_01.jpg'
import RECLAB_B_02 from '../assets/SideB/RECLAB_B_02.jpg'
import RECLAB_B_03 from '../assets/SideB/RECLAB_B_03.jpg'
import RECLAB_B_04 from '../assets/SideB/RECLAB_B_04.jpg'
import RECLAB_B_05 from '../assets/SideB/RECLAB_B_05.webp'

import Random_B_01 from '../assets/SideB/Random_B_01.jpg'
import Random_B_02 from '../assets/SideB/Random_B_02.jpg'
import Random_B_03 from '../assets/SideB/Random_B_03.jpg'
import Random_B_04 from '../assets/SideB/Random_B_04.jpg'
import Random_B_05 from '../assets/SideB/Random_B_05.jpg'
import Random_B_07 from '../assets/SideB/Random_B_07.webp'

import Challenge_B_01 from '../assets/SideB/Challenge_B_01.webp'
import Challenge_B_02 from '../assets/SideB/Challenge_B_02.webp'
import Challenge_B_03 from '../assets/SideB/Challenge_B_03.webp'
import Challenge_B_04 from '../assets/SideB/Challenge_B_04.webp'
import Challenge_B_05 from '../assets/SideB/Challenge_B_05.webp'
import Challenge_B_06 from '../assets/SideB/Challenge_B_06.webp'

import { contentTokens } from '../utils/windowContentTheme'

const SECTIONS = [
  {
    id: 'moheetik',
    images: [
      { id: 'moheetik-1', src: Moheetik_B_01 },
      { id: 'moheetik-2', src: Moheetik_B_02 },
      { id: 'moheetik-3', src: Moheetik_B_03 },
      { id: 'moheetik-4', src: Moheetik_B_04 },
      { id: 'moheetik-5', src: Moheetik_B_05 },
      { id: 'moheetik-6', src: Moheetik_B_06 },
      { id: 'moheetik-7', src: Moheetik_B_07 },
    ],
  },
  { id: 'pay', images: [{ id: 'pay-1', src: Pay_B_01 }] },
  {
    id: 'brewcha',
    images: [
      { id: 'brewcha-1', src: Brewcha_B_01 },
      { id: 'brewcha-2', src: Brewcha_B_02 },
    ],
  },
  {
    id: 'qaffatek',
    images: [
      { id: 'qaffatek-1', src: Qaffatek_B_01 },
      { id: 'qaffatek-2', src: Qaffatek_B_02 },
      { id: 'qaffatek-3', src: Qaffatek_B_03 },
      { id: 'qaffatek-4', src: Qaffatek_B_04 },
      { id: 'qaffatek-5', src: Qaffatek_B_05 },
      { id: 'qaffatek-6', src: Qaffatek_B_06 },
    ],
  },
  {
    id: 'reclab',
    images: [
      { id: 'reclab-1', src: RECLAB_B_01 },
      { id: 'reclab-2', src: RECLAB_B_02 },
      { id: 'reclab-3', src: RECLAB_B_03 },
      { id: 'reclab-4', src: RECLAB_B_04 },
      { id: 'reclab-5', src: RECLAB_B_05 },
    ],
  },
  {
    id: 'random',
    images: [
      { id: 'random-1', src: Random_B_01 },
      { id: 'random-2', src: Random_B_02 },
      { id: 'random-3', src: Random_B_03 },
      { id: 'random-4', src: Random_B_04 },
      { id: 'random-5', src: Random_B_05 },
      { id: 'random-7', src: Random_B_07 },
    ],
  },
  {
    id: 'challenge',
    images: [
      { id: 'challenge-1', src: Challenge_B_01 },
      { id: 'challenge-2', src: Challenge_B_02 },
      { id: 'challenge-3', src: Challenge_B_03 },
      { id: 'challenge-4', src: Challenge_B_04 },
      { id: 'challenge-5', src: Challenge_B_05 },
      { id: 'challenge-6', src: Challenge_B_06 },
    ],
  },
]

const FLAT_GALLERY = SECTIONS.flatMap((s) => s.images)

export default function SideBFolderContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  return (
    <div
      className={`h-full overflow-y-auto font-sans ${T.surface} ${T.text} ${T.scrollRootThin} ${T.contentProse}`}
    >
      <div className="px-2 py-2 sm:px-3 sm:py-3">
        <div className="columns-2 gap-2 sm:columns-3 lg:columns-4">
          {FLAT_GALLERY.map((img) => (
            <div key={img.id} className="group mb-2 break-inside-avoid">
              <div className="overflow-hidden rounded-lg shadow-sm shadow-black/10 transition-transform duration-200 group-hover:scale-[1.02]">
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  className="h-auto w-full"
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
