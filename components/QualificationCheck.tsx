import React, { useState } from 'react';
import '../types';

interface RegistrationFormProps {
  onRegisterSuccess: () => void;
  isRegistered: boolean;
  onReset?: () => void;
}

// 1. 구글 시트 주소 (데이터가 가는 곳)
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
        <div className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-white border border-indigo-100 shadow-2xl">
          <iconify-icon icon="solar:check-read-bold" className="text-6xl text-indigo-600 mb-6"></iconify-icon>
          <h3 className="text-3xl font-bold mb-4">등록 완료</h3>
          <p className="text-neutral-500 mb-8">성공적으로 등록되었습니다.</p>
          <button onClick={handleBackToMain} className="px-10 py-4 bg-neutral-900 text-white rounded-2xl font-bold">메인으로</button>
        </div>
      </section>
    );
  }

  return (
    <section id="qualification" className="py-32 px-6 bg-neutral-50/50 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
            <h3 className="text-4xl font-bold text-neutral-900 mb-5 text-gradient">관심고객 등록</h3>
            <p className="text-neutral-500 font-medium">프리미엄 정보를 가장 빠르게 안내해 드립니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="p-10 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-3xl font-bold mb-6">당첨 축하 이벤트</h3>
              <p className="text-indigo-50 mb-8">등록 후 계약 시 신세계 상품권 10만원 증정!</p>
              
              {/* 2. 이벤트 사진 주소 (여기 src="주소"만 바꾸면 사진이 바뀜) */}
              <div className="rounded-2xl overflow-hidden border border-white/20 mb-8">
                <img 
                  src="https://i.imgur.com/fC60vpg.jpg" 
                  alt="이벤트 이미지" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl space-y-8 border border-neutral-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="userName" required value={formData.userName} onChange={handleChange} placeholder="성함" className="w-full p-4 bg-neutral-50 border rounded-2xl outline-none focus:border-indigo-500" />
              <input type="text" name="userBirth" required value={formData.userBirth} onChange={handleChange} maxLength={6} placeholder="생년월일(6자리)" className="w-full p-4 bg-neutral-50 border rounded-2xl outline-none focus:border-indigo-500" />
            </div>

            <div className="flex gap-2">
              <input type="text" value="010" readOnly className="w-20 bg-neutral-100 p-4 text-center rounded-2xl text-neutral-400" />
              <input type="text" name="userPhone2" maxLength={4} required value={formData.userPhone2} onChange={handleChange} className="flex-1 p-4 bg-neutral-50 border rounded-2xl text-center outline-none" />
              <input type="text" name="userPhone3" maxLength={4} required value={formData.userPhone3} onChange={handleChange} className="flex-1 p-4 bg-neutral-50 border rounded-2xl text-center outline-none" />
            </div>

            <input type="text" name="userAddress" required value={formData.userAddress} onChange={handleChange} placeholder="거주 지역 (예: 부산 사상구)" className="w-full p-4 bg-neutral-50 border rounded-2xl outline-none" />
            <input type="text" name="userPyeong" required value={formData.userPyeong} onChange={handleChange} placeholder="관심 평형 (예: 84A)" className="w-full p-4 bg-neutral-50 border rounded-2xl outline-none" />

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="privacyAgreed" checked={formData.privacyAgreed} onChange={handleChange} className="w-5 h-5 accent-indigo-600" />
              <span className="text-sm font-bold text-neutral-600">개인정보 수집 및 이용 동의 (필수)</span>
            </label>

            <button type="submit" disabled={loading} className="w-full py-5 bg-neutral-900 text-white rounded-[2rem] font-bold text-xl hover:bg-indigo-600 transition-all shadow-xl">
              {loading ? '처리 중...' : '등록 신청하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
