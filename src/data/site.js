// ============================================================
// 사이트 전역 데이터 — 메디온 병의원 마케팅 에이전시
// ============================================================

export const company = {
  name: 'MediOn',
  nameKo: '메디온',
  tagline: '병의원 디지털 마케팅 전문 에이전시',
  fullName: 'MEDION DIGITAL MARKETING CO., LTD.',
  copyright: '© 2026 MediOn Digital Marketing. All rights reserved.',
  description:
    '메디온은 2015년 창립 이래 350개 이상의 병의원과 함께 성장해온 의료 특화 디지털 마케팅 전문 기업입니다. 데이터 기반의 전략으로 신규 환자 유입부터 매출 증대까지 실질적인 성과를 만들어갑니다.',
  phone: '02-1234-5678',
  email: 'info@medion-mktg.com',
  kakao: '카카오 채널: @medion',
  address: '서울특별시 강남구 테헤란로 123, 메디온빌딩 10층',
  hours: '평일 09:00 – 18:00 (주말·공휴일 휴무)',
  footerLinks: [
    { label: '이용약관', to: '/terms' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
  ],
}

// 상단 GNB
export const nav = [
  {
    label: '회사소개',
    to: '/about',
    children: [
      { label: 'CEO 인사말', to: '/about/greetings' },
      { label: '비전·가치', to: '/about/vision' },
      { label: '팀 소개', to: '/about/team' },
      { label: '연혁', to: '/about/history' },
    ],
  },
  {
    label: '서비스',
    to: '/services/sns',
    children: [
      { label: 'SNS 마케팅', to: '/services/sns' },
      { label: '검색광고(SEA)', to: '/services/search' },
      { label: '콘텐츠 마케팅', to: '/services/content' },
      { label: '디스플레이 광고', to: '/services/display' },
      { label: '홈페이지 제작', to: '/services/web' },
      { label: '리뷰·평판 관리', to: '/services/review' },
    ],
  },
  {
    label: '성과사례',
    to: '/results',
    children: [
      { label: '마케팅 성과', to: '/results' },
      { label: '고객 후기', to: '/results' },
    ],
  },
  {
    label: '블로그',
    to: '/blog',
    children: [
      { label: '마케팅 인사이트', to: '/blog' },
      { label: '병원 운영 팁', to: '/blog' },
    ],
  },
  {
    label: '커뮤니티',
    to: '/board/notice',
    children: [
      { label: '공지게시판', to: '/board/notice' },
      { label: '자유게시판', to: '/board/free' },
      { label: 'QnA 게시판', to: '/board/qna' },
    ],
  },
  {
    label: '문의하기',
    to: '/contact',
    children: [
      { label: '무료 상담 신청', to: '/contact' },
      { label: '오시는 길', to: '/contact' },
    ],
  },
]

// 핵심 성과 수치 (홈·성과 페이지 공통)
export const keyStats = [
  {
    value: 287,
    unit: '%',
    label: '신규 환자 평균 증가율',
    sub: '마케팅 시작 후 6개월 기준',
    color: 'brand',
  },
  {
    value: 156,
    unit: '%',
    label: '평균 매출 증가율',
    sub: '마케팅 시작 후 12개월 기준',
    color: 'point',
  },
  {
    value: 350,
    unit: '+',
    label: '파트너 병의원',
    sub: '누적 (2020년 이후)',
    color: 'success',
  },
  {
    value: 98,
    unit: '%',
    label: '고객사 만족도',
    sub: '2025 연간 설문 기준',
    color: 'accent',
  },
]

// 서비스 목록
export const services = [
  {
    key: 'sns',
    title: 'SNS 마케팅',
    shortDesc: '인스타그램·블로그·유튜브를 통한 강력한 브랜드 인지도 구축',
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    items: ['인스타그램 피드·릴스 운영', '네이버 블로그 최적화', '유튜브 채널 기획·관리', '바이럴 콘텐츠 제작'],
    result: '평균 팔로워 480% 증가',
  },
  {
    key: 'search',
    title: '검색광고(SEA)',
    shortDesc: '네이버·카카오·구글 키워드 광고로 즉시 환자 유입 극대화',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
    items: ['키워드 전략 수립', '입찰가 자동 최적화', 'CPC 절감 A/B 테스트', '전환율 개선 랜딩페이지'],
    result: '평균 클릭 비용 35% 절감',
  },
  {
    key: 'content',
    title: '콘텐츠 마케팅',
    shortDesc: '의료 전문성을 담은 신뢰도 높은 콘텐츠로 환자와 소통',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8M8 17h5',
    items: ['의료 특화 블로그 포스팅', '환자 후기 콘텐츠 제작', '카드뉴스·인포그래픽', '이메일 뉴스레터'],
    result: '유기적 트래픽 320% 증가',
  },
  {
    key: 'display',
    title: '디스플레이 광고',
    shortDesc: '정밀 타겟팅으로 잠재 환자에게 효과적으로 노출',
    icon: 'M1 3h22v14H1zM8 21h8M12 17v4',
    items: ['배너·동영상 광고 제작', '리타겟팅 캠페인', '지역 기반 타겟팅', '광고 효율 리포트'],
    result: '광고 ROI 평균 420%',
  },
  {
    key: 'web',
    title: '홈페이지 제작',
    shortDesc: '환자 신뢰를 높이는 전문적이고 전환율 최적화된 병원 홈페이지',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
    items: ['의료 특화 UI/UX 디자인', '모바일 최적화', 'SEO 기술 적용', '예약·상담 기능 연동'],
    result: '홈페이지 문의 전환율 3배',
  },
  {
    key: 'review',
    title: '리뷰·평판 관리',
    shortDesc: '긍정적 리뷰 확보와 온라인 평판을 체계적으로 관리',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    items: ['구글·네이버 리뷰 관리', '부정 리뷰 대응 전략', '환자 후기 캠페인', '평판 모니터링'],
    result: '평균 별점 4.2 → 4.8',
  },
]

// 성과 사례 (Results 페이지)
export const caseStudies = [
  {
    id: 1,
    clinic: '강남 K피부과',
    category: '피부과',
    location: '서울 강남구',
    period: '6개월',
    services: ['SNS 마케팅', '검색광고', '콘텐츠'],
    highlight: '신규 환자 183% 증가',
    highlightColor: 'brand',
    before: { patients: 120, revenue: 4800, reviews: 45 },
    after: { patients: 340, revenue: 13600, reviews: 312 },
    monthlyPatients: [120, 145, 178, 222, 278, 340],
    testimonial:
      '메디온과 함께한 6개월 만에 신규 환자가 3배 가까이 늘었습니다. 투자 대비 효과가 탁월합니다. 처음엔 반신반의했지만 지금은 전적으로 신뢰합니다.',
    ceo: '원장 김○○',
  },
  {
    id: 2,
    clinic: '서울 W치과',
    category: '치과',
    location: '서울 서초구',
    period: '12개월',
    services: ['검색광고', '홈페이지 제작', '리뷰 관리'],
    highlight: '매출 220% 증가',
    highlightColor: 'point',
    before: { patients: 85, revenue: 6500, reviews: 28 },
    after: { patients: 195, revenue: 20800, reviews: 287 },
    monthlyPatients: [85, 98, 112, 130, 148, 162, 171, 178, 183, 188, 192, 195],
    testimonial:
      '치과 개원 2년 만에 지역 1위 병원이 됐습니다. 메디온의 전략적 데이터 마케팅이 없었다면 불가능한 성과였을 겁니다.',
    ceo: '원장 박○○',
  },
  {
    id: 3,
    clinic: '분당 H한의원',
    category: '한의원',
    location: '경기 성남시',
    period: '8개월',
    services: ['SNS 마케팅', '콘텐츠', '디스플레이 광고'],
    highlight: '월 매출 191% 증가',
    highlightColor: 'success',
    before: { patients: 60, revenue: 2400, reviews: 15 },
    after: { patients: 175, revenue: 7000, reviews: 198 },
    monthlyPatients: [60, 72, 88, 108, 132, 150, 162, 175],
    testimonial:
      '온라인 존재감이 없던 한의원이 이제는 블로그로 매달 수백 명의 신규 환자가 내원합니다. 진심으로 감사드립니다.',
    ceo: '원장 이○○',
  },
  {
    id: 4,
    clinic: '인천 P성형외과',
    category: '성형외과',
    location: '인천 남동구',
    period: '12개월',
    services: ['SNS 마케팅', '검색광고', '콘텐츠', '홈페이지'],
    highlight: '상담 문의 340% 증가',
    highlightColor: 'accent',
    before: { patients: 45, revenue: 9000, reviews: 22 },
    after: { patients: 148, revenue: 34000, reviews: 315 },
    monthlyPatients: [45, 55, 68, 82, 98, 110, 120, 128, 135, 141, 145, 148],
    testimonial:
      '인천 최고의 성형외과로 성장하는 데 메디온이 핵심적인 역할을 했습니다. 성과 데이터를 매달 투명하게 공유해줘서 신뢰가 갑니다.',
    ceo: '원장 최○○',
  },
]

// 마케팅 프로세스
export const process = [
  {
    step: '01',
    title: '무료 진단 & 상담',
    desc: '현재 온라인 현황을 분석하고 병원 목표에 맞는 마케팅 전략을 수립합니다.',
  },
  {
    step: '02',
    title: '맞춤 전략 수립',
    desc: '진료과목·지역·예산에 최적화된 채널별 마케팅 플랜을 제안합니다.',
  },
  {
    step: '03',
    title: '실행 & 운영',
    desc: '전문 팀이 콘텐츠 제작부터 광고 집행까지 일괄 운영합니다.',
  },
  {
    step: '04',
    title: '성과 분석 & 개선',
    desc: '월간 리포트로 성과를 투명하게 공유하고 지속적으로 최적화합니다.',
  },
]

// 블로그 미리보기
export const blogPosts = [
  {
    id: 1,
    category: '마케팅 인사이트',
    title: '2026년 병원 SNS 마케팅 트렌드 5가지',
    date: '2026.05.28',
    readTime: '5분',
    excerpt: '숏폼 영상과 의료 인플루언서 협업이 병원 마케팅의 핵심으로 떠오르고 있습니다.',
  },
  {
    id: 2,
    category: '병원 운영 팁',
    title: '신규 개원 병원을 위한 초기 마케팅 전략 가이드',
    date: '2026.05.15',
    readTime: '7분',
    excerpt: '개원 후 3개월이 병원의 미래를 결정합니다. 핵심 채널과 예산 배분 전략을 공개합니다.',
  },
  {
    id: 3,
    category: '성과 분석',
    title: '검색광고 vs SNS 광고, 병원에는 어떤 게 효과적일까?',
    date: '2026.05.05',
    readTime: '6분',
    excerpt: '350개 파트너 병원 데이터를 분석해 진료과목별 최적 채널을 밝힙니다.',
  },
]

// 팀 멤버
export const teamMembers = [
  {
    name: '김대표',
    role: 'CEO · 공동창업자',
    career: '前 삼성서울병원 마케팅팀, 헬스케어 마케팅 15년',
    desc: '의료 현장을 이해하는 마케터로서, 환자와 병원 모두 행복한 마케팅을 추구합니다.',
  },
  {
    name: '이전략',
    role: '전략본부장',
    career: '데이터 마케팅 전문가, 전 구글 코리아',
    desc: '데이터와 창의성의 균형으로 최적의 마케팅 전략을 설계합니다.',
  },
  {
    name: '박콘텐츠',
    role: '크리에이티브 디렉터',
    career: '의료 콘텐츠 제작 10년, 수상 경력 다수',
    desc: '의학 지식과 스토리텔링을 결합해 환자의 마음을 움직이는 콘텐츠를 만듭니다.',
  },
  {
    name: '최광고',
    role: '퍼포먼스 마케팅 팀장',
    career: '네이버·카카오 인증 광고 전문가',
    desc: '최소 비용으로 최대 효과를 만드는 퍼포먼스 마케팅을 전담합니다.',
  },
]

// 연혁
export const history = [
  {
    year: '2026',
    events: ['성과사례 누적 350건 달성', '서울 강남 신사옥 이전', '일본 의료기관 마케팅 계약 체결'],
  },
  {
    year: '2024',
    events: ['중소기업벤처부 우수 디지털 에이전시 선정', 'AI 기반 광고 최적화 시스템 도입'],
  },
  {
    year: '2022',
    events: ['파트너 병의원 200개 돌파', '콘텐츠 마케팅 전담 팀 신설'],
  },
  {
    year: '2020',
    events: ['검색광고 인증 파트너 취득', '의료 특화 SNS 솔루션 출시'],
  },
  {
    year: '2018',
    events: ['임직원 50명 달성', '인천·분당 지사 개설'],
  },
  {
    year: '2015',
    events: ['메디온 창립', '첫 파트너 병원 계약 체결'],
  },
]
