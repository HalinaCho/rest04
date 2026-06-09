import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { company, teamMembers, history } from '../data/site'

const tabs = [
  { label: 'CEO 인사말', to: '/about/greetings' },
  { label: '비전·가치', to: '/about/vision' },
  { label: '팀 소개', to: '/about/team' },
  { label: '연혁', to: '/about/history' },
]

// ── rest03 Sustainability.jsx 패턴: border-b-2 구분선 제목 ──
function SectionTitle({ children }) {
  return (
    <h3 className="mb-10 flex items-end justify-between border-b-2 border-neutral-200 dark:border-slate-700 pb-6 text-3xl font-bold text-brand dark:text-brand-400 md:text-4xl">
      {children}
    </h3>
  )
}

// ── CEO 인사말 ──
function Greetings() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-12 text-5xl font-semibold leading-none text-brand dark:text-brand-400 md:text-7xl">
        CEO Message
      </p>

      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* 좌측 — 사진 영역 */}
        <div className="flex w-full shrink-0 items-start justify-center md:w-52">
          <div className="flex h-64 w-52 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-900 text-7xl font-extrabold text-white shadow-lg">
            代
          </div>
        </div>

        {/* 우측 — 인사말 */}
        <div className="flex-1">
          <p className="mb-6 text-3xl font-bold leading-snug text-brand dark:text-brand-400 md:text-4xl">
            환자와 병원을 잇는<br />진심의 마케팅
          </p>
          <div className="space-y-5 text-lg font-medium leading-8 text-neutral-700 dark:text-slate-300">
            <p>
              안녕하십니까, 메디온 대표 김대표입니다. 저는 삼성서울병원 마케팅팀에서 15년을 보내며 한 가지 사실을 깨달았습니다.
              <strong className="text-neutral-900 dark:text-white"> 좋은 의사, 훌륭한 치료를 해도 환자에게 닿지 않으면 아무런 의미가 없다</strong>는 것입니다.
            </p>
            <p>
              2015년 메디온을 창립한 것은 바로 그 간극을 채우기 위함이었습니다. 의료 현장을 누구보다 잘 아는 전문가들이, 데이터와 창의성으로 병원의 이야기를 올바르게 전달하는 것. 그것이 우리의 사명입니다.
            </p>
            <p>
              현재 350개 이상의 파트너 병의원이 메디온과 함께 성장하고 있습니다. 개원 첫 달부터 지역 1위에 오른 피부과, 10년 넘게 제자리였던 치과가 3년 만에 매출 3배를 달성한 사례—이 모든 것이 저희의 자부심입니다.
            </p>
            <p>
              메디온은 단순한 광고 대행사가 아닙니다. 원장님의 진료 철학을 이해하고, 환자의 신뢰를 얻는 방식으로, 함께 성장하는 파트너입니다. 무엇이든 부담 없이 말씀해 주십시오.
            </p>
          </div>
          <div className="mt-8 border-t border-neutral-200 dark:border-slate-700 pt-6">
            <p className="text-lg font-bold text-neutral-900 dark:text-white">메디온 대표이사</p>
            <p className="mt-1 text-2xl font-extrabold text-brand dark:text-brand-400">김 대 표</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 비전·가치 ──
const values = [
  { icon: '📊', title: '데이터 기반', desc: '감이 아닌 데이터로 판단합니다. 모든 캠페인에 측정 가능한 목표를 설정하고 투명하게 공유합니다.' },
  { icon: '🏥', title: '의료 전문성', desc: '의료광고법과 의료 윤리를 준수하며, 환자와 병원 모두에게 신뢰받는 콘텐츠를 제작합니다.' },
  { icon: '🤝', title: '진정한 파트너십', desc: '단기 성과보다 장기적인 관계를 추구합니다. 파트너 병원의 성공이 곧 우리의 성공입니다.' },
  { icon: '🚀', title: '지속적 혁신', desc: 'AI와 최신 마케팅 기술을 빠르게 도입하여 언제나 한 발 앞선 전략을 제공합니다.' },
]

function Vision() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-12 text-5xl font-semibold leading-none text-brand dark:text-brand-400 md:text-7xl">
        Vision &amp; Value
      </p>

      {/* 비전 선언 */}
      <section className="mb-20">
        <SectionTitle>비전 선언</SectionTitle>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
          "환자가 필요한 의료를 쉽게 찾고, 병원이 적합한 환자를 만나는 세상"
        </p>
        <p className="mt-4 text-lg font-medium leading-8 text-neutral-700 dark:text-slate-300">
          메디온은 2030년까지 전국 1,000개 병의원과 함께 성장하며, 데이터와 창의성으로 환자와 병원을 연결하는 대한민국 최고의 의료 마케팅 파트너가 되겠습니다.
          단순한 광고 집행을 넘어, 병원의 성장 전략을 함께 설계하고 실질적인 성과로 증명합니다.
        </p>
      </section>

      {/* 핵심 가치 */}
      <section className="mb-20">
        <SectionTitle>핵심 가치</SectionTitle>
        <div className="flex flex-wrap gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex-grow basis-72 rounded-xl bg-neutral-50 dark:bg-slate-800 p-8 md:p-10"
            >
              <div className="mb-3 text-4xl">{v.icon}</div>
              <p className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">{v.title}</p>
              <p className="text-base font-medium leading-7 text-neutral-600 dark:text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 경영 방침 */}
      <section>
        <SectionTitle>경영 방침</SectionTitle>
        <div className="flex flex-col gap-5">
          {[
            { num: '1', title: '환자 중심 마케팅', desc: '모든 마케팅 전략은 환자의 니즈와 신뢰를 최우선으로 설계합니다. 의료광고 심의 기준을 철저히 준수하며, 과장·허위 없는 투명한 콘텐츠를 제공합니다.' },
            { num: '2', title: '데이터 기반 성과 관리', desc: '캠페인 시작부터 종료까지 측정 가능한 KPI를 설정하고, 월간 리포트를 통해 성과를 투명하게 공유합니다. 데이터가 말하는 것만 약속합니다.' },
            { num: '3', title: '지속적 혁신과 기술 도입', desc: 'AI 광고 최적화, 자동화 마케팅 도구 등 최신 기술을 빠르게 도입하여 경쟁사보다 항상 한 발 앞선 전략을 제공합니다.' },
          ].map((p) => (
            <div key={p.num} className="flex-grow rounded-xl bg-neutral-50 dark:bg-slate-800 p-8">
              <p className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">{p.num}. {p.title}</p>
              <p className="text-base font-medium leading-7 text-neutral-600 dark:text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── 팀 소개 ──
const avatarColors = ['bg-brand', 'bg-point', 'bg-success', 'bg-accent']

function Team() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-12 text-5xl font-semibold leading-none text-brand dark:text-brand-400 md:text-7xl">
        Our Team
      </p>

      <section className="mb-20">
        <SectionTitle>전문가 팀</SectionTitle>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((m, i) => (
            <div key={m.name} className="flex flex-col items-center gap-4 rounded-xl bg-neutral-50 dark:bg-slate-800 p-8 text-center">
              <div className={['flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-extrabold text-white', avatarColors[i % 4]].join(' ')}>
                {m.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{m.name}</h3>
                <p className="text-sm font-semibold text-brand dark:text-brand-400">{m.role}</p>
              </div>
              <p className="text-xs leading-5 text-neutral-500 dark:text-slate-400">{m.career}</p>
              <p className="text-sm leading-6 text-neutral-600 dark:text-slate-300">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>채용 안내</SectionTitle>
        <p className="mb-6 text-lg font-medium leading-8 text-neutral-700 dark:text-slate-300">
          메디온은 의료와 마케팅에 열정을 가진 인재를 언제나 환영합니다. 함께 대한민국 병의원의 디지털 성장을 이끌어갈 동료를 찾습니다.
        </p>
        <a href="mailto:hr@medion-mktg.com" className="btn-primary">채용 문의하기</a>
      </section>
    </div>
  )
}

// ── 연혁 — rest03 About.jsx/History 패턴: flex-row, 연도 좌측, 이벤트 우측, border-b 구분선 ──
function History() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-12 text-5xl font-semibold leading-none text-brand dark:text-brand-400 md:text-7xl">
        History
      </p>
      <div className="flex flex-col gap-0">
        {history.map((h) => (
          <div
            key={h.year}
            className="flex flex-col gap-4 border-b border-neutral-200 dark:border-slate-700 pb-8 pt-8 md:flex-row md:gap-16 first:pt-0"
          >
            <p className="text-4xl font-bold text-brand dark:text-brand-400 md:w-40 md:shrink-0">
              {h.year}
            </p>
            <ul className="flex flex-1 flex-col gap-2 text-lg font-medium text-neutral-700 dark:text-slate-300">
              {h.events.map((e) => (
                <li key={e}>· {e}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const contentMap = {
  greetings: <Greetings />,
  vision: <Vision />,
  team: <Team />,
  history: <History />,
}

const headLabels = {
  greetings: 'CEO 인사말',
  vision: '비전·가치',
  team: '팀 소개',
  history: '연혁',
}

export default function About() {
  const { tab } = useParams()
  const content = contentMap[tab] || contentMap.greetings
  const headLabel = headLabels[tab] || 'CEO 인사말'

  return (
    <SubPageLayout sectionTitle="회사소개" tabs={tabs} headLabel={headLabel}>
      {content}
    </SubPageLayout>
  )
}
