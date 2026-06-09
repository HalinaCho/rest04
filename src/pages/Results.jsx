import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp'
import { keyStats, caseStudies } from '../data/site'

// ── 미니 라인차트 (SVG) ──
function LineChart({ data, color = '#3b82f6', height = 80 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 300
  const h = height
  const range = max - min || 1
  const pad = 10
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return [x, y]
  })
  const polyline = pts.map((p) => p.join(',')).join(' ')
  const area = [
    `M ${pts[0][0]},${h - pad}`,
    ...pts.map((p) => `L ${p[0]},${p[1]}`),
    `L ${pts[pts.length - 1][0]},${h - pad}`,
    'Z',
  ].join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 4.5 : 2.5} fill={color} stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

// ── 막대 비교 ──
function CompareBar({ label, before, after, unit = '명', max }) {
  const bPct = Math.round((before / max) * 100)
  const aPct = Math.round((after / max) * 100)
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-xs font-semibold text-neutral-500 dark:text-slate-400">
        <span>{label}</span>
        <span className="text-success">+{Math.round(((after - before) / before) * 100)}%</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-12 shrink-0 text-right text-xs text-neutral-400">이전</div>
          <div className="flex-1 rounded-full bg-neutral-100 dark:bg-slate-800">
            <div className="h-3 rounded-full bg-neutral-300 dark:bg-slate-600 transition-all" style={{ width: `${bPct}%` }} />
          </div>
          <div className="w-16 shrink-0 text-xs font-bold text-neutral-600 dark:text-slate-300">{before.toLocaleString()}{unit}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 shrink-0 text-right text-xs text-neutral-400">이후</div>
          <div className="flex-1 rounded-full bg-neutral-100 dark:bg-slate-800">
            <div className="h-3 rounded-full bg-brand transition-all" style={{ width: `${aPct}%` }} />
          </div>
          <div className="w-16 shrink-0 text-xs font-bold text-brand dark:text-brand-400">{after.toLocaleString()}{unit}</div>
        </div>
      </div>
    </div>
  )
}

// ── 사례 카드 ──
const colorMap = {
  brand: { line: '#3b82f6', badge: 'bg-brand-50 text-brand dark:bg-brand-950 dark:text-brand-300', border: 'border-brand-200 dark:border-brand-900' },
  point: { line: '#0891b2', badge: 'bg-cyan-50 text-point dark:bg-cyan-950 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900' },
  success: { line: '#10b981', badge: 'bg-green-50 text-success dark:bg-green-950 dark:text-green-300', border: 'border-green-200 dark:border-green-900' },
  accent: { line: '#f59e0b', badge: 'bg-amber-50 text-accent dark:bg-amber-950 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900' },
}

function CaseCard({ c }) {
  const [tab, setTab] = useState('chart')
  const colors = colorMap[c.highlightColor] || colorMap.brand
  const maxPatients = Math.max(c.before.patients, c.after.patients) * 1.1
  const maxRevenue = Math.max(c.before.revenue, c.after.revenue) * 1.1
  const maxReviews = Math.max(c.before.reviews, c.after.reviews) * 1.1

  return (
    <div className={['card overflow-hidden border-t-4', colors.border].join(' ')}>
      {/* 헤더 */}
      <div className="p-6 pb-0">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex flex-wrap gap-2">
              <span className={['rounded-full px-3 py-0.5 text-xs font-bold', colors.badge].join(' ')}>{c.category}</span>
              <span className="rounded-full bg-neutral-100 dark:bg-slate-800 px-3 py-0.5 text-xs text-neutral-500 dark:text-slate-400">{c.location}</span>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">{c.clinic}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-brand dark:text-brand-400">{c.highlight}</div>
            <div className="text-xs text-neutral-400 dark:text-slate-500">기간: {c.period}</div>
          </div>
        </div>

        {/* 서비스 태그 */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {c.services.map((s) => (
            <span key={s} className="rounded-full bg-neutral-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:text-slate-300">{s}</span>
          ))}
        </div>

        {/* 탭 */}
        <div className="flex gap-1 border-b border-neutral-100 dark:border-slate-800">
          {[{ key: 'chart', label: '환자 추이' }, { key: 'compare', label: '비포·애프터' }].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={[
                'border-b-2 px-4 py-2.5 text-xs font-bold transition',
                tab === t.key
                  ? 'border-brand text-brand dark:text-brand-400'
                  : 'border-transparent text-neutral-400 dark:text-slate-500 hover:text-brand',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="p-6">
        {tab === 'chart' ? (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-400 dark:text-slate-500">
              <span>월별 신규 환자 추이</span>
              <span>최종: <strong className="text-success">{c.after.patients}명</strong></span>
            </div>
            <div className="h-20">
              <LineChart data={c.monthlyPatients} color={colors.line} height={80} />
            </div>
            <div className="mt-3 flex justify-between text-xs text-neutral-400 dark:text-slate-500">
              <span>시작</span>
              <span>{c.period} 후</span>
            </div>
          </div>
        ) : (
          <div>
            <CompareBar label="월 신규 환자" before={c.before.patients} after={c.after.patients} unit="명" max={maxPatients} />
            <CompareBar label="월 매출(만원)" before={c.before.revenue} after={c.after.revenue} unit="만" max={maxRevenue} />
            <CompareBar label="누적 리뷰" before={c.before.reviews} after={c.after.reviews} unit="건" max={maxReviews} />
          </div>
        )}
      </div>

      {/* 후기 */}
      <div className="border-t border-neutral-100 dark:border-slate-800 bg-neutral-50 dark:bg-slate-800/40 px-6 py-5">
        <p className="text-sm italic leading-6 text-neutral-600 dark:text-slate-300">"{c.testimonial}"</p>
        <p className="mt-2 text-xs font-bold text-neutral-500 dark:text-slate-500">— {c.ceo}</p>
      </div>
    </div>
  )
}

// ── 필터 버튼 ──
const categories = ['전체', '피부과', '치과', '한의원', '성형외과']

export default function Results() {
  const [filter, setFilter] = useState('전체')
  const filtered = filter === '전체' ? caseStudies : caseStudies.filter((c) => c.category === filter)

  const colorMapNum = { brand: 'text-brand', point: 'text-point', success: 'text-success', accent: 'text-accent' }

  return (
    <div className="dark:bg-slate-950 transition-colors">
      {/* 페이지 헤더 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand py-20 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)' }}
        />
        <div className="relative z-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">RESULTS</p>
          <h1 className="text-4xl font-extrabold text-white md:text-6xl">성과사례</h1>
          <p className="mt-4 text-white/60">데이터로 증명하는 메디온의 실제 성과</p>
        </div>
      </div>

      {/* 핵심 수치 */}
      <section className="bg-white dark:bg-slate-900 transition-colors">
        <div className="mx-auto grid max-w-container grid-cols-2 divide-x divide-y divide-neutral-100 dark:divide-slate-800 md:grid-cols-4 md:divide-y-0">
          {keyStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center">
              <span className={['text-4xl font-extrabold md:text-5xl', colorMapNum[s.color] || 'text-brand'].join(' ')}>
                <CountUp end={s.value} duration={2200} />{s.unit}
              </span>
              <span className="mt-1 text-sm font-bold text-neutral-800 dark:text-white">{s.label}</span>
              <span className="text-xs text-neutral-400 dark:text-slate-500">{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 사례 목록 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">파트너 병원 성과사례</h2>
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm font-bold transition',
                    filter === cat
                      ? 'bg-brand text-white'
                      : 'bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950 hover:text-brand dark:hover:text-brand-400',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-neutral-400 dark:text-slate-500">해당 카테고리의 사례가 없습니다.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-point py-16 text-center">
        <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">우리 병원도 이런 성과를 원하신다면?</h2>
        <p className="mb-8 text-white/70">무료 진단 후 맞춤 마케팅 전략을 제안해 드립니다</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-brand hover:bg-neutral-100 transition active:scale-95">
          무료 상담 신청하기 →
        </Link>
      </section>
    </div>
  )
}
