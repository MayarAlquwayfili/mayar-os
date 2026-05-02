import { motion } from 'framer-motion'
import Figure1 from '../assets/Cash/Figure1.png'
import Table1 from '../assets/Cash/Table1.png'
import Figure3 from '../assets/Cash/Figure3.png'
import { contentTokens } from '../utils/windowContentTheme'

const BODY = 'text-[15px] leading-[1.8] text-gray-600'
const META_KEY =
  'text-[10px] font-medium uppercase tracking-[0.09em] text-gray-400 mb-1'
const META_VAL = 'text-[13px] font-medium text-gray-900'
const CAPTION = 'mt-2 text-left text-[13px] text-gray-400'

const TOOL_PILLS = [
  'Multiple Linear Regression (MLR)',
  'Data Visualization (Tableau)',
  'Market Analysis',
]

const FIGURE_CLS =
  'w-full max-h-[500px] rounded-none object-contain shadow-none'
const FIGURE_WRAP = 'mx-auto w-full max-w-[800px]'

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

function FadeBlock({ className = '', children }) {
  return (
    <motion.div {...fade} className={className}>
      {children}
    </motion.div>
  )
}

export default function CashResearchContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  return (
    <div
      className={`pointer-events-auto h-full overflow-y-auto overflow-x-hidden text-left font-sans antialiased ${T.surface} ${T.text} ${T.scrollRoot} ${T.contentProse}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 sm:px-8 md:px-10">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[36px] font-bold leading-tight tracking-tight text-gray-900">
              Will Cash Become Obsolete?
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold ${T.pillStatus}`}
            >
              Completed (Awarded A+)
            </span>
          </div>
          <p className="mt-2 text-[20px] font-semibold text-gray-700">
            The Rise of Digital Payments and Their Impact on Korean SMEs
          </p>
          <p className="mt-1 text-[13px] font-medium text-gray-500">
            Economics Research (PNU)
          </p>
        </header>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-b border-gray-100 pb-6 md:grid-cols-3">
          <div>
            <p className={META_KEY}>Timeline</p>
            <p className={META_VAL}>09/2025 – 11/2025</p>
          </div>
          <div>
            <p className={META_KEY}>My Role</p>
            <p className={META_VAL}>Principal Researcher &amp; Data Analyst</p>
          </div>
          <div>
            <p className={META_KEY}>Tools</p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {TOOL_PILLS.map((t) => (
                <span
                  key={t}
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${T.pillDefault}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10 pt-8">
          <FadeBlock>
            <p className={BODY}>
              The &quot;tap&quot; of a digital payment symbolizes modern convenience.
              However, it hides a psychological paradox: it can make us lose
              awareness of the value of money, leading to increased spending. As
              a global leader in innovation, South Korea is currently
              balancing a push for a cashless society with the central
              bank&apos;s need for financial stability. I wanted to investigate
              a critical question: how do Korean SME owners decisions about
              payment methods (cash, digital, or hybrid) shape their business
              resilience and operational adaptability?
            </p>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              I conducted a 10-year quantitative longitudinal analysis
              (2015–2024) using official data from the Bank of Korea and
              Statistics Korea. Using R, I first performed an Exploratory Factor
              Analysis (EFA) to solve multicollinearity issues by merging GDP,
              interest rates, and inflation into a single Macroeconomic
              Environment Factor (MEF), which explained 23.3% of the variance. I
              then utilized this MEF as a control variable in my Multiple Linear
              Regression (MLR) models to test the impact of digital adoption on
              business survival.
            </p>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              The results provided powerful evidence that Digital Payment
              Adoption (DPA) is a significant driver of long-term SME stability.
            </p>
          </FadeBlock>

          <FadeBlock>
            <div className={FIGURE_WRAP}>
              <img
                src={Figure1}
                alt="Figure 1: Trend Digital Payment Adoption Rate (2015-2024)"
                className={FIGURE_CLS}
              />
              <p className={CAPTION}>
                Figure 1: Trend Digital Payment Adoption Rate (2015-2024)
              </p>
            </div>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              My analysis revealed a highly significant relationship (p &lt;
              0.001) where digital adoption directly enhanced survival rates,
              explaining over 96% of the variance in business resilience.
            </p>
          </FadeBlock>

          <FadeBlock>
            <div className={FIGURE_WRAP}>
              <img
                src={Table1}
                alt="Table 1: Multiple Linear Regression Results on SME Resilience"
                className={FIGURE_CLS}
              />
              <p className={CAPTION}>
                Table 1: Multiple Linear Regression Results on SME Resilience
              </p>
            </div>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              While I observed a sharp spike in loan delinquency rates (2.20%)
              during the 2020 economic shock, the data confirmed a rapid
              recovery that aligned with accelerated digitalization.
            </p>
          </FadeBlock>

          <FadeBlock>
            <div className={FIGURE_WRAP}>
              <img
                src={Figure3}
                alt="Figure 3 SME Loan Delinquency Rate Trend (2015-2024)"
                className={FIGURE_CLS}
              />
              <p className={CAPTION}>
                Figure 3 SME Loan Delinquency Rate Trend (2015-2024)
              </p>
            </div>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              This research proves that a Hybrid Payment Systems is the most
              sustainable path forward, bridging the gap between digital
              efficiency and the essential flexibility of cash.
            </p>
          </FadeBlock>
        </div>
      </div>
    </div>
  )
}
