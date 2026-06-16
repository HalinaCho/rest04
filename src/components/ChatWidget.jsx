import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { sendMessage } from '../lib/chatApi'

const SYSTEM_PROMPT = {
  role: 'system',
  content: '당신은 친절한 AI 어시스턴트입니다. 사용자의 질문에 한국어로 명확하고 간결하게 답변하세요.',
}

export default function ChatWidget() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 무엇이든 물어보세요 😊' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError(null)

    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)

    try {
      const history = [SYSTEM_PROMPT, ...next.slice(-10)]
      const reply = await sendMessage(history)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* 채팅창 */}
      {open && (
        <div className="w-80 sm:w-96 h-[520px] flex flex-col rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 dark:bg-blue-700">
            <div className="flex items-center gap-2">
              <span className="text-white text-lg">🤖</span>
              <span className="text-white font-semibold text-sm">AI 어시스턴트</span>
              <span className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              ✕
            </button>
          </div>

          {/* 본문 */}
          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="text-4xl">🔒</span>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                채팅은 로그인 후 이용하실 수 있습니다.
              </p>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                로그인하기
              </Link>
            </div>
          ) : (
            <>
              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl rounded-bl-sm">
                      <span className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}
                {error && (
                  <p className="text-center text-xs text-red-500">{error}</p>
                )}
                <div ref={bottomRef} />
              </div>

              {/* 입력창 */}
              <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 resize-none text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-colors"
                >
                  ↑
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label="AI 채팅 열기"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
