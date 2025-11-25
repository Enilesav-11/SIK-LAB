import { Flame, AlertTriangle, MapPin, Menu, Bell, User as UserIcon, Info, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '../../App';
import { mockFireIncidents, mockNews } from '../../lib/mockData';
import { RecentActivity } from './RecentActivity';
import { useData } from '../../lib/DataContext';

interface HomePageProps {
  user: User;
  onNavigate: (page: string) => void;
  showInstructions: boolean;
  onDismissInstructions: () => void;
}

export function HomePage({ user, onNavigate, showInstructions, onDismissInstructions }: HomePageProps) {
  const { fireIncidents } = useData();
  const activeIncidents = fireIncidents.filter(i => i.status === 'active');
  const userBarangayIncidents = fireIncidents.filter(
    i => i.barangay === user.barangay && i.status === 'active'
  );

  return (
    <div className="min-h-full bg-[#1E1E1E]">
      {/* Top App Bar - Compact */}
      <div className="px-5 py-3 pt-12 bg-gradient-to-b from-[#1E1E1E] via-[#2C2C2C] to-[#2C2C2C] border-b border-[#FF4500]/20 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/5 via-[#DC143C]/5 to-[#FF4500]/5 opacity-50" />
        
        {/* Compact SIKLAB Logo */}
        <div className="relative flex items-center justify-center gap-2">
          {/* Flame icon inline */}
          <Flame className="w-6 h-6 text-[#FF4500] drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]" fill="#FF4500" />
          
          {/* SIKLAB text with gradient and glow */}
          <h1 
            className="text-[24px] font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFB366] via-[#FF4500] to-[#DC143C]"
            style={{ 
              fontFamily: 'Montserrat, sans-serif',
              textShadow: '0 0 20px rgba(255, 69, 0, 0.3)',
              filter: 'drop-shadow(0 2px 6px rgba(220, 20, 60, 0.4))'
            }}
          >
            SIKLAB
          </h1>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6 pb-24">
        {/* Instructions Banner - How to Find Evacuation Center */}
        {showInstructions && (
          <Card className="bg-[#4CAF50]/15 border-[#4CAF50]/30 p-4 rounded-[12px] relative">
            <button
              onClick={onDismissInstructions}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#3C3C3C] hover:bg-[#4C4C4C] flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-[#A0A0A0]" />
            </button>
            
            <div className="flex items-start gap-3 pr-6">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#F0F0F0]" />
              </div>
              <div>
                <h4 className="text-[#F0F0F0] text-[14px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  How to Find Nearest Evacuation Center
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#4CAF50] text-[11px] font-bold mt-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.</span>
                    <p className="text-[#A0A0A0] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Tap the <span className="text-[#4CAF50] font-bold">Map icon</span> at the bottom navigation bar
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#4CAF50] text-[11px] font-bold mt-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.</span>
                    <p className="text-[#A0A0A0] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Tap the <span className="text-[#4CAF50] font-bold">Evacuation filter</span> to show only safe zones
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#4CAF50] text-[11px] font-bold mt-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>3.</span>
                    <p className="text-[#A0A0A0] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Look for <span className="text-[#4CAF50] font-bold">green markers</span> - these are evacuation centers
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#4CAF50] text-[11px] font-bold mt-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.</span>
                    <p className="text-[#A0A0A0] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Tap any <span className="text-[#4CAF50] font-bold">green marker</span> to view details and directions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Dynamic Alert Banner */}
        {userBarangayIncidents.length > 0 && (
          <Card className={`rounded-[12px] p-4 border ${
            userBarangayIncidents.length > 0 
              ? 'bg-[#DC143C]/10 border-[#DC143C]/30' 
              : 'bg-[#4CAF50]/10 border-[#4CAF50]/30'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                userBarangayIncidents.length > 0 ? 'bg-[#DC143C]/20' : 'bg-[#4CAF50]/20'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  userBarangayIncidents.length > 0 ? 'text-[#DC143C]' : 'text-[#4CAF50]'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {userBarangayIncidents.length > 0 ? 'Active Fire Alert!' : 'Area is Safe'}
                </h3>
                <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {userBarangayIncidents.length > 0 
                    ? `Fire reported in ${userBarangayIncidents[0].location}`
                    : 'No active incidents in your area'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Urgent Alert - PRIMARY ACTION */}
          <button
            onClick={() => onNavigate('urgent-alert')}
            className="bg-gradient-to-br from-[#DC143C] to-[#FF4500] rounded-[16px] p-5 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group"
          >
            {/* Pulse effect for emphasis */}
            <div className="absolute inset-0 bg-white/10 rounded-[16px] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-3 relative z-10">
              <AlertTriangle className="w-9 h-9 text-[#F0F0F0]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[#F0F0F0] text-[18px] font-bold text-center relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Urgent<br />Alert
            </h3>
          </button>

          {/* Report Fire Hazard - SECONDARY ACTION */}
          <button
            onClick={() => onNavigate('report-hazard')}
            className="bg-[#3C3C3C] border border-[#505050] rounded-[16px] p-5 hover:bg-[#4C4C4C] hover:border-[#606060] transition-all flex flex-col items-center justify-center min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#FF4500]/20 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-[#FF4500]" />
            </div>
            <h3 className="text-[#F0F0F0] text-[14px] font-semibold text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Report Fire<br />Hazard
            </h3>
          </button>
        </div>

        {/* Activity/News Feed */}
        <RecentActivity />

        {/* Emergency Contact Section */}
        <Card className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px]">
          <h3 className="text-[#FF4500] text-[16px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Emergency Contact
          </h3>
          <div className="space-y-3">
            <a href="tel:911" className="flex items-center justify-between p-3 bg-[#1E1E1E] rounded-[8px] hover:bg-[#4CAF50]/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire Emergency
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    911 / 160
                  </p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a href="tel:0632214444" className="flex items-center justify-between p-3 bg-[#1E1E1E] rounded-[8px] hover:bg-[#4CAF50]/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    BFP Iligan
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    (063) 221-4444
                  </p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}