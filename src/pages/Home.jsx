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
    <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-point/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.15) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.15) 60px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-20 md:px-10 lg:px-20">
        <div className="max-w-3xl">
          {/* 뱃지 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            병의원 디지털 마케팅 전문 에이전시
          </div>

          {/* 헤드라인 */}
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
        </div>

        {/* 인디케이터 */}
        <div className="mt-14 flex items-center gap-3">
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

      {/* 수치 플로팅 카드 (데스크탑) */}
      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        {[
          { num: '287%', label: '평균 환자 증가율', color: 'bg-brand text-white' },
          { num: '350+', label: '파트너 병의원', color: 'bg-point text-white' },
          { num: '98%', label: '고객사 만족도', color: 'bg-accent text-white' },
        ].map((c) => (
          <div key={c.label} className={['rounded-2xl px-6 py-4 backdrop-blur-sm shadow-xl', c.color].join(' ')}>
            <div className="text-3xl font-extrabold">{c.num}</div>
            <div className="mt-0.5 text-xs font-medium opacity-80">{c.label}</div>
          </div>
        ))}
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
