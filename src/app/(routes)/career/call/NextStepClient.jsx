import React, { useState, useEffect } from 'react';
// Lucide-react 아이콘 사용
import { ArrowLeft, CheckCircle, Clock, Calendar, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';

// Next.js 환경이 아닌 경우 useSearchParams를 모방하기 위한 Mock Hooks
// 이 함수는 캔버스 환경에서 URL의 쿼리 파라미터를 읽는 역할을 대신합니다.
const useMockSearchParams = () => {
  // 서버 환경에서는 빈 객체를 반환합니다.
  if (typeof window === 'undefined') {
    return {
      get: () => null,
      keys: () => []
    };
  }
  // 클라이언트 환경에서는 URL에서 파라미터를 읽습니다.
  const search = window.location.search;
  const params = new URLSearchParams(search);
  
  return {
    get: (key) => params.get(key) || null,
    keys: () => Array.from(params.keys())
  };
};

// 쿼리 파라미터에서 추출한 정보를 담을 함수
const getMockData = (params) => {
    const timeSlotRaw = params.get('timeSlot');

    return {
        mentorName: params.get('mentorName') || "김지영 멘토",
        mentorJob: params.get('mentorJob') || "IT/개발, 소프트웨어 엔지니어",
        careerField: params.get('careerField') || "웹 프론트엔드 개발",
        timeSlot: timeSlotRaw || "2024-11-20T10:00:00", // 예시 시간
        duration: "30분",
        meetingType: "화상 통화 (Google Meet)",
        isConfirmed: params.get('confirmed') === 'true', // 'confirmed=true'가 있을 경우 확인됨
        isPassed: timeSlotRaw && (new Date(timeSlotRaw) < new Date()) // 시간이 이미 지났는지 확인
    };
};

const NextStepClient = () => {
    // Mock 함수를 직접 호출하여 URL 검색 매개변수(searchParams)를 가져옵니다.
    const searchParams = useMockSearchParams();
    const data = getMockData(searchParams);

    const [isConfirmed, setIsConfirmed] = useState(data.isConfirmed);
    
    // 예약된 시간 슬롯을 Date 객체로 변환
    const appointmentTime = new Date(data.timeSlot);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    
    // 유효하지 않은 날짜인 경우 처리
    const isValidDate = !isNaN(appointmentTime);

    const formattedDate = isValidDate 
        ? appointmentTime.toLocaleDateString('ko-KR', dateOptions) 
        : '날짜 정보 없음';
    const formattedTime = isValidDate 
        ? appointmentTime.toLocaleTimeString('ko-KR', timeOptions) 
        : '';

    const handleConfirm = () => {
        // 실제 애플리케이션에서는 서버에 예약 확정 요청을 보내는 로직이 들어갑니다.
        console.log('예약 확정 요청을 서버로 보냅니다.');
        setIsConfirmed(true);
    };

    const StatusBadge = ({ confirmed, passed }) => {
        let text = '대기 중';
        let color = 'bg-yellow-100 text-yellow-800';
        let Icon = Clock;
        
        if (passed) {
            text = '상담 완료';
            color = 'bg-gray-100 text-gray-600';
            Icon = CheckCircle;
        } else if (confirmed) {
            text = '예약 확정';
            color = 'bg-green-100 text-green-800';
            Icon = CheckCircle;
        }

        return (
            <div className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${color}`}>
                <Icon className="w-4 h-4 mr-2" />
                {text}
            </div>
        );
    };

    const CardItem = ({ Icon, title, content }) => (
        <div className="flex items-start py-4 border-b border-gray-100 last:border-b-0">
            <Icon className="w-5 h-5 text-indigo-500 mt-0.5 mr-4 flex-shrink-0" />
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-base font-semibold text-gray-800 mt-1">{content}</p>
            </div>
        </div>
    );

    // 컴포넌트의 유효성 및 타입 검사를 위해 TypeScript를 사용하지 않습니다.
    return (
        <div className="max-w-lg w-full px-4 sm:px-0">
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => {
                        // 실제 Next.js 환경에서는 router.back() 또는 useRouter()를 사용합니다.
                        // 캔버스 환경이므로 history.back()을 사용합니다.
                        if (typeof window !== 'undefined') {
                            window.history.back();
                        } else {
                            console.log('뒤로 가기 (Mock)');
                        }
                    }}
                    className="p-2 mr-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full hover:bg-indigo-50"
                    aria-label="뒤로 가기"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-3xl font-extrabold text-gray-900">멘토링 예약 확인</h1>
            </div>

            <div className="bg-white p-6 sm:p-8 shadow-xl rounded-2xl border border-gray-100">
                {/* Status Section */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">예약 상세 정보</h2>
                    <StatusBadge confirmed={isConfirmed} passed={data.isPassed} />
                </div>

                {/* Mentor Info Card */}
                <div className="bg-indigo-50 p-5 rounded-xl mb-6 flex items-center shadow-inner">
                    <Briefcase className="w-8 h-8 text-indigo-600 mr-4 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-indigo-600">멘토: {data.mentorName}</p>
                        <p className="text-lg font-bold text-indigo-800 mt-1">{data.mentorJob}</p>
                    </div>
                </div>

                {/* Details List */}
                <div className="divide-y divide-gray-100">
                    <CardItem 
                        Icon={Calendar} 
                        title="날짜 및 시간" 
                        content={`${formattedDate} ${formattedTime} (${data.duration})`} 
                    />
                    <CardItem 
                        Icon={Clock} 
                        title="예상 소요 시간" 
                        content={data.duration} 
                    />
                    <CardItem 
                        Icon={MessageSquare} 
                        title="멘토링 분야" 
                        content={data.careerField} 
                    />
                    <CardItem 
                        Icon={Briefcase} 
                        title="진행 방식" 
                        content={data.meetingType} 
                    />
                </div>

                {/* Action/Instruction Section */}
                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                    {!data.isPassed && !isConfirmed ? (
                        <>
                            <p className="text-lg font-semibold text-gray-700 mb-4">
                                🚀 멘토링 시작 전, 예약을 확정해주세요!
                            </p>
                            <button
                                onClick={handleConfirm}
                                className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
                            >
                                예약 확정하기
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-3">확정 후 변경 사항은 멘토에게 직접 문의해주세요.</p>
                        </>
                    ) : (
                        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-base font-semibold text-green-800">
                                {data.isPassed ? '성공적으로 상담이 완료되었습니다!' : '예약이 확정되었습니다. 이제 멘토링 시간을 기다려주세요.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Additional Links (Optional) */}
                <div className="mt-6 flex justify-around text-sm">
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">멘토 프로필 보기</a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">예약 취소/변경</a>
                </div>
            </div>
        </div>
    );
};

export default NextStepClient;
