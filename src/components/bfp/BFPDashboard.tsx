import { useState } from 'react';
import { LayoutDashboard, AlertTriangle, Map, FileText, User, Bell } from 'lucide-react';
import type { User as UserType } from '../../App';
import { BFPHome } from './BFPHome';
import { IncidentDashboard } from './IncidentDashboard';
import { BFPMap } from './BFPMap';
import { BFPProfile } from './BFPProfile';
import { BFPReportsHistory } from './BFPReportsHistory';
import { BFPSettings } from './BFPSettings';
import { BFPPrivacySecurity } from './BFPPrivacySecurity';
import { VerifyReportPage } from './VerifyReportPage';
import { HazardReportsPage } from './HazardReportsPage';
import { HazardReportDetailsPage } from './HazardReportDetailsPage';
import { BFPNotifications } from './BFPNotifications';
import { IncidentMapView } from './IncidentMapView';

interface BFPDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type TabType = 'home' | 'incidents' | 'map' | 'notifications' | 'profile' | 'verify-report' | 'hazard-reports' | 'hazard-details' | 'reports-history' | 'settings' | 'privacy';

export function BFPDashboard({ user, onLogout }: BFPDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  // Calculate unread notifications count
  const unreadNotifications = 2; // Based on mockNotifications - can be made dynamic

  const handleViewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setActiveTab('hazard-details');
  };

  const handleViewIncident = (incidentId: string) => {
    setSelectedIncidentId(incidentId);
  };

  const handleBackFromDetails = () => {
    setSelectedReportId(null);
    setActiveTab('hazard-reports');
  };

  const handleProfileNavigation = (page: 'reports' | 'settings' | 'privacy') => {
    if (page === 'reports') setActiveTab('reports-history');
    if (page === 'settings') setActiveTab('settings');
    if (page === 'privacy') setActiveTab('privacy');
  };

  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-50" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-[#2d2d2d] flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <BFPHome user={user} onNavigate={setActiveTab} />}
          {activeTab === 'incidents' && <IncidentDashboard user={user} />}
          {activeTab === 'map' && <BFPMap user={user} />}
          {activeTab === 'notifications' && <BFPNotifications user={user} onNavigate={setActiveTab} onViewIncident={handleViewIncident} />}
          {activeTab === 'profile' && <BFPProfile user={user} onLogout={onLogout} onNavigate={handleProfileNavigation} />}
          {activeTab === 'verify-report' && <VerifyReportPage user={user} onBack={() => setActiveTab('home')} />}
          {activeTab === 'hazard-reports' && <HazardReportsPage user={user} onBack={() => setActiveTab('home')} onViewReport={handleViewReport} />}
          {activeTab === 'hazard-details' && selectedReportId && <HazardReportDetailsPage user={user} reportId={selectedReportId} onBack={handleBackFromDetails} />}
          {activeTab === 'reports-history' && <BFPReportsHistory user={user} onBack={() => setActiveTab('profile')} />}
          {activeTab === 'settings' && <BFPSettings user={user} onBack={() => setActiveTab('profile')} />}
          {activeTab === 'privacy' && <BFPPrivacySecurity user={user} onBack={() => setActiveTab('profile')} />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1d1d1d] border-t border-gray-700 flex justify-around items-center h-16 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'home' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'incidents' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs mt-1">Incidents</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'map' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs mt-1">Map</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center flex-1 py-2 relative ${
              activeTab === 'notifications' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Notifications</span>
            {unreadNotifications > 0 && (
              <div className="absolute top-1 right-6 bg-[#DC143C] text-[#F0F0F0] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotifications}
              </div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === 'profile' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Incident Map View Modal */}
      {selectedIncidentId && (
        <IncidentMapView
          user={user}
          incidentId={selectedIncidentId}
          onClose={() => setSelectedIncidentId(null)}
        />
      )}
    </div>
  );
}