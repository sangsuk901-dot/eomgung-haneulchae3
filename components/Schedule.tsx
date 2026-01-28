
import React from 'react';

const Schedule: React.FC = () => {
  const dates = [
    { title: '모집공고일', date: '202X-XX-XX', note: '추후 정보 업데이트' },
    { title: '특별공급', date: '202X-XX-XX', note: '인터넷 접수' },
    { title: '일반 1순위', date: '202X-XX-XX', note: '당해 지역 우선' },
    { title: '당첨자 발표', date: '202X-XX-XX', note: '개별 조회 가능' },
    { title: '계약체결', date: '202X-XX-XX ~ XX', note: '견본주택 방문' },
  ];

  return (
    <section id="schedule" className="py-24 px-6 border-y border-neutral-100 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-neutral-900 mb-16 text-center">분양일정</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {dates.map((item, i) => (
            <div key={i} className="relative p-8 rounded-3xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-xl transition-all group">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-indigo-600 border-4 border-white text-xs font-bold flex items-center justify-center text-white z-10 shadow-md">
                0{i + 1}
              </div>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 group-hover:translate-x-1 transition-transform">{item.title}</p>
              <p className="text-xl font-bold text-neutral-900 mb-2">{item.date}</p>
              <p className="text-[11px] text-neutral-500 font-medium">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
