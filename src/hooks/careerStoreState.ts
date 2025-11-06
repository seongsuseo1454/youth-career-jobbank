// src/hooks/careerStoreState.ts

import { create } from 'zustand';

// 1. 필요한 모든 상태를 포함하는 DoneFlags 인터페이스 정의
interface DoneFlags {
  interest: boolean;
  theme: boolean;
  experience: boolean;
  analysis: boolean;
}

// 2. StudentInfo 인터페이스 정의
interface StudentInfo {
  name: string;
  school: string;
  grade: string;
  klass: string;
  interest: string;
  goal: string;
}

// 3. 모든 상태를 하나로 통합한 CareerState 인터페이스 정의 (중복 제거)
interface CareerState {
  student: StudentInfo;
  jobPick: string;
  done: DoneFlags; // ✅ Guard 컴포넌트가 필요로 하는 done 플래그 통합

  // 액션 타입 정의
  setStudentInfo: (info: Partial<StudentInfo>) => void;
  setJobPick: (job: string) => void;
  // (필요하다면) setDone: (flag: keyof DoneFlags, value: boolean) => void;
}

// 4. Store 생성 및 초기 상태 정의
export const useCareerStateStore = create<CareerState>((set) => ({
  student: {
    name: '',
    school: '',
    grade: '',
    klass: '',
    interest: '',
    goal: '',
  },
  jobPick: '',
  
  // ✅ done 초기 상태 정의
  done: {
    interest: false,
    theme: false,
    experience: false,
    analysis: false,
  },

  // 액션 정의
  setStudentInfo: (info) => set((state) => ({ 
    student: { ...state.student, ...info } 
  })),
  
  setJobPick: (job) => set({ jobPick: job }),
}));
