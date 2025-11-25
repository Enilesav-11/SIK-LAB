import { useState } from 'react';
import { Home, FileText, Bell, User, Map } from 'lucide-react';
import type { User as UserType } from '../../App';
import { HomePage } from './HomePage';
import { HistoryPage } from './HistoryPage';
import { EmergencyPage } from './EmergencyPage';
import { ProfilePage } from './ProfilePage';
import { MapPage } from './MapPage';
import { UrgentAlertPage } from './UrgentAlertPage';
import { ReportHazardPage } from './ReportHazardPage';
import { AboutPage } from './AboutPage';

interface ResidentDashboardNewProps {
  user: UserType;
  onLogout: () => void;
}

type TabType = 'home' | 'map' | 'history' | 'emergency' | 'profile' | 'urgent-alert' | 'report-hazard' | 'about';

export function ResidentDashboardNew({ user, onLogout }: ResidentDashboardNewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-50" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-[#1a1a1a] flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <HomePage user={user} onNavigate={(page) => setActiveTab(page as TabType)} showInstructions={showInstructions} onDismissInstructions={() => setShowInstructions(false)} />}
          {activeTab === 'map' && <MapPage user={user} />}
          {activeTab === 'history' && <HistoryPage user={user} />}
          {activeTab === 'emergency' && <EmergencyPage user={user} />}
          {activeTab === 'profile' && <ProfilePage user={user} onLogout={onLogout} onNavigate={(page) => setActiveTab(page as TabType)} />}
          {activeTab === 'urgent-alert' && <UrgentAlertPage user={user} onBack={() => setActiveTab('home')} />}
          {activeTab === 'report-hazard' && <ReportHazardPage user={user} onBack={() => setActiveTab('home')} />}
          {activeTab === 'about' && <AboutPage user={user} onNavigate={(page) => setActiveTab(page as TabType)} />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 flex justify-around items-center h-20 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'home' ? 'text-[#FF4500]' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'map' ? 'text-[#FF4500]' : 'text-gray-500'
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs mt-1">Map</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'history' ? 'text-[#FF4500]' : 'text-gray-500'
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'emergency' ? 'text-[#FF4500]' : 'text-gray-500'
            }`}
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs mt-1">Emergency</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'profile' ? 'text-[#FF4500]' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}