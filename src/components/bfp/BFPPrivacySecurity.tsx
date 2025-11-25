import { ArrowLeft, Shield, Lock, Eye, Key, Smartphone, UserCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import type { User } from '../../App';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface BFPPrivacySecurityProps {
  user: User;
  onBack: () => void;
}

export function BFPPrivacySecurity({ user, onBack }: BFPPrivacySecurityProps) {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

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
              Privacy & Security
            </h1>
            <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Manage your security settings
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Security Status */}
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-[16px] p-4 border border-[#4CAF50]/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Security Status: Strong
              </h3>
              <p className="text-white/90 text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your account is well protected
              </p>
            </div>
          </div>
        </div>

        {/* Authentication Settings */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Authentication
            </h2>
          </div>
          
          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Two-Factor Authentication
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Extra layer of security for login
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setTwoFactorAuth(!twoFactorAuth);
                  handleToggle('Two-factor authentication', !twoFactorAuth);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  twoFactorAuth ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Biometric Authentication
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Use fingerprint or face ID
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setBiometricAuth(!biometricAuth);
                  handleToggle('Biometric authentication', !biometricAuth);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  biometricAuth ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  biometricAuth ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

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
                  Last changed 30 days ago
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Privacy Controls
            </h2>
          </div>
          
          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Login Alerts
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Notify me of new device logins
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setLoginAlerts(!loginAlerts);
                  handleToggle('Login alerts', !loginAlerts);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  loginAlerts ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  loginAlerts ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Data Sharing
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Share analytics with developers
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDataSharing(!dataSharing);
                  handleToggle('Data sharing', !dataSharing);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  dataSharing ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  dataSharing ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <button
            onClick={() => toast.info('Opening privacy policy')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Privacy Policy
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Read our privacy policy
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Active Sessions */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#505050]">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Active Sessions
            </h2>
          </div>
          
          <div className="px-4 py-3 border-b border-[#505050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Current Device
                  </p>
                  <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    iPhone 14 Pro • Iligan City
                  </p>
                  <p className="text-[#4CAF50] text-[10px] font-bold mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    ACTIVE NOW
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => toast.success('All other sessions have been terminated')}
            className="w-full px-4 py-3 text-[#DC143C] text-[12px] font-bold hover:bg-[#3C3C3C] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Log Out All Other Devices
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#2C2C2C] border border-[#DC143C] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DC143C]">
            <h2 className="text-[#DC143C] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Danger Zone
            </h2>
          </div>
          
          <button
            onClick={() => toast.error('Account deactivation requires administrator approval')}
            className="w-full px-4 py-3 text-[#DC143C] text-[12px] font-bold hover:bg-[#3C3C3C] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
}
