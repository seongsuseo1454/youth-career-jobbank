// Next.js App Router의 루트 레이아웃 파일입니다.
// 이 파일은 모든 페이지를 감싸는 전역 구조와 기능을 정의합니다.

// Firebase 설정에 필요한 전역 변수를 안전하게 로드합니다.
// 이 변수들은 캔버스 환경에서 자동으로 제공됩니다.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Next.js 메타데이터 설정
export const metadata = {
  title: '통합 포지션 관리 시스템',
  description: '서버-클라이언트 분리 기반 Next.js 앱',
};

import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Lucide React 아이콘 라이브러리 (Next.js에 적합)
import { User, Briefcase, Users, Layers, Settings, Home } from 'lucide-react';

// 1. Context 생성: 앱의 전역 상태 (DB, Auth, User ID)를 저장합니다.
const FirebaseContext = createContext({
  db: null,
  auth: null,
  userId: null,
  appId: appId,
  isAuthReady: false,
});

const pages = [
  { path: '/', label: '홈', icon: Home },
  { path: '/advisor', label: '고문', icon: User },
  { path: '/counselor', label: '상담사', icon: Users },
  { path: '/manager', label: '매니저', icon: Briefcase },
  { path: '/staff', label: '스태프', icon: Layers },
  { path: '/trainee', label: '연수생', icon: Settings },
];

// Context를 사용하기 위한 훅
export const useFirebase = () => useContext(FirebaseContext);

// Navigation 컴포넌트
const Navigation = ({ userId }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <nav className="bg-gray-800 p-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <div className="text-white text-xl font-bold tracking-wider">
          통합 포지션 관리 ({appId.substring(0, 8)})
        </div>
        <div className="flex space-x-2 md:space-x-4 mt-2 md:mt-0 overflow-x-auto pb-1">
          {pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === page.path
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              aria-current={currentPath === page.path ? 'page' : undefined}
            >
              <page.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{page.label}</span>
            </a>
          ))}
        </div>
        <div className="text-sm text-gray-400 mt-2 md:mt-0 truncate max-w-[150px] sm:max-w-full">
          사용자 ID: {userId || '인증 중...'}
        </div>
      </div>
    </nav>
  );
};

// 2. Main Layout Component
export default function RootLayout({ children }) {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState(null);

  // 3. Firebase 초기화 및 인증 로직
  useEffect(() => {
    if (!firebaseConfig) {
      setError("Firebase 설정 정보가 없습니다.");
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const newAuth = getAuth(app);
      const newDb = getFirestore(app);

      setAuth(newAuth);
      setDb(newDb);

      // 사용자 인증 상태 변화 리스너
      const unsubscribe = onAuthStateChanged(newAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
          // __initial_auth_token이 없으면 익명 로그인 시도
          if (initialAuthToken) {
            await signInWithCustomToken(newAuth, initialAuthToken)
              .catch(e => {
                console.error("Custom Token 로그인 실패:", e);
                setError("인증 토큰 오류. 익명 로그인 시도.");
                return signInAnonymously(newAuth);
              });
          } else {
            // 토큰이 없으면 익명 로그인
            await signInAnonymously(newAuth).catch(e => {
              console.error("익명 로그인 실패:", e);
              setError("익명 로그인 실패.");
            });
          }
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe(); // 클린업 함수
    } catch (e) {
      console.error("Firebase 초기화 오류:", e);
      setError("Firebase 초기화 중 오류 발생.");
    }
  }, []); // 마운트 시 한 번만 실행

  if (error) {
    return (
      <>
        {/* Tailwind CSS 및 폰트 설정을 body 컨텐츠 내에 배치 */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
        `}</style>
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4 border-red-500">
            <h1 className="text-xl font-bold text-red-600 mb-2">오류 발생</h1>
            <p className="text-gray-700">{error}</p>
            <p className="text-sm mt-4 text-gray-500">콘솔을 확인하여 자세한 정보를 확인하세요.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Tailwind CSS 및 폰트 설정을 body 컨텐츠 내에 배치 */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
      `}</style>
      <FirebaseContext.Provider value={{ db, auth, userId, appId, isAuthReady }}>
        <div className="min-h-screen flex flex-col">
          <Navigation userId={userId} />
          <main className="flex-grow p-4 md:p-8">
            {/* 인증이 준비되면 자식 컴포넌트(페이지)를 렌더링합니다. */}
            {isAuthReady && children}
            {!isAuthReady && (
              <div className="flex justify-center items-center h-full">
                <div className="text-gray-500 p-6 rounded-xl shadow-lg bg-white">
                  <svg className="animate-spin h-5 w-5 mr-3 inline text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>인증 정보를 로드하는 중...</span>
                </div>
              </div>
            )}
          </main>
          <footer className="bg-gray-200 text-center text-gray-600 p-3 text-xs">
            Next.js & React 기반 | 앱 ID: {appId}
          </footer>
        </div>
      </FirebaseContext.Provider>
    </>
  );
}