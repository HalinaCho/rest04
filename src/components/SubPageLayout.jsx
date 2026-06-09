import { NavLink } from 'react-router-dom'

export default function SubPageLayout({ sectionTitle, tabs, headLabel, children, heroBg }) {
  return (
    <div>
      {/* 페이지 헤더 이미지 영역 */}
      <div
        className={[
          'relative flex items-center justify-center overflow-hidden',
          heroBg || 'bg-gradient-to-br from-brand-950 via-brand-900 to-brand',
        ].join(' ')}
        style={{ aspectRatio: '32/9', minHeight: 180 }}
      >
        {/* 배경 패턴 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)',
          }}
        />
        <div className="relative z-10 text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.3em] text-white/50 uppercase">{sectionTitle}</p>
          <h1 className="text-4xl font-extrabold text-white md:text-6xl">{headLabel}</h1>
        </div>
      </div>

      {/* 탭 네비 */}
      <div className="sticky top-[72px] z-30 bg-white dark:bg-slate-900 border-b border-neutral-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
          <ul className="flex overflow-x-auto">
            {tabs.map((t) => (
              <li key={t.to} className="shrink-0">
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition md:px-7 md:py-5',
                      isActive
                        ? 'border-brand text-brand dark:text-brand-400 dark:border-brand-400'
                        : 'border-transparent text-neutral-500 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400',
                    ].join(' ')
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 본문 */}
      <div className="py-16 md:py-24 dark:bg-slate-950 transition-colors">{children}</div>
    </div>
  )
}
