import { motion } from 'framer-motion'
import Figure1 from '../assets/Cash/Figure1.png'
import Table1 from '../assets/Cash/Table1.png'
import Figure3 from '../assets/Cash/Figure3.png'

const BODY = 'text-[15px] leading-[1.8] text-gray-600'
const LABEL = 'text-[10px] font-medium text-gray-400 mb-1'
const META_VAL = 'text-[13px] font-medium text-gray-900'
const SUBH = 'text-[18px] font-bold text-gray-900'
const CAPTION = 'mt-2 text-center text-[13px] text-gray-400'

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

const OVERVIEW = [
  { label: 'Project timeline', value: '09/2025 – 11/2025' },
  { label: 'Project Type', value: 'Applied Economic Research (Independent)' },
  { label: 'Category', value: 'Economics Research' },
  {
    label: 'Tools & Methods',
    value:
      'Multiple Linear Regression (MLR), Data Visualization (Tableau), Market Analysis.',
  },
  { label: 'My Role', value: 'Principal Researcher & Data Analyst' },
]

export default function CashResearchContent() {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-white font-sans antialiased">
      <div className="mx-auto max-w-[800px] px-6 pt-16 pb-20 sm:px-10">
        <FadeBlock>
          <div className="text-left">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[36px] font-bold leading-tight tracking-tight text-gray-900">
                Will Cash Become Obsolete?
              </h1>
              <span className="inline-flex items-center rounded-full bg-emerald-100/50 px-3 py-1 text-[12px] font-bold text-emerald-800">
                Status :  Completed (Awarded A+)
              </span>
            </div>
            <h2 className="mt-3 text-[24px] font-semibold leading-snug text-gray-700">
              The Rise of Digital Payments and Their Impact on Korean SMEs
            </h2>
          </div>
        </FadeBlock>

        <FadeBlock className="mt-10">
          <div className="border-b border-gray-100 pb-10" />
        </FadeBlock>

        <FadeBlock className="mt-10">
          <h3 className={SUBH}>Project Overview</h3>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {OVERVIEW.map(({ label, value }) => (
              <div key={label} className="text-left">
                <p className={LABEL}>{label}</p>
                <p className={META_VAL}>{value}</p>
              </div>
            ))}
          </div>
        </FadeBlock>

        <FadeBlock className="mt-10">
          <div className="border-b border-gray-100 pt-10" />
        </FadeBlock>

        <div className="mt-10 space-y-10 text-left">
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
            <h3 className={SUBH}>The Methodology</h3>
            <p className={`${BODY} mt-4`}>
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
            <h3 className={SUBH}>Findings</h3>
            <p className={`${BODY} mt-4`}>
              The results provided powerful evidence that Digital Payment
              Adoption (DPA) is a significant driver of long-term SME stability.
            </p>
          </FadeBlock>

          <FadeBlock>
            <img
              src={Figure1}
              alt="Figure 1: Trend Digital Payment Adoption Rate (2015-2024)"
              className="w-full rounded-2xl object-contain shadow-md"
            />
            <p className={CAPTION}>
              Figure 1: Trend Digital Payment Adoption Rate (2015-2024)
            </p>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              My analysis revealed a highly significant relationship (p &lt;
              0.001) where digital adoption directly enhanced survival rates,
              explaining over 96% of the variance in business resilience.
            </p>
          </FadeBlock>

          <FadeBlock>
            <img
              src={Table1}
              alt="Table 1: Multiple Linear Regression Results on SME Resilience"
              className="w-full rounded-2xl object-contain shadow-md"
            />
            <p className={CAPTION}>
              Table 1: Multiple Linear Regression Results on SME Resilience
            </p>
          </FadeBlock>

          <FadeBlock>
            <p className={BODY}>
              While I observed a sharp spike in loan delinquency rates (2.20%)
              during the 2020 economic shock, the data confirmed a rapid
              recovery that aligned with accelerated digitalization.
            </p>
          </FadeBlock>

          <FadeBlock>
            <img
              src={Figure3}
              alt="Figure 3 SME Loan Delinquency Rate Trend (2015-2024)"
              className="w-full rounded-2xl object-contain shadow-md"
            />
            <p className={CAPTION}>
              Figure 3 SME Loan Delinquency Rate Trend (2015-2024)
            </p>
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
