
import React from 'react';
import '../types';

interface FooterProps {
  onAdminToggle?: () => void;
  isAdmin?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminToggle, isAdmin }) => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100 pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8 group">
              <div className="w-9 h-9 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-200">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-black tracking-tight text-neutral-900">엄궁 1구역 하늘채</span>
            </div>
            <p className="text-base text-neutral-500 leading-relaxed max-w-sm font-medium">
              부산의 변화를 주도하는 1,670세대 랜드마크 아파트.<br />
              엄궁 1구역 하늘채가 선보이는 최고의 주거 가치를 경험해 보세요.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-neutral-900 mb-8 uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4 text-[13px] font-bold text-neutral-500">
              <li><a href="#overview" className="hover:text-indigo-600 transition-colors">사업개요</a></li>
              <li><a href="#qualification" className="hover:text-indigo-600 transition-colors">관심고객등록</a></li>
              <li><a href="#bulletin" className="hover:text-indigo-600 transition-colors">정보 공유 게시판</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-neutral-900 mb-8 uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-4 text-[13px] font-bold text-neutral-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">오시는 길</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">이용약관</a></li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 섹션: 김순남, 노다지부동산 정보 반영 및 가독성 최적화 */}
        <div className="pt-10 border-t border-neutral-200/50 mb-10">
          <div className="flex flex-col md:flex-row flex-wrap gap-x-10 gap-y-4 text-[14px] text-neutral-500 font-medium">
            <div className="flex gap-2.5">
              <span className="font-bold text-neutral-900">성명</span>
              <span>김순남</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-bold text-neutral-900">상호</span>
              <span>노다지부동산</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-bold text-neutral-900">사업자번호</span>
              <span>146-03-02907</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-bold text-neutral-900">주소</span>
              <span>부산시 사상구 엄궁중로 36 1층</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">© 2024 Eomgung Haneulchae.</p>
            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
            <p className="text-[11px] text-neutral-400 font-medium">Built with Excellence</p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={onAdminToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all shadow-sm ${isAdmin ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200'}`}
            >
              <iconify-icon icon={isAdmin ? "solar:shield-check-bold" : "solar:shield-keyhole-bold"} className="text-base"></iconify-icon>
              {isAdmin ? 'ADMIN ACTIVE' : 'ADMIN LOGIN'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
