'use client';
import React, {useMemo, useRef, useState} from 'react';

type Av = { id:number; name:string };

export default function WheelDemoPage() {
  // 샘플 상담사 6명
  const avatars: Av[] = useMemo(()=>[
    {id:1,name:'세종대왕'},{id:2,name:'이순신장군'},{id:3,name:'간디'},
    {id:4,name:'아인슈타인'},{id:5,name:'마리 퀴리'},{id:6,name:'레오나르도 다 빈치'},
  ],[]);

  return (
    <div style={{padding:24, display:'grid', placeItems:'center', minHeight:'100vh', backgroundColor:'#f7f7f7'}}>
      <h1 style={{fontSize:28, fontWeight:800, marginBottom:12, color:'#1F2937'}}>상담사 아바타 선택 (회전판 데모)</h1>
      <Wheel
        avatars={avatars}
        onPick={(a)=>{
          // alert() 대신 커스텀 메시지 박스 또는 상태 업데이트를 사용하는 것이 권장됩니다.
          console.log(`선택: ${a.name}`);
        }}
      />
    </div>
  );
}

/** === 여기부터 완전한 바퀴 컴포넌트 (외부 의존성 없음) === */
function Wheel({avatars, onPick}: {avatars:Av[]; onPick?:(a:Av)=>void}) {
    // 1. 상태 및 계산 정의 (return 문 전에 모두 정의되어야 합니다)
    const n = Math.max(avatars.length,1);
    const slice = 360/n;

    // 섹터 정보
    const sectors = useMemo(()=>avatars.map((a,i)=>{
        const from = i*slice, to=(i+1)*slice, mid=from+slice/2;
        // Tailwind 색상 팔레트 기반의 색상 배열
        const colors = ['#3B82F6','#10B981','#F59E0B','#EF4444','#22C55E','#6366F1'];
        return {...a, from, to, mid, color: colors[i%colors.length]};
    }),[avatars, slice]);

    // 도넛 그라디언트
    const gradient = useMemo(()=>`conic-gradient(${sectors.map(
        s=>`${s.color} ${s.from}deg ${s.to}deg`).join(',')})`,[sectors]);

    // 크기 고정 및 반지름 계산
    const outer = 540;            // 컨테이너 지름 (px)
    const ringPad = 18;           // 컨테이너와 도넛 간격 (px)
    const donut = outer - ringPad*2; // 도넛 지름 (px)
    const inner = 240;            // 중앙 구멍 지름 (px)
    const R = donut/2, r = inner/2, labelR = (R+r)/2; // R: 도넛 반지름, r: 구멍 반지름, labelR: 라벨 위치 반지름

    // 회전/선택 상태
    const [angle, setAngle] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [pickedId, setPickedId] = useState<number|null>(null);
    const targetIdxRef = useRef<number|null>(null);

    // 2. 이벤트 핸들러 정의
    const spin = ()=>{
        if (spinning || avatars.length===0) return;
        setPickedId(null);
        setSpinning(true);
        
        // 당첨 섹터 선택 (랜덤)
        const idx = Math.floor(Math.random()*n);
        targetIdxRef.current = idx;
        
        // 타겟 섹터의 중심 각도 (0도에서 360도 사이)
        const mid = sectors[idx].mid;
        
        // 최소 5회전 + 랜덤 추가 회전 (안정성을 위해 5~7회전)
        const turns = 360*(5+Math.floor(Math.random()*3));
        
        // 180도 위치(포인터 위치)에 타겟 섹터의 중심(mid)이 오도록 계산
        // target = [총 회전수] + [포인터 각도 180] + [포인터 위치에서 타겟 중심까지의 상대 각도 (360 - mid)]
        const target = turns + (180 + (360 - mid));
        
        // 기존 각도에 최종 회전 목표 각도를 더하여 설정
        setAngle(prev=>prev+target);
    };

    const onEnd = ()=>{
        // 회전 애니메이션 종료 시 호출
        setSpinning(false);
        
        const idx = targetIdxRef.current ?? 0;
        const chosen = avatars[idx];
        setPickedId(chosen.id);
        
        // 콜백 함수 실행
        onPick?.(chosen);
    };

    // 3. 스타일 객체 정의
    const donutStyle: React.CSSProperties = {
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        width: donut, 
        height: donut, 
        // transform: 'translate(-50%,-50%)', // 이 라인은 아래의 최종 transform으로 대체됩니다.
        borderRadius: '50%', 
        background: gradient,
        
        // 회전 애니메이션 설정
        transition: spinning ? 'transform 2600ms cubic-bezier(.17,.67,.2,1.02)' : 'none', 
        
        transformOrigin: 'center',
        // ✅ 수정: 복합 transform 문자열에 'as string'을 추가하여 타입 오류 해결
        transform: `translate(-50%,-50%) rotate(${angle}deg)` as string 
    };

    // 현재 선택된 상담사 이름
    const pickedName = pickedId ? avatars.find(a=>a.id===pickedId)?.name : '';

    return (
        <div style={{textAlign:'center'}}>
            {/* 컨테이너 */}
            <div style={{
              position:'relative', 
              width:outer, 
              height:outer, 
              margin:'0 auto', 
              boxShadow:'0 10px 30px rgba(0,0,0,.15)', 
              borderRadius:'50%'
            }}>

                {/* 포인터 */}
                <div
                    style={{
                        position:'absolute', left:'50%', top:'50%',
                        // 포인터가 컨테이너 상단 근처에 위치하도록 translateY 조정
                        // ✅ 수정: 복합 transform 문자열에 'as string'을 추가하여 타입 오류 해결
                        transform:`translate(-50%, ${-(outer/2)+14}px) rotate(180deg)` as string,
                        zIndex:3,
                        pointerEvents:'none' // 클릭 이벤트 방지
                    }}
                    aria-hidden
                >
                    <div style={{
                        width:0, height:0,
                        borderLeft:'14px solid transparent',
                        borderRight:'14px solid transparent',
                        borderTop:'22px solid #F97316', // orange-500
                        filter:'drop-shadow(0 2px 2px rgba(0,0,0,.25))'
                    }}/>
                </div>

                {/* 도넛(바깥 원) */}
                <div 
                    style={donutStyle}
                    onTransitionEnd={onEnd}
                />

                {/* 중앙 구멍 */}
                <div style={{
                    position:'absolute', left:'50%', top:'50%',
                    width:inner, height:inner, transform:'translate(-50%,-50%)',
                    borderRadius:'50%', background:'#fff', boxShadow:'inset 0 0 20px rgba(0,0,0,.08)', zIndex:1
                }}/>

                {/* 라벨 */}
                {sectors.map((s)=>{
                    const active = pickedId===s.id;
                    const style: React.CSSProperties = {
                        position:'absolute', left:'50%', top:'50%',
                        
                        // 회전 각도: 바퀴 회전(angle)만큼 라벨 위치 회전, 라벨의 중앙 회전(s.mid), 라벨 텍스트 역회전(angle-s.mid)
                        // ✅ 수정: 복합 transform 문자열에 'as string'을 추가하여 타입 오류 해결
                        transform: `rotate(${s.mid - angle}deg) translateY(-${labelR}px) rotate(${-s.mid + angle}deg)` as string,
                        
                        transformOrigin:'left center', zIndex:2
                    };
                    const tagStyle: React.CSSProperties = {
                        display:'inline-block',
                        padding:'6px 10px',
                        borderRadius:8,
                        color:'#fff',
                        fontWeight:800,
                        fontSize:22,
                        background:s.color,
                        lineHeight:1,
                        // 선택된 라벨에 강조 효과
                        boxShadow: active ? '0 0 0 6px rgba(250,204,21,.7), 0 4px 10px rgba(0,0,0,.25)' : '0 2px 6px rgba(0,0,0,.2)',
                        transform: active ? 'scale(1.08) translateY(-4px)' : 'translateY(0)',
                        transition:'transform 200ms'
                    };
                    return (
                        <div key={s.id} style={style}>
                            <span style={tagStyle}>{s.name}</span>
                        </div>
                    );
                })}

                {/* 중앙에 큰 이름 표시 */}
                <div style={{
                    position:'absolute', inset:0, display:'grid', placeItems:'center',
                    pointerEvents:'none', zIndex:2 // zIndex를 높여 중앙 구멍 위로 올림
                }}>
                    <div style={{
                        fontSize:pickedId ? 40 : 28, 
                        fontWeight:900, 
                        color:pickedId ? '#2563EB' : '#4B5563',
                        transition:'color 300ms, font-size 300ms',
                        textAlign:'center',
                        lineHeight:1.2,
                        width:inner-40
                    }}>
                        {spinning ? '선택 중...' : pickedName || '상담사 선택'}
                    </div>
                </div>
            </div>

            {/* 버튼들 */}
            <div style={{marginTop:36, display:'flex', gap:16, justifyContent:'center'}}>
                <button
                    onClick={spin}
                    disabled={spinning}
                    style={{
                        padding:'14px 24px',
                        borderRadius:12,
                        color:'#fff',
                        fontWeight:800,
                        fontSize:18,
                        // 버튼 스타일 개선: 그라디언트, 그림자
                        backgroundImage: spinning ? 'linear-gradient(to right, #D1D5DB, #A9AEB5)' : 'linear-gradient(to right, #4F46E5, #3B82F6)',
                        boxShadow: spinning ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.4)',
                        cursor: spinning ? 'not-allowed' : 'pointer',
                        transition:'all 300ms',
                        border:'none',
                        transform: spinning ? 'scale(0.98)' : 'scale(1)'
                    }}
                >
                    {spinning ? '돌아가는 중...' : '상담사 돌리기'}
                </button>
                <button
                    onClick={()=>{ if(pickedId){ alert('선택된 상담사로 다음 단계 진행!'); } }}
                    disabled={!pickedId || spinning}
                    style={{
                        padding:'14px 24px',
                        borderRadius:12,
                        color:'#fff',
                        fontWeight:800,
                        fontSize:18,
                        // 버튼 스타일 개선: 그라디언트, 그림자
                        backgroundImage: (!pickedId || spinning) ? 'linear-gradient(to right, #D1D5DB, #A9AEB5)' : 'linear-gradient(to right, #10B981, #059669)',
                        boxShadow: (!pickedId || spinning) ? 'none' : '0 4px 15px rgba(5, 150, 105, 0.4)',
                        cursor: (!pickedId || spinning) ? 'not-allowed' : 'pointer',
                        transition:'all 300ms',
                        border:'none',
                        transform: (!pickedId || spinning) ? 'scale(0.98)' : 'scale(1)'
                    }}
                >
                    {pickedId ? `${pickedName} 선택 완료 →` : '상담사를 선택하세요'}
                </button>
            </div>

            <p style={{marginTop:24, color:'#9CA3AF', fontSize:14}}>
                ※ 설계 고정 규칙: 포인터 180°(아래), 라벨은 도넛 두께 정중앙, 경계선에 절대 멈추지 않도록 중앙 스냅.
            </p>
        </div>
    );
}
