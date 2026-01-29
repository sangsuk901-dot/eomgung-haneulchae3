import React from 'react';
import '../types';

const Overview: React.FC = () => {
  const specs = [
    { label: '단지명', value: '엄궁 1구역 하늘채', icon: 'solar:home-2-bold-duotone' },
    { label: '위치', value: '부산 사상구 엄궁동 412번지 일원', icon: 'solar:map-point-bold-duotone' },
    { label: '규모', value: '1,670세대 / 13개동', icon: 'solar:buildings-bold-duotone' },
    { label: '시공사', value: '코오롱글로벌', icon: 'solar:medal-ribbon-star-bold-duotone' },
    { label: '분양시기', value: '2026년 상반기 예정', icon: 'solar:calendar-bold-duotone' },
  ];

  return (
    <section id="overview" className="py-32 px-6 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">사업개요 및 현장현황</h2>
            <p className="text-neutral-500 mb-12 text-lg font-medium">부산의 미래를 여는 1,670세대 대단지 프리미엄</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="p-6 rounded-3xl bg-neutral-50 border border-neutral-100 hover:shadow-xl transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 text-indigo-500 shadow-sm">
                    <iconify-icon icon={spec.icon} className="text-xl"></iconify-icon>
                  </div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{spec.label}</span>
                  <span className="text-neutral-900 font-bold leading-snug">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* 3. 건물 사진 주소 (여기 src="주소"만 바꾸면 사진이 바뀜) */}
            <div className="aspect-[3/2] rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100">
              <img 
                src="https://i.imgur.com/i3rIgOs.jpg" 
                alt="엄궁 1구역 하늘채 현장 이미지" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
