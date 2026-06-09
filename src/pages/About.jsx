import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { company, teamMembers, history } from '../data/site'

const tabs = [
  { label: 'CEO 인사말', to: '/about/greetings' },
  { label: '비전·가치', to: '/about/vision' },
  { label: '팀 소개', to: '/about/team' },
  { label: '연혁', to: '/about/history' },
]

// ── CEO 인사말 ──
function Greetings() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-10">
      <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-900 text-5xl font-extrabold text-white shadow-lg md:h-40 md:w-40 md:text-6xl">
          代
        </div>
        <div>
          <span className="mb-2 inline-block rounded-full bg-brand-50 dark:bg-brand-950 px-3 py-1 text-xs font-bold text-brand dark:text-brand-400">CEO Message</span>
          <h2 className="mb-4 text-3xl font-extrabold text-neutral-900 dark:text-white">환자와 병원을 잇는 진심의 마케팅</h2>
          <p className="text-sm font-medium text-neutral-500 dark:text-slate-400">김대표 · CEO &amp; 공동창업자</p>
        </div>
      </div>

      <div className="space-y-6 text-base leading-8 text-neutral-700 dark:text-slate-300">
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

      <div className="mt-10 border-t border-neutral-200 dark:border-slate-700 pt-8 text-right">
        <p className="text-lg font-bold text-neutral-900 dark:text-white">메디온 대표이사</p>
        <p className="mt-1 text-2xl font-extrabold text-brand dark:text-brand-400">김 대 표</p>
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
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
      <div className="mb-16 text-center">
        <span className="tag mb-3">OUR VISION</span>
        <h2 className="section-title mb-4">대한민국 병의원의<br />디지털 성장을 이끕니다</h2>
        <p className="section-subtitle mx-auto max-w-2xl">
          2030년까지 전국 1,000개 병의원과 함께 성장하며, 환자와 병원을 잇는 최고의 의료 마케팅 플랫폼이 되겠습니다.
        </p>
      </div>

      {/* 비전 스테이트먼트 */}
      <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand p-10 text-center text-white md:p-16">
        <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Vision 2030</p>
        <p className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          "환자가 필요한 의료를 쉽게 찾고,<br className="hidden md:block" />
          병원이 적합한 환자를 만나는 세상"
        </p>
      </div>

      {/* 핵심 가치 */}
      <div>
        <h3 className="mb-8 text-center text-2xl font-extrabold text-neutral-900 dark:text-white">핵심 가치</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="mb-4 text-4xl">{v.icon}</div>
              <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{v.title}</h4>
              <p className="text-sm leading-6 text-neutral-500 dark:text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 팀 소개 ──
const avatarColors = ['bg-brand', 'bg-point', 'bg-success', 'bg-accent']

function Team() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
      <div className="mb-12 text-center">
        <span className="tag mb-3">OUR TEAM</span>
        <h2 className="section-title">전문가 팀을 소개합니다</h2>
        <p className="section-subtitle mt-4">의료와 마케팅 두 분야의 전문가들이 함께합니다</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((m, i) => (
          <div key={m.name} className="card flex flex-col items-center gap-4 p-8 text-center">
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

      {/* 채용 배너 */}
      <div className="mt-16 rounded-3xl bg-neutral-50 dark:bg-slate-800 p-10 text-center">
        <h3 className="mb-2 text-2xl font-extrabold text-neutral-900 dark:text-white">메디온과 함께 성장하고 싶으신가요?</h3>
        <p className="mb-6 text-neutral-500 dark:text-slate-400">의료 마케팅에 열정 있는 분들을 기다립니다</p>
        <a href="mailto:hr@medion-mktg.com" className="btn-primary">채용 문의하기</a>
      </div>
    </div>
  )
}

// ── 연혁 ──
function History() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-10">
      <div className="mb-12 text-center">
        <span className="tag mb-3">HISTORY</span>
        <h2 className="section-title">메디온의 성장 역사</h2>
      </div>
      <div className="relative">
        {/* 수직 라인 */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-slate-700 md:left-16" />
        <div className="flex flex-col gap-10">
          {history.map((h) => (
            <div key={h.year} className="flex gap-8">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white shadow-md md:h-12 md:w-12 md:text-sm relative z-10">
                  {h.year.slice(2)}
                </div>
              </div>
              <div className="pb-4">
                <p className="mb-3 text-xl font-extrabold text-neutral-900 dark:text-white">{h.year}</p>
                <ul className="flex flex-col gap-2">
                  {h.events.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm leading-6 text-neutral-600 dark:text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-400" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
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
