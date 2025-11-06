// 파일 경로: app/wheel/WheelClient.jsx
'use client';

import React, { useState, useRef } from 'react';

// 룰렛 섹션 정의 (진로 선택 옵션)
const initialItems = [
    { name: "IT 개발자", color: "#FBBF24" }, // amber-500
    { name: "데이터 분석가", color: "#60A5FA" }, // blue-400
    { name: "UX/UI 디자이너", color: "#F472B6" }, // pink-400
    { name: "마케터", color: "#34D399" }, // emerald-400
    { name: "회계사", color: "#A78BFA" }, // violet-400
    { name: "공무원", color: "#FCA5A5" }, // red-300
    { name: "창업", color: "#5EEAD4" }, // teal-300
    { name: "잠시 멈춤", color: "#9CA3AF" }, // gray-400
];

const WheelClient = () => {
    const [items, setItems] = useState(initialItems);
    const [newItem, setNewItem] = useState('');
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const wheelRef = useRef(null);

    const numItems = items.length;
    const anglePerItem = 360 / numItems;

    // 룰렛 돌리기 함수
    const spinWheel = () => {
        if (spinning || numItems === 0) return;

        setSpinning(true);
        setResult(null);

        // 무작위로 착지할 섹션 인덱스를 선택
        const randomIndex = Math.floor(Math.random() * numItems);
        
        // 착지할 각도의 중심 (랜딩 각도)
        const landingAngle = 360 - (randomIndex * anglePerItem + anglePerItem / 2);

        // 여러 바퀴 회전 + 랜덤 랜딩 각도 (7바퀴 + 랜딩 각도 + 약간의 랜덤 오프셋)
        const totalRotation = rotation + (360 * 7) + landingAngle + (Math.random() * anglePerItem - anglePerItem / 2);

        setRotation(totalRotation);

        // CSS Transition 시간에 맞춰 결과 표시
        setTimeout(() => {
            setSpinning(false);
            setResult(items[randomIndex].name);
        }, 5000); // 5초 애니메이션 시간
    };
    
    // 항목 추가
    const addItem = () => {
        if (newItem.trim() && items.length < 12) { // 최대 12개 제한
            setItems([...items, { 
                name: newItem.trim(), 
                color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}` // 랜덤 색상
            }]);
            setNewItem('');
        }
    };

    // 항목 제거
    const removeItem = (indexToRemove) => {
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    // SVG 룰렛 생성 로직
    const renderWheel = () => {
        return items.map((item, index) => {
            const startAngle = index * anglePerItem;
            const endAngle = (index + 1) * anglePerItem;

            // SVG Path 계산 (원형 부채꼴)
            const getCoordinatesForAngle = (angle) => {
                const radius = 250;
                const radians = (angle - 90) * (Math.PI / 180);
                return {
                    x: radius * Math.cos(radians),
                    y: radius * Math.sin(radians)
                };
            };

            const start = getCoordinatesForAngle(startAngle);
            const end = getCoordinatesForAngle(endAngle);
            const largeArcFlag = anglePerItem > 180 ? 1 : 0;

            const d = [
                `M 0 0`, // 중심 (0,0)으로 이동
                `L ${start.x} ${start.y}`, // 시작점으로 선 긋기
                `A 250 250 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // 호 그리기
                `Z` // 경로 닫기
            ].join(' ');

            // 텍스트 회전을 위한 중심 각도 계산
            const textAngle = startAngle + anglePerItem / 2;

            return (
                <g key={index}>
                    <path d={d} fill={item.color} stroke="#fff" strokeWidth="2" />
                    <text 
                        x="0" 
                        y="0"
                        transform={`rotate(${textAngle}) translate(180, 0)`}
                        dominantBaseline="middle"
                        textAnchor="end"
                        fill="#fff"
                        fontWeight="bold"
                        fontSize="18"
                        className="pointer-events-none"
                    >
                        {item.name}
                    </text>
                </g>
            );
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-12 font-sans flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:w-1/2 w-full max-w-lg mb-8 lg:mb-0 lg:pr-12">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">진로 결정 휠</h1>
                <p className="text-gray-600 mb-6">고민되는 진로 선택지를 추가하고, 룰렛을 돌려보세요! 직관적인 결정에 도움을 줍니다.</p>

                {/* 항목 추가 입력 */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="새로운 항목 추가 (예: 디자이너)"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        disabled={spinning}
                    />
                    <button 
                        onClick={addItem}
                        className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 transition duration-200 font-semibold disabled:opacity-50"
                        disabled={spinning || items.length >= 12}
                    >
                        추가
                    </button>
                </div>
                {items.length >= 12 && <p className="text-sm text-red-500 mb-4">최대 12개의 항목만 추가할 수 있습니다.</p>}


                {/* 항목 목록 */}
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-64 overflow-y-auto">
                    <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">현재 선택지 ({numItems}개)</h3>
                    <div className="flex flex-wrap gap-2">
                        {items.map((item, index) => (
                            <div 
                                key={index} 
                                style={{ backgroundColor: item.color }}
                                className="text-white text-sm px-3 py-1 rounded-full flex items-center shadow-md"
                            >
                                <span>{item.name}</span>
                                <button 
                                    onClick={() => removeItem(index)}
                                    className="ml-2 text-xs font-bold opacity-80 hover:opacity-100 transition disabled:opacity-50"
                                    disabled={spinning}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        {numItems === 0 && (
                            <p className="text-gray-400 text-sm italic">선택지를 추가해주세요.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 룰렛 섹션 */}
            <div className="relative flex items-center justify-center w-full max-w-md">
                
                {/* 룰렛 포인터 (지정된 위치에 고정) */}
                <div className="absolute top-0 transform -translate-y-full z-10">
                    <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-red-600"></div>
                </div>
                
                {/* 룰렛 휠 (SVG) */}
                <div 
                    ref={wheelRef}
                    className="rounded-full shadow-2xl transition-transform duration-[5000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                        pointerEvents: spinning ? 'none' : 'auto',
                    }}
                >
                    <svg width="500" height="500" viewBox="-250 -250 500 500" className="w-96 h-96 md:w-[450px] md:h-[450px]">
                        {renderWheel()}
                    </svg>
                </div>

                {/* 스핀 버튼 (룰렛 중앙) */}
                <button 
                    onClick={spinWheel}
                    className="absolute inset-0 m-auto w-32 h-32 bg-pink-500 rounded-full text-white font-black text-xl shadow-xl hover:bg-pink-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                    disabled={spinning || numItems === 0}
                >
                    {spinning ? '회전 중...' : '돌리기'}
                </button>
            </div>

            {/* 결과 표시 */}
            {result && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-bounce-in">
                        <h2 className="text-3xl font-extrabold text-pink-600 mb-4">결과 발표!</h2>
                        <p className="text-5xl font-black text-gray-900 mb-6">{result}</p>
                        <p className="text-gray-600 mb-6">선택된 진로에 대해 더 자세히 알아보세요!</p>
                        <button 
                            onClick={() => setResult(null)}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WheelClient;