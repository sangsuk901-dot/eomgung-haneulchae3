
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#qualification');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.querySelector('input[name="userName"]') as HTMLInputElement;
        if (input) input.focus();
      }, 800);
    }
  };

  const handleScrollToOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#overview');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative pt-32 pb-20 md:pt-60 md:pb-48 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center reveal">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] md:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase mb-8 border border-indigo-100/50 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Premium Residence Project
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.1] md:leading-[1.05] break-keep">
          <span className="text-gradient">엄궁 1구역 하늘채</span><br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600">
            예비 청약자 관심등록 안내
          </span>
        </h1>
        <p className="text-base md:text-2xl text-neutral-500 mb-12 max-w-3xl mx-auto leading-relaxed font-normal break-keep px-4">
          부산의 변화를 주도하는 <span className="text-neutral-900 font-semibold">1,670세대</span> 대단지 아파트.<br className="hidden md:block" />
          가장 앞선 주거 가치와 분양 정보를 지금 확인해 보세요.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <button 
            onClick={handleScrollToForm}
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-bold text-base md:text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            관심고객 등록하기
          </button>
          <button 
            onClick={handleScrollToOverview}
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-neutral-900 border border-neutral-200 rounded-2xl md:rounded-[2rem] font-bold text-base md:text-lg hover:bg-neutral-50 transition-all hover:border-neutral-300"
          >
            사업 정보 확인
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
