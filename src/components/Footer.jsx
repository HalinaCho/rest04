import { Link } from 'react-router-dom'
import { company, nav } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 transition-colors duration-300">
      {/* 상단 — 로고 + 서비스 링크 + 연락처 */}
      <div className="mx-auto max-w-container px-4 py-16 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 브랜드 */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white font-extrabold text-lg">M</span>
              <span className="text-xl font-extrabold text-white">{company.name}</span>
            </div>
            <p className="mb-5 text-sm leading-6 text-slate-400">{company.tagline}</p>
            <p className="text-xs leading-6 text-slate-500">{company.description.slice(0, 80)}…</p>
          </div>

          {/* 서비스 링크 */}
          <div>
            <p className="mb-4 text-sm font-bold text-white">서비스</p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              {nav[1].children.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="hover:text-white transition">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <p className="mb-4 text-sm font-bold text-white">회사</p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              {nav[0].children.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="hover:text-white transition">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/results" className="hover:text-white transition">
                  성과사례
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="mb-4 text-sm font-bold text-white">연락처</p>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-slate-500">Tel</span>
                <a href={`tel:${company.phone}`} className="hover:text-white transition">
                  {company.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-500">Email</span>
                <a href={`mailto:${company.email}`} className="hover:text-white transition">
                  {company.email}
                </a>
              </li>
              <li className="text-xs leading-6 text-slate-500">{company.address}</li>
              <li className="text-xs text-slate-500">{company.hours}</li>
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-600 px-5 py-2.5 text-sm font-bold text-white hover:border-brand hover:bg-brand transition"
            >
              무료 상담 신청
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 하단 — 저작권·정책 */}
      <div className="border-t border-slate-800 px-4 py-6 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-slate-500">{company.copyright}</p>
          <ul className="flex gap-6 text-xs text-slate-500">
            {company.footerLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={['hover:text-white transition', l.strong ? 'font-bold text-slate-300' : ''].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
