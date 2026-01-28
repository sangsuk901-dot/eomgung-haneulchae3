
import React from 'react';
// Explicitly import types to pull in global JSX augmentations for 'iconify-icon'
import '../types';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center sm:text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-white mb-6">
            Engineered for Performance.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.01] p-10 hover:border-indigo-500/30 transition-all duration-700 backdrop-blur-xl">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-10 text-indigo-400 border border-indigo-500/20 shadow-inner">
                <iconify-icon icon="solar:widget-add-linear" width="28"></iconify-icon>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-time Visibility</h3>
              <p className="text-neutral-400 font-normal leading-relaxed max-w-md mb-12">
                Gain instant insights into every execution. Debug workflows in real-time with our visual playback engine.
              </p>
              
              <div className="mt-auto border border-white/[0.05] rounded-2xl bg-black/60 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Active Nodes</span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="grid grid-cols-5 gap-3 h-20 items-end">
                  {[40, 70, 45, 90, 60].map((h, i) => (
                    <div key={i} className="bg-gradient-to-t from-indigo-500/40 to-indigo-500 rounded-lg group-hover:from-indigo-400 group-hover:to-indigo-300 transition-all duration-500" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.01] p-10 hover:border-purple-500/30 transition-all duration-700 backdrop-blur-xl">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-10 text-purple-400 border border-purple-500/20">
                <iconify-icon icon="solar:shield-keyhole-bold-duotone" width="28"></iconify-icon>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Vault Security</h3>
              <p className="text-neutral-400 font-normal leading-relaxed mb-10">
                Encrypted at rest and in transit. Your secrets never leave the edge.
              </p>
              
              <div className="space-y-4 mt-auto">
                {['End-to-end AES-256', 'Granular RBAC', 'Audit Compliance'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.03] group-hover:bg-white/[0.06] transition-all">
                    <iconify-icon icon="solar:check-circle-bold" className="text-emerald-500/60"></iconify-icon>
                    <span className="text-sm font-medium text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Small Cards */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.01] p-10 hover:border-cyan-500/30 transition-all duration-700 backdrop-blur-xl">
             <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20">
                <iconify-icon icon="solar:bolt-bold-duotone" width="24"></iconify-icon>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Edge Native</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Execute functions in <span className="text-neutral-300 font-medium">100+ locations</span> simultaneously.
              </p>
          </div>

          <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.01] p-10 hover:border-orange-500/30 transition-all duration-700 backdrop-blur-xl">
             <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-400 border border-orange-500/20">
                <iconify-icon icon="solar:code-bold-duotone" width="24"></iconify-icon>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">SDK Mastery</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Type-safe clients for <span className="text-neutral-300 font-medium">TypeScript, Go, and Python</span>.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
