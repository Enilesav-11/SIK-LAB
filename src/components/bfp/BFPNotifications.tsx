import { Flame, AlertTriangle, CheckCircle, Clock, MapPin, Bell } from 'lucide-react';
import type { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface BFPNotificationsProps {
  user: User;
  onNavigate: (tab: 'home' | 'incidents' | 'map' | 'notifications' | 'profile' | 'verify-report' | 'hazard-reports') => void;
  onViewIncident: (incidentId: string) => void;
}

interface Notification {
  id: string;
  type: 'incident' | 'hazard' | 'resolved' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  location?: string;
  reportId?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'incident',
    title: 'New Fire Incident Reported',
    message: 'Active fire incident in Purok 9-A, Tambacan. Immediate response required.',
    time: '2 minutes ago',
    read: false,
    location: 'Purok 9-A, Tambacan',
    reportId: 'FI001'
  },
  {
    id: '2',
    type: 'hazard',
    title: 'Hazard Report Verified',
    message: 'AI verified electrical wiring hazard as Major. Requires validation.',
    time: '15 minutes ago',
    read: false,
    location: 'Purok 5, Tambacan',
    reportId: 'HR006'
  },
  {
    id: '3',
    type: 'resolved',
    title: 'Incident Resolved',
    message: 'Fire incident FI002 has been successfully resolved and marked complete.',
    time: '1 hour ago',
    read: true,
    reportId: 'FI002'
  },
  {
    id: '4',
    type: 'incident',
    title: 'Dispatch Confirmed',
    message: 'Fire truck units dispatched to Purok 9-A location. ETA: 5 minutes.',
    time: '2 hours ago',
    read: true,
    location: 'Purok 9-A, Tambacan',
    reportId: 'FI001'
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'SIKLAB system maintenance scheduled for tonight at 11:00 PM.',
    time: '4 hours ago',
    read: true
  }
];

export function BFPNotifications({ user, onNavigate, onViewIncident }: BFPNotificationsProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="h-full bg-[#1E1E1E] flex flex-col">
      {/* Header */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] px-5 py-4 pt-12 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#FF4500]" />
          </div>
          <div>
            <h2 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Notifications
            </h2>
            {unreadCount > 0 && (
              <p className="text-[#FF4500] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {unreadCount} unread
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="w-16 h-16 text-[#505050] mb-4" />
            <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#505050]">
            {mockNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => {
                  // Navigate based on notification type
                  if (notification.type === 'incident' || notification.type === 'resolved') {
                    onNavigate('incidents');
                    onViewIncident(notification.reportId!);
                    toast.success(`Opening incident ${notification.reportId}`);
                  } else if (notification.type === 'hazard') {
                    onNavigate('verify-report');
                    toast.success(`Opening hazard report ${notification.reportId}`);
                  } else if (notification.type === 'system') {
                    toast.info(notification.message);
                  }
                }}
                className={`w-full px-5 py-4 hover:bg-[#2C2C2C] transition-colors cursor-pointer text-left ${
                  !notification.read ? 'bg-[#FF4500]/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'incident' ? 'bg-[#DC143C]/20' :
                    notification.type === 'hazard' ? 'bg-[#FF4500]/20' :
                    notification.type === 'resolved' ? 'bg-[#4CAF50]/20' :
                    'bg-[#2196F3]/20'
                  }`}>
                    {notification.type === 'incident' && <Flame className="w-5 h-5 text-[#DC143C]" />}
                    {notification.type === 'hazard' && <AlertTriangle className="w-5 h-5 text-[#FF4500]" />}
                    {notification.type === 'resolved' && <CheckCircle className="w-5 h-5 text-[#4CAF50]" />}
                    {notification.type === 'system' && <Bell className="w-5 h-5 text-[#2196F3]" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#FF4500] rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>

                    <p className="text-[#A0A0A0] text-[12px] leading-relaxed mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {notification.message}
                    </p>

                    {/* Report ID */}
                    {notification.reportId && (
                      <div className="inline-block px-2 py-0.5 bg-[#1E1E1E] border border-[#505050] rounded-[4px] text-[#FF4500] text-[10px] font-mono mb-2">
                        {notification.reportId}
                      </div>
                    )}

                    {/* Location */}
                    {notification.location && (
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-[#FF4500]" />
                        <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {notification.location}
                        </span>
                      </div>
                    )}

                    {/* Time */}
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#505050]" />
                      <span className="text-[#505050] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}