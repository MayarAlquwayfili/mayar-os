import { motion } from 'framer-motion'
import Figure1 from '../assets/Cash/Figure1.png'
import Table1 from '../assets/Cash/Table1.png'
import Figure3 from '../assets/Cash/Figure3.png'

const META_KEY =
  'text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 mb-1'
const META_VAL = 'text-[13px] font-medium text-gray-900'
const BODY = 'text-[15px] leading-[1.8] tracking-[0.01em] text-gray-600'

const META = [
  { label: 'Timeline', value: 'Fall 2023 – Spring 2024' },
  { label: 'Type', value: 'Quantitative Research (Economics)' },
  { label: 'Category', value: 'Digital Payments · Korean SMEs' },
  { label: 'Role', value: 'Lead Researcher & Author' },
]

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

function FadeBlock({ className = '', children }) {
  return (
    <motion.div {...fade} className={className}>
      {children}
    </motion.div>
  )
}

export default function CashResearchContent() {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      <section className="mx-auto max-w-[1200px] px-6 pt-16 sm:px-10">
        <div className="flex flex-col items-start text-left">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[36px] font-bold leading-tight tracking-tight text-gray-900">
              Will Cash Become Obsolete?
            </h1>
            <span className="inline-flex items-center rounded-full bg-emerald-100/50 px-3 py-1 text-[12px] font-bold text-emerald-800">
              Completed (Awarded A+)
            </span>
          </div>
          <h2 className="mt-3 max-w-4xl text-[24px] font-semibold leading-snug text-gray-700">
            The Rise of Digital Payments and Their Impact on Korean SMEs
          </h2>
        </div>

        <div className="mb-10 border-b border-gray-100 pb-10" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-left md:grid-cols-4 md:gap-y-10">
          {META.map(({ label, value }) => (
            <div key={label}>
              <p className={META_KEY}>{label}</p>
              <p className={META_VAL}>{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-16 mt-10 border-b border-gray-100 pt-10" />
      </section>

      <section className="mx-auto max-w-[800px] px-6 pb-20 sm:px-10">
        <div className={`${BODY} text-left`}>
          <FadeBlock>
            <p>
              The &ldquo;tap&rdquo; of a digital payment on a smartphone has
              become the sound of everyday commerce&mdash;fast, traceable, and
              increasingly preferred. This paper asks what that shift means for
              small and medium-sized enterprises (SMEs) in Korea: as digital
              payment adoption accelerates, how does it interact with
              financing conditions, delinquency, and long-term survival?
            </p>
          </FadeBlock>

          <FadeBlock className="mt-8">
            <p>
              I conducted a 10-year quantitative study, assembling panel-style
              indicators of digital payment adoption, SME loan performance, and
              business resilience. The analysis isolates the marginal
              contribution of digitalization while controlling for macroeconomic
              shocks&mdash;including the 2020 episode&mdash;so that results speak
              to policy and operations, not only to cyclical noise.
            </p>
          </FadeBlock>

          <FadeBlock className="mt-12">
            <div className="flex flex-col items-start gap-10 md:flex-row md:gap-12">
              <div className="w-full shrink-0 md:w-[60%]">
                <p>
                  The results provided powerful evidence that Digital Payment
                  Adoption (DPA) is a significant driver of long-term SME
                  stability.
                </p>
              </div>
              <div className="w-full md:w-[40%]">
                <img
                  src={Figure1}
                  alt="Digital payment adoption trend 2015–2024"
                  className="w-full rounded-2xl object-cover shadow-sm"
                />
                <p className="mt-2 text-center text-[12px] text-gray-500">
                  Figure 1: Trend Digital Payment Adoption Rate (2015-2024)
                </p>
              </div>
            </div>
          </FadeBlock>

          <FadeBlock className="mt-10">
            <p>
              My analysis revealed a highly significant relationship (p &lt;
              0.001) where digital adoption directly enhanced survival rates,
              explaining over 96% of the variance in business resilience.
            </p>
          </FadeBlock>

          <FadeBlock className="mt-12">
            <div className="mx-auto w-full text-center">
              <p>
                While I observed a sharp spike in loan delinquency rates
                (2.20%) during the 2020 economic shock, the data confirmed a
                rapid recovery that aligned with accelerated digitalization.
              </p>
                <div className="mt-6 flex w-full flex-col items-center">
                <img
                  src={Table1}
                  alt="Multiple linear regression results on SME resilience"
                  className="w-[80%] max-w-2xl rounded-lg object-contain shadow-sm"
                />
                <p className="mt-3 text-[12px] text-gray-500">
                  Table 1: Multiple Linear Regression Results on SME Resilience
                </p>
              </div>
            </div>
          </FadeBlock>

          <FadeBlock className="mt-12">
            <div className="flex flex-col items-start gap-10 md:flex-row md:gap-12">
              <div className="w-full md:w-[40%]">
                <img
                  src={Figure3}
                  alt="SME loan delinquency rate trend 2015–2024"
                  className="w-full rounded-2xl object-cover shadow-sm"
                />
                <p className="mt-2 text-center text-[12px] text-gray-500">
                  Figure 3 SME Loan Delinquency Rate Trend (2015-2024)
                </p>
              </div>
              <div className="w-full md:w-[60%]">
                <p>
                  This research proves that Hybrid Payment Systems are the most
                  sustainable path forward, bridging the gap between digital
                  efficiency and the essential flexibility of cash.
                </p>
              </div>
            </div>
          </FadeBlock>
        </div>
      </section>
    </div>
  )
}
