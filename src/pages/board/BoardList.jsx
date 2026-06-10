import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const BOARD_META = {
  notice: { label: '공지게시판', icon: '📢', desc: '공지사항 및 중요 안내를 확인하세요.' },
  free: { label: '자유게시판', icon: '💬', desc: '자유롭게 의견을 나누는 공간입니다.' },
  qna: { label: 'QnA 게시판', icon: '❓', desc: '궁금한 점을 질문하고 답변을 받으세요.' },
}

const PAGE_SIZE = 15

export default function BoardList({ boardType }) {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const meta = BOARD_META[boardType]

  // 공지게시판은 관리자만 글쓰기 가능
  const canWrite = user && (boardType !== 'notice' || isAdmin)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('rest04_posts')
      .select('*', { count: 'exact' })
      .eq('board_type', boardType)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

    if (search) {
      query = query.or(`title.ilike.%${search}%,author_name.ilike.%${search}%`)
    }

    const { data, count, error } = await query
    if (!error) {
      setPosts(data || [])
      setTotal(count || 0)
    }
    setLoading(false)
  }, [boardType, page, search])

  useEffect(() => {
    setPage(1)
  }, [boardType, search])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const formatDate = (iso) => {
    const d = new Date(iso)
    const now = new Date()
    const diff = (now - d) / 1000
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (d.toDateString() === now.toDateString()) return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-neutral-50 dark:bg-slate-950 py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{meta.icon}</span>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{meta.label}</h1>
            {boardType === 'notice' && (
              <span className="rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand dark:text-brand-400 text-xs font-bold px-2.5 py-1">
                관리자 전용 작성
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 dark:text-slate-400">{meta.desc}</p>
        </div>

        {/* 검색 + 글쓰기 */}
        <div className="flex items-center gap-3 mb-4">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="제목 또는 작성자 검색"
              className="flex-1 rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand transition"
            />
            <button
              type="submit"
              className="rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-700 transition"
            >
              검색
            </button>
          </form>
          {canWrite && (
            <Link
              to={`/board/${boardType}/write`}
              className="rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition whitespace-nowrap"
            >
              글쓰기
            </Link>
          )}
        </div>

        {/* 목록 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-100 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-[1fr_100px_80px_80px] border-b border-neutral-100 dark:border-slate-800 px-5 py-3 text-xs font-semibold text-neutral-400 dark:text-slate-500 uppercase tracking-wide">
            <span>제목</span>
            <span className="text-center">작성자</span>
            <span className="text-center">날짜</span>
            <span className="text-center">조회</span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-neutral-400 dark:text-slate-500">불러오는 중...</div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-neutral-400 dark:text-slate-500 text-sm">
                {search ? `'${search}'에 해당하는 게시글이 없습니다.` : '아직 게시글이 없습니다.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-50 dark:divide-slate-800">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/board/${boardType}/${post.id}`}
                    className="grid md:grid-cols-[1fr_100px_80px_80px] items-center gap-1 md:gap-0 px-5 py-4 hover:bg-neutral-50 dark:hover:bg-slate-800/50 transition group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {post.is_pinned && (
                        <span className="shrink-0 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand dark:text-brand-400 text-xs font-bold px-2 py-0.5">
                          공지
                        </span>
                      )}
                      {boardType === 'qna' && post.is_answered && (
                        <span className="shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-0.5">
                          답변완료
                        </span>
                      )}
                      <span className="truncate text-sm font-semibold text-neutral-800 dark:text-white group-hover:text-brand dark:group-hover:text-brand-400 transition">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 dark:text-slate-500 md:text-center truncate">{post.author_name}</span>
                    <span className="text-xs text-neutral-400 dark:text-slate-500 md:text-center">{formatDate(post.created_at)}</span>
                    <span className="text-xs text-neutral-400 dark:text-slate-500 md:text-center">{post.views}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 flex items-center justify-center rounded-lg text-sm text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page + i - 3
              if (p < 1 || p > totalPages) return null
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                    page === p
                      ? 'bg-brand text-white'
                      : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 w-9 flex items-center justify-center rounded-lg text-sm text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ›
            </button>
          </div>
        )}

        <p className="mt-3 text-center text-xs text-neutral-400 dark:text-slate-600">
          총 {total}개의 게시글
        </p>
      </div>
    </div>
  )
}
