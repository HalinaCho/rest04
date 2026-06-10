-- ============================================================
-- rest04 Supabase 초기 설정 SQL
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- ============================================================

-- 1. rest04_posts 테이블
CREATE TABLE IF NOT EXISTS rest04_posts (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  board_type  text NOT NULL CHECK (board_type IN ('notice', 'free', 'qna')),
  title       text NOT NULL,
  content     text NOT NULL,
  author_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT '익명',
  views       integer NOT NULL DEFAULT 0,
  is_pinned   boolean NOT NULL DEFAULT false,
  is_answered boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. rest04_comments 테이블
CREATE TABLE IF NOT EXISTS rest04_comments (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  post_id     bigint NOT NULL REFERENCES rest04_posts(id) ON DELETE CASCADE,
  author_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT '익명',
  content     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 3. RLS 활성화
ALTER TABLE rest04_posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE rest04_comments ENABLE ROW LEVEL SECURITY;

-- 4. rest04_posts 정책
CREATE POLICY "rest04_posts_select" ON rest04_posts
  FOR SELECT USING (true);

CREATE POLICY "rest04_posts_insert" ON rest04_posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "rest04_posts_update" ON rest04_posts
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "rest04_posts_delete" ON rest04_posts
  FOR DELETE USING (auth.uid() = author_id);

-- 5. rest04_comments 정책
CREATE POLICY "rest04_comments_select" ON rest04_comments
  FOR SELECT USING (true);

CREATE POLICY "rest04_comments_insert" ON rest04_comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "rest04_comments_update" ON rest04_comments
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "rest04_comments_delete" ON rest04_comments
  FOR DELETE USING (auth.uid() = author_id);

-- 6. 조회수 증가 함수 (RLS 우회 — SECURITY DEFINER)
--    파라미터명 충돌 방지를 위해 내부에서 $1 로 직접 참조
CREATE OR REPLACE FUNCTION rest04_increment_views(p_post_id bigint)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE rest04_posts SET views = views + 1 WHERE id = $1;
$$;
