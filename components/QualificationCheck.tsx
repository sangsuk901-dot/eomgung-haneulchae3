import React, { useState } from 'react';
import '../types';

interface RegistrationFormProps {
  onRegisterSuccess: () => void;
  isRegistered: boolean;
  onReset?: () => void;
}

// 사용자가 제공한 구글 앱스 스크립트 URL
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwgxzH4WzJKS6F_EklXbbEaQ-7OM_iyN5Dqs-wKLF-rYLaNSukt9XwyBWrtepgS8nz7/exec';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess, isRegistered, onReset }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone1: '010',
    userPhone2: '',
    userPhone3: '',
    userBirth: '',
    userAddress: '',
    privacyAgreed: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.privacyAgreed) return alert('개인정보 수집 및 이용에 동의해주세요.');

    setLoading(true);

    try {
      const fullPhone = `${formData.userPhone1}-${formData.userPhone2}-${formData.userPhone3}`;
      const params = new URLSearchParams();
      params.append('formType', '관심고객 등록');
      params.append('userName', formData.userName);
      params.append('userPhone', fullPhone);
      params.append('userBirth', formData.userBirth);
      params.append('userAddress', formData.userAddress);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setLoading(false);
      alert('관심고객 등록이 완료되었습니다!');
      onRegisterSuccess();
    } catch (error) {
      console.error('Submit Error:', error);
      setLoading(false);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  const handleBackToMain = () => {
    if (onReset) {
      onReset();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isRegistered) {
    return (
      <section id="qualification" className="py-32 px-6 bg-neutral-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="p-16 rounded-[3rem] bg-white border border-indigo-100 shadow-2xl">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <iconify-icon icon="solar:check-read-bold" className="text-5xl"></iconify-icon>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">관심고객 등록 완료</h3>
            <p className="text-neutral-500 mb-8 text-lg font-medium leading-relaxed">신청해주셔서 감사합니다.<br />분양 소식을 가장 빠르게 전달해 드리겠습니다.</p>
            <button 
              onClick={handleBackToMain} 
              className="px-10 py-4 bg-neutral-900 text-white rounded-2xl font-bold text-base hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              메인으로 이동
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualification" className="py-32 px-6 bg-neutral-50/50 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 reveal text-center">
            <h3 className="text-4xl font-bold text-neutral-900 mb-5">관심고객 등록</h3>
            <p className="text-neutral-500 font-medium text-lg">가장 먼저 만나는 프리미엄 주거 정보 서비스</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="sticky top-32 space-y-6">
              <div className="p-12 md:p-14 rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <iconify-icon icon="solar:gift-bold-duotone" className="absolute -right-8 -bottom-8 text-[14rem] opacity-10 group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase mb-8 backdrop-blur-md tracking-wider">Exclusive Benefit</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">관심고객 전용<br />당첨 축하 이벤트</h3>
                <p className="text-indigo-50 text-lg font-medium mb-12 leading-relaxed">
                  관심고객 등록 후<br />
                  <span className="text-white font-bold">청약 당첨 및 계약 진행하시는 분들께</span><br />
                  <span className="text-white font-bold underline underline-offset-8 decoration-4">신세계 상품권 10만원권</span>을<br />증정해 드립니다.
                </p>
                <div className="flex items-center gap-3 text-sm font-bold text-indigo-100">
                  <iconify-icon icon="solar:info-circle-bold-duotone" className="text-xl"></iconify-icon>
                  본인 확인 절차 후 개별 증정
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-white border border-neutral-100 shadow-xl">
                 <h4 className="text-sm font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <iconify-icon icon="solar:bell-binging-bold-duotone" className="text-indigo-500"></iconify-icon>
                    제공 서비스 안내
                 </h4>
                 <ul className="space-y-4">
                    {[
                      '청약 일정 및 분양정보 안내',
                      '타입별 특장점 및 견본주택 방문 예약',
                      '1:1 전담 상담사 청약 자격 분석'
                    ].map((text, idx) => (
                      <li key={idx} className="flex gap-3 text-sm font-medium text-neutral-600">
                        <iconify-icon icon="solar:check-circle-bold" className="text-indigo-500 mt-0.5"></iconify-icon>
                        {text}
                      </li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl space-y-10 reveal border border-neutral-100/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.1em] ml-1">성함</label>
                <input type="text" name="userName" required value={formData.userName} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4.5 focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="성함을 입력하세요" />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.1em] ml-1">생년월일 (6자리)</label>
                <input type="text" name="userBirth" required value={formData.userBirth} onChange={handleChange} maxLength={6} className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4.5 focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="예: 900101" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.1em] ml-1">휴대폰번호</label>
              <div className="flex items-center gap-2 sm:gap-4">
                <input type="text" name="userPhone1" maxLength={3} value={formData.userPhone1} readOnly className="w-16 sm:w-24 bg-neutral-100 border border-neutral-100 rounded-2xl py-4.5 text-center font-bold text-neutral-400 cursor-not-allowed shadow-inner" />
                <input type="text" name="userPhone2" maxLength={4} required value={formData.userPhone2} onChange={handleChange} className="flex-1 min-w-0 bg-neutral-50 border border-neutral-100 rounded-2xl py-4.5 text-center focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm" />
                <input type="text" name="userPhone3" maxLength={4} required value={formData.userPhone3} onChange={handleChange} className="flex-1 min-w-0 bg-neutral-50 border border-neutral-100 rounded-2xl py-4.5 text-center focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.1em] ml-1">주소 (거주지역)</label>
              <input type="text" name="userAddress" required value={formData.userAddress} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4.5 focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="시/군/구까지만 입력해 주세요" />
            </div>

            <div className="bg-neutral-50 rounded-[1.5rem] border border-neutral-100 overflow-hidden">
              <div className="bg-neutral-100/50 px-6 py-3.5 border-b border-neutral-100 flex justify-between items-center">
                <h4 className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">개인정보 취급방침</h4>
              </div>
              <div className="p-6 h-48 overflow-y-auto text-[11px] text-neutral-500 leading-relaxed font-medium">
                <p className="mb-3 font-bold text-neutral-800">(1) 제공 대상</p>
                - 회사와 회사가 지정한 공식 분양대행사(분양사)<br />
                - 회사는 소개수수료(MGM)를 받을 수 있음<br /><br />
                
                <p className="mb-3 font-bold text-neutral-800">(2) 제공하는 개인정보 항목</p>
                - 이름, 거주지역, 생년월일, 휴대전화번호, 청약통장종류, 청약순위, 선호평형, 성별 등 (필요 항목 일부 또는 전부)<br /><br />
                
                <p className="mb-3 font-bold text-neutral-800">(3) 제공 목적</p>
                - 분양정보 안내, 상담, 콘텐츠 제공, 민원 처리, 이벤트 및 광고 정보 전달<br />
                - 고객사전추천(MGM), 인구통계 기반 서비스 제공, 회원 서비스 이용 통계, DM/TM 발송 등<br /><br />
                
                <p className="mb-3 font-bold text-neutral-800">(4) 제공 정보 보유 및 이용기간</p>
                - 수집·이용 목적 달성 후 지체 없이 파기<br />
                - 단, 고객 요청 또는 법령상 필요 시 예외 적용<br /><br />
                
                <p className="mb-3 font-bold text-neutral-800">(5) 거부권 안내</p>
                - 고객은 개인정보 제3자 제공에 대한 동의를 거부할 수 있습니다.<br />
                - 단, 거부 시 관심고객 등록 및 일부 서비스 이용에 제한이 있을 수 있습니다.<br /><br />
                
                <p className="italic text-neutral-400">본 개인정보 취급방침은 관심고객 등록 및 분양 상담을 위한 안내용으로 제공됩니다.</p>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" name="privacyAgreed" checked={formData.privacyAgreed} onChange={handleChange} className="peer sr-only" />
                  <div className="w-6 h-6 rounded-lg border-2 border-neutral-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition-all flex items-center justify-center text-white">
                    <iconify-icon icon="solar:check-bold" className="text-sm opacity-0 peer-checked:opacity-100"></iconify-icon>
                  </div>
                </div>
                <span className="text-[15px] font-bold text-neutral-700 group-hover:text-indigo-600 transition-colors">위 개인정보 수집 및 이용에 동의합니다. (필수)</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full py-5.5 bg-neutral-900 text-white rounded-[2rem] font-bold text-xl hover:bg-indigo-600 transition-all shadow-2xl shadow-neutral-200 disabled:opacity-50 hover:-translate-y-1 active:scale-95">
              {loading ? '신청 처리 중...' : '등록 신청하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;