import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Gamepad2, Users } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  // 遊戲頁面不顯示導航
  if (currentPageName === 'Game') {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen">
      {/* 簡單導航 (非遊戲頁面) */}
      {currentPageName !== 'Home' && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <span className="text-2xl">🛤️</span>
              <span className="font-bold text-slate-800">人生路</span>
            </Link>
            
            <div className="flex gap-2">
              <Link 
                to={createPageUrl('Game')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-600 text-sm"
              >
                <Gamepad2 className="w-4 h-4" />
                遊戲
              </Link>
              <Link 
                to={createPageUrl('TeacherDashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-600 text-sm"
              >
                <Users className="w-4 h-4" />
                老師
              </Link>
            </div>
          </div>
        </nav>
      )}
      
      <main className={currentPageName !== 'Home' ? 'pt-14' : ''}>
        {children}
      </main>
    </div>
  );
}