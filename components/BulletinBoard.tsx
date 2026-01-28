import React, { useState, useEffect } from 'react';
import '../types';

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  password?: string;
  isAdminPost?: boolean;
}

interface Post {
  id: string;
  category: '공지' | '안내' | '자유';
  title: string;
  author: string;
  content: string;
  date: string;
  password?: string;
  isAdminPost?: boolean;
  replies?: Reply[];
}

interface BulletinBoardProps {
  isAdmin: boolean;
  isRegistered: boolean;
}

const BulletinBoard: React.FC<BulletinBoardProps> = ({ isAdmin, isRegistered }) => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '자유' as '자유' | '공지', password: '' });
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  // 삭제 확인 모달 관련 상태
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'post' | 'reply', postId: string, replyId?: string, targetObj: Post | Reply } | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  // 답글 관련 상태
  const [replyInput, setReplyInput] = useState<{ [postId: string]: { content: string, password: string } }>({});
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('unifiedPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const initialPosts: Post[] = [
        {
          id: 'n1',
          category: '공지',
          title: '엄궁 1구역 하늘채 분양 정보 게시판 운영 안내',
          author: '분양본부',
          content: '본 게시판은 분양 관련 상세 정보 안내를 위해 운영됩니다. 실시간 뉴스 및 공식 일정을 가장 먼저 확인하실 수 있습니다.',
          date: '2024.05.20',
          isAdminPost: true,
          replies: []
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('unifiedPosts', JSON.stringify(initialPosts));
    }
  }, []);

  const handleWritePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    setLoading(true);
    const authorName = isAdmin ? '분양본부' : '방문자';
    const postDate = new Date().toLocaleDateString('ko-KR').slice(0, -1);

    const post: Post = {
      id: Date.now().toString(),
      category: isAdmin ? newPost.category : '자유',
      title: newPost.title,
      content: newPost.content,
      author: authorName,
      date: postDate,
      password: newPost.password,
      isAdminPost: isAdmin,
      replies: []
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('unifiedPosts', JSON.stringify(updatedPosts));
    
    setLoading(false);
    setShowWriteModal(false);
    setNewPost({ title: '', content: '', category: '자유', password: '' });
    setCurrentPage(1); // 새 글 작성 시 1페이지로 이동
  };

  const confirmDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteTarget) return;

    const { type, postId, replyId, targetObj } = deleteTarget;

    if (isAdmin || (targetObj.password === deletePassword)) {
      if (type === 'post') {
        const updated = posts.filter(p => p.id !== postId);
        setPosts(updated);
        localStorage.setItem('unifiedPosts', JSON.stringify(updated));
        
        // 만약 현재 페이지의 글이 모두 삭제되면 이전 페이지로 이동
        const remainingFreePostsCount = updated.filter(p => p.category !== '공지').length;
        const maxPage = Math.max(1, Math.ceil(remainingFreePostsCount / postsPerPage));
        if (currentPage > maxPage) setCurrentPage(maxPage);

      } else {
        const updatedPosts = posts.map(p => {
          if (p.id === postId) {
            return { ...p, replies: p.replies?.filter(r => r.id !== replyId) };
          }
          return p;
        });
        setPosts(updatedPosts);
        localStorage.setItem('unifiedPosts', JSON.stringify(updatedPosts));
      }
      setDeleteTarget(null);
      setDeletePassword('');
      setDeleteError(false);
      alert('삭제되었습니다.');
    } else {
      setDeleteError(true);
      setTimeout(() => setDeleteError(false), 2000);
    }
  };

  const handleWriteReply = (postId: string) => {
    const input = replyInput[postId];
    if (!input || !input.content.trim()) return;

    const authorName = isAdmin ? '분양본부' : '방문자';
    const replyDate = new Date().toLocaleDateString('ko-KR').slice(0, -1);

    const newReply: Reply = {
      id: Date.now().toString(),
      author: authorName,
      content: input.content,
      date: replyDate,
      password: input.password,
      isAdminPost: isAdmin
    };

    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return { ...p, replies: [...(p.replies || []), newReply] };
      }
      return p;
    });

    setPosts(updatedPosts);
    localStorage.setItem('unifiedPosts', JSON.stringify(updatedPosts));
    setReplyInput({ ...replyInput, [postId]: { content: '', password: '' } });
  };

  // 공지와 자유게시글 분리하여 정렬
  const noticePosts = posts.filter(p => p.category === '공지').sort((a, b) => parseInt(b.id) - parseInt(a.id));
  const freePosts = posts.filter(p => p.category !== '공지').sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // 페이지네이션 로직
  const totalPages = Math.max(1, Math.ceil(freePosts.length / postsPerPage));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFreePosts = freePosts.slice(indexOfFirstPost, indexOfLastPost);

  // 최종 표시할 글 목록 (모든 공지사항 + 현재 페이지의 자유 게시글)
  const displayedPosts = [...noticePosts, ...currentFreePosts];

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    const target = document.querySelector('#bulletin');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bulletin" className="py-32 px-6 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-4">
              Community Space
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">하늘채 정보 공유 게시판</h2>
          </div>
          <button 
            onClick={() => setShowWriteModal(true)} 
            className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900 text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            <iconify-icon icon="solar:pen-new-square-bold" className="text-xl"></iconify-icon>
            글쓰기
          </button>
        </div>

        <div className="divide-y divide-neutral-100 border-t border-neutral-100 reveal">
          {displayedPosts.map((post) => (
            <div 
              key={post.id} 
              className={`transition-all duration-300 ${
                post.category === '공지' ? 'bg-indigo-50/20' : 'hover:bg-neutral-50/40'
              }`}
            >
              <div className={`flex flex-col md:flex-row gap-6 items-start px-4 transition-all ${
                post.category === '공지' ? 'py-8 md:py-10' : 'py-6 md:py-7'
              }`}>
                {/* Category & Date Column */}
                <div className="w-full md:w-32 shrink-0">
                  <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider mb-2 ${
                    post.category === '공지' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {post.category}
                  </span>
                  <div className="text-[10px] font-bold text-neutral-400 tracking-tighter">
                    {post.date}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}>
                  <h4 className={`font-bold mb-2 tracking-tight transition-all flex items-center gap-2 ${
                    post.category === '공지' 
                    ? 'text-lg md:text-xl text-neutral-900' 
                    : 'text-base md:text-lg text-neutral-800'
                  }`}>
                    {post.title}
                    {post.category === '공지' && (
                      <iconify-icon icon="solar:pin-bold" className="text-indigo-400"></iconify-icon>
                    )}
                    {post.replies && post.replies.length > 0 && (
                      <span className="text-[10px] text-indigo-500 font-black bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {post.replies.length}
                      </span>
                    )}
                  </h4>
                  <p className={`text-neutral-500 leading-relaxed ${
                    post.category === '공지' ? 'text-sm' : 'text-[13px]'
                  } ${expandedPostId === post.id ? '' : 'line-clamp-1'}`}>
                    {post.content}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[10px] font-bold text-neutral-400">{post.author}</span>
                  </div>
                </div>

                {/* Action Column */}
                <div className="w-full md:w-auto flex justify-end items-center gap-2">
                   {(isAdmin || !post.isAdminPost) && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'post', postId: post.id, targetObj: post }); }} 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      title="삭제"
                    >
                      <iconify-icon icon="solar:trash-bin-minimalistic-bold" className="text-base"></iconify-icon>
                    </button>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedPostId(expandedPostId === post.id ? null : post.id); }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${expandedPostId === post.id ? 'bg-neutral-900 text-white' : 'text-neutral-300 hover:bg-neutral-100'}`}
                  >
                     <iconify-icon icon={expandedPostId === post.id ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} className="text-lg"></iconify-icon>
                  </button>
                </div>
              </div>

              {/* Expanded Area: Replies */}
              {expandedPostId === post.id && (
                <div className="bg-neutral-50/50 border-t border-neutral-100 p-6 md:p-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-4">
                    {post.replies?.map((reply) => (
                      <div key={reply.id} className="flex gap-3 group/reply">
                        <div className="mt-1 text-neutral-300">
                          <iconify-icon icon="solar:subdirectory-right-bold" className="text-lg"></iconify-icon>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-neutral-100 relative">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-black ${reply.isAdminPost ? 'text-indigo-600' : 'text-neutral-600'}`}>
                                {reply.author}
                              </span>
                              <span className="text-[9px] text-neutral-400 font-medium">{reply.date}</span>
                            </div>
                            {(isAdmin || !reply.isAdminPost) && (
                              <button 
                                onClick={() => setDeleteTarget({ type: 'reply', postId: post.id, replyId: reply.id, targetObj: reply })}
                                className="text-neutral-300 hover:text-red-500 transition-colors"
                              >
                                <iconify-icon icon="solar:close-circle-bold" className="text-base"></iconify-icon>
                              </button>
                            )}
                          </div>
                          <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                    {(!post.replies || post.replies.length === 0) && (
                      <p className="text-center text-[10px] text-neutral-400 py-2 font-medium italic">아직 답글이 없습니다.</p>
                    )}
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-neutral-200/50 shadow-sm">
                    <div className="space-y-3">
                      <textarea 
                        value={replyInput[post.id]?.content || ''}
                        onChange={(e) => setReplyInput({ ...replyInput, [post.id]: { ...(replyInput[post.id] || { password: '' }), content: e.target.value } })}
                        placeholder="답글을 남겨주세요."
                        rows={2}
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-lg p-3 text-[13px] outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                      ></textarea>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        {!isAdmin && (
                          <input 
                            type="password"
                            value={replyInput[post.id]?.password || ''}
                            onChange={(e) => setReplyInput({ ...replyInput, [post.id]: { ...(replyInput[post.id] || { content: '' }), password: e.target.value } })}
                            placeholder="비밀번호"
                            className="w-full sm:w-28 bg-neutral-50 border border-neutral-100 rounded-lg px-3 py-1.5 text-[11px] outline-none focus:border-indigo-400"
                          />
                        )}
                        <button 
                          onClick={() => handleWriteReply(post.id)}
                          className="w-full sm:w-auto px-6 py-2 bg-neutral-900 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-600 transition-all active:scale-95"
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {posts.length === 0 && (
            <div className="py-32 text-center">
               <iconify-icon icon="solar:clipboard-list-linear" className="text-5xl text-neutral-100 mb-4"></iconify-icon>
               <p className="text-neutral-400 font-bold">등록된 게시글이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 페이지네이션 버튼 */}
        {freePosts.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2 reveal">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-50 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <iconify-icon icon="solar:alt-arrow-left-linear" className="text-xl"></iconify-icon>
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  currentPage === idx + 1 
                  ? 'bg-neutral-900 text-white shadow-lg' 
                  : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-50 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <iconify-icon icon="solar:alt-arrow-right-linear" className="text-xl"></iconify-icon>
            </button>
          </div>
        )}
      </div>

      {/* 게시글 작성 모달 */}
      {showWriteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowWriteModal(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-300 border border-neutral-100">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">게시글 작성</h3>
                <button onClick={() => setShowWriteModal(false)} className="text-neutral-300 hover:text-neutral-900 transition-all">
                  <iconify-icon icon="solar:close-circle-bold" className="text-3xl"></iconify-icon>
                </button>
             </div>

             <form onSubmit={handleWritePost} className="space-y-6">
                {isAdmin && (
                  <div className="flex gap-2">
                    {['자유', '공지'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewPost({...newPost, category: cat as any})}
                        className={`px-6 py-2 rounded-xl font-bold text-xs transition-all border ${
                          newPost.category === cat ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-400 border-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Title</label>
                  <input type="text" required value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-neutral-900" placeholder="제목을 입력하세요" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Content</label>
                  <textarea required rows={5} value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none resize-none focus:border-indigo-500 focus:bg-white transition-all text-sm text-neutral-700" placeholder="내용을 입력하세요"></textarea>
                </div>
                {!isAdmin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Password</label>
                    <input type="password" value={newPost.password} onChange={(e) => setNewPost({...newPost, password: e.target.value})} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm" placeholder="삭제 시 사용할 비밀번호" />
                  </div>
                )}
                <button type="submit" disabled={loading} className="w-full py-4.5 bg-neutral-900 text-white rounded-[1.5rem] font-bold hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50">
                  {loading ? '등록 중...' : '게시글 등록하기'}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* 삭제 확인 전용 비밀번호 모달 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(false); }}></div>
          <div className="relative w-full max-w-xs bg-white rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-200 border border-neutral-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="solar:trash-bin-trash-bold" className="text-2xl"></iconify-icon>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">삭제 확인</h3>
              <p className="text-neutral-400 text-[10px] mt-1 font-medium leading-relaxed">
                {isAdmin ? '관리자 권한으로 삭제합니다.' : '삭제를 위해 비밀번호를 입력해 주세요.'}
              </p>
            </div>

            <form onSubmit={confirmDelete} className="space-y-4">
              {!isAdmin && (
                <div className="relative">
                  <input 
                    type="password" 
                    autoFocus
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    className={`w-full bg-neutral-50 border ${deleteError ? 'border-red-400 bg-red-50' : 'border-neutral-200'} rounded-xl px-4 py-3 text-center text-base font-bold outline-none focus:border-indigo-500 transition-all`}
                  />
                  {deleteError && (
                    <p className="text-[10px] text-red-500 font-bold text-center mt-2 animate-bounce">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(false); }}
                  className="flex-1 py-3 bg-neutral-100 text-neutral-500 rounded-lg font-bold text-xs hover:bg-neutral-200 transition-all"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg font-bold text-xs hover:bg-red-600 shadow-lg shadow-red-100 transition-all"
                >
                  삭제하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BulletinBoard;