import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company } from '../data/site'
import { useTheme } from './ThemeContext'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { dark, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white dark:bg-slate-900 border-b border-neutral-100 dark:border-slate-800 transition-colors duration-300">
        <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-4 md:px-10 lg:px-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white font-extrabold text-lg">M</span>
            <span className="text-xl font-extrabold tracking-tight text-brand dark:text-brand-300">
              {company.name}
              <span className="ml-1 text-xs font-medium text-neutral-400 dark:text-slate-500 hidden sm:inline">
                병의원 마케팅
              </span>
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-6 text-sm font-semibold transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-brand dark:text-brand-400'
                        : 'text-neutral-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-400',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>

                {/* 각 탭 바로 아래 정렬되는 드롭다운 */}
                <div
                  className={[
                    'absolute left-0 top-full z-50 pt-0 transition-all duration-150',
                    hovered === item.label
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0',
                  ].join(' ')}
                >
                  <ul className="min-w-[160px] overflow-hidden rounded-b-xl border border-t-0 border-neutral-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          onClick={() => setHovered(null)}
                          className="block whitespace-nowrap px-5 py-2.5 text-sm text-neutral-600 dark:text-slate-400 transition hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand dark:hover:text-brand-400"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* 우측 버튼 영역 */}
          <div className="flex items-center gap-3">
            {/* 다크모드 토글 */}
            <button
              type="button"
              aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800 transition"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* 무료 상담 CTA (데스크탑) */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
            >
              무료 상담
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* 햄버거 (모바일) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-6 bg-neutral-700 dark:bg-slate-300 transition-all" />
              <span className="h-0.5 w-6 bg-neutral-700 dark:bg-slate-300 transition-all" />
              <span className="h-0.5 w-4 bg-neutral-700 dark:bg-slate-300 transition-all" />
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white dark:bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold text-brand dark:text-brand-300">{company.name}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="테마 전환"
                  onClick={toggle}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800"
                >
                  {dark ? <SunIcon /> : <MoonIcon />}
                </button>
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  className="text-2xl text-neutral-400 dark:text-slate-500 hover:text-neutral-700 dark:hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-neutral-100 dark:border-slate-800 pb-2">
                  <Link
                    to={item.to}
                    className="block py-2.5 text-base font-bold text-neutral-900 dark:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <ul className="flex flex-col">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block py-1.5 pl-3 text-sm text-neutral-500 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 block w-full rounded-full bg-accent py-3 text-center font-bold text-white hover:bg-accent-dark transition"
            >
              무료 상담 신청
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
