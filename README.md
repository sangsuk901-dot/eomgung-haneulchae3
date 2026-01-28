# 엄궁 1구역 하늘채 - 프리미엄 청약 안내 페이지

본 프로젝트는 부산 사상구 **엄궁 1구역 하늘채** 아파트의 사업 정보 제공 및 예비 청약자들을 위한 관심고객 등록 서비스를 제공하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **관심고객 등록 시스템**: Google Apps Script와 연동하여 실시간으로 고객 정보를 수집하며, 등록 완료 시 신세계 상품권 이벤트 안내를 제공합니다.
- **프리미엄 게시판**: 
  - 관리자 전용 공지사항 상단 고정 기능
  - 일반 방문자를 위한 자유 게시판 및 7개 단위 페이지네이션
  - 비밀번호 기반의 게시글/답글 삭제 기능
  - 답글(댓글) 시스템 지원
- **AI 워크플로우 제너레이터**: Google Gemini 3 모델을 활용하여 비즈니스 요구사항에 맞는 자동화 워크플로우 설계 기능을 제공합니다.
- **관리자 모드**: 특정 비밀번호(`5464`) 인증을 통해 관리자 권한을 획득하고 게시판을 관리할 수 있습니다.
- **반응형 UI/UX**: Tailwind CSS와 모던한 애니메이션(Reveal, Floating Blobs)을 사용하여 모바일과 데스크톱 모두에서 프리미엄한 사용자 경험을 제공합니다.

## 🛠 기술 스택

- **Frontend**: React (v19), Tailwind CSS
- **AI Engine**: @google/genai (Gemini 3 Pro)
- **Icons**: Iconify-icon
- **Data Persistence**: LocalStorage (브라우저 내 게시글 보관), Google Sheets API (관심고객 데이터 전송)

## 🚀 설치 및 실행

### 1. 환경 설정
프로젝트 내 AI 기능을 사용하기 위해 Gemini API 키가 필요합니다. 깃허브 배포 시 환경 변수(Environment Variables)에 등록하세요.
```env
API_KEY=여러분의_구글_제미나이_API_KEY
```

### 2. 실행 방법
본 프로젝트는 ESM(ES Modules) 방식을 사용하므로 복잡한 빌드 과정 없이 현대적인 브라우저에서 즉시 실행 가능하며, Vercel이나 GitHub Pages를 통해 간편하게 배포할 수 있습니다.

## 📁 프로젝트 구조

- `index.html`: 메인 엔트리 HTML 및 라이브러리 로드
- `index.tsx`: React 애플리케이션 루트 마운트
- `App.tsx`: 전체 레이아웃 및 관리자 인증 로직
- `components/`: 기능별 UI 컴포넌트 (BulletinBoard, QualificationCheck 등)
- `services/`: Gemini API 통신 로직
- `types.ts`: 전역 TypeScript 타입 정의

## 📝 라이선스
본 프로젝트는 엄궁 1구역 하늘채 청약 안내를 위한 목적으로 제작되었습니다.
