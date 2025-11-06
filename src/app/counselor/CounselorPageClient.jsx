// 파일 경로: app/counselor/CounselorPageClient.jsx
'use client'; 

import React, { useState } from 'react';
// 상담사 정보를 위한 목업 데이터
const mockCounselors = [
    { id: 1, name: "김현진 상담사", expertise: "진로 재설정", rating: 4.8, available: true },
    { id: 2, name: "이수미 코치", expertise: "직무 적성", rating: 4.5, available: false },
    { id: 3, name: "박철민 전문가", expertise: "취업 면접", rating: 4.9, available: true },
];

const CounselorPageClient = () => { // 컴포넌트 이름도 변경
    const [filter, setFilter] = useState('all');
    
    // 필터링 로직 (URL 파라미터 대신 로컬 상태 사용)
    const filteredCounselors = mockCounselors.filter(c => {
        if (filter === 'available') return c.available;
        if (filter === 'top') return c.rating >= 4.7;
        return true;
    });

    return (
        <div className="min-h-screen bg-white p-4 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">상담 전문가 찾기</h1>
                
                {/* 필터 섹션 */}
                <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
                    <button 
                        onClick={() => setFilter('all')} 
                        className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${filter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                    >
                        전체 상담사
                    </button>
                    <button 
                        onClick={() => setFilter('available')} 
                        className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${filter === 'available' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'}`}
                    >
                        ✅ 예약 가능
                    </button>
                    <button 
                        onClick={() => setFilter('top')} 
                        className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${filter === 'top' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-200' : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'}`}
                    >
                        ⭐ 최고 평점
                    </button>
                </div>
                
                {/* 상담사 목록 */}
                <div className="space-y-6">
                    {filteredCounselors.map(c => (
                        <div key={c.id} className="p-6 border rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:shadow-xl transition duration-300">
                            <div className="flex-grow">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    {c.name}
                                    <span className={`ml-3 text-xs font-semibold px-2 py-0.5 rounded-full ${c.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {c.available ? 'AVAILABLE' : 'BUSY'}
                                    </span>
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">전문 분야: <span className="font-semibold text-indigo-700">{c.expertise}</span></p>
                                <p className="text-sm text-yellow-600 flex items-center mt-1">
                                    <svg className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.51l6.561-.955L10 1l2.952 5.555 6.561.955-4.758 4.035 1.123 6.545z"/></svg>
                                    {c.rating} / 5.0
                                </p>
                            </div>
                            <button 
                                disabled={!c.available}
                                className={`mt-4 md:mt-0 px-6 py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md ${c.available ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-75'}`}
                            >
                                {c.available ? '예약하기' : '상담 중 (예약 불가)'}
                            </button>
                        </div>
                    ))}
                    {filteredCounselors.length === 0 && (
                        <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                            <p className="text-lg text-gray-500">현재 조건에 맞는 상담사가 없습니다. 필터를 조정해 보세요.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CounselorPageClient;