// src/lib/routes.ts

export const R = {
  home: '/',
  career: '/career',
  video: '/video',
  careerPath: '/career/path',
  careerSelection: '/career/selection',
  consultantSession: '/career/consultant/session',
  
  // ✅ Guard 컴포넌트에서 함수처럼 호출될 것을 대비하여 함수로 정의 (예상 경로)
  experience: (param: string) => `/career/experience/${param}`, 
  
  // 💡 Guard 컴포넌트에서 사용된 경로도 추가 (예상 경로)
  interests: '/career/interests',
  themes: '/career/themes',
  analysis: '/career/analysis', 
};

export default R;