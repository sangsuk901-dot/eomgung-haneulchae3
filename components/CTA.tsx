
import React, { useState } from 'react';
// Explicitly import types to pull in global JSX augmentations for 'iconify-icon'
import '../types';

// ⭐ 사용자가 제공한 전문가 상담 전용 최신 구글 앱스 스크립트 URL
const CTA_GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzIUzQNDIJT1qx1Z8OfRpdtQzOJ8_8187vwVVOJuJlft1dJbMdxYv8PhaJ4kl9sGtHk/exec';

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    console.log('상담 신청 시도:', formData);

    try {
      const params = new URLSearchParams();
      params.append('formType', '전문가 상담 신청');
      params.append('userName', formData.name);
      params.append('userPhone', formData.phone);

      // 구글 앱스 스크립트는 no-cors 모드에서 응답을 반환하지 않으므로 
      // fetch가 완료되면 성공으로 간주하고 UI를 전환합니다.
      await fetch(CTA_GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(), // toString()으로 명시적 변환
      });

      // no-cors는 결과값을 읽을 수 없으므로 성공으로 간주
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', phone: '' });
      
    } catch (error) {
      console.error('CTA Submit Error:', error);
      setLoading(false);
      alert('신청 처리 중 오류가 발생했습니다. 네트워크 상태를 확인하시거나 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-indigo-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        {!isSubmitted ? (
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-6">
              EXPERT CONSULTATION
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">전문가 상담 신청</h2>
            <p className="text-neutral-500 mb-12 leading-relaxed">
              엄궁 1구역 하늘채 전문 상담원이<br />
              청약 자격 및 분양 일정을 친절하게 안내해 드립니다.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-400 ml-2 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="성함을 입력하세요" 
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-400 ml-2 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="연락처를 입력하세요 (예: 010-1234-5678)" 
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm" 
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-neutral-900 text-white font-bold rounded-2xl px-6 py-5 hover:bg-indigo-600 transition-all flex justify-center items-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <iconify-icon icon="line-md:loading-twotone-loop" className="text-2xl"></iconify-icon>
                      <span>전송 중...</span>
                    </>
                  ) : (
                    <>
                      <span>상담 신청하기</span>
                      <iconify-icon icon="solar:arrow-right-bold" className="text-xl group-hover:translate-x-1 transition-transform"></iconify-icon>
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-neutral-400 mt-6">
                본 신청을 통해 수집된 정보는 상담 목적 이외에 사용되지 않습니다.
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-indigo-100 reveal">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <iconify-icon icon="solar:check-circle-bold" className="text-6xl"></iconify-icon>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">상담 신청 완료!</h2>
            <p className="text-neutral-500 mb-10 leading-relaxed font-medium">
              성공적으로 신청이 접수되었습니다.<br />
              담당 상담사가 최대한 빨리 연락드리겠습니다.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="px-10 py-4 bg-neutral-100 text-neutral-600 font-bold rounded-2xl hover:bg-neutral-200 transition-all text-sm"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
