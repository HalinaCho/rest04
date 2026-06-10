import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', password2: '', username: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.username)
      setDone(true)
    } catch (err) {
      if (err.message.includes('already registered')) {
        setError('이미 사용 중인 이메일입니다.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-16 bg-neutral-50 dark:bg-slate-950">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-slate-800 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-3xl">✓</div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-2">가입 완료!</h2>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mb-6">
            입력하신 이메일로 인증 메일이 발송되었습니다.<br />
            메일 인증 후 로그인하실 수 있습니다.
          </p>
          <Link
            to="/login"
            className="inline-block rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 transition"
          >
            로그인 하러 가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-16 bg-neutral-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-slate-800">
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">회원가입</h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mb-8">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-brand dark:text-brand-400 font-semibold hover:underline">
              로그인
            </Link>
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">닉네임</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="사용할 닉네임을 입력하세요"
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">이메일</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">비밀번호</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="6자 이상 입력하세요"
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">비밀번호 확인</label>
              <input
                type="password"
                name="password2"
                value={form.password2}
                onChange={handleChange}
                required
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
