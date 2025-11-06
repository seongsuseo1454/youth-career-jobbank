// [제목] 자기소개서 표준 입력 폼(이름→학교→학년/반→관심→목표)
'use client';
import React, { useState } from 'react';
import { useCareerStateStore } from '@/hooks/careerStoreState';
import { useRouter } from 'next/navigation';
import { R } from '@/lib/routes';

export default function IntroForm() {
    // 💥 오류 수정: 중복된 함수 정의를 제거하고 코드를 통합했습니다.
    const student = useCareerStateStore(state => state.student);
    const setStudentInfo = useCareerStateStore(state => state.setStudentInfo); // ✅ Store 액션 함수 가져오기

    // 💡 편의를 위해 Store 액션 함수 이름을 updateStudent로 변경
    // 이 방식이 코드를 덜 수정하게 해줍니다.
    const updateStudent = setStudentInfo;

    const [step, setStep] = useState(1);
    const r = useRouter();

    const next = () => setStep(s => Math.min(5, s + 1));
    const prev = () => setStep(s => Math.max(1, s - 1));

    // 💡 Store Interface에 'goal' 속성이 있다고 가정하고 valid 로직 수정
    const valid = student.name
        && student.school && student.grade
        && student.klass && student.interest
        && student.goal
        ;

    const submit = (e: React.FormEvent) => { 
        e.preventDefault(); 
        if (!valid) return; 
        r.push(R.career); 
    };

    return (
        <section className="mt-6 rounded-2xl border p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-2">자기소개서 (표준 입력)</h2>
            <form onSubmit={submit} className="space-y-3">
                {/* 💥 오류 수정: v=>updateStudent({key:v}) 로 모두 수정했습니다. */}
                {step === 1 && <Field label="이름" value={student.name} onChange={v => updateStudent({ name: v })} placeholder="예: 김민지" autoFocus />}
                {step === 2 && <Field label="학교명" value={student.school} onChange={v => updateStudent({ school: v })} placeholder="예: 패스뷰중학교" />}
                {step === 3 && (
                    <div className="grid grid-cols-2 gap-2">
                        <Field label="학년" value={student.grade} onChange={v => updateStudent({ grade: v })} placeholder="예: 2학년" />
                        <Field label="반" value={student.klass} onChange={v => updateStudent({ klass: v })} placeholder="예: 3반" />
                    </div>
                )}
                {step === 4 && <Field label="관심분야" value={student.interest} onChange={v => updateStudent({ interest: v })} placeholder="예: 우주/항공, 로봇, 디자인 등" />}
                {step === 5 && <Field label="목표" value={student.goal} onChange={v => updateStudent({ goal: v })} placeholder="예: 드론 설계 전문가가 되고 싶어요" />}

                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">Step {step} / 5</span>
                    <div className="flex gap-2">
                        <button type="button" onClick={prev} disabled={step === 1} className="px-3 py-2 rounded border disabled:opacity-40">이전</button>
                        {step < 5
                            ? <button type="button" onClick={next} className="px-3 py-2 rounded bg-blue-600 text-white">다음</button>
                            : <button type="submit" disabled={!valid} className={`px-3 py-2 rounded ${valid ? 'bg-emerald-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}>입력 완료 → 관심분야</button>}
                    </div>
                </div>
            </form>
        </section>
    );
}

// 💡 Field 컴포넌트는 그대로 유지됩니다.
function Field({ label, value, onChange, placeholder, autoFocus }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean; }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium mb-1">{label}</span>
            <input className="w-full border rounded px-3 py-2" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus} />
        </label>
    );
}
