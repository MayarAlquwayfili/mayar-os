/** Initial rows for the Manual (“How to Work with Me”) checklist — session state lives in App.jsx. */
export const INITIAL_MANUAL_TASKS = [
  {
    id: 1,
    title: 'Value-First Building',
    caption: 'Prioritizing real value and meaningful impact over just adding features.',
    done: false,
  },
  {
    id: 2,
    title: "The 'Why' Before the 'How'",
    caption: 'Solving the right problem is more important than just building a solution.',
    done: false,
  },
  {
    id: 3,
    title: 'Handoffs',
    caption: 'Providing organized, buildable designs because I write code as well.',
    done: false,
  },
  {
    id: 4,
    title: 'Feedback',
    caption: 'I listen to everyone, but I prioritize feedback that is logical and adds clear value.',
    done: false,
  },
  {
    id: 5,
    title: 'Execution Autonomy',
    caption: 'Give me the goal and the deadline, then trust me to handle the details.',
    done: false,
  },
  {
    id: 6,
    title: 'Powered by Challenges',
    caption:
      "I love turning 'impossible' into 'done'; the thrill of beating a challenge is what motivates me.",
    done: false,
  },
  {
    id: 7,
    title: 'Obsessive Detail',
    caption: 'From pixel-perfect UI to keeping every doc on Notion perfectly organized.',
    done: false,
  },
  {
    id: 8,
    title: 'Curiosity-Driven',
    caption: "I'm usually in the middle of learning something new just because I'm curious.",
    done: false,
  },
  {
    id: 9,
    title: 'Celebrating Wins',
    caption: 'I enjoy the process as much as the result.',
    done: false,
  },
]

/** Unchecked first, then by stable id. */
export function sortManualTasks(items) {
  return [...items].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    return a.id - b.id
  })
}
