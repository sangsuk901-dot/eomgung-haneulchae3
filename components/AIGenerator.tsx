
import React, { useState } from 'react';
import { generateWorkflow } from '../services/geminiService';
import { WorkflowPlan } from '../types';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WorkflowPlan | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateWorkflow(prompt);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Workflow design failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-generator" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/20">
            Powered by Gemini
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            AI-Driven Architecture.
          </h2>
          <p className="text-neutral-500 font-normal max-w-xl mx-auto">
            Describe your business logic in plain English. Our AI will architect a 
            fully functional, cloud-native workflow for you in seconds.
          </p>
        </div>

        <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 overflow-hidden shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative bg-neutral-950/90 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]"></div>
            
            <form onSubmit={handleGenerate} className="relative z-10 space-y-6 mb-12">
              <div className="relative">
                <iconify-icon icon="solar:magic-stick-3-bold" className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-indigo-500/50"></iconify-icon>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask Nexflow AI to build something..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.05] transition-all text-lg font-light shadow-inner"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 ${
                    loading 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5' 
                    : 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  {loading ? (
                    <>
                      <iconify-icon icon="line-md:loading-twotone-loop" className="text-2xl"></iconify-icon>
                      Architecting Flow...
                    </>
                  ) : (
                    <>
                      Design Workflow
                      <iconify-icon icon="solar:arrow-right-linear" className="text-xl"></iconify-icon>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm mb-12 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <iconify-icon icon="solar:danger-triangle-bold" className="text-xl"></iconify-icon>
                {error}
              </div>
            )}

            {result ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-500/20">
                        {result.industry}
                      </span>
                    </div>
                    <h3 className="text-3xl font-semibold text-white tracking-tight">{result.name}</h3>
                  </div>
                  <div className="md:text-right max-w-xs">
                    <p className="text-neutral-500 text-sm font-medium italic">
                      "<span className="text-neutral-300">{result.benefit}</span>"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 relative">
                  {result.steps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-8 group/step">
                      {index < result.steps.length - 1 && (
                        <div className="absolute left-[27px] top-14 bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-transparent"></div>
                      )}
                      
                      <div className={`relative z-10 w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-2xl group-hover/step:scale-110 ${
                        step.type === 'trigger' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        step.type === 'condition' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                        'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      }`}>
                        <iconify-icon icon={
                          step.type === 'trigger' ? 'solar:play-bold' : 
                          step.type === 'condition' ? 'solar:tuning-bold' : 
                          'solar:square-academic-cap-bold'
                        } className="text-2xl"></iconify-icon>
                        <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-neutral-900 border border-white/10 text-[10px] font-bold flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem] group-hover/step:bg-white/[0.04] group-hover/step:border-white/10 transition-all shadow-inner">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-semibold tracking-tight">{step.title}</span>
                          <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${
                             step.type === 'trigger' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                             step.type === 'condition' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                             'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                          }`}>
                            {step.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 font-normal leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Execution ID: NF-{Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
                    <div className="flex gap-3">
                        <button className="text-xs font-bold text-neutral-400 hover:text-white bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 transition-all flex items-center gap-2">
                            <iconify-icon icon="solar:settings-linear"></iconify-icon>
                            Edit Flow
                        </button>
                        <button className="text-xs font-bold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-xl transition-all flex items-center gap-2">
                            Deploy Now
                        </button>
                    </div>
                </div>
              </div>
            ) : !loading && (
              <div className="h-80 flex flex-col items-center justify-center text-neutral-600 space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center">
                    <iconify-icon icon="solar:palet-2-linear" width="32" className="opacity-20"></iconify-icon>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-neutral-500">Awaiting your instruction...</p>
                    <p className="text-xs text-neutral-700 mt-1">Try: "Handle user signups by creating a Stripe customer and sending a Welcome email"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;
