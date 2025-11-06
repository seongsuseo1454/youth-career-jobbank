// 파일 경로: app/video/VideoClient.jsx
'use client'; 

import React, { useState } from 'react';

const mockVideos = [
    { id: 1, title: "개발자의 하루: 비전공자도 가능할까?", channel: "CareerTV", views: "1.2만회" },
    { id: 2, title: "홀랜드 검사 6가지 유형 완벽 분석", channel: "StudyGuide", views: "3.5만회" },
    { id: 3, title: "실패를 통한 성장: 이직 성공기", channel: "MotivationUp", views: "8천회" },
];

const VideoClient = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredVideos = mockVideos.filter(video => 
        video.title.includes(searchQuery) || video.channel.includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">진로 탐색 비디오 라이브러리</h1>
                
                {/* 검색 입력 */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="관심 분야나 직업을 검색해 보세요..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                
                {/* 비디오 목록 */}
                <div className="space-y-4">
                    {filteredVideos.map(video => (
                        <div key={video.id} className="p-4 border rounded-xl shadow-md bg-white flex items-center hover:bg-blue-50 transition">
                            <div className="flex-shrink-0 w-20 h-12 bg-gray-200 rounded mr-4 flex items-center justify-center text-gray-500">
                                ▶️
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold text-gray-800">{video.title}</h2>
                                <p className="text-sm text-gray-600 mt-0.5">{video.channel} • {video.views}</p>
                            </div>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition">
                                시청하기
                            </button>
                        </div>
                    ))}
                    {filteredVideos.length === 0 && (
                        <p className="text-center py-10 text-gray-500">검색 결과가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoClient;