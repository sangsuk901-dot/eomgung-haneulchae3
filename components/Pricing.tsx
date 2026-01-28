
import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    { type: '타입 미정', price: '공급 예정', units: '미정', ratio: '-' },
    { type: '타입 미정', price: '공급 예정', units: '미정', ratio: '-' },
    { type: '타입 미정', price: '공급 예정', units: '미정', ratio: '-' },
    { type: '타입 미정', price: '공급 예정', units: '미정', ratio: '-' },
  ];

  return (
    <section id="pricing" className="py-24 px-6 relative bg-neutral-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">분양가 및 공급 안내</h2>
          <p className="text-neutral-500 text-sm">※ 구체적인 평형 및 분양가는 추후 확정 시 공고됩니다.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-neutral-100 hover:border-indigo-200 hover:shadow-2xl transition-all text-center group">
              <p className="text-indigo-600 font-black text-[10px] tracking-widest uppercase mb-4">Unit Specification</p>
              <h4 className="text-2xl font-bold text-neutral-900 mb-2">{p.type}</h4>
              <p className="text-neutral-500 text-xs mb-8 font-medium">공급 규모 미정</p>
              <div className="text-xl font-black text-indigo-600 mb-8 bg-indigo-50 py-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">{p.price}</div>
              <div className="space-y-4 pt-6 border-t border-neutral-100">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-500">계약금</span>
                  <span className="text-neutral-900">추후 공고</span>
                </div>
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-500">전용률</span>
                  <span className="text-neutral-900">{p.ratio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
