# MediOn — 병의원 온라인 마케팅 대행 사이트 개발일지

> **프로젝트**: rest04 · React + Vite + Tailwind CSS  
> **기간**: 2026-06-09  
> **참조**: [rest03](https://github.com/HalinaCho/rest03) 구조 및 컴포넌트 패턴 참고  
> **배포**: GitHub Pages (`/rest04/`)

---

## 1. 프로젝트 개요

병의원 온라인 마케팅 대행 회사 **MediOn(메디온)**의 공식 홈페이지를 제작한다.  
단순한 회사 소개가 아닌, **마케팅 성과를 수치와 그래프로 가시화**하여 잠재 고객(병의원 원장)의 신뢰를 즉각적으로 확보하는 것이 핵심 목표다.

### 사이트 구성 페이지
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 히어로 슬라이더, 핵심 수치, 서비스 미리보기, 성과사례, 프로세스, 블로그 |
| `/about/:tab` | About | CEO 인사말 / 비전·가치 / 팀 소개 / 연혁 |
| `/services/:category` | Services | SNS / 검색광고 / 콘텐츠 / 디스플레이 / 홈페이지 / 리뷰 |
| `/results` | Results | 성과사례 카드 (라인차트 + 비포·애프터 비교) |
| `/contact` | Contact | 상담 신청 폼 (유효성 검사 포함) |
| `/blog`, `/privacy`, `/terms` | SimplePage | 준비 중 페이지 |

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 18 + Vite 5 |
| 스타일링 | Tailwind CSS 3 (darkMode: `class`) |
| 라우팅 | React Router DOM v6 (HashRouter) |
| 애니메이션 | CSS `@keyframes` (fadeInUp, fadeIn) + requestAnimationFrame |
| 차트 | 순수 SVG (외부 라이브러리 없음) |
| 배포 | GitHub Pages (`gh-pages` 브랜치) |

---

## 3. 디자인 시스템

### 컬러 팔레트
| 역할 | 변수 | 값 | 용도 |
|------|------|----|------|
| 주 컬러 | `brand` | `#1e40af` (Blue 800) | 주요 버튼, 링크, 강조 |
| 포인트 컬러 | `point` | `#0891b2` (Cyan 600) | 보조 강조, 두 번째 차트 색 |
| 악센트 컬러 | `accent` | `#f59e0b` (Amber 500) | CTA 버튼, 경고, 중요 수치 |
| 성공 컬러 | `success` | `#10b981` (Emerald 500) | 증가 수치, 긍정 지표 |
| 배경(다크) | `slate-950` | `#020617` | 다크모드 주 배경 |

### 다크 모드 전략
- `ThemeContext`에서 `localStorage` + `prefers-color-scheme` 우선순위 관리
- `html.dark` 클래스 토글 방식 (Tailwind `darkMode: 'class'`)
- 헤더 우측 / 모바일 패널 내부에 **태양/달 아이콘 토글 버튼** 배치

### 타이포그래피
- **Pretendard** (구글 폰트 대체, system-ui 폴백)
- 제목: `font-extrabold`, 소제목: `font-bold`, 본문: `font-medium`

---

## 4. 주요 기능 구현

### 4-1. 히어로 슬라이더
- 3개 슬라이드 자동 전환 (5.5초 인터벌)
- `animKey` 상태를 바꿔 `animate-fadeInUp` CSS 애니메이션 재트리거
- 인디케이터(활성: amber 바, 비활성: 흰 점) + 좌우 화살표 버튼

### 4-2. CountUp 애니메이션
- `IntersectionObserver` (threshold 0.2) + `requestAnimationFrame`
- `easeOutCubic` 이징으로 자연스러운 숫자 올라가는 효과
- 뷰포트 진입 시 1회만 실행

### 4-3. 성과 라인차트 (SVG)
- `lineChart` 컴포넌트: `polyline` + 면적 `path` + 그라디언트 fill
- 마지막 포인트에 큰 원(r=4.5) 표시로 현재값 강조
- `viewBox` + `preserveAspectRatio="none"` → 반응형 크기

### 4-4. 비포·애프터 비교 막대
- 신규 환자 / 월 매출 / 누적 리뷰 3가지 지표 시각화
- 이전(회색) vs 이후(brand 블루) 수평 바 차트
- 퍼센트 증가율 우측 표시

### 4-5. 성과사례 탭 (환자 추이 / 비포·애프터 전환)
- `useState`로 탭 토글
- 같은 카드 내에서 라인차트 ↔ 비교 막대 전환

### 4-6. 서비스 상세 페이지
- URL 파라미터 `:category`로 동적 렌더링
- 각 서비스별 성과 수치 3종, 진행 프로세스 6단계, FAQ 2건
- 서비스별 고유 accent 컬러(pink/blue/green/purple/slate/amber)

### 4-7. 상담 신청 폼
- 필수 필드 유효성 검사 (이름, 병원명, 연락처, 관심 서비스, 개인정보 동의)
- 관심 서비스 멀티 선택 (토글 버튼)
- 월 예산 라디오 선택
- 제출 성공 시 감사 메시지 화면 전환

---

## 5. 반응형 (모바일 최적화)

| 브레이크포인트 | 주요 변경 사항 |
|----------------|---------------|
| 기본(~640px) | 1열 레이아웃, 히어로 수치 카드 숨김 |
| sm (640px~) | 서비스 카드 2열 |
| md (768px~) | 헤더 무료 상담 버튼 표시, 2열 그리드 |
| lg (1024px~) | 데스크탑 GNB 표시, 3열 그리드 |
| xl (1280px~) | 히어로 우측 플로팅 수치 카드 표시 |

---

## 6. 폴더 구조

```
rest04/
├── public/
├── src/
│   ├── components/
│   │   ├── CountUp.jsx          # 숫자 카운트업 애니메이션
│   │   ├── Footer.jsx           # 공통 푸터
│   │   ├── Header.jsx           # GNB + 모바일 메뉴 + 다크모드 토글
│   │   ├── ScrollToTop.jsx      # 라우트 변경 시 스크롤 상단
│   │   ├── ScrollToTopButton.jsx # 스크롤 투 탑 FAB
│   │   ├── SubPageLayout.jsx    # 서브페이지 헤더 + 탭 레이아웃
│   │   └── ThemeContext.jsx     # 다크/라이트 모드 Context
│   ├── data/
│   │   └── site.js              # 전역 데이터 (company, nav, services, caseStudies 등)
│   ├── pages/
│   │   ├── Home.jsx             # 메인 페이지
│   │   ├── About.jsx            # 회사소개 (탭: 인사말/비전/팀/연혁)
│   │   ├── Services.jsx         # 서비스 (탭: 6개 서비스)
│   │   ├── Results.jsx          # 성과사례 (차트 + 비교)
│   │   ├── Contact.jsx          # 무료 상담 신청 폼
│   │   └── SimplePage.jsx       # 준비 중 폴백 페이지
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 7. 성과 가시화 전략

마케팅 대행사의 핵심 설득 포인트인 **"실제 성과"**를 다음 3가지 방식으로 표현했다:

1. **CountUp 숫자 애니메이션**: 287%, 156%, 350+, 98% — 페이지 진입 시 숫자가 올라가며 주목도 극대화
2. **월별 환자 추이 라인차트**: 각 성과사례별 SVG 차트로 성장 곡선을 시각화
3. **비포·애프터 비교 막대**: 신규 환자 / 월 매출 / 리뷰 수를 전후 비교하여 구체적 개선폭 표현

---

## 8. 배포 절차

```bash
# 1. 의존성 설치
npm install

# 2. gh-pages 패키지 설치
npm install -D gh-pages

# 3. 빌드
npm run build

# 4. GitHub Pages 배포 (dist/ → gh-pages 브랜치)
npx gh-pages -d dist
```

배포 URL: `https://halinacho.github.io/rest04/`

---

## 9. 향후 개선 사항

- [ ] 블로그 페이지 실제 콘텐츠 연결
- [ ] 상담 폼 → 실제 서버(Formspree / EmailJS) 연동
- [ ] 구글 애널리틱스 이벤트 트래킹 추가
- [ ] 개인정보처리방침 / 이용약관 실제 내용 작성
- [ ] 네이버 / 카카오 채널 연동
