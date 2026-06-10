import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Results from './pages/Results'
import Contact from './pages/Contact'
import SimplePage from './pages/SimplePage'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'
import BoardWrite from './pages/board/BoardWrite'

const VALID_BOARDS = ['notice', 'free', 'qna']

function BoardListRouter() {
  const { boardType } = useParams()
  if (!VALID_BOARDS.includes(boardType)) return <Navigate to="/board/notice" replace />
  return <BoardList boardType={boardType} />
}

export default function App() {
  return (
    <div className="min-w-[320px] bg-white dark:bg-slate-950 transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 회사소개 */}
          <Route path="/about" element={<Navigate to="/about/greetings" replace />} />
          <Route path="/about/:tab" element={<About />} />

          {/* 서비스 */}
          <Route path="/services" element={<Navigate to="/services/sns" replace />} />
          <Route path="/services/:category" element={<Services />} />

          {/* 성과사례 */}
          <Route path="/results" element={<Results />} />

          {/* 문의하기 */}
          <Route path="/contact" element={<Contact />} />

          {/* 인증 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 게시판 — :boardType이 write/:id/edit 보다 먼저 매칭되지 않도록 순서 주의 */}
          <Route path="/board/:boardType/write" element={<BoardWrite />} />
          <Route path="/board/:boardType/:id/edit" element={<BoardWrite />} />
          <Route path="/board/:boardType/:id" element={<BoardDetail />} />
          <Route path="/board/:boardType" element={<BoardListRouter />} />
          <Route path="/board" element={<Navigate to="/board/notice" replace />} />

          {/* 기타 */}
          <Route path="/blog" element={<SimplePage title="블로그" />} />
          <Route path="/privacy" element={<SimplePage title="개인정보처리방침" />} />
          <Route path="/terms" element={<SimplePage title="이용약관" />} />

          <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
