-- ============================================================
-- rest04 관리자 권한 설정 SQL
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- ============================================================

-- 1. 사용자 프로필(역할) 테이블
CREATE TABLE IF NOT EXISTS rest04_profiles (
  id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role  text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rest04_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rest04_profiles_select" ON rest04_profiles
  FOR SELECT USING (true);

CREATE POLICY "rest04_profiles_insert" ON rest04_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "rest04_profiles_update" ON rest04_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. 신규 가입 시 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION rest04_handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO rest04_profiles (id, role)
  VALUES (new.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS rest04_on_auth_user_created ON auth.users;
CREATE TRIGGER rest04_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION rest04_handle_new_user();

-- 3. 관리자 여부 확인 헬퍼 함수
CREATE OR REPLACE FUNCTION rest04_is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM rest04_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 4. posts 삭제 정책 — 본인 또는 관리자
DROP POLICY IF EXISTS "rest04_posts_delete" ON rest04_posts;
CREATE POLICY "rest04_posts_delete" ON rest04_posts
  FOR DELETE USING (auth.uid() = author_id OR rest04_is_admin());

-- 5. posts 수정 정책 — 본인 또는 관리자 (is_pinned 포함)
DROP POLICY IF EXISTS "rest04_posts_update" ON rest04_posts;
CREATE POLICY "rest04_posts_update" ON rest04_posts
  FOR UPDATE
  USING (auth.uid() = author_id OR rest04_is_admin())
  WITH CHECK (auth.uid() = author_id OR rest04_is_admin());

-- 6. comments 삭제 정책 — 본인 또는 관리자
DROP POLICY IF EXISTS "rest04_comments_delete" ON rest04_comments;
CREATE POLICY "rest04_comments_delete" ON rest04_comments
  FOR DELETE USING (auth.uid() = author_id OR rest04_is_admin());

-- 7. 기존 가입자 프로필 일괄 생성 (이미 가입한 계정 대응)
INSERT INTO rest04_profiles (id, role)
SELECT id, 'user' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 관리자 계정 지정 — 아래 이메일을 실제 관리자 이메일로 변경 후 실행
-- ============================================================
-- UPDATE rest04_profiles
-- SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = '관리자이메일@example.com');
