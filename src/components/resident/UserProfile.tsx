import { User as UserIcon, Mail, Phone, MapPin, FileText, Settings, LogOut, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { User } from '../../App';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div className="p-6 space-y-6 pt-12 pb-24 min-h-full">
      <div>
        <h1 className="text-white mb-2">Profile</h1>
        <p className="text-sm text-white/80">Manage your account and settings</p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white">{user.name}</h2>
            <p className="text-sm text-white/80 capitalize">{user.role} Account</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-3 pt-3 border-t border-white/20">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white">{user.contactNo}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white">{user.barangay}</span>
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-sm text-white mb-3">Your Activity</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl text-white">3</div>
            <div className="text-xs text-white/70 mt-1">Reports Sent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">2</div>
            <div className="text-xs text-white/70 mt-1">Validated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">1</div>
            <div className="text-xs text-white/70 mt-1">Pending</div>
          </div>
        </div>
      </Card>

      {/* Menu Options */}
      <div className="space-y-2">
        <button className="w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-white/70" />
            <span className="text-sm text-white">My Reports History</span>
          </div>
        </button>
        <button className="w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-white/70" />
            <span className="text-sm text-white">Settings & Preferences</span>
          </div>
        </button>
        <button className="w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-white/70" />
            <span className="text-sm text-white">Privacy & Security</span>
          </div>
        </button>
      </div>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full border-2 border-white text-white hover:bg-white/10 bg-transparent"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>

      {/* App Info */}
      <div className="text-center text-xs text-white/60 pt-4">
        <p>SIKLAB v1.0</p>
        <p>Fire Hazard Mapping & Awareness System</p>
      </div>
    </div>
  );
}