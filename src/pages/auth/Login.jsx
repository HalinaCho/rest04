import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.755 1.676 5.17 4.2 6.6l-.9 3.3c-.1.3.2.55.47.4L9.9 18.9A11.5 11.5 0 0 0 12 19.2c5.523 0 10-3.477 10-7.8S17.523 3 12 3Z" />
    </svg>
  )
}

export default function Login() {
  const { signIn, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate(-1)
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKakao = async () => {
    setError('')
    try {
      await signInWithKakao()
    } catch (err) {
      setError('카카오 로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-16 bg-neutral-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-slate-800">
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">로그인</h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mb-8">
            계정이 없으신가요?{' '}
            <Link to="/register" className="text-brand dark:text-brand-400 font-semibold hover:underline">
              회원가입
            </Link>
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">
                이메일
              </label>
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
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="비밀번호를 입력하세요"
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-slate-900 px-3 text-xs text-neutral-400 dark:text-slate-500">또는</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleKakao}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3 text-sm font-bold text-[#191919] hover:bg-[#fada00] transition"
          >
            <KakaoIcon />
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  )
}
