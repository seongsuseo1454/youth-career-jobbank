// 파일 경로: app/counselor/CounselorClient.js
'use client'; 

import React, { useState } from 'react';

const mockCounselors = [
    { id: 1, name: "김현진 상담사", expertise: "진로 재설정", rating: 4.8, available: true },
    { id: 2, name: "이수미 코치", expertise: "직무 적성", rating: 4.5, available: false },
    { id: 3, name: "박철민 전문가", expertise: "취업 면접", rating: 4.9, available: true },
];

const CounselorClient = () => {
    const [filter, setFilter] = useState('all');
    
    const filteredCounselors = mockCounselors.filter(c => {
        if (filter === 'available') return c.available;
        if (filter === 'top') return c.rating >= 4.7;
        return true;
    });

    return (
        <div className="min-h-screen bg-white p-4 md:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">상담 전문가 찾기</h1>
                
                {/* 필터 섹션 */}
                <div className="flex space-x-4 mb-8">
                    <button 
                        onClick={() => setFilter('all')} 
                        className={`px-4 py-2 rounded-full font-medium transition ${filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        전체 보기
                    </button>
                    <button 
                        onClick={() => setFilter('available')} 
                        className={`px-4 py-2 rounded-full font-medium transition ${filter === 'available' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        예약 가능
                    </button>
                    <button 
                        onClick={() => setFilter('top')} 
                        className={`px-4 py-2 rounded-full font-medium transition ${filter === 'top' ? 'bg-yellow-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        최고 평점
                    </button>
                </div>
                
                {/* 상담사 목록 */}
                <div className="space-y-6">
                    {filteredCounselors.map(c => (
                        <div key={c.id} className="p-6 border rounded-xl shadow-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{c.name}</h2>
                                <p className="text-sm text-gray-600 mt-1">전문 분야: <span className="font-semibold">{c.expertise}</span></p>
                                <p className="text-sm text-yellow-600 flex items-center mt-1">
                                    ⭐ 평점: {c.rating}
                                </p>
                            </div>
                            <button 
                                disabled={!c.available}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${c.available ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                            >
                                {c.available ? '예약하기' : '상담 중'}
                            </button>
                        </div>
                    ))}
                    {filteredCounselors.length === 0 && (
                        <p className="text-center py-10 text-gray-500">현재 조건에 맞는 상담사가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CounselorClient;