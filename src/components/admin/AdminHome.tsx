import { Shield, Users, Activity, Database, AlertTriangle, ChevronRight, TrendingUp } from 'lucide-react';
import type { User } from '../../App';
import { mockUsers, mockFireIncidents, mockHazardReports } from '../../lib/mockData';

interface AdminHomeProps {
  user: User;
  onNavigate: (tab: 'home' | 'users' | 'activity' | 'profile') => void;
}

export function AdminHome({ user, onNavigate }: AdminHomeProps) {
  const totalUsers = mockUsers.length;
  const totalIncidents = mockFireIncidents.length;
  const totalHazards = mockHazardReports.length;
  const activeIncidents = mockFireIncidents.filter(i => i.status === 'active').length;

  return (
    <div className="min-h-full bg-[#1E1E1E] p-4 pt-16 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-14 h-14 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-full flex items-center justify-center">
          <Shield className="w-7 h-7 text-[#F0F0F0]" />
        </div>
        <div>
          <h1 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Admin Portal
          </h1>
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            System Administrator
          </p>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-[#2C2C2C] border border-[#4CAF50] rounded-[16px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F0F0F0] text-[14px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              System Status
            </p>
            <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              All services operational
            </p>
          </div>
          <div className="px-3 py-1.5 bg-[#4CAF50] text-[#F0F0F0] rounded-[8px] text-[11px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ONLINE
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#2196F3]/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-[#2196F3]" />
            </div>
            <span className="text-[#A0A0A0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Total Users
            </span>
          </div>
          <div className="text-[#2196F3] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {totalUsers}
          </div>
        </div>

        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#DC143C]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#DC143C]" />
            </div>
            <span className="text-[#A0A0A0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Incidents
            </span>
          </div>
          <div className="text-[#DC143C] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {totalIncidents}
          </div>
        </div>

        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#FF4500]" />
            </div>
            <span className="text-[#A0A0A0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Hazards
            </span>
          </div>
          <div className="text-[#FF4500] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {totalHazards}
          </div>
        </div>

        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#FFA500]/20 rounded-full flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#FFA500]" />
            </div>
            <span className="text-[#A0A0A0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Active Now
            </span>
          </div>
          <div className="text-[#FFA500] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {activeIncidents}
          </div>
        </div>
      </div>

      {/* User Distribution */}
      <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
        <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          User Distribution
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Residents
              </span>
              <span className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {mockUsers.filter(u => u.role === 'resident').length}
              </span>
            </div>
            <div className="w-full h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#2196F3] to-[#21CBF3]" 
                style={{ width: `${(mockUsers.filter(u => u.role === 'resident').length / totalUsers) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                BFP/LGU
              </span>
              <span className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {mockUsers.filter(u => u.role === 'bfp').length}
              </span>
            </div>
            <div className="w-full h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#DC143C] to-[#FF4500]" 
                style={{ width: `${(mockUsers.filter(u => u.role === 'bfp').length / totalUsers) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Admin
              </span>
              <span className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {mockUsers.filter(u => u.role === 'admin').length}
              </span>
            </div>
            <div className="w-full h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF4500] to-[#FFA500]" 
                style={{ width: `${(mockUsers.filter(u => u.role === 'admin').length / totalUsers) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onNavigate('users')}
            className="w-full bg-[#2C2C2C] border border-[#505050] hover:border-[#FF4500] rounded-[12px] p-4 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2196F3]/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2196F3]" />
                </div>
                <span className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Manage Users
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('activity')}
            className="w-full bg-[#2C2C2C] border border-[#505050] hover:border-[#FF4500] rounded-[12px] p-4 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#FF4500]" />
                </div>
                <span className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  System Activity
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
            </div>
          </button>

          <button className="w-full bg-[#2C2C2C] border border-[#505050] hover:border-[#FF4500] rounded-[12px] p-4 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <span className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Backup & Secure Data
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
        <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Recent System Activity
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-[#505050]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2196F3] rounded-full" />
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Resident Report
              </span>
            </div>
            <span className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              2 mins ago
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#505050]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#DC143C] rounded-full" />
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                BFP Action
              </span>
            </div>
            <span className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              15 mins ago
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF4500] rounded-full" />
              <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                LGU Validation
              </span>
            </div>
            <span className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              1 hour ago
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('activity')}
          className="text-[12px] text-[#FF4500] hover:underline mt-4 font-semibold"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          View Full Activity Log →
        </button>
      </div>

      {/* System Health */}
      <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
        <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          System Health
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Database
            </span>
            <div className="px-2 py-1 bg-[#4CAF50] text-[#F0F0F0] rounded-[6px] text-[10px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Healthy
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Last Backup
            </span>
            <span className="text-[#F0F0F0] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Today, 10:45 PM
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Storage Used
            </span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]" />
              </div>
              <span className="text-[#F0F0F0] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                42%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
