import { useState } from 'react';
import { LayoutDashboard, Users, Activity, User } from 'lucide-react';
import type { User as UserType } from '../../App';
import { AdminHome } from './AdminHome';
import { UserManagement } from './UserManagement';
import { SystemActivity } from './SystemActivity';
import { AdminProfile } from './AdminProfile';
import { AdminSettings } from './AdminSettings';
import { AdminPrivacySecurity } from './AdminPrivacySecurity';

interface AdminDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type TabType = 'home' | 'users' | 'activity' | 'profile' | 'settings' | 'privacy' | 'system-activity';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleProfileNavigation = (page: 'settings' | 'privacy' | 'activity') => {
    if (page === 'settings') {
      setActiveTab('settings');
    } else if (page === 'privacy') {
      setActiveTab('privacy');
    } else if (page === 'activity') {
      setActiveTab('system-activity');
    }
  };

  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-50" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-[#1E1E1E] flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <AdminHome user={user} onNavigate={setActiveTab} />}
          {activeTab === 'users' && <UserManagement user={user} />}
          {activeTab === 'activity' && <SystemActivity user={user} />}
          {activeTab === 'profile' && <AdminProfile user={user} onLogout={onLogout} onNavigate={handleProfileNavigation} />}
          {activeTab === 'settings' && <AdminSettings user={user} onBack={() => setActiveTab('profile')} />}
          {activeTab === 'privacy' && <AdminPrivacySecurity user={user} onBack={() => setActiveTab('profile')} />}
          {activeTab === 'system-activity' && <SystemActivity user={user} />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#2C2C2C] border-t border-[#505050] flex justify-around items-center h-16 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'home' ? 'text-[#FF4500]' : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-semibold">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'users' ? 'text-[#FF4500]' : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-semibold">Users</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'activity' ? 'text-[#FF4500]' : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-semibold">Activity</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'profile' ? 'text-[#FF4500]' : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-semibold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}