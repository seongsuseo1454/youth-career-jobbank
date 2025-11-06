'use client'; 

import React, { Suspense } from 'react';

const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-gray-50 rounded-xl shadow-inner m-4 border border-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-xl font-semibold text-blue-600">콘텐츠를 안전하게 불러오는 중...</p>
        <p className="text-sm text-gray-500 mt-1">서버-클라이언트 간 동기화를 처리하고 있습니다.</p>
    </div>
);

export default function DynamicClientWrapper({ children }) {
    return (
        <Suspense fallback={<LoadingFallback />}>
            {children}
        </Suspense>
    );
}
