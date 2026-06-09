import { useState, useEffect } from 'react'
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

// ── rest03 Sustainability.jsx 패턴: border-b-2 구분선 제목 ──
function SectionTitle({ children }) {
  return (
    <h3 className="mb-10 flex items-end justify-between border-b-2 border-neutral-200 dark:border-slate-700 pb-6 text-3xl font-bold text-brand dark:text-brand-400 md:text-4xl">
      {children}
    </h3>
  )
}

// ── 서비스별 서브카테고리 데이터 (rest03 Business.jsx 패턴) ──
const subCategories = {
  sns: {
    cats: ['인스타그램', '네이버 블로그', '유튜브', '카카오 채널'],
    heroColor: 'from-pink-900 via-pink-800 to-brand',
    metrics: [
      { label: '평균 팔로워 증가', value: '480%', sub: '6개월 기준' },
      { label: '콘텐츠 도달 증가', value: '350%', sub: '월간 노출 기준' },
      { label: '예약 전환율', value: '8.3%', sub: '링크 클릭 → 예약' },
    ],
    catContent: {
      '인스타그램': {
        desc: '의료 시술·후기 콘텐츠로 팔로워를 환자로 전환합니다. 피드 최적화부터 릴스·스토리 기획까지 통합 운영합니다.',
        items: ['피드 디자인 & 톤앤매너 정립', '릴스·스토리·라이브 기획·제작', '광고 집행(Meta Ads)', '인플루언서·닥터 콜라보 기획', 'DM 상담 전환 세팅'],
        result: '팔로워 평균 480% 증가',
      },
      '네이버 블로그': {
        desc: '검색 상위 노출을 목표로 의료 전문성과 SEO를 결합한 콘텐츠를 정기적으로 발행합니다.',
        items: ['키워드 기반 포스팅 기획', '의료 전문 작가 배정', '네이버 VIEW 최적화', '내부 링크 전략 구성', '월간 트래픽 리포트'],
        result: '블로그 방문자 320% 증가',
      },
      '유튜브': {
        desc: '시술 과정·원장 인터뷰 등 신뢰도 높은 영상 콘텐츠로 브랜드 인지도를 구축합니다.',
        items: ['채널 컨셉 & 기획', '시술 영상·인터뷰 촬영', '썸네일·편집·자막 제작', 'SEO 제목·태그 최적화', '유튜브 광고(인스트림) 집행'],
        result: '구독자 평균 260% 증가',
      },
      '카카오 채널': {
        desc: '카카오 채널을 통해 재방문 환자 관리와 예약 알림을 자동화합니다.',
        items: ['카카오 채널 개설 & 설정', '친구 추가 캠페인 기획', '자동 메시지·알림톡 세팅', '이벤트·프로모션 발송', '채널 메시지 성과 분석'],
        result: '재방문율 평균 45% 향상',
      },
    },
    flow: ['채널 현황 진단 & 경쟁사 분석', '콘텐츠 전략 수립 & 톤앤매너 정의', '월간 콘텐츠 캘린더 제작', '피드·릴스·스토리 제작 및 업로드', '광고 집행 & 인플루언서 협업', '월간 리포트 및 전략 고도화'],
    faq: [
      { q: '어떤 채널부터 시작해야 하나요?', a: '진료과목과 타겟 환자층에 따라 최적 채널이 다릅니다. 무료 진단 후 맞춤 채널을 추천해 드립니다.' },
      { q: '콘텐츠는 직접 촬영해야 하나요?', a: '전문 의료 촬영팀이 직접 병원을 방문하여 촬영합니다. 원장님 시간을 최소화합니다.' },
    ],
  },
  search: {
    cats: ['네이버 키워드', '카카오 모먼트', '구글 애즈', '다음 검색'],
    heroColor: 'from-brand-950 via-brand-900 to-brand',
    metrics: [
      { label: '평균 CPC 절감', value: '35%', sub: '집행 3개월 후 기준' },
      { label: 'CTR 향상', value: '2.8배', sub: '개선 전 대비' },
      { label: '전환율(예약)', value: '12.5%', sub: '업종 평균 대비 3배' },
    ],
    catContent: {
      '네이버 키워드': {
        desc: '국내 최대 검색 플랫폼 네이버에서 지역·시술 키워드로 신규 환자를 직접 유입합니다.',
        items: ['핵심 키워드 리서치 & 선별', '입찰가 자동 최적화', 'PC·모바일 소재 분리 운영', '전환 추적 스크립트 설치', '주간 성과 분석'],
        result: 'CPC 평균 35% 절감',
      },
      '카카오 모먼트': {
        desc: '카카오톡 사용자 데이터를 활용해 잠재 환자를 정밀하게 타겟팅합니다.',
        items: ['카카오 모먼트 계정 세팅', '연령·성별·지역 타겟 설정', '메시지형·배너형 광고 제작', '카카오 채널 연동 전환', '성과 리포트 월 1회 제공'],
        result: '클릭 비용 대비 예약 전환 3배',
      },
      '구글 애즈': {
        desc: '구글 검색·디스플레이 네트워크로 외국인 환자 및 젊은 층을 추가 확보합니다.',
        items: ['구글 검색 캠페인 설정', '스마트 입찰 전략 적용', '반응형 광고 소재 제작', '구글 태그 & 전환 추적', '월간 Quality Score 개선'],
        result: '외국인·MZ 신환 30% 증가',
      },
      '다음 검색': {
        desc: '다음·카카오 검색 광고로 중장년층 환자층을 효과적으로 공략합니다.',
        items: ['다음 검색광고 계정 생성', '50+ 타겟 키워드 전략', '소재 A/B 테스트', '입찰가 일별 조정', '경쟁사 동향 모니터링'],
        result: '중장년 신환 유입 25% 증가',
      },
    },
    flow: ['현재 광고 효율 진단', '키워드 리서치 & 입찰 전략 수립', '광고 소재 A/B 테스트', '입찰가 자동 최적화 설정', '랜딩페이지 전환율 개선', '주간 데이터 분석 및 최적화'],
    faq: [
      { q: '광고 예산은 최소 얼마가 필요한가요?', a: '진료과목과 지역에 따라 다르지만, 월 100만원부터 효과적인 운영이 가능합니다.' },
      { q: '효과가 언제부터 나타나나요?', a: '검색광고는 즉시 노출이 시작되며, 보통 2-4주 내 성과를 확인할 수 있습니다.' },
    ],
  },
  content: {
    cats: ['블로그 포스팅', '카드뉴스', '영상 콘텐츠', '이메일 뉴스레터'],
    heroColor: 'from-green-900 via-green-800 to-point',
    metrics: [
      { label: '유기적 트래픽 증가', value: '320%', sub: '6개월 기준' },
      { label: '블로그 상위 노출', value: '94%', sub: '타겟 키워드 기준' },
      { label: '콘텐츠 체류 시간', value: '4.2분', sub: '업종 평균 1.3분 대비' },
    ],
    catContent: {
      '블로그 포스팅': {
        desc: '의료 전문성과 SEO를 결합한 블로그 포스팅으로 검색 상위 노출과 신뢰도를 동시에 확보합니다.',
        items: ['월 8~16건 정기 포스팅', '의료법 준수 전문 작가', '네이버 VIEW 상위 최적화', '시술 후기·Q&A 콘텐츠', '내부 링크 전략 구성'],
        result: '블로그 트래픽 320% 증가',
      },
      '카드뉴스': {
        desc: '복잡한 의료 정보를 시각적으로 쉽게 전달하는 카드뉴스·인포그래픽을 제작합니다.',
        items: ['의료 인포그래픽 제작', 'SNS 최적화 카드뉴스', '증상·시술 비교 콘텐츠', '시즌별 건강 캠페인', '브랜드 가이드 일관성 유지'],
        result: '공유·저장율 업종 평균 4배',
      },
      '영상 콘텐츠': {
        desc: '원장 인터뷰, 시술 영상, 환자 인터뷰 등 신뢰도 높은 영상 콘텐츠를 기획·제작합니다.',
        items: ['기획 & 스크립트 작성', '병원 방문 촬영 진행', '편집·자막·효과 처리', '유튜브·인스타 릴스 최적화', '영상 광고 소재 활용'],
        result: '영상 콘텐츠 조회수 평균 15만회',
      },
      '이메일 뉴스레터': {
        desc: '기존 환자 재방문을 유도하는 맞춤형 이메일 뉴스레터로 환자 이탈을 방지합니다.',
        items: ['뉴스레터 템플릿 디자인', '세그먼트별 맞춤 발송', '시즌 프로모션 캠페인', '오픈율·클릭율 분석', '자동화 발송 시퀀스 설정'],
        result: '재방문 전환율 38% 향상',
      },
    },
    flow: ['키워드 & 검색 의도 분석', '콘텐츠 주제 캘린더 수립', '의료 전문 작가 배정', '원고 작성 & 의학적 검토', '최적화 포스팅 및 내부링크 구축', 'SEO 성과 추적 및 보강'],
    faq: [
      { q: '의료법 위반이 걱정됩니다', a: '의료광고 심의 경험이 있는 의료법 전문 작가팀이 작성합니다. 필요 시 심의 대행도 진행합니다.' },
      { q: '콘텐츠 주제는 어떻게 정하나요?', a: '환자들의 실제 검색 데이터를 기반으로 수요가 높은 주제를 선별하여 제안합니다.' },
    ],
  },
  display: {
    cats: ['배너 광고', '동영상 광고', '리타겟팅', '지역 타겟'],
    heroColor: 'from-purple-900 via-purple-800 to-brand',
    metrics: [
      { label: '광고 ROI', value: '420%', sub: '평균 기준' },
      { label: '리타겟팅 전환율', value: '3.5배', sub: '콜드 타겟 대비' },
      { label: '브랜드 인지도 상승', value: '67%', sub: '캠페인 6주 후' },
    ],
    catContent: {
      '배너 광고': {
        desc: '구글·네이버·카카오 네트워크에서 잠재 환자에게 브랜드를 시각적으로 노출합니다.',
        items: ['배너 소재 기획·디자인', '플랫폼별 사이즈 제작', '타겟 오디언스 설정', 'A/B 소재 테스트', '노출·클릭·전환 성과 분석'],
        result: '브랜드 인지도 67% 향상',
      },
      '동영상 광고': {
        desc: '유튜브·카카오TV 등 동영상 플랫폼에서 시술 영상·브랜드 영상을 효과적으로 노출합니다.',
        items: ['6초·15초·30초 광고 영상 제작', '유튜브 인스트림·범퍼 광고', '카카오TV 동영상 광고', '조회율(VTR) 최적화', '브랜드 리프트 조사'],
        result: '영상 광고 VTR 업종 평균 1.8배',
      },
      '리타겟팅': {
        desc: '홈페이지나 SNS를 방문했지만 예약하지 않은 잠재 환자에게 재노출하여 전환을 유도합니다.',
        items: ['픽셀·태그 설치', '방문자 세그먼트 분류', '리타겟팅 광고 소재 제작', '빈도 수 최적화', '전환 기여도 분석'],
        result: '리타겟팅 예약 전환율 3.5배',
      },
      '지역 타겟': {
        desc: '병원 반경 내 잠재 환자에게 집중 노출하여 지역 내 인지도를 극대화합니다.',
        items: ['지오타겟팅 반경 설정', '지역 키워드 광고', '경쟁 병원 근처 타겟', '로컬 이벤트 광고', '지역별 성과 비교 리포트'],
        result: '지역 검색 1위 달성율 82%',
      },
    },
    flow: ['잠재 환자 페르소나 설정', '타겟 세그먼트 분류', '배너·동영상 소재 제작', '플랫폼별 광고 집행', '리타겟팅 픽셀 설치', '전환 추적 및 최적화'],
    faq: [
      { q: '어떤 진료과목에 효과적인가요?', a: '비급여 진료(피부·성형·치과·한의원)에 특히 효과적이며, 시술 관련 검색이 많은 키워드와 연계 운영합니다.' },
      { q: '광고 소재는 직접 만들어 주나요?', a: '네, 의료광고 디자인 전문팀이 배너, 영상 소재를 제작합니다.' },
    ],
  },
  web: {
    cats: ['디자인', '개발', 'SEO', '예약 시스템'],
    heroColor: 'from-slate-900 via-slate-800 to-brand-900',
    metrics: [
      { label: '홈페이지 문의 전환율', value: '3배', sub: '리뉴얼 전 대비' },
      { label: '평균 체류 시간', value: '+85%', sub: '리뉴얼 후 기준' },
      { label: '모바일 속도 점수', value: '95+', sub: 'Google PageSpeed' },
    ],
    catContent: {
      '디자인': {
        desc: '환자 신뢰를 높이는 전문적이고 전환율이 최적화된 병원 홈페이지 UI/UX를 설계합니다.',
        items: ['브랜드 분석 & 컨셉 기획', '와이어프레임 설계', 'UI 디자인 시안 (3회 수정)', '모바일 반응형 디자인', '다크/라이트 모드 지원'],
        result: '방문자 이탈율 42% 감소',
      },
      '개발': {
        desc: '최신 웹 기술로 빠르고 안전한 병원 홈페이지를 개발합니다.',
        items: ['React / Next.js 기반 개발', '모바일 퍼스트 구현', 'Core Web Vitals 최적화', 'SSL·보안 설정', '출시 후 1개월 무상 A/S'],
        result: '페이지 로딩 속도 3배 개선',
      },
      'SEO': {
        desc: '기술적 SEO부터 콘텐츠 SEO까지 검색 상위 노출을 위한 전략을 적용합니다.',
        items: ['메타태그·구조화 데이터 설정', '사이트맵·robots.txt', '페이지 속도 최적화', '지역 SEO(Google My Business)', '월간 SEO 성과 리포트'],
        result: '검색 노출 순위 평균 8위 상승',
      },
      '예약 시스템': {
        desc: '네이버·카카오·자체 예약 시스템을 연동하여 24시간 환자 예약을 자동화합니다.',
        items: ['네이버 예약 연동', '카카오 예약 연동', '자체 예약 모듈 개발', '예약 확인 SMS·알림톡', '예약 데이터 대시보드'],
        result: '예약 전환율 3배, 노쇼율 60% 감소',
      },
    },
    flow: ['병원 브랜드 분석 & 경쟁사 조사', 'UX 설계 & 와이어프레임', '디자인 시안 제작 (3회 수정 포함)', '개발 & 모바일 최적화', 'SEO 기술 적용 & 속도 최적화', '출시 후 1개월 무상 A/S'],
    faq: [
      { q: '제작 기간은 얼마나 걸리나요?', a: '일반적으로 6~10주 소요됩니다. 규모와 기능에 따라 달라집니다.' },
      { q: '예약 시스템도 연동되나요?', a: '네이버 예약, 카카오 예약, 자체 예약 시스템 모두 연동 가능합니다.' },
    ],
  },
  review: {
    cats: ['구글 맵', '네이버 지도', '카카오 맵', '평판 모니터링'],
    heroColor: 'from-yellow-900 via-amber-800 to-accent-dark',
    metrics: [
      { label: '평균 별점 향상', value: '4.2→4.8', sub: '6개월 기준' },
      { label: '리뷰 수 증가', value: '680%', sub: '캠페인 전 대비' },
      { label: '검색 순위 상승', value: '1→3위', sub: '지역 키워드 평균' },
    ],
    catContent: {
      '구글 맵': {
        desc: '구글 맵 프로필을 최적화하고 긍정 리뷰를 체계적으로 확보하여 지역 검색 1위를 목표합니다.',
        items: ['Google Business Profile 최적화', '리뷰 요청 자동화 시스템', '부정 리뷰 신고·대응', '사진·시간·정보 업데이트', '구글 맵 광고(LSA) 연계'],
        result: '구글 별점 평균 4.8달성',
      },
      '네이버 지도': {
        desc: '네이버 플레이스 상위 노출과 네이버 리뷰 확보로 국내 최대 검색 플랫폼을 공략합니다.',
        items: ['네이버 플레이스 최적화', '스마트플레이스 관리', '영수증 리뷰 수집 캠페인', '블로그 리뷰 연계', '플레이스 광고 집행'],
        result: '네이버 지도 지역 TOP 3 진입',
      },
      '카카오 맵': {
        desc: '카카오 맵 등록 최적화와 카카오 채널 연동으로 카카오 이용자를 직접 유입합니다.',
        items: ['카카오 맵 등록 & 최적화', '카카오 채널 연동', '리뷰 응답 관리', '카카오 광고 연계', '지도 정보 정기 업데이트'],
        result: '카카오 통한 신환 월평균 28명',
      },
      '평판 모니터링': {
        desc: '온라인 전채널의 병원 언급을 실시간 모니터링하고 부정적 이슈에 선제적으로 대응합니다.',
        items: ['키워드 실시간 알림 설정', '부정 리뷰·기사 조기 감지', '위기 대응 매뉴얼 수립', '온라인 평판 주간 리포트', '경쟁사 평판 비교 분석'],
        result: '온라인 평판 위기 사전 차단율 91%',
      },
    },
    flow: ['현재 온라인 평판 진단', '네거티브 리뷰 대응 전략 수립', '리뷰 수집 캠페인 설계', '긍정 리뷰 지속 생성', '플랫폼별 모니터링 설정', '월간 평판 리포트 제공'],
    faq: [
      { q: '부정적인 리뷰는 삭제할 수 있나요?', a: '허위·악의적 리뷰는 플랫폼 정책에 따라 신고·삭제 대응합니다. 합리적 불만 리뷰는 전문적 답변으로 관리합니다.' },
      { q: '리뷰 관리만 의뢰 가능한가요?', a: '네, 단독 서비스로 운영 가능합니다. 다른 서비스와 패키지 구성 시 할인 혜택이 있습니다.' },
    ],
  },
}

// ── rest03 Business.jsx 패턴: useState로 서브카테고리 전환 ──
function ServiceDetail({ svc }) {
  const detail = subCategories[svc.key] || subCategories.sns
  const [activeCat, setActiveCat] = useState(0)

  const cat = detail.cats[activeCat]
  const catData = detail.catContent[cat]

  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      {/* 페이지 타이틀 (rest03 패턴) */}
      <p className="mb-12 text-5xl font-semibold leading-none text-brand dark:text-brand-400 md:text-7xl">
        {svc.title}
      </p>

      {/* 서비스 개요 */}
      <section className="mb-16">
        <SectionTitle>서비스 개요</SectionTitle>
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <div className="flex-1">
            <p className="text-lg font-medium leading-8 text-neutral-700 dark:text-slate-300">{svc.shortDesc}</p>
          </div>
          {/* 핵심 성과 수치 */}
          <div className="grid grid-cols-3 gap-4 md:w-96 md:shrink-0">
            {detail.metrics.map((m) => (
              <div key={m.label} className={['rounded-xl bg-gradient-to-br p-4 text-center text-white', detail.heroColor].join(' ')}>
                <div className="text-xl font-extrabold">{m.value}</div>
                <div className="mt-1 text-xs font-semibold opacity-80">{m.label}</div>
                <div className="mt-0.5 text-xs opacity-50">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서브카테고리 탭 (rest03 Business.jsx 패턴) */}
      <section className="mb-16">
        <SectionTitle>채널별 서비스</SectionTitle>

        {/* 탭 버튼 그룹 */}
        <div className="mb-10 overflow-x-auto rounded border border-neutral-300 dark:border-slate-700">
          <ul className="flex w-full">
            {detail.cats.map((c, i) => (
              <li key={c} className="flex-grow border-l border-neutral-300 dark:border-slate-700 first:border-l-0">
                <button
                  type="button"
                  onClick={() => setActiveCat(i)}
                  className={[
                    'h-14 w-full whitespace-nowrap px-3.5 text-sm font-bold transition md:text-base',
                    i === activeCat
                      ? 'bg-brand text-white dark:bg-brand'
                      : 'bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800',
                  ].join(' ')}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 선택된 서브카테고리 내용 */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1">
            <p className="mb-6 text-lg font-medium leading-8 text-neutral-700 dark:text-slate-300">
              {catData.desc}
            </p>
            <ul className="flex flex-col gap-3">
              {catData.items.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-neutral-50 dark:bg-slate-800 px-5 py-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">✓</span>
                  <span className="text-sm font-medium text-neutral-800 dark:text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex h-fit flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-brand-950 to-brand p-8 text-center text-white md:w-60 md:shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">기대 성과</span>
            <span className="text-2xl font-extrabold">{catData.result}</span>
          </div>
        </div>
      </section>

      {/* 진행 프로세스 */}
      <section className="mb-16">
        <SectionTitle>진행 프로세스</SectionTitle>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detail.flow.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-xl bg-neutral-50 dark:bg-slate-800 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium leading-6 text-neutral-700 dark:text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <SectionTitle>자주 묻는 질문</SectionTitle>
        <div className="flex flex-col gap-5">
          {detail.faq.map((f) => (
            <div key={f.q} className="rounded-xl bg-neutral-50 dark:bg-slate-800 p-6 md:p-8">
              <p className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">Q. {f.q}</p>
              <p className="text-base font-medium leading-7 text-neutral-600 dark:text-slate-400">A. {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-brand to-point p-8 text-center text-white md:p-12">
        <h3 className="mb-2 text-xl font-extrabold md:text-2xl">{svc.title} 도입을 고민하고 계신가요?</h3>
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
      <ServiceDetail svc={svc} key={category} />
    </SubPageLayout>
  )
}
