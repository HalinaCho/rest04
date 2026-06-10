import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const BOARD_LABEL = { notice: '공지게시판', free: '자유게시판', qna: 'QnA 게시판' }

export default function BoardWrite() {
  const { boardType, id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState({ title: '', content: '', is_pinned: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (isEdit) {
      supabase.from('rest04_posts').select('*').eq('id', id).single().then(({ data }) => {
        if (data) {
          if (data.author_id !== user.id) {
            navigate(`/board/${boardType}/${id}`)
            return
          }
          setForm({ title: data.title, content: data.content, is_pinned: data.is_pinned })
        }
      })
    }
  }, [user, id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) { setError('제목을 입력하세요.'); return }
    if (!form.content.trim()) { setError('내용을 입력하세요.'); return }
    setLoading(true)

    const authorName = user.user_metadata?.username || user.email?.split('@')[0] || '익명'

    if (isEdit) {
      const { error: err } = await supabase.from('rest04_posts').update({
        title: form.title.trim(),
        content: form.content.trim(),
        is_pinned: form.is_pinned,
        updated_at: new Date().toISOString(),
      }).eq('id', id)
      if (err) { setError(err.message); setLoading(false); return }
      navigate(`/board/${boardType}/${id}`)
    } else {
      const { data, error: err } = await supabase.from('rest04_posts').insert({
        board_type: boardType,
        title: form.title.trim(),
        content: form.content.trim(),
        author_id: user.id,
        author_name: authorName,
        is_pinned: form.is_pinned,
      }).select().single()
      if (err) { setError(err.message); setLoading(false); return }
      navigate(`/board/${boardType}/${data.id}`)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-neutral-50 dark:bg-slate-950 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-1">
          {isEdit ? '글 수정' : '글쓰기'}
        </h1>
        <p className="text-sm text-neutral-400 dark:text-slate-500 mb-6">{BOARD_LABEL[boardType]}</p>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-100 dark:border-slate-800 shadow-sm p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">제목</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
                maxLength={100}
                className="w-full rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-slate-300 mb-1.5">내용</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="내용을 입력하세요"
                rows={14}
                className="w-full resize-y rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
              />
            </div>

            {boardType === 'notice' && (
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="is_pinned"
                  checked={form.is_pinned}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand"
                />
                <span className="text-sm font-semibold text-neutral-700 dark:text-slate-300">상단 고정 공지</span>
              </label>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-neutral-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 transition"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '처리 중...' : isEdit ? '수정 완료' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
