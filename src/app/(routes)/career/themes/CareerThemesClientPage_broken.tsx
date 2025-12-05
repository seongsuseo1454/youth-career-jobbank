// src/app/(routes)/career/themes/CareerThemesClientPage.tsx
'use client'; // ????吏?쒖옄媛 ?뚯씪 留??꾩뿉 ?덉뼱???⑸땲??

import React, { useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// getField, getFieldLabel, getJobIndex??'@/lib/careers/registry'???뺤쓽?섏뼱 ?덈떎怨?媛??import { getField, getFieldLabel, getJobIndex } from '@/lib/careers/registry';

// ??????????????????????????????????????????????????????????
// 荑쇰━ ?꾩슦誘?const pick = (sp: ReturnType<typeof useSearchParams>, k: string, d = '') =>
 (sp.get(k) ?? d).toString();


// 愿?щ텇???뺢퇋??(10媛?
const normalizeField = (v: string) => {
 const s = (v || '').toLowerCase();
 if (/(robot|mecha|硫붿뭅|濡쒕큸)/.test(s)) return 'robot-mechatronics';
 if (/(space|aero|??났|?곗＜)/.test(s)) return 'space-aero';
 if (/(auto|mobility|紐⑤퉴|?먯쑉二쇳뻾)/.test(s)) return 'mobility';
 if (/(ai|data|?곗씠???멸났吏??/.test(s)) return 'ai-data';
 if (/(cyber|security|蹂댁븞)/.test(s)) return 'cyber-security';
 if (/(medical|bio|?섎즺|諛붿씠??/.test(s)) return 'medical-bio';
 if (/(nursing|rehab|媛꾪샇|?ы솢)/.test(s)) return 'nursing-rehab';
 if (/(env|energy|?섍꼍|?먮꼫吏)/.test(s)) return 'env-energy';
 if (/(software|app|?뚰봽????/.test(s)) return 'software-app';
 if (/(game|meta|寃뚯엫|硫뷀?|硫뷀?踰꾩뒪)/.test(s)) return 'game-metaverse';
 return 'ai-data';
};


// 踰꾪듉 ?붾젅??const PALETTE = [
 { color: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
 { color: 'bg-violet-600', hover: 'hover:bg-violet-700' },
 { color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
];


// 遺꾩빞蹂?湲곕낯 3移대뱶(臾몄젣????몃뜳???녾굅?? 3媛?誘몃쭔????蹂닿컯??
const DEFAULT_THEMES: Record<
 string,
 Array<{ key: string; title: string; desc: string }>
> = {
 'ai-data': [
   { key: 'data-scientist', title: '?곗씠???ъ씠?명떚?ㅽ듃', desc: '?곗씠?곕줈 鍮꾩쫰?덉뒪 ?몄궗?댄듃 ?꾩텧' },
   { key: 'ai-researcher', title: '?멸났吏???곌뎄??, desc: '紐⑤뜽/?뚭퀬由ъ쬁 ?곌뎄쨌媛쒕컻' },
   { key: 'bigdata-analyst', title: '鍮낅뜲?댄꽣 遺꾩꽍媛', desc: '?洹쒕え ?곗씠??泥섎━쨌?쒓컖?? },
 ],
 'software-app': [
   { key: 'frontend-dev', title: '?꾨줎?몄뿏??媛쒕컻??, desc: '??UI/UX 援ы쁽' },
   { key: 'backend-dev', title: '諛깆뿏??媛쒕컻??, desc: 'API쨌DB쨌?쒕쾭 ?ㅺ퀎' },
   { key: 'mobile-dev', title: '紐⑤컮????媛쒕컻??, desc: 'iOS/Android ?? },
 ],
 'robot-mechatronics': [
   { key: 'robot-engineer', title: '濡쒕큸 ?붿??덉뼱', desc: '?쇱꽌쨌?≪텛?먯씠???듯빀 ?쒖뼱' },
   { key: 'mechatronics-dev', title: '硫붿뭅?몃줈?됱뒪 媛쒕컻??, desc: 'HW/SW ?듯빀 ?쒖뒪?? },
   { key: 'automation-tech', title: '?먮룞??湲곗닠??, desc: '?앹궛?쇱씤 ?먮룞?? },
 ],
 'space-aero': [
   { key: 'aerospace-engineer', title: '??났?곗＜ ?붿??덉뼱', desc: '鍮꾪뻾泥?援ъ“/異붾젰 ?ㅺ퀎' },
   { key: 'satellite-operator', title: '?꾩꽦 ?댁슜 ?꾨Ц媛', desc: '?꾩꽦 ?곗씠?걔룹??곴뎅 ?댁슜' },
   { key: 'avionics-engineer', title: '??났?꾩옄 ?붿??덉뼱', desc: '??났湲??꾩옄/??쾿 ?쒖뒪?? },
 ],
 mobility: [
   { key: 'ev-powertrain', title: '?꾧린李??뚯썙?몃젅??, desc: '諛고꽣由?룸え?걔룹씤踰꾪꽣' },
   { key: 'adas-autonomy', title: '?먯쑉二쇳뻾/ADAS', desc: '?쇱떛쨌?쒖뼱쨌留듯븨' },
   { key: 'vehicle-design', title: '李⑤웾 ?ㅺ퀎', desc: '李⑥껜/?댁옣/?몄껜怨듯븰' },
 ],
 'cyber-security': [
   { key: 'security-analyst', title: '蹂댁븞 遺꾩꽍媛', desc: '移⑦빐?ш퀬 ?먯?/??? },
   { key: 'penetration-tester', title: '紐⑥쓽?댄궧 ?꾨Ц媛', desc: '痍⑥빟??吏꾨떒쨌媛?대뱶' },
   { key: 'soc-engineer', title: 'SOC ?붿??덉뼱', desc: '蹂댁븞 ?먮룞???먯? 猷? },
 ],
 'medical-bio': [
   { key: 'clinician', title: '?꾩긽?섏궗', desc: '吏꾨즺/吏꾨떒/移섎즺 怨꾪쉷' },
   { key: 'bio-researcher', title: '諛붿씠???곌뎄??, desc: '吏덈퀝 硫붿빱?덉쬁쨌?좎빟' },
   { key: 'med-ai', title: '?섎즺 AI ?붿??덉뼱', desc: '?섎즺?곸긽/EMR 紐⑤뜽留? },
 ],
 // ??5) 媛꾪샇쨌?ы솢
 'nursing-rehab': [
   { key: 'rn', title: '媛꾪샇??, desc: '?섏옄 ?뚮큵쨌?섎즺 ?묒뾽쨌湲곕낯 媛꾪샇' },
   { key: 'ot', title: '?묒뾽移섎즺??, desc: 'ADL ?μ긽쨌媛먭컖/?대룞 ?ы솢' },
   { key: 'pt', title: '臾쇰━移섎즺??, desc: '洹쇨낏寃??좉꼍怨?臾쇰━移섎즺' },
 ],
 // ??6) ?섍꼍쨌?먮꼫吏
 'env-energy': [
   { key: 'env-engineer', title: '?섍꼍怨듯븰湲곗닠??, desc: '?湲??섏쭏/?먭린臾?怨듭젙 ?ㅺ퀎' },
   { key: 'renewable-eng', title: '?좎옱?앹뿉?덉? ?꾨Ц媛', desc: '?쒖뼇愿??띾젰/ESS/?섏냼' },
   { key: 'water-quality-analyst', title: '?섏쭏遺꾩꽍 湲곗궗', desc: '?쒕즺 梨꾩랬쨌遺꾩꽍쨌QA/QC' },
 ],
 // ??7) ?곗＜쨌??났
 'space-aero-alt': [
   { key: 'aerospace-engineer', title: '??났?곗＜ ?붿??덉뼱', desc: '鍮꾪뻾?깅뒫/援ъ“/異붾젰' },
   { key: 'satellite-operator', title: '?꾩꽦 ?댁슜 ?꾨Ц媛', desc: '?꾨Т怨꾪쉷쨌吏?곴뎅 ?댁쁺' },
   { key: 'avionics-engineer', title: '??났?꾩옄 ?붿??덉뼱', desc: '??쾿/?듭떊/鍮꾪뻾?쒖뼱' },
 ],
 // ??8) ?먮룞李㉱룸え鍮뚮━?? 'mobility-alt': [
   { key: 'ev-powertrain', title: '?꾧린李??뚯썙?몃젅??, desc: '諛고꽣由?룰뎄?쇑룹씤踰꾪꽣' },
   { key: 'adas-autonomy', title: '?먯쑉二쇳뻾/ADAS', desc: '?몄?쨌?먮떒쨌?쒖뼱' },
   { key: 'vehicle-design', title: '李⑤웾 ?ㅺ퀎', desc: '李⑥껜/?댁옣/?덉쟾/NVH' },
 ],
};


// 遺꾩빞 媛?대뱶
const FIELD_GUIDE: Record<string, string> = {
 'ai-data': '?좏깮??愿?щ텇?쇱쓽 ???吏곷Т瑜?泥댄뿕?⑸땲?? ?곗씠???섏쭛/遺꾩꽍/紐⑤뜽留곸쓣 ?ㅻ９?덈떎.',
 'software-app': '????媛쒕컻 ?꾨컲?봘I, API, 諛고룷源뚯? ?ㅻТ ?먮쫫???듯옓?덈떎.',
 'robot-mechatronics': '?쇱꽌쨌?쒖뼱쨌湲곌뎄媛 寃고빀??硫붿뭅?몃줈?됱뒪 湲곕컲 濡쒕큸???댄빐?⑸땲??',
 'space-aero': '??났?곗＜ ?쒖뒪?? ?꾩꽦/鍮꾪뻾泥??ㅺ퀎? ?댁슜???댄렣遊낅땲??',
 mobility: '?꾨룞???먯쑉二쇳뻾/而ㅻ꽖?곕뱶移???誘몃옒 紐⑤퉴由ы떚瑜?泥댄뿕?⑸땲??',
 'cyber-security': '移⑦빐?ш퀬 ??? 紐⑥쓽?댄궧, 蹂댁븞 ?먮룞?붾? 寃쏀뿕?⑸땲??',
 'medical-bio': '?섎즺/諛붿씠??R&D 諛??꾩긽 ?곗씠???쒖슜 湲곗큹瑜??듯옓?덈떎.',
 'nursing-rehab': '媛꾪샇/?ы솢???ㅼ젣 耳??怨쇱젙怨?? ?묒뾽???댄빐?⑸땲??',
 'env-energy': '?먮꼫吏 ?꾪솚/?섍꼍 洹쒖젣 ??묎낵 遺꾩꽍??泥댄뿕?⑸땲??',
 'game-metaverse': '寃뚯엫/硫뷀?踰꾩뒪 ?쒖옉 ?뚯씠?꾨씪?몄쓣 寃쏀뿕?⑸땲??',
};


// ??????????????????????????????????????????????????????????
export default function CareerThemesPage() {
 const router = useRouter();
 const sp = useSearchParams();


 // 荑쇰━ ?좎?
 const keepQS = useMemo(() => {
   const keep = new URLSearchParams();
   [
     'counselor', 'name', 'school', 'grade', 'classroom',
     'goal', 'level', 'field', 'interest'
   ].forEach((k) => { const v = sp.get(k); if (v) keep.set(k, v); });
   if (!keep.get('level')) keep.set('level', '怨좊벑?숈깮');
   return keep.toString
(); // ??以꾨컮轅?ASI ?댁뒋 諛⑹?
 }, [sp]);


 // 遺꾩빞/?쇰꺼/紐⑤뱢
 const rawField = pick(sp, 'field', 'ai-data');
 const field = normalizeField(rawField);
 const fieldLabel = getFieldLabel(field);
 const module = getField(field);


 // 移대뱶 ?곗씠??紐⑤뱢 ?몃뜳????諛곗뿴) or ?대갚(?대떦 遺꾩빞留?
 const entries = useMemo(() => {
   const arr: Array<{ key: string; title: string; desc: string }> = [];
   const idx = getJobIndex(field);


   if (idx && idx.size > 0) {
     for (const [key, meta] of idx.entries()) {
       arr.push({ key, title: (meta as any).title, desc: (meta as any).desc ?? '' });
     }
     // ??紐⑤뱢??3媛?誘몃쭔?대㈃ 湲곕낯 異붿쿇?쇰줈 梨꾩썙 3媛?蹂댁옣
     if (arr.length < 3 && DEFAULT_THEMES[field]) {
       for (const d of DEFAULT_THEMES[field]) {
         if (arr.length >= 3) break;
         if (!arr.find(a => a.key === d.key)) arr.push(d);
       }
     }
   } else {
     // 紐⑤뱢 ?몃뜳???놁쑝硫?遺꾩빞 湲곕낯 異붿쿇 ?ъ슜
     (DEFAULT_THEMES[field] ?? []).forEach((e) => arr.push(e));
     // ?곗＜쨌??났/紐⑤퉴由ы떚 蹂댁“ ?ㅻ룄 吏??     if (arr.length === 0 && DEFAULT_THEMES[`${field}-alt`]) {
       (DEFAULT_THEMES[`${field}-alt`] ?? []).forEach((e) => arr.push(e));
     }
   }
   return arr.slice(0, 3);
 }, [field]);


 // ?대룞
 const handleThemeClick = useCallback((jobKey: string) => {
   const qs = keepQS ? `?${keepQS}` : '';
   router.push(`/career/experience/${encodeURIComponent(field)}/${encodeURIComponent(jobKey)}/video${qs}`);
 }, [router, keepQS, field]);


 // ??????????????? ?뚮뜑 ???????????????
 return (
   <div className="min-h-screen bg-slate-50 p-4 md:p-8">
     <div className="mx-auto max-w-5xl">
       <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 shadow-2xl mb-8">
         <div className="flex items-center justify-between">
           <h1 className="text-4xl font-black tracking-tight">吏곸뾽 ?뚮쭏 ?좏깮</h1>
           <div className="flex gap-3">
             <button
               onClick={() => router.push(`/video?${keepQS}`)}
               className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-medium"
             >
               ???붿긽?곷떞
             </button>
             <button
               onClick={() => router.push('/')}
               className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-medium"
             >
               ?룧 ?덉쑝濡?             </button>
           </div>
         </div>
         <p className="mt-3 text-white/90 text-lg">
           AI ?곷떞??<b>{pick(sp, 'counselor', '-')}</b>? ?④퍡?섎뒗 留욎땄??吏곷Т ?먯깋
         </p>
         <div className="mt-2 inline-block bg-white/15 px-3 py-1 rounded-lg text-sm font-semibold">
           愿?⑤텇?? <b>{fieldLabel}</b> {module?.INDEX?.size ? '' : '(湲곕낯 異붿쿇)'}
         </div>
       </header>


       {/* ?뚮쭏 移대뱶 3媛?*/}
       <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {entries.map((t, i) => {
           const { color, hover } = PALETTE[i % PALETTE.length];
           return (
             <button
               key={t.key}
               onClick={() => handleThemeClick(t.key)}
               className="text-left flex flex-col p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-white border border-gray-100"
             >
               <div className="text-3xl font-extrabold mb-2 text-gray-900">{t.title}</div>
               <p className="text-gray-500 mb-6 text-lg font-medium">{t.desc}</p>
               <div className="mt-auto">
                 <div className="text-sm font-semibold text-gray-700 mb-2">
                   <span className="w-2 h-2 inline-block rounded-full bg-blue-400 mr-2 animate-pulse" />
                   珥댟룹쨷쨌怨?留욎땄 5臾명빆 泥댄뿕
                 </div>
                 <p className="text-sm text-gray-500">吏묒쨷쨌?깆떎쨌?먭뎄 ??웾??留욎텣 ?ㅼ쟾??臾몄젣濡?吏꾪뻾?⑸땲??</p>
               </div>
               <span className={`mt-6 inline-block w-full text-center py-3 rounded-xl text-lg font-bold text-white ${color} ${hover} shadow-lg`}>
                 泥댄뿕 ?쒖옉 ??               </span>
             </button>
           );
         })}
       </main>


       {/* 遺꾩빞 媛?대뱶 */}
       <section className="mt-10">
         <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
           <div className="font-bold text-amber-800 mb-1">?뮕 遺꾩빞 媛?대뱶: {fieldLabel}</div>
           <p className="text-amber-900 text-sm">
             {FIELD_GUIDE[field] ?? '?좏깮??愿?щ텇?쇱쓽 ???吏곷Т瑜?泥댄뿕?⑸땲??'}
           </p>
         </div>
       </section>
     </div>
   </div>
 );
}
