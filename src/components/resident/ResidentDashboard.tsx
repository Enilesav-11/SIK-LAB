import { useState } from 'react';
import { Home, Map, AlertTriangle, User, Bell, FileText } from 'lucide-react';
import type { User } from '../../App';
import { ResidentHome } from './ResidentHome';
import { FireHazardMap } from './FireHazardMap';
import { ReportIncident } from './ReportIncident';
import { UserProfile } from './UserProfile';
import { StayUpdated } from './StayUpdated';

interface ResidentDashboardProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'home' | 'map' | 'report' | 'updates' | 'profile';

export function ResidentDashboard({ user, onLogout }: ResidentDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-50" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <ResidentHome user={user} onNavigate={setActiveTab} />}
          {activeTab === 'map' && <FireHazardMap user={user} />}
          {activeTab === 'report' && <ReportIncident user={user} />}
          {activeTab === 'updates' && <StayUpdated user={user} />}
          {activeTab === 'profile' && <UserProfile user={user} onLogout={onLogout} />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/10 flex justify-around items-center h-16 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'home' ? 'text-white' : 'text-white/50'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'map' ? 'text-white' : 'text-white/50'
            }`}
          >
            <Map className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'report' ? 'text-white' : 'text-white/50'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'updates' ? 'text-white' : 'text-white/50'
            }`}
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'profile' ? 'text-white' : 'text-white/50'
            }`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}