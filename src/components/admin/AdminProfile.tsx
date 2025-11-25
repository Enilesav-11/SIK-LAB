import { ArrowLeft, FileText, Settings, Shield, LogOut, User, Mail, Phone, MapPin, Calendar, Activity } from 'lucide-react';
import type { User as UserType } from '../../App';
import { toast } from 'sonner@2.0.3';

interface AdminProfileProps {
  user: UserType;
  onLogout: () => void;
  onNavigate: (page: 'settings' | 'privacy' | 'activity') => void;
}

export function AdminProfile({ user, onLogout, onNavigate }: AdminProfileProps) {
  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF4500] to-[#DC143C] px-4 pt-16 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-[#FF4500]" />
          </div>
        </div>
        <h1 className="text-white text-[20px] font-bold text-center mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {user.name}
        </h1>
        <p className="text-white/90 text-[13px] text-center mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          System Administrator
        </p>
        <p className="text-white/80 text-[12px] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {user.email}
        </p>
      </div>

      <div className="p-4 space-y-4 -mt-3">
        {/* Profile Info Card */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-[#505050]">
            <Mail className="w-5 h-5 text-[#FF4500]" />
            <div>
              <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Email
              </p>
              <p className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-3 border-b border-[#505050]">
            <Phone className="w-5 h-5 text-[#FF4500]" />
            <div>
              <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Phone
              </p>
              <p className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                +63 912 345 6789
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-3 border-b border-[#505050]">
            <MapPin className="w-5 h-5 text-[#FF4500]" />
            <div>
              <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Office
              </p>
              <p className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SIKLAB Central Admin Office
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#FF4500]" />
            <div>
              <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Member Since
              </p>
              <p className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                January 2024
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <button
            onClick={() => onNavigate('activity')}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#3C3C3C] transition-colors border-b border-[#505050]"
          >
            <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#FF4500]" />
            </div>
            <span className="text-[#F0F0F0] text-[14px] flex-1 text-left" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              System Activity Logs
            </span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#3C3C3C] transition-colors border-b border-[#505050]"
          >
            <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#FF4500]" />
            </div>
            <span className="text-[#F0F0F0] text-[14px] flex-1 text-left" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Settings & Preferences
            </span>
          </button>

          <button
            onClick={() => onNavigate('privacy')}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#FF4500]" />
            </div>
            <span className="text-[#F0F0F0] text-[14px] flex-1 text-left" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Privacy & Security
            </span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-[#DC143C] hover:bg-[#B8112F] text-white py-3 rounded-[12px] font-bold text-[14px] transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* Version */}
        <p className="text-center text-[#505050] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          SIKLAB v1.0.0 • Admin Portal
        </p>
      </div>
    </div>
  );
}
