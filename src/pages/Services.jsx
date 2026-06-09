import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { services } from '../data/site'

const tabs = [
  { label: 'SNS 마케팅', to: '/services/sns' },
  { label: '검색광고(SEA)', to: '/services/search' },
  { label: '콘텐츠 마케팅', to: '/services/content' },
  { label: '디스플레이 광고', to: '/services/display' },
  { label: '홈페이지 제작', to: '/services/web' },
  { label: '리뷰·평판 관리', to: '/services/review' },
]

const svcDetail = {
  sns: {
    heroColor: 'from-pink-900 via-pink-800 to-brand',
    accent: 'bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300',
    accentBorder: 'border-pink-200 dark:border-pink-900',
    channels: ['인스타그램', '네이버 블로그', '유튜브', '카카오 채널'],
    metrics: [
      { label: '평균 팔로워 증가', value: '480%', sub: '6개월 기준' },
      { label: '콘텐츠 도달 증가', value: '350%', sub: '월간 노출 기준' },
      { label: '예약 전환율', value: '8.3%', sub: '링크 클릭 → 예약' },
    ],
    flow: ['채널 현황 진단 & 경쟁사 분석', '콘텐츠 전략 수립 & 톤앤매너 정의', '월간 콘텐츠 캘린더 제작', '피드·릴스·스토리 제작 및 업로드', '광고 집행 & 인플루언서 협업', '월간 리포트 및 전략 고도화'],
    faq: [
      { q: '어떤 채널부터 시작해야 하나요?', a: '진료과목과 타겟 환자층에 따라 최적 채널이 다릅니다. 무료 진단 후 맞춤 채널을 추천해 드립니다.' },
      { q: '콘텐츠는 직접 촬영해야 하나요?', a: '전문 의료 촬영팀이 직접 병원을 방문하여 촬영합니다. 원장님 시간을 최소화합니다.' },
    ],
  },
  search: {
    heroColor: 'from-brand-950 via-brand-900 to-brand',
    accent: 'bg-brand-50 dark:bg-brand-950/30 text-brand dark:text-brand-300',
    accentBorder: 'border-brand-200 dark:border-brand-900',
    channels: ['네이버 키워드광고', '카카오 모먼트', '구글 애즈', '다음 검색광고'],
    metrics: [
      { label: '평균 CPC 절감', value: '35%', sub: '집행 3개월 후 기준' },
      { label: 'CTR 향상', value: '2.8배', sub: '개선 전 대비' },
      { label: '전환율(예약)', value: '12.5%', sub: '업종 평균 대비 3배' },
    ],
    flow: ['현재 광고 효율 진단', '키워드 리서치 & 입찰 전략 수립', '광고 소재 A/B 테스트', '입찰가 자동 최적화 설정', '랜딩페이지 전환율 개선', '주간 데이터 분석 및 최적화'],
    faq: [
      { q: '광고 예산은 최소 얼마가 필요한가요?', a: '진료과목과 지역에 따라 다르지만, 월 100만원부터 효과적인 운영이 가능합니다.' },
      { q: '효과가 언제부터 나타나나요?', a: '검색광고는 즉시 노출이 시작되며, 보통 2-4주 내 성과를 확인할 수 있습니다.' },
    ],
  },
  content: {
    heroColor: 'from-green-900 via-green-800 to-point',
    accent: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300',
    accentBorder: 'border-green-200 dark:border-green-900',
    channels: ['네이버 블로그', '카카오 브런치', '유튜브', '이메일 뉴스레터'],
    metrics: [
      { label: '유기적 트래픽 증가', value: '320%', sub: '6개월 기준' },
      { label: '블로그 상위 노출', value: '94%', sub: '타겟 키워드 기준' },
      { label: '콘텐츠 체류 시간', value: '4.2분', sub: '업종 평균 1.3분 대비' },
    ],
    flow: ['키워드 & 검색 의도 분석', '콘텐츠 주제 캘린더 수립', '의료 전문 작가 배정', '원고 작성 & 의학적 검토', '최적화 포스팅 및 내부링크 구축', 'SEO 성과 추적 및 보강'],
    faq: [
      { q: '의료법 위반이 걱정됩니다', a: '의료광고 심의 경험이 있는 의료법 전문 작가팀이 작성합니다. 필요 시 심의 대행도 진행합니다.' },
      { q: '콘텐츠 주제는 어떻게 정하나요?', a: '환자들의 실제 검색 데이터를 기반으로 수요가 높은 주제를 선별하여 제안합니다.' },
    ],
  },
  display: {
    heroColor: 'from-purple-900 via-purple-800 to-brand',
    accent: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
    accentBorder: 'border-purple-200 dark:border-purple-900',
    channels: ['구글 디스플레이', '카카오 배너', '네이버 성과형', 'Meta 광고'],
    metrics: [
      { label: '광고 ROI', value: '420%', sub: '평균 기준' },
      { label: '리타겟팅 전환율', value: '3.5배', sub: '콜드 타겟 대비' },
      { label: '브랜드 인지도 상승', value: '67%', sub: '캠페인 6주 후' },
    ],
    flow: ['잠재 환자 페르소나 설정', '타겟 세그먼트 분류', '배너·동영상 소재 제작', '플랫폼별 광고 집행', '리타겟팅 픽셀 설치', '전환 추적 및 최적화'],
    faq: [
      { q: '어떤 진료과목에 효과적인가요?', a: '비급여 진료(피부·성형·치과·한의원)에 특히 효과적이며, 시술 관련 검색이 많은 키워드와 연계 운영합니다.' },
      { q: '광고 소재는 직접 만들어 주나요?', a: '네, 의료광고 디자인 전문팀이 배너, 영상 소재를 제작합니다.' },
    ],
  },
  web: {
    heroColor: 'from-slate-900 via-slate-800 to-brand-900',
    accent: 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300',
    accentBorder: 'border-slate-200 dark:border-slate-700',
    channels: ['PC 홈페이지', '모바일 최적화', '예약 시스템', '온라인 상담'],
    metrics: [
      { label: '홈페이지 문의 전환율', value: '3배', sub: '리뉴얼 전 대비' },
      { label: '평균 체류 시간', value: '+85%', sub: '리뉴얼 후 기준' },
      { label: '모바일 속도 점수', value: '95+', sub: 'Google PageSpeed' },
    ],
    flow: ['병원 브랜드 분석 & 경쟁사 조사', 'UX 설계 & 와이어프레임', '디자인 시안 제작 (3회 수정 포함)', '개발 & 모바일 최적화', 'SEO 기술 적용 & 속도 최적화', '출시 후 1개월 무상 A/S'],
    faq: [
      { q: '제작 기간은 얼마나 걸리나요?', a: '일반적으로 6~10주 소요됩니다. 규모와 기능에 따라 달라집니다.' },
      { q: '예약 시스템도 연동되나요?', a: '네이버 예약, 카카오 예약, 자체 예약 시스템 모두 연동 가능합니다.' },
    ],
  },
  review: {
    heroColor: 'from-yellow-900 via-amber-800 to-accent-dark',
    accent: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
    accentBorder: 'border-amber-200 dark:border-amber-900',
    channels: ['구글 맵', '네이버 지도', '카카오 맵', '건강보험심사평가원'],
    metrics: [
      { label: '평균 별점 향상', value: '4.2→4.8', sub: '6개월 기준' },
      { label: '리뷰 수 증가', value: '680%', sub: '캠페인 전 대비' },
      { label: '검색 순위 상승', value: '1→3위', sub: '지역 키워드 평균' },
    ],
    flow: ['현재 온라인 평판 진단', '네거티브 리뷰 대응 전략 수립', '리뷰 수집 캠페인 설계', '긍정 리뷰 지속 생성', '플랫폼별 모니터링 설정', '월간 평판 리포트 제공'],
    faq: [
      { q: '부정적인 리뷰는 삭제할 수 있나요?', a: '허위·악의적 리뷰는 플랫폼 정책에 따라 신고·삭제 대응합니다. 합리적 불만 리뷰는 전문적 답변으로 관리합니다.' },
      { q: '리뷰 관리만 의뢰 가능한가요?', a: '네, 단독 서비스로 운영 가능합니다. 다른 서비스와 패키지 구성 시 할인 혜택이 있습니다.' },
    ],
  },
}

function ServiceDetail({ svc }) {
  const detail = svcDetail[svc.key] || svcDetail.sns

  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
      {/* 상단 하이라이트 */}
      <div className={['mb-12 overflow-hidden rounded-3xl bg-gradient-to-br p-8 text-white md:p-12', detail.heroColor].join(' ')}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <span className="mb-4 inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/60">SERVICE</span>
            <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">{svc.title}</h2>
            <p className="text-base leading-7 text-white/70">{svc.shortDesc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.channels.map((ch) => (
                <span key={ch} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">{ch}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {detail.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-extrabold">{m.value}</div>
                <div className="mt-1 text-xs font-semibold opacity-80">{m.label}</div>
                <div className="mt-0.5 text-xs opacity-50">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* 서비스 항목 */}
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-neutral-900 dark:text-white">포함 서비스</h3>
          <ul className="flex flex-col gap-3">
            {svc.items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-xl bg-neutral-50 dark:bg-slate-800 px-5 py-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">✓</span>
                <span className="text-sm font-medium text-neutral-800 dark:text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 진행 프로세스 */}
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-neutral-900 dark:text-white">진행 프로세스</h3>
          <ol className="flex flex-col gap-3">
            {detail.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={['flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold', detail.accent].join(' ')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-neutral-700 dark:text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h3 className="mb-5 text-xl font-extrabold text-neutral-900 dark:text-white">자주 묻는 질문</h3>
        <div className="flex flex-col gap-4">
          {detail.faq.map((f) => (
            <div key={f.q} className={['rounded-2xl border p-6', detail.accentBorder].join(' ')}>
              <p className="mb-2 font-bold text-neutral-900 dark:text-white">Q. {f.q}</p>
              <p className="text-sm leading-6 text-neutral-600 dark:text-slate-300">A. {f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-gradient-to-r from-brand to-point p-8 text-center text-white">
        <h3 className="mb-2 text-xl font-extrabold">{svc.title} 도입을 고민하고 계신가요?</h3>
        <p className="mb-6 text-white/70">무료 진단을 통해 현재 상황에 맞는 맞춤 전략을 제안해 드립니다.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-brand hover:bg-neutral-100 transition">
          무료 상담 신청하기 →
        </Link>
      </div>
    </div>
  )
}

export default function Services() {
  const { category } = useParams()
  const svc = services.find((s) => s.key === category) || services[0]
  const headLabels = {
    sns: 'SNS 마케팅',
    search: '검색광고(SEA)',
    content: '콘텐츠 마케팅',
    display: '디스플레이 광고',
    web: '홈페이지 제작',
    review: '리뷰·평판 관리',
  }

  return (
    <SubPageLayout sectionTitle="서비스" tabs={tabs} headLabel={headLabels[category] || 'SNS 마케팅'}>
      <ServiceDetail svc={svc} />
    </SubPageLayout>
  )
}
