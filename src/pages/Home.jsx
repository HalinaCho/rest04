import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp'
import { keyStats, services, caseStudies, process, blogPosts } from '../data/site'

// ───── Hero ─────
const slides = [
  {
    headline: '환자가 찾아오는\n병원을 만듭니다',
    sub: '데이터 기반 의료 마케팅으로 신규 환자를 늘리고 매출을 성장시킵니다',
    cta: '무료 상담 신청',
    ctaTo: '/contact',
  },
  {
    headline: '350개 병의원이\n선택한 파트너',
    sub: '6개월 평균 287% 환자 증가 · 12개월 평균 156% 매출 증가',
    cta: '성과사례 보기',
    ctaTo: '/results',
  },
  {
    headline: '의료 마케팅\n전문가가 직접',
    sub: 'SNS·검색광고·콘텐츠·홈페이지까지 원스톱으로 운영합니다',
    cta: '서비스 알아보기',
    ctaTo: '/services/sns',
  },
]

// 우측 대시보드 — 환자 성장 미니 차트
function DashboardMockup() {
  const data = [45, 68, 102, 148, 198, 258, 320]
  const w = 260
  const h = 80
  const max = Math.max(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - (v / max) * h * 0.85 - 4
    return [x, y]
  })
  const polyline = pts.map((p) => p.join(',')).join(' ')
  const area = [
    `M ${pts[0][0]},${h}`,
    ...pts.map((p) => `L ${p[0]},${p[1]}`),
    `L ${pts[pts.length - 1][0]},${h}`,
    'Z',
  ].join(' ')

  return (
    <div className="hidden lg:flex flex-col gap-4 w-80 xl:w-96">
      {/* 성과 차트 카드 */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-white/60">신규 환자 월별 추이</span>
          <span className="rounded-full bg-success/30 px-2.5 py-0.5 text-xs font-extrabold text-success">▲ 287%</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#heroChartGrad)" />
          <polyline points={polyline} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 4.5 : 2.5} fill="#22d3ee" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="mt-3 flex justify-between text-xs text-white/40">
          <span>1개월</span>
          <span>6개월</span>
        </div>
      </div>

      {/* 수치 카드 3개 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { num: '287%', label: '평균 환자\n증가율', color: 'from-brand-700 to-brand' },
          { num: '350+', label: '파트너\n병의원', color: 'from-point-dark to-point' },
          { num: '98%', label: '고객사\n만족도', color: 'from-amber-600 to-accent' },
        ].map((c) => (
          <div key={c.label} className={['rounded-xl bg-gradient-to-br p-4 text-center shadow-lg', c.color].join(' ')}>
            <div className="text-xl font-extrabold text-white xl:text-2xl">{c.num}</div>
            <div className="mt-1 whitespace-pre-line text-xs font-medium text-white/70 leading-4">{c.label}</div>
          </div>
        ))}
      </div>

      {/* 최근 성과 알림 카드 */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="mb-2 text-xs font-bold text-white/50 uppercase tracking-widest">최근 성과</p>
        {[
          { clinic: '강남 K피부과', result: '신환 +183%', icon: '📈' },
          { clinic: '서울 W치과', result: '매출 +220%', icon: '💰' },
        ].map((r) => (
          <div key={r.clinic} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-base">{r.icon}</span>
              <span className="text-xs font-semibold text-white/80">{r.clinic}</span>
            </div>
            <span className="text-xs font-extrabold text-success">{r.result}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const [idx, setIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length)
      setAnimKey((k) => k + 1)
    }, 5500)
    return () => clearInterval(t)
  }, [])

  const go = (dir) => {
    setIdx((i) => (i + dir + slides.length) % slides.length)
    setAnimKey((k) => k + 1)
  }

  const s = slides[idx]

  return (
    <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand pb-16">

      {/* ── 배경 레이어 ── */}
      <div className="pointer-events-none absolute inset-0">

        {/* 대형 글로우 서클 */}
        <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-point/20 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute left-[45%] top-[20%] h-[350px] w-[350px] rounded-full bg-brand-400/10 blur-3xl" />

        {/* SVG 의료 십자(+) 반복 패턴 */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medCross" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="35" y="27" width="10" height="26" fill="white" rx="2" opacity="0.035" />
              <rect x="27" y="35" width="26" height="10" fill="white" rx="2" opacity="0.035" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medCross)" />
        </svg>

        {/* 사선 띠 (빛줄기 효과) */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {[0,1,2,3,4,5].map((i) => (
            <rect key={i} x={-300 + i * 320} y="-10%" width="120" height="120%" fill="white"
              transform={`skewX(-20) translate(${i * 20}, 0)`} />
          ))}
        </svg>

        {/* 링 장식 */}
        <div className="absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full border border-white/[0.06]" />
        <div className="absolute -top-12 -right-12 h-[360px] w-[360px] rounded-full border border-white/[0.05]" />
        <div className="absolute bottom-20 left-[35%] h-[200px] w-[200px] rounded-full border border-white/[0.06]" />
        <div className="absolute top-[20%] left-[20%] h-[120px] w-[120px] rounded-full border border-white/[0.04]" />

        {/* 플로팅 파티클 */}
        <div className="absolute top-[12%] left-[7%]  h-2.5 w-2.5 rounded-full bg-white/20 animate-float-slow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[28%] left-[14%] h-1.5 w-1.5 rounded-full bg-accent/60 animate-float-mid"  style={{ animationDelay: '1s' }} />
        <div className="absolute top-[55%] left-[4%]  h-2   w-2   rounded-full bg-white/15 animate-float-fast" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[18%] left-[48%] h-2   w-2   rounded-full bg-point/50 animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[72%] left-[32%] h-3   w-3   rounded-full bg-white/10 animate-float-mid"  style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[25%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-float-fast" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[8%]  left-[60%] h-2   w-2   rounded-full bg-white/20 animate-float-mid"  style={{ animationDelay: '3s' }} />
        <div className="absolute top-[80%] left-[58%] h-2.5 w-2.5 rounded-full bg-point/30 animate-float-slow" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-20 md:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* 좌측 텍스트 */}
          <div className="w-full lg:flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              병의원 디지털 마케팅 전문 에이전시
            </div>

            <h1
              key={animKey}
              className="mb-5 whitespace-pre-line text-5xl font-extrabold leading-tight text-white animate-fadeInUp md:text-6xl lg:text-7xl"
            >
              {s.headline}
            </h1>

            <p
              key={animKey + 'sub'}
              className="mb-10 max-w-xl text-lg leading-8 text-white/70 animate-fadeIn"
            >
              {s.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={s.ctaTo} className="btn-accent text-base px-8 py-4">
                {s.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/results" className="btn-outline border-white/40 text-white hover:bg-white hover:text-brand text-base px-8 py-4">
                성과 보기
              </Link>
            </div>

            {/* 인디케이터 */}
            <div className="mt-12 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`슬라이드 ${i + 1}`}
                  onClick={() => { setIdx(i); setAnimKey((k) => k + 1) }}
                  className={['rounded-full transition-all', i === idx ? 'h-2 w-10 bg-accent' : 'h-2 w-2 bg-white/30 hover:bg-white/60'].join(' ')}
                />
              ))}
              <button type="button" aria-label="이전" onClick={() => go(-1)} className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition">‹</button>
              <button type="button" aria-label="다음" onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition">›</button>
            </div>
          </div>

          {/* 우측 대시보드 모형 */}
          <DashboardMockup />
        </div>
      </div>

      {/* ── 하단 웨이브 구분선 ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 72" className="block w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" className="fill-white dark:fill-slate-900" />
        </svg>
      </div>
    </section>
  )
}

// ───── 핵심 성과 수치 ─────
function KeyStats() {
  const colorMap = {
    brand: 'text-brand dark:text-brand-400',
    point: 'text-point dark:text-point-light',
    success: 'text-success',
    accent: 'text-accent',
  }
  return (
    <section className="bg-white dark:bg-slate-900 transition-colors">
      <div className="mx-auto grid max-w-container grid-cols-2 divide-x divide-y divide-neutral-100 dark:divide-slate-800 md:grid-cols-4 md:divide-y-0">
        {keyStats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center">
            <span className={['text-4xl font-extrabold md:text-5xl', colorMap[s.color] || 'text-brand'].join(' ')}>
              <CountUp end={s.value} duration={2200} />{s.unit}
            </span>
            <span className="mt-1 text-sm font-bold text-neutral-800 dark:text-white">{s.label}</span>
            <span className="text-xs text-neutral-400 dark:text-slate-500">{s.sub}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ───── 서비스 미리보기 ─────
const svcIcons = {
  sns: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  search: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  content: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8M8 17h5',
  display: 'M1 3h22v14H1zM8 21h8M12 17v4',
  web: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
  review: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
}

function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="tag mb-3">OUR SERVICES</span>
            <h2 className="section-title">병원 성장을 위한<br />전문 서비스</h2>
          </div>
          <Link to="/services/sns" className="btn-outline shrink-0">서비스 전체 보기</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link
              key={svc.key}
              to={`/services/${svc.key}`}
              className="card group flex flex-col gap-4 p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 transition group-hover:bg-brand group-hover:text-white text-brand dark:text-brand-400">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={svcIcons[svc.key] || svc.icon} />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-neutral-900 dark:text-white">{svc.title}</h3>
                <p className="text-sm leading-6 text-neutral-500 dark:text-slate-400">{svc.shortDesc}</p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">{svc.result}</span>
                <span className="text-brand dark:text-brand-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ───── 미니 스파크라인 차트 ─────
function Sparkline({ data, color = '#3b82f6' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 120
  const h = 50
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075
    return `${x},${y}`
  })
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]} r="3" fill={color} />
    </svg>
  )
}

// ───── 성과사례 미리보기 ─────
function CasesSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="tag mb-3">RESULTS</span>
            <h2 className="section-title">숫자로 증명하는<br />실제 성과</h2>
          </div>
          <Link to="/results" className="btn-outline shrink-0">전체 성과사례 보기</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {caseStudies.map((c) => {
            const growthRate = Math.round(((c.after.patients - c.before.patients) / c.before.patients) * 100)
            return (
              <div key={c.id} className="card flex flex-col gap-5 p-6">
                <div>
                  <span className="tag mb-2">{c.category}</span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{c.clinic}</h3>
                  <p className="text-sm text-neutral-500 dark:text-slate-400">{c.location} · {c.period}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-brand dark:text-brand-400">+{growthRate}%</div>
                    <div className="text-xs text-neutral-500 dark:text-slate-400">신규 환자 증가</div>
                  </div>
                  <Sparkline data={c.monthlyPatients} color="#3b82f6" />
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-neutral-50 dark:bg-slate-800 p-3 text-center text-xs">
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-white">{c.before.patients}명</div>
                    <div className="text-neutral-400 dark:text-slate-500">이전 월 환자</div>
                  </div>
                  <div>
                    <div className="font-bold text-success">{c.after.patients}명</div>
                    <div className="text-neutral-400 dark:text-slate-500">현재 월 환자</div>
                  </div>
                </div>
                <p className="text-sm italic leading-6 text-neutral-600 dark:text-slate-400 line-clamp-2">"{c.testimonial}"</p>
                <p className="text-xs font-bold text-neutral-500 dark:text-slate-500">— {c.ceo}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ───── 마케팅 프로세스 ─────
function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-brand-950 via-brand-900 to-brand dark:from-slate-950 dark:via-slate-900 dark:to-brand-950 transition-colors">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/60">HOW WE WORK</span>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">투명한 마케팅 프로세스</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.step} className="relative rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              {i < process.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-0.5 w-6 translate-x-6 bg-white/20 lg:block" />
              )}
              <div className="mb-4 text-5xl font-extrabold text-white/20">{p.step}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{p.title}</h3>
              <p className="text-sm leading-6 text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/contact" className="btn-accent text-base px-10 py-4">지금 무료 상담 신청하기</Link>
        </div>
      </div>
    </section>
  )
}

// ───── 블로그 미리보기 ─────
function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="tag mb-3">BLOG</span>
            <h2 className="section-title">마케팅 인사이트</h2>
          </div>
          <Link to="/blog" className="btn-outline shrink-0">블로그 전체 보기</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} to="/blog" className="card group flex flex-col gap-4 p-6 hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="tag">{post.category}</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-400 transition-colors">{post.title}</h3>
              <p className="text-sm leading-6 text-neutral-500 dark:text-slate-400 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-slate-500">
                <span>{post.date}</span>
                <span>읽는 시간 {post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ───── CTA 배너 ─────
function CtaBanner() {
  return (
    <section className="bg-accent dark:bg-accent-dark transition-colors">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 px-4 py-14 text-center md:flex-row md:text-left md:px-10 lg:px-20">
        <div>
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">지금 바로 무료 상담을 신청하세요</h2>
          <p className="mt-2 text-white/80">담당 전문가가 24시간 내 연락드립니다. 부담 없이 문의해 보세요.</p>
        </div>
        <Link to="/contact" className="shrink-0 rounded-full bg-white px-8 py-4 text-base font-bold text-accent transition hover:bg-neutral-100 active:scale-95">
          무료 상담 신청 →
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <KeyStats />
      <ServicesSection />
      <CasesSection />
      <ProcessSection />
      <BlogSection />
      <CtaBanner />
    </>
  )
}
