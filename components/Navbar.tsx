import React from 'react';
import '../types';

interface NavbarProps {
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#qualification');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.querySelector('input[name="userName"]') as HTMLInputElement;
        if (input) input.focus();
      }, 800);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-neutral-100/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-neutral-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-neutral-200">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-900 font-bold tracking-tight text-lg leading-none">엄궁 1구역 하늘채</span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase mt-1">Premium Residence</span>
            </div>
            {isAdmin && (
              <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] rounded-md font-bold uppercase tracking-widest shadow-sm">Admin</span>
            )}
          </a>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-neutral-500">
            <a href="#overview" className="hover:text-indigo-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all">사업개요</a>
            <button onClick={handleScrollToForm} className="hover:text-indigo-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all">관심고객등록</button>
            <a href="#bulletin" className="hover:text-indigo-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all">정보 공유 게시판</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={handleScrollToForm} className="flex items-center gap-2 text-xs font-bold bg-neutral-900 text-white px-7 py-3.5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-neutral-100 hover:scale-105 active:scale-95">
            등록 신청
            <iconify-icon icon="solar:arrow-right-up-bold"></iconify-icon>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;