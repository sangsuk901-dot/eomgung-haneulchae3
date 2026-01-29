import React, { useState } from 'react';
import '../types';

interface RegistrationFormProps {
  onRegisterSuccess: () => void;
  isRegistered: boolean;
  onReset?: () => void;
}

// [중요] 데이터가 전송될 구글 시트 주소
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzEqicruBZyp_r1TBzmQ6k8F6t0DtebDhSk0PMLOpM_GKYfXlEQIZVN2QygbKKXKWES/exec';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess, isRegistered, onReset }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone1: '010',
    userPhone2: '',
    userPhone3: '',
    userBirth: '',
    userAddress: '',
    userPyeong: '',
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
      params.append('userPyeong', formData.userPyeong);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setLoading(false);
      localStorage.setItem('isRegistered', 'true');
      onRegisterSuccess();
      alert('관심고객 등록이 완료되었습니다!');
    } catch (error) {
      setLoading(false);
      alert('오류가 발생했습니다.');
    }
  };

  const handleBackToMain = () => {
    if (onReset) onReset();
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isRegistered) {
    return (
      <section id="qualification" className="py-32 px-6 bg-neutral-50 scroll-mt-24 text-center">
        <div className="max-w-4xl mx-auto p-20 rounded-[4rem] bg-white border border-neutral-100 shadow-3xl">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-10">
            <iconify-icon icon="solar:check-read-bold" className="text-4xl"></iconify-icon>
          </div>
          <h3 className="text-4xl font-bold mb-6 tracking-tight text-neutral-900">등록이 완료되었습니다</h3>
          <p className="text-neutral-500 mb-12 text-lg font-medium leading-relaxed">
            귀한 발걸음에 감사드립니다.<br/>
            엄궁 1구역 하늘채의 최신 정보를 가장 신속하게 안내해 드리겠습니다.
          </p>
          <button onClick={handleBackToMain} className="px-12 py-5 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl">메인으로 이동</button>
        </div>
      </section>
    );
  }

  return (
    <section id="qualification" className="py-32 px-6 bg-[#fdfdfd] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center reveal">
            <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4 block">Exclusive Membership</span>
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">관심고객 멤버십 등록</h3>
            <div className="w-12 h-1 bg-neutral-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* 상품권 이미지 섹션: 원본 이미지의 가치를 살린 정갈한 디자인 */}
          <div className="lg:col-span-5 reveal">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-neutral-100 h-full">
              <div className="mb-12">
                <h4 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-4">Benefit 01</h4>
                <h3 className="text-3xl font-bold text-neutral-900 leading-tight mb-6">당첨 및 계약 축하<br/><span className="text-indigo-600">신세계 상품권 증정</span></h3>
                <p className="text-neutral-500 font-medium leading-relaxed">
                  엄궁 1구역 하늘채에 대한 깊은 관심에 보답하고자<br/>
                  정당 계약을 진행하시는 고객님께 감사의 선물을 드립니다.
                </p>
              </div>
              
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src="https://i.imgur.com/fC60vpg.jpg" 
                  alt="신세계 상품권" 
                  className="w-full h-auto block object-cover"
                />
              </div>

              <div className="mt-12 space-y-5">
                <div className="flex items-center gap-4 py-4 border-b border-neutral-50">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <iconify-icon icon="solar:star-bold" className="text-xl"></iconify-icon>
                  </div>
                  <span className="text-neutral-800 font-bold">신세계 상품권 10만원권 (계약 시)</span>
                </div>
                <div className="flex items-center gap-4 py-4 border-b border-neutral-50">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <iconify-icon icon="solar:bell-bing-bold" className="text-xl"></iconify-icon>
                  </div>
                  <span className="text-neutral-800 font-bold">분양가 및 잔여세대 실시간 알림 서비스</span>
                </div>
              </div>
            </div>
          </div>

          {/* 등록 폼 섹션: 정돈된 레이아웃 및 약관 추가 */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-8 md:p-16 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-neutral-100 space-y-8 reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" name="userName" required value={formData.userName} onChange={handleChange} placeholder="성함을 입력하세요" className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Birth Date</label>
                <input type="text" name="userBirth" required value={formData.userBirth} onChange={handleChange} maxLength={6} placeholder="주민번호 앞 6자리" className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Mobile Contact</label>
              <div className="flex gap-2">
                {/* 010 박스 너비 최적화 (w-20) */}
                <input type="text" value="010" readOnly className="w-20 bg-neutral-100 py-5 text-center rounded-2xl text-neutral-400 font-black" />
                <input type="text" name="userPhone2" maxLength={4} required value={formData.userPhone2} onChange={handleChange} className="flex-1 p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-center outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
                <input type="text" name="userPhone3" maxLength={4} required value={formData.userPhone3} onChange={handleChange} className="flex-1 p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-center outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Resident Area</label>
                <input type="text" name="userAddress" required value={formData.userAddress} onChange={handleChange} placeholder="예: 부산시 사상구" className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Interest Type</label>
                <input type="text" name="userPyeong" required value={formData.userPyeong} onChange={handleChange} placeholder="예: 84A 타입" className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" />
              </div>
            </div>

            {/* 개인정보 수집 및 이용 동의 상세 박스 */}
            <div className="space-y-3 pt-4">
              <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">Terms & Privacy</label>
              <div className="w-full h-32 overflow-y-auto bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-[12px] text-neutral-500 leading-relaxed font-medium">
                <p className="font-bold text-neutral-900 mb-2">[개인정보 수집 및 이용 동의]</p>
                <p className="mb-3">노다지 부동산(이하 “회사”)은 「개인정보 보호법」에 따라 고객의 개인정보를 수집·이용함에 있어 아래와 같은 내용을 안내드립니다.</p>
                
                <p className="font-bold text-neutral-700 mb-1">1. 수집하는 개인정보 항목</p>
                <ul className="list-disc ml-4 mb-3">
                  <li>성함, 생년월일(6자리), 휴대폰번호, 주소(거주지역), 관심 평형(평수)</li>
                </ul>

                <p className="font-bold text-neutral-700 mb-1">2. 개인정보 수집 및 이용 목적</p>
                <ul className="list-disc ml-4 mb-3">
                  <li>부동산 매물 안내 및 상담, 맞춤형 부동산 정보 제공, 분양/매매/임대 관련 안내, 고객 관리</li>
                </ul>

                <p className="font-bold text-neutral-700 mb-1">3. 개인정보 보유 및 이용 기간</p>
                <ul className="list-disc ml-4 mb-3">
                  <li>상담 종료 또는 동의 철회 시까지 (목적 달성 후 지체 없이 파기)</li>
                </ul>

                <p className="font-bold text-neutral-700 mb-1">4. 개인정보의 제3자 제공</p>
                <p className="mb-3">회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>

                <p className="font-bold text-neutral-700 mb-1">5. 동의 거부 권리 및 불이익</p>
                <p>이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으나, 거부 시 부동산 상담 및 매물 안내 등 서비스 제공에 제한이 있을 수 있습니다.</p>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" name="privacyAgreed" checked={formData.privacyAgreed} onChange={handleChange} className="peer sr-only" />
                  <div className="w-6 h-6 rounded-md border-2 border-neutral-200 peer-checked:bg-neutral-900 peer-checked:border-neutral-900 flex items-center justify-center transition-all">
                    <iconify-icon icon="solar:check-bold" className="text-white text-[10px] opacity-0 peer-checked:opacity-100"></iconify-icon>
                  </div>
                </div>
                <span className="text-[14px] font-bold text-neutral-500 group-hover:text-neutral-900 transition-colors">개인정보 수집 및 이용에 동의합니다 (필수)</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full py-6 bg-neutral-900 text-white rounded-[1.5rem] font-bold text-xl hover:bg-indigo-600 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50">
              {loading ? '신청 처리 중...' : '관심고객 멤버십 등록 신청'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
