import { User as UserIcon, Mail, Phone, MapPin, Settings, Shield, Bell, HelpCircle, LogOut, FileText, Info, ArrowLeft, ChevronRight, Eye, Lock, CreditCard, Smartphone, MessageSquare, AlertCircle, AlertTriangle, Play, Lightbulb, Settings2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { User } from '../../App';
import { useState } from 'react';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

type SettingsScreen = 'account' | 'privacy' | 'notifications' | 'help' | null;

export function ProfilePage({ user, onLogout, onNavigate }: ProfilePageProps) {
  const [activeSettingsScreen, setActiveSettingsScreen] = useState<SettingsScreen>(null);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [fireAlerts, setFireAlerts] = useState(true);
  const [hazardAlerts, setHazardAlerts] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Top App Bar */}
      <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center justify-between">
        <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Profile
        </h1>
        <button className="text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors" onClick={() => setActiveSettingsScreen('account')}>
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* User Info Card */}
        <Card className="bg-[#2C2C2C] border-[#505050] p-6 rounded-[12px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-full flex items-center justify-center">
              <span className="text-[#F0F0F0] text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.name}
              </h2>
              <p className="text-[#A0A0A0] text-[14px] capitalize" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.role} Account
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#505050]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.contactNo}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {user.barangay}
              </span>
            </div>
          </div>
        </Card>

        {/* Activity Stats */}
        <div>
          <h3 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your Activity
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px] text-center">
              <div className="text-[28px] text-[#F0F0F0] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                3
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Reports<br />Submitted
              </div>
            </Card>
            <Card className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px] text-center">
              <div className="text-[28px] text-[#F0F0F0] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                1
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Urgent<br />Alerts
              </div>
            </Card>
            <Card className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px] text-center">
              <div className="text-[28px] text-[#F0F0F0] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                2
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Validated<br />Reports
              </div>
            </Card>
          </div>
        </div>

        {/* Settings & Actions */}
        <div>
          <h3 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Settings & Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors" onClick={() => setActiveSettingsScreen('account')}>
              <Settings className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Account Settings
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors" onClick={() => setActiveSettingsScreen('privacy')}>
              <Shield className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Privacy Settings
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors" onClick={() => setActiveSettingsScreen('notifications')}>
              <Bell className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Notifications
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors" onClick={() => setActiveSettingsScreen('help')}>
              <HelpCircle className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Help & Support
              </span>
            </button>
            <button 
              onClick={() => onNavigate?.('about')}
              className="w-full flex items-center gap-3 p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <Info className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                About SIKLAB
              </span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          className="w-full bg-transparent border-2 border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C]/10 rounded-[12px] h-12 text-[16px] font-semibold"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            SIKLAB v1.0
          </p>
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Fire Hazard Mapping & Awareness System
          </p>
        </div>
      </div>

      {/* Account Settings Screen */}
      {activeSettingsScreen === 'account' && (
        <div className="absolute inset-0 bg-[#1E1E1E] z-50 overflow-y-auto pb-24">
          <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center gap-4 sticky top-0 z-10">
            <button onClick={() => setActiveSettingsScreen(null)} className="p-2 hover:bg-[#3C3C3C] rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#F0F0F0]" />
            </button>
            <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Account Settings
            </h1>
          </div>

          <div className="px-5 py-6 space-y-3">
            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-[#A0A0A0]" />
                  <div className="text-left">
                    <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Profile Information
                    </p>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Name, Email, Contact
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#A0A0A0]" />
                  <div className="text-left">
                    <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Password & Security
                    </p>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Change Password, 2FA
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#A0A0A0]" />
                  <div className="text-left">
                    <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Location Settings
                    </p>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Barangay, Address
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#A0A0A0]" />
                  <div className="text-left">
                    <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Linked Devices
                    </p>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Manage Devices
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Privacy Settings Screen */}
      {activeSettingsScreen === 'privacy' && (
        <div className="absolute inset-0 bg-[#1E1E1E] z-50 overflow-y-auto pb-24">
          <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center gap-4 sticky top-0 z-10">
            <button onClick={() => setActiveSettingsScreen(null)} className="p-2 hover:bg-[#3C3C3C] rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#F0F0F0]" />
            </button>
            <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Privacy Settings
            </h1>
          </div>

          <div className="px-5 py-6 space-y-3">
            <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-[#A0A0A0]" />
                  <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Profile Visibility
                  </span>
                </div>
                <button
                  onClick={() => setProfileVisibility(!profileVisibility)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    profileVisibility ? 'bg-[#FF4500]' : 'bg-[#505050]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    profileVisibility ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[#A0A0A0]" />
                  <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Activity Status
                  </span>
                </div>
                <button
                  onClick={() => setActivityStatus(!activityStatus)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    activityStatus ? 'bg-[#FF4500]' : 'bg-[#505050]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    activityStatus ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#A0A0A0]" />
                  <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Location Sharing
                  </span>
                </div>
                <span className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {locationSharing ? 'On' : 'Off'}
                </span>
              </div>
            </div>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#A0A0A0]" />
                  <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Data & Personalization
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#A0A0A0]" />
                  <div className="text-left">
                    <p className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Blocked Users
                    </p>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      0 accounts
                    </p>
                  </div>
                </div>
              </div>
            </button>

            <Button
              className="w-full bg-[#DC143C] hover:bg-[#B8101F] text-[#F0F0F0] rounded-[12px] h-14 text-[16px] font-semibold mt-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={() => alert('Account deletion requires verification. This feature would allow users to permanently delete their SIKLAB account.')}
            >
              Delete My Account
            </Button>
          </div>
        </div>
      )}

      {/* Notifications Settings Screen */}
      {activeSettingsScreen === 'notifications' && (
        <div className="absolute inset-0 bg-[#1E1E1E] z-50 overflow-y-auto pb-24">
          <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center gap-4 sticky top-0 z-10">
            <button onClick={() => setActiveSettingsScreen(null)} className="p-2 hover:bg-[#3C3C3C] rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#F0F0F0]" />
            </button>
            <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Notifications
            </h1>
          </div>

          <div className="px-5 py-6 space-y-6">
            {/* General Notifications */}
            <div className="space-y-3">
              <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Push Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pushNotifications ? 'bg-[#FF4500]' : 'bg-[#505050]'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Email Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      emailNotifications ? 'bg-[#FF4500]' : 'bg-[#505050]'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      SMS Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      smsNotifications ? 'bg-[#FF4500]' : 'bg-[#505050]'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      In-App Alerts
                    </span>
                  </div>
                  <button
                    onClick={() => setInAppAlerts(!inAppAlerts)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      inAppAlerts ? 'bg-[#FF4500]' : 'bg-[#505050]'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      inAppAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Categories */}
            <div>
              <h3 className="text-[#F0F0F0] text-[18px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Notification Categories
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-[#DC143C]" />
                      <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Fire Alerts
                      </span>
                    </div>
                    <button
                      onClick={() => setFireAlerts(!fireAlerts)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        fireAlerts ? 'bg-[#FF4500]' : 'bg-[#505050]'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        fireAlerts ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#FF4500]" />
                      <span className="text-[#F0F0F0] text-[16px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Hazard Alerts
                      </span>
                    </div>
                    <button
                      onClick={() => setHazardAlerts(!hazardAlerts)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        hazardAlerts ? 'bg-[#FF4500]' : 'bg-[#505050]'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        hazardAlerts ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#DC143C] hover:bg-[#B8101F] text-[#F0F0F0] rounded-[12px] h-14 text-[16px] font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={() => {
                setPushNotifications(false);
                setEmailNotifications(false);
                setSmsNotifications(false);
                setInAppAlerts(false);
                setFireAlerts(false);
                setHazardAlerts(false);
                alert('All notifications have been muted. You can re-enable them anytime from this screen.');
              }}
            >
              Mute All Notifications
            </Button>
          </div>
        </div>
      )}

      {/* Help & Support Screen */}
      {activeSettingsScreen === 'help' && (
        <div className="absolute inset-0 bg-[#1E1E1E] z-50 overflow-y-auto pb-24">
          <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center gap-4 sticky top-0 z-10">
            <button onClick={() => setActiveSettingsScreen(null)} className="p-2 hover:bg-[#3C3C3C] rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#F0F0F0]" />
            </button>
            <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Help & Support
            </h1>
          </div>

          <div className="px-5 py-6 space-y-6">
            {/* Main Help Options */}
            <div className="space-y-3">
              <button 
                onClick={() => alert('Opening Frequently Notifications section...')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Frequently Notifications
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#A0A0A0]" />
                </div>
              </button>

              <button 
                onClick={() => alert('Opening FAQ section with common questions about fire safety, reporting hazards, and using SIKLAB features...')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Frequently Asked Questions
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#A0A0A0]" />
                </div>
              </button>

              <button 
                onClick={() => alert('Opening Contact Support form. You can reach out to BFP and SIKLAB administrators for assistance...')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Contact Support
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#A0A0A0]" />
                </div>
              </button>

              <button 
                onClick={() => alert('Opening Video Tutorials section with guides on:\n• How to report a fire incident\n• How to report hazards\n• Understanding fire risk maps\n• Emergency evacuation procedures')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Video Tutorials
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#A0A0A0]" />
                </div>
              </button>

              <button 
                onClick={() => alert('Opening User Guide with detailed documentation on all SIKLAB features...')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      User Guide
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#A0A0A0]" />
                </div>
              </button>
            </div>

            {/* Other Resources Section */}
            <div>
              <h3 className="text-[#F0F0F0] text-[20px] font-bold mb-3 px-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Other Resources
              </h3>
              
              <button 
                onClick={() => alert('We value your feedback! Share your ideas to improve SIKLAB.')}
                className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[16px] hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-[#A0A0A0]" />
                    <span className="text-[#F0F0F0] text-[18px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Suggest a Feature
                    </span>
                  </div>
                  <Settings2 className="w-5 h-5 text-[#A0A0A0]" />
                </div>
              </button>
            </div>

            {/* Live Chat Support Button */}
            <Button
              className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8101F] hover:to-[#E03E00] text-[#F0F0F0] rounded-[16px] h-16 text-[20px] font-bold shadow-lg mt-8"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={() => alert('Connecting to live support... Chat with our team for immediate assistance!')}
            >
              Live Chat Support
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}