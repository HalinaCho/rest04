-- 앱 설정 테이블 (API 키 등 저장)
CREATE TABLE IF NOT EXISTS app_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- RLS 활성화
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자만 읽기 허용
CREATE POLICY "Authenticated users can read app_config"
  ON app_config FOR SELECT
  TO authenticated
  USING (true);

-- Solar API 키 삽입 (값은 실제 키로 교체)
-- INSERT INTO app_config (key, value, description)
-- VALUES ('solar_api_key', 'up_xxxxxxxxxxxxxxxxxxxxxxxx', 'Upstage Solar API Key');
