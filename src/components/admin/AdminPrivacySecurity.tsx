import { ArrowLeft, Shield, Lock, Eye, Key, Smartphone, UserCheck, AlertTriangle, ChevronRight, Database } from 'lucide-react';
import type { User } from '../../App';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AdminPrivacySecurityProps {
  user: User;
  onBack: () => void;
}

export function AdminPrivacySecurity({ user, onBack }: AdminPrivacySecurityProps) {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

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
                Security Status: Maximum
              </h3>
              <p className="text-white/90 text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your admin account is fully protected
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
                  Last changed 15 days ago
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Privacy Controls */}
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
                  <Database className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Data Encryption
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Encrypt sensitive system data
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDataEncryption(!dataEncryption);
                  handleToggle('Data encryption', !dataEncryption);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  dataEncryption ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  dataEncryption ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#FF4500]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Audit Logging
                  </p>
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Track all admin activities
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAuditLogging(!auditLogging);
                  handleToggle('Audit logging', !auditLogging);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  auditLogging ? 'bg-[#4CAF50]' : 'bg-[#505050]'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  auditLogging ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <button
            onClick={() => toast.info('Viewing active sessions')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors border-b border-[#505050]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Active Sessions
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  2 devices currently logged in
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => toast.info('Opening security audit logs')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="text-left">
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Security Audit Logs
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  View all security events
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#2C2C2C] border border-[#DC143C] rounded-[16px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DC143C]/30 bg-[#DC143C]/10">
            <h2 className="text-[#DC143C] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Danger Zone
            </h2>
          </div>
          
          <button
            onClick={() => toast.error('This action would terminate all user sessions')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3C3C3C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#DC143C]/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#DC143C]" />
              </div>
              <div className="text-left">
                <p className="text-[#DC143C] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Terminate All Sessions
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Sign out from all devices
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#DC143C]" />
          </button>
        </div>
      </div>
    </div>
  );
}
