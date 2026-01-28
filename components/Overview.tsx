
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-6 border border-indigo-100/50">
              Project Summary
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">사업개요</h2>
            <p className="text-neutral-500 mb-12 text-lg font-medium">부산의 미래를 여는 1,670세대 대단지 프리미엄</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                    <iconify-icon icon={spec.icon} className="text-xl"></iconify-icon>
                  </div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{spec.label}</span>
                  <span className="text-neutral-900 font-bold leading-snug">{spec.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-neutral-500 text-sm leading-relaxed border-l-2 border-indigo-100 pl-6 italic font-medium">
              "사상구 엄궁동을 대표할 새로운 랜드마크로서, 뛰어난 주거 가치와 미래 비전을 제시합니다."
            </p>
          </div>
          <div className="reveal relative" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-6 bg-indigo-500/5 rounded-[4rem] blur-3xl"></div>
            {/* 단지 조감도 이미지 - 오버레이 없이 깔끔하게 표시 */}
            <div className="relative aspect-[3/2] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] bg-neutral-100 group border border-neutral-100">
              <img 
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbC6x8f%2FbtsID8z68N9%2FmQ6KkjK7K8zKqS7K9kS6K1%2Fimg.jpg" 
                alt="엄궁 1구역 하늘채 공식 조감도" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200";
                }}
              />
            </div>
            
            {/* 시각적 장식 요소 (이미지 뒤쪽) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
