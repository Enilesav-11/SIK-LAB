import { ArrowLeft, User, Bell, Lock, Shield, HelpCircle, Moon, Languages, Smartphone, MapPin, ChevronRight, Database } from 'lucide-react';
import type { User as UserType } from '../../App';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AdminSettingsProps {
  user: UserType;
  onBack: () => void;
}

export function AdminSettings({ user, onBack }: AdminSettingsProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleToggle = (setting: string, value: boolean) => {
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-4 pt-16 pb-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#1E1E1E] border border-[#505050] flex items-center justify-center hover:bg-[#505050] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#F0F0F0]" />
          </button>
          <div>
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Settings & Preferences
            </h1>
            <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Customize your Admin experience
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Account Settings */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Account Settings
            </h2>
          </div>
          
          <button
            onClick={() => toast.info('Opening profile editor')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors border-b border-[#505050]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Edit Profile
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Update your personal information
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => toast.info('Opening password change')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Change Password
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Update your security credentials
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Notification Preferences
            </h2>
          </div>
          
          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#FF4500]" />
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Push Notifications
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    System-wide alerts and updates
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setPushNotifications(!pushNotifications);
                  handleToggle('Push notifications', !pushNotifications);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  pushNotifications ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#FF4500]" />
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    SMS Alerts
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Text message notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSmsAlerts(!smsAlerts);
                  handleToggle('SMS alerts', !smsAlerts);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  smsAlerts ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  smsAlerts ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[20px]">📧</span>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Email Alerts
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Digest and summary emails
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEmailAlerts(!emailAlerts);
                  handleToggle('Email alerts', !emailAlerts);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  emailAlerts ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  emailAlerts ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[20px]">🔊</span>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Sound Alerts
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Audio notification sounds
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  handleToggle('Sound alerts', !soundEnabled);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  soundEnabled ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              System Preferences
            </h2>
          </div>
          
          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#FF4500]" />
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Dark Mode
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Use dark theme
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  handleToggle('Dark mode', !darkMode);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  darkMode ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-[#FF4500]" />
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Auto Backup
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Daily system data backup
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAutoBackup(!autoBackup);
                  handleToggle('Auto backup', !autoBackup);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  autoBackup ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoBackup ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <button
            onClick={() => toast.info('Opening language selector')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Languages className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Language
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  English (US)
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* About */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <button
            onClick={() => toast.info('Version 1.0.0 - Build 2024.11')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  About SIKLAB
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Version 1.0.0
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>
      </div>
    </div>
  );
}
