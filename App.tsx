
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Pricing from './components/Pricing';
import QualificationCheck from './components/QualificationCheck';
import BulletinBoard from './components/BulletinBoard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem('isRegistered');
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedStatus === 'true') setIsRegistered(true);
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  const handleRegisterSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');
  };

  const handleResetRegistration = () => {
    setIsRegistered(false);
    localStorage.removeItem('isRegistered');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAdminTrigger = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.setItem('isAdmin', 'false');
      alert('관리자 모드가 해제되었습니다.');
    } else {
      setAdminPassword('');
      setLoginError(false);
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '5464') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
      alert('관리자 인증에 성공하였습니다.');
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar isAdmin={isAdmin} />
      <main>
        {/* 메인 비주얼 */}
        <Hero />
        
        {/* 사업 정보 */}
        <Overview />
        
        {/* 분양가 안내 */}
        <Pricing />
        
        {/* 관심고객 등록 (상품권 이벤트 포함) */}
        <QualificationCheck 
          onRegisterSuccess={handleRegisterSuccess} 
          isRegistered={isRegistered} 
          onReset={handleResetRegistration}
        />
        
        {/* 정보 공유 게시판 */}
        <BulletinBoard isRegistered={isRegistered} isAdmin={isAdmin} />
      </main>
      
      <Footer onAdminToggle={toggleAdminTrigger} isAdmin={isAdmin} />

      {/* 관리자 로그인 모달 */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md" 
            onClick={() => setShowAdminLogin(false)}
          ></div>
          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-200 border border-neutral-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="solar:shield-keyhole-bold-duotone" className="text-3xl"></iconify-icon>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">관리자 인증</h3>
              <p className="text-neutral-400 text-xs mt-1 font-medium">관리자 비밀번호를 입력해 주세요.</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="relative">
                <input 
                  type="password" 
                  autoFocus
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className={`w-full bg-neutral-50 border ${loginError ? 'border-red-400 bg-red-50' : 'border-neutral-200'} rounded-2xl px-5 py-4 text-center text-lg font-bold outline-none focus:border-indigo-500 transition-all`}
                />
                {loginError && (
                  <p className="text-[10px] text-red-500 font-bold text-center mt-2 animate-bounce">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 py-4 bg-neutral-100 text-neutral-500 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                >
                  인증하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
