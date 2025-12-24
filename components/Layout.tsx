
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  RefreshCcw, 
  Users, 
  FileText, 
  ShieldCheck,
  Zap
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full z-10 hidden md:block">
        <div className="p-6">
          <div className="flex items-center space-x-2 text-blue-500 mb-8">
            <ShieldCheck size={32} />
            <span className="text-xl font-bold text-white tracking-tight">InsuraTransform</span>
          </div>
          
          <nav className="space-y-2">
            <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
            <SidebarLink to="/requirements" icon={ClipboardList} label="Requirements" active={location.pathname === '/requirements'} />
            <SidebarLink to="/process" icon={RefreshCcw} label="Transformation" active={location.pathname === '/process'} />
            <SidebarLink to="/stakeholders" icon={Users} label="Stakeholders" active={location.pathname === '/stakeholders'} />
            <SidebarLink to="/ai-assistant" icon={Zap} label="AI BA Assistant" active={location.pathname === '/ai-assistant'} />
            <SidebarLink to="/docs" icon={FileText} label="Docs (BRD/UAT)" active={location.pathname === '/docs'} />
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              BA
            </div>
            <div>
              <p className="text-sm font-semibold">Senior BA</p>
              <p className="text-xs text-slate-400">P&C Specialist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 h-16 sticky top-0 flex items-center justify-between px-8 z-20">
          <h1 className="text-xl font-semibold text-slate-800">
            {location.pathname === '/' ? 'Project Overview' : 
             location.pathname.substring(1).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Live Project</span>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <RefreshCcw size={20} />
            </button>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
