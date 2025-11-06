// 파일 경로: app/auth/kakao/callback/KakaoCallbackClient.jsx
'use client';

import React, { useState, useEffect } from 'react';

// 브라우저의 URL에서 'code' 파라미터 값을 가져오는 표준 함수
const getAuthCode = () => {
    if (typeof window !== 'undefined') {
        try {
            const params = new URLSearchParams(window.location.search);
            return params.get('code');
        } catch (e) {
            console.error("Error reading search params:", e);
            return null;
        }
    }
    return null;
};

const KakaoCallbackClient = () => {
    const [status, setStatus] = useState('인증 코드 확인 중...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const code = getAuthCode();

        if (!code) {
            setError('인증 코드를 찾을 수 없습니다. 카카오 로그인에 실패했습니다.');
            setStatus('인증 실패');
            return;
        }

        setStatus('인증 코드 확인됨. 서버로 토큰 교환 요청 중...');

        // 실제 환경에서는 여기서 백엔드 API를 호출하여
        // 1. 카카오로부터 Access Token을 받고
        // 2. 해당 토큰으로 사용자 정보를 가져온 후
        // 3. 내부 서비스의 JWT 토큰을 발급받아 쿠키 등에 저장해야 합니다.

        // 여기서는 성공을 가정하고 시뮬레이션합니다.
        const simulateAuthProcess = () => {
            setTimeout(() => {
                // 성공 시뮬레이션
                setStatus('인증 및 사용자 정보 처리 완료.');
                
                // 실제 환경: router.push('/') 등으로 메인 페이지로 이동
                if (typeof window !== 'undefined') {
                    console.log("카카오 인증 성공! 메인 페이지로 리디렉션 시뮬레이션.");
                    // window.location.href = '/'; 
                }
            }, 2000);
        };

        // 실패 시뮬레이션을 원하면 아래 주석을 해제하고 simulateAuthProcess()를 주석 처리
        /*
        const simulateFailure = () => {
            setTimeout(() => {
                setError('토큰 교환 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                setStatus('인증 오류');
            }, 2000);
        };
        */

        simulateAuthProcess();

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="bg-white p-10 rounded-xl shadow-2xl max-w-sm w-full text-center border-t-4 border-yellow-400">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">카카오 로그인 처리</h1>
                
                {error ? (
                    <>
                        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-red-500 font-semibold mb-2">{status}</p>
                        <p className="text-sm text-gray-600">{error}</p>
                        <button 
                            onClick={() => { if (typeof window !== 'undefined') window.location.href = '/login'; }}
                            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            로그인 페이지로 돌아가기
                        </button>
                    </>
                ) : (
                    <>
                        <svg className={`w-12 h-12 mx-auto mb-4 ${status.includes('완료') ? 'text-green-500' : 'text-yellow-500'} animate-spin-slow`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                        <p className={`text-lg font-semibold ${status.includes('완료') ? 'text-green-600' : 'text-yellow-600'}`}>{status}</p>
                        <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요. 자동으로 이동합니다.</p>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default KakaoCallbackClient;