import { Link } from 'react-router-dom'

export default function SimplePage({ title }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white md:text-5xl">{title}</h1>
      <p className="text-neutral-500 dark:text-slate-400">준비 중인 페이지입니다.</p>
      <Link to="/" className="btn-primary">홈으로 돌아가기</Link>
    </div>
  )
}
