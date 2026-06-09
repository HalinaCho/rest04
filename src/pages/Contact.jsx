import { useState } from 'react'
import { company, services } from '../data/site'

const serviceOptions = services.map((s) => s.title)
const budgets = ['100만원 미만', '100~300만원', '300~500만원', '500만원 이상', '미정']

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    clinic: '',
    phone: '',
    email: '',
    services: [],
    budget: '',
    message: '',
    agree: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const toggleService = (s) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = '성함을 입력해 주세요'
    if (!form.clinic.trim()) e.clinic = '병원명을 입력해 주세요'
    if (!/^[0-9-]{9,13}$/.test(form.phone.replace(/-/g, ''))) e.phone = '올바른 연락처를 입력해 주세요'
    if (form.services.length === 0) e.services = '관심 서비스를 1개 이상 선택해 주세요'
    if (!form.agree) e.agree = '개인정보 수집에 동의해 주세요'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-24 text-center dark:bg-slate-950 transition-colors">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-5xl">✓</div>
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">상담 신청이 완료되었습니다!</h2>
        <p className="max-w-md text-neutral-500 dark:text-slate-400">
          <strong className="text-neutral-900 dark:text-white">{form.name}</strong> 원장님,<br />
          담당 전문가가 <strong>24시간 이내</strong>에 연락드리겠습니다.
        </p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setForm({ name:'',clinic:'',phone:'',email:'',services:[],budget:'',message:'',agree:false }); setErrors({}) }}
          className="btn-primary"
        >
          다시 신청하기
        </button>
      </div>
    )
  }

  return (
    <div className="dark:bg-slate-950 transition-colors">
      {/* 페이지 헤더 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand py-20 text-center">
        <div className="relative z-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">CONTACT</p>
          <h1 className="text-4xl font-extrabold text-white md:text-6xl">무료 상담 신청</h1>
          <p className="mt-4 text-white/60">24시간 내 전문 담당자가 연락드립니다</p>
        </div>
      </div>

      <div className="mx-auto max-w-container px-4 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* 연락처 정보 */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-6 text-2xl font-extrabold text-neutral-900 dark:text-white">연락처</h2>
              <ul className="flex flex-col gap-5">
                {[
                  { icon: '📞', label: '전화', value: company.phone, href: `tel:${company.phone}` },
                  { icon: '✉️', label: '이메일', value: company.email, href: `mailto:${company.email}` },
                  { icon: '💬', label: '카카오', value: company.kakao, href: '#' },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-xl">{c.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 dark:text-slate-500">{c.label}</p>
                      <a href={c.href} className="font-semibold text-neutral-900 dark:text-white hover:text-brand dark:hover:text-brand-400 transition">{c.value}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-50 dark:bg-slate-800 p-6">
              <p className="mb-2 text-sm font-bold text-neutral-500 dark:text-slate-400">주소</p>
              <p className="text-sm text-neutral-700 dark:text-slate-300 leading-6">{company.address}</p>
              <p className="mt-3 text-sm font-bold text-neutral-500 dark:text-slate-400">운영시간</p>
              <p className="text-sm text-neutral-700 dark:text-slate-300">{company.hours}</p>
            </div>

            {/* 빠른 응답 배지 */}
            <div className="rounded-2xl border border-success/30 bg-success/5 dark:bg-success/10 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-bold text-success">빠른 응답 보장</span>
              </div>
              <p className="text-xs leading-5 text-neutral-600 dark:text-slate-400">
                평일 기준 <strong>4시간 이내</strong> 담당자 배정,<br />
                <strong>24시간 이내</strong> 첫 상담 진행
              </p>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={submit} noValidate className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="mb-8 text-2xl font-extrabold text-neutral-900 dark:text-white">상담 신청서</h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* 이름 */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-neutral-700 dark:text-slate-300">
                    원장님 성함 <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="홍길동"
                    className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* 병원명 */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-neutral-700 dark:text-slate-300">
                    병원명 <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.clinic}
                    onChange={(e) => set('clinic', e.target.value)}
                    placeholder="○○ 피부과의원"
                    className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                  />
                  {errors.clinic && <p className="mt-1 text-xs text-red-500">{errors.clinic}</p>}
                </div>

                {/* 연락처 */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-neutral-700 dark:text-slate-300">
                    연락처 <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* 이메일 */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-neutral-700 dark:text-slate-300">이메일</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="example@hospital.com"
                    className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                  />
                </div>
              </div>

              {/* 관심 서비스 */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-slate-300">
                  관심 서비스 <span className="text-accent">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={[
                        'rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                        form.services.includes(s)
                          ? 'border-brand bg-brand text-white'
                          : 'border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-600 dark:text-slate-300 hover:border-brand hover:text-brand dark:hover:text-brand-400',
                      ].join(' ')}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="mt-1 text-xs text-red-500">{errors.services}</p>}
              </div>

              {/* 예산 */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-slate-300">월 예산 (선택)</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => set('budget', b)}
                      className={[
                        'rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                        form.budget === b
                          ? 'border-point bg-point text-white'
                          : 'border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-600 dark:text-slate-300 hover:border-point hover:text-point',
                      ].join(' ')}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* 메시지 */}
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-bold text-neutral-700 dark:text-slate-300">문의 내용 (선택)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  rows={4}
                  placeholder="현재 마케팅 상황, 목표, 궁금한 점 등을 자유롭게 작성해 주세요"
                  className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none transition"
                />
              </div>

              {/* 동의 */}
              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => set('agree', e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand accent-brand"
                  />
                  <span className="text-sm text-neutral-600 dark:text-slate-400">
                    <a href="/privacy" className="font-bold text-brand dark:text-brand-400 underline underline-offset-2">개인정보처리방침</a>에 동의합니다. 수집된 정보는 상담 목적으로만 사용됩니다.
                    <span className="text-accent"> *</span>
                  </span>
                </label>
                {errors.agree && <p className="mt-1 text-xs text-red-500">{errors.agree}</p>}
              </div>

              <button type="submit" className="btn-primary mt-8 w-full justify-center py-4 text-base">
                무료 상담 신청하기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
