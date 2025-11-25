import { AlertTriangle, Map, Bell, Shield, Flame, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { User } from '../../App';
import { mockFireIncidents, mockNews } from '../../lib/mockData';

interface ResidentHomeProps {
  user: User;
  onNavigate: (tab: 'home' | 'map' | 'report' | 'updates' | 'profile') => void;
}

export function ResidentHome({ user, onNavigate }: ResidentHomeProps) {
  const activeIncidents = mockFireIncidents.filter(i => i.status === 'active').length;
  const userBarangayIncidents = mockFireIncidents.filter(
    i => i.barangay === user.barangay && i.status === 'active'
  );

  return (
    <div className="p-6 space-y-6 pt-12">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <h1 className="text-[32px] font-bold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span className="text-white">SIK</span>
            <span className="text-[#FF4500]">LAB</span>
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent rounded-full" />
        </div>
      </div>

      {/* Alert Banner */}
      {userBarangayIncidents.length > 0 && (
        <Card className="bg-red-900/40 backdrop-blur-sm border-red-300/30 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white">
                <span>Active fire incident in your area</span>
              </p>
              <p className="text-sm text-white/90 mt-1">
                {userBarangayIncidents[0].location}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => onNavigate('report')}
          className="h-24 flex-col gap-2 bg-white hover:bg-gray-100 text-orange-600 rounded-xl shadow-lg"
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="text-xs">REPORT</span>
        </Button>
        <Button
          onClick={() => onNavigate('map')}
          variant="outline"
          className="h-24 flex-col gap-2 border-2 border-white text-white hover:bg-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
        >
          <Map className="w-6 h-6" />
          <span className="text-xs">VIEW MAP</span>
        </Button>
      </div>

      {/* Statistics */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-sm text-white/80 mb-3">Current Status</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl text-white">{activeIncidents}</div>
            <div className="text-xs text-white/70 mt-1">Active Fires</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">
              {user.barangay === 'Tambacan' ? 'HIGH' : 'MEDIUM'}
            </div>
            <div className="text-xs text-white/70 mt-1">Area Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">Safe</div>
            <div className="text-xs text-white/70 mt-1">Your Status</div>
          </div>
        </div>
      </Card>

      {/* Recent News */}
      <div>
        <h3 className="text-sm text-white/80 mb-3">Latest Updates</h3>
        <div className="space-y-2">
          {mockNews.slice(0, 3).map((news) => (
            <Card key={news.id} className="p-3 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-start gap-3">
                <Bell className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  news.type === 'incident' ? 'text-red-300' : 
                  news.type === 'resolved' ? 'text-green-300' : 
                  'text-blue-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{news.title}</p>
                  <p className="text-xs text-white/70 mt-1">{news.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-sm text-white/80 mb-3">Emergency Hotlines</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Fire Emergency</span>
            <span className="text-white">911 / 160</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">BFP Iligan</span>
            <span className="text-white">(063) 221-4444</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">CDRRMO</span>
            <span className="text-white">(063) 221-5555</span>
          </div>
        </div>
      </Card>
    </div>
  );
}