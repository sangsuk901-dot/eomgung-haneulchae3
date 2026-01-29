import React from 'react';
import '../types';

const Pricing: React.FC = () => {
  const plans = [
    { type: '59㎡', subType: 'A · B Type', price: '공급 예정', units: '실속형 대단지', desc: '합리적 공간 구성의 20평형대' },
    { type: '74㎡', subType: 'A · B Type', price: '공급 예정', units: '틈새 평면의 혁신', desc: '여유로운 수납과 개방감' },
    { type: '84㎡', subType: 'A · B · C Type', price: '공급 예정', units: '주력 메인 평형', desc: '가장 선호도 높은 30평형대 표준' },
    { type: '101㎡', subType: 'A · B Type', price: '공급 예정', units: '프리미엄 대형 평형', desc: '최고의 품격을 담은 고품격 주거' },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">분양가 및 공급 안내</h2>
          <p className="text-neutral-500 font-medium">엄궁 1구역 하늘채의 타입별 공급 정보를 안내해 드립니다.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="p-8 rounded-3xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-xl transition-all">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">{p.subType}</span>
              <h3 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tighter">{p.type}</h3>
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-bold">분양가</span>
                  <span className="text-neutral-900 font-bold">{p.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-bold">특징</span>
                  <span className="text-neutral-900 font-bold text-right">{p.units}</span>
                </div>
                <p className="text-[13px] text-neutral-500 pt-2 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
          * 세부 분양가는 입주자 모집 공고 시 최종 확정됩니다.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
