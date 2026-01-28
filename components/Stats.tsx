
import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden border-y border-white/[0.05] bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {[
          { label: 'Response Time', value: '< 50ms', color: 'text-cyan-400' },
          { label: 'Daily Events', value: '100M+', color: 'text-purple-400' },
          { label: 'Support Service', value: '24/7', color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className={`text-4xl md:text-5xl font-bold mb-3 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.2em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
