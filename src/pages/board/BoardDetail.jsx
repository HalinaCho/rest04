import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const BOARD_LABEL = { notice: '공지게시판', free: '자유게시판', qna: 'QnA 게시판' }

export default function BoardDetail() {
  const { boardType, id } = useParams()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    const { data } = await supabase.from('rest04_posts').select('*').eq('id', id).single()
    if (data) {
      setPost(data)
      await supabase.rpc('rest04_increment_views', { p_post_id: Number(id) })
    } else {
      navigate(`/board/${boardType}`)
    }
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from('rest04_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || !user) return
    setSubmitting(true)
    const authorName = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || '익명'
    const { error } = await supabase.from('rest04_comments').insert({
      post_id: Number(id),
      author_id: user.id,
      author_name: authorName,
      content: commentText.trim(),
    })
    if (!error) {
      setCommentText('')
      await fetchComments()
    }
    setSubmitting(false)
  }

  const handleDeleteComment = async (commentId) => {
    await supabase.from('rest04_comments').delete().eq('id', commentId)
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  const handleDeletePost = async () => {
    await supabase.from('rest04_posts').delete().eq('id', id)
    navigate(`/board/${boardType}`)
  }

  const handleTogglePin = async () => {
    const { error } = await supabase.from('rest04_posts').update({ is_pinned: !post.is_pinned }).eq('id', id)
    if (!error) setPost((p) => ({ ...p, is_pinned: !p.is_pinned }))
  }

  const handleToggleAnswer = async () => {
    const { error } = await supabase.from('rest04_posts').update({ is_answered: !post.is_answered }).eq('id', id)
    if (!error) setPost((p) => ({ ...p, is_answered: !p.is_answered }))
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-neutral-50 dark:bg-slate-950">
        <p className="text-sm text-neutral-400 dark:text-slate-500">불러오는 중...</p>
      </div>
    )
  }

  if (!post) return null

  const isAuthor = user && user.id === post.author_id
  const canDelete = isAuthor || isAdmin
  const canEdit = isAuthor

  return (
    <div className="min-h-[calc(100vh-72px)] bg-neutral-50 dark:bg-slate-950 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        {/* 상단 네비 */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-slate-500 mb-6">
          <Link to={`/board/${boardType}`} className="hover:text-brand dark:hover:text-brand-400 transition">
            {BOARD_LABEL[boardType]}
          </Link>
          <span>›</span>
          <span className="truncate text-neutral-600 dark:text-slate-300">{post.title}</span>
        </div>

        {/* 본문 카드 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-100 dark:border-slate-800 shadow-sm overflow-hidden mb-4">
          <div className="px-6 pt-6 pb-4 border-b border-neutral-50 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.is_pinned && (
                <span className="rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand dark:text-brand-400 text-xs font-bold px-2.5 py-1">공지</span>
              )}
              {boardType === 'qna' && (
                <span className={`rounded-full text-xs font-bold px-2.5 py-1 ${post.is_answered ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                  {post.is_answered ? '답변완료' : '미답변'}
                </span>
              )}
              {isAdmin && (
                <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold px-2.5 py-1">관리자</span>
              )}
            </div>
            <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-3">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 dark:text-slate-500">
              <span>{post.author_name}</span>
              <span>{formatDate(post.created_at)}</span>
              <span>조회 {post.views}</span>
            </div>
          </div>

          <div className="px-6 py-8 min-h-[200px]">
            <div className="text-sm leading-relaxed text-neutral-700 dark:text-slate-300 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="px-6 pb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/board/${boardType}`}
              className="rounded-xl border border-neutral-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 transition"
            >
              ← 목록으로
            </Link>
            <div className="flex flex-wrap gap-2">
              {/* 관리자 전용: 상단 고정 토글 */}
              {isAdmin && (
                <button
                  onClick={handleTogglePin}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    post.is_pinned
                      ? 'bg-brand-100 dark:bg-brand-900/30 text-brand dark:text-brand-400 hover:bg-brand-200'
                      : 'border border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {post.is_pinned ? '📌 고정 해제' : '📌 상단 고정'}
                </button>
              )}
              {/* QnA 답변 상태 토글 — 작성자 또는 관리자 */}
              {boardType === 'qna' && (isAuthor || isAdmin) && (
                <button
                  onClick={handleToggleAnswer}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    post.is_answered
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200'
                  }`}
                >
                  {post.is_answered ? '미답변으로 변경' : '답변완료 표시'}
                </button>
              )}
              {/* 수정 — 본인만 */}
              {canEdit && (
                <Link
                  to={`/board/${boardType}/${id}/edit`}
                  className="rounded-xl border border-neutral-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 transition"
                >
                  수정
                </Link>
              )}
              {/* 삭제 — 본인 또는 관리자 */}
              {canDelete && (
                deleteConfirm ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-red-500">삭제하시겠습니까?</span>
                    <button
                      onClick={handleDeletePost}
                      className="rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-600 transition"
                    >
                      확인
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="rounded-xl border border-neutral-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 transition"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="rounded-xl border border-red-200 dark:border-red-800 px-4 py-2 text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    삭제
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-50 dark:border-slate-800">
            <h2 className="font-bold text-neutral-800 dark:text-white text-sm">
              댓글 <span className="text-brand dark:text-brand-400">{comments.length}</span>
            </h2>
          </div>

          {comments.length > 0 ? (
            <ul className="divide-y divide-neutral-50 dark:divide-slate-800">
              {comments.map((c) => (
                <li key={c.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-neutral-800 dark:text-white">{c.author_name}</span>
                        <span className="text-xs text-neutral-400 dark:text-slate-500">{formatDate(c.created_at)}</span>
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-slate-300 whitespace-pre-wrap">{c.content}</p>
                    </div>
                    {/* 댓글 삭제 — 본인 또는 관리자 */}
                    {user && (user.id === c.author_id || isAdmin) && (
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="shrink-0 text-xs text-neutral-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-center text-sm text-neutral-400 dark:text-slate-500">
              첫 번째 댓글을 남겨보세요.
            </div>
          )}

          <div className="px-6 py-4 border-t border-neutral-50 dark:border-slate-800">
            {user ? (
              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-400 transition"
                />
                <button
                  type="submit"
                  disabled={submitting || !commentText.trim()}
                  className="self-end rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  등록
                </button>
              </form>
            ) : (
              <p className="text-center text-sm text-neutral-400 dark:text-slate-500">
                <Link to="/login" className="text-brand dark:text-brand-400 font-semibold hover:underline">로그인</Link>
                하시면 댓글을 작성할 수 있습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
