import { useState } from 'react';
import { Bell, Pin, X, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  date: string;
  isActive: boolean;
  isPinned: boolean;
  type: 'advisory' | 'resolved' | 'active';
  location?: string;
}

const initialActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'BFP Advisory: Fire Prevention Month',
    description: 'The Bureau of Fire Protection reminds all residents to practice fire safety....',
    date: '2025-11-14',
    isActive: false,
    isPinned: false,
    type: 'advisory'
  },
  {
    id: '2',
    title: 'Fire Incident Resolved in Purok 2',
    description: 'Thanks to the quick response of residents and the fire brigade, the....',
    date: '2025-11-13',
    isActive: false,
    isPinned: false,
    type: 'resolved'
  },
  {
    id: '3',
    title: 'Active Fire in Tambacan Purok 9-A',
    description: 'Fire units are currently responding to a house f....',
    date: '2025-11-14',
    isActive: true,
    isPinned: true,
    type: 'active'
  }
];

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  // Sort activities: pinned/active items first, then by date
  const sortedActivities = [...activities].sort((a, b) => {
    // Active items always at top
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    
    // Then pinned items
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then by date (newer first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? { ...activity, isPinned: !activity.isPinned }
          : activity
      )
    );
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'advisory':
        return 'bg-[#FF4500]/20 text-[#FF4500]';
      case 'resolved':
        return 'bg-[#4CAF50]/20 text-[#4CAF50]';
      case 'active':
        return 'bg-[#DC143C]/20 text-[#DC143C]';
      default:
        return 'bg-[#FF4500]/20 text-[#FF4500]';
    }
  };

  const getBorderColor = (activity: ActivityItem) => {
    if (activity.isActive) return 'border-[#DC143C]';
    if (activity.isPinned) return 'border-[#FF4500]';
    return 'border-transparent';
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Recent Activity
        </h2>
      </div>

      {/* Activity List */}
      <div className="space-y-2">
        {sortedActivities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => setSelectedActivity(activity)}
            className={`w-full bg-[#2C2C2C] border-2 ${getBorderColor(activity)} rounded-[12px] p-3 hover:border-[#FF4500] transition-all cursor-pointer text-left relative group`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(activity.type)}`}>
                {activity.type === 'active' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : activity.type === 'resolved' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[#F0F0F0] text-[13px] font-semibold line-clamp-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {activity.title}
                  </h3>
                  
                  {/* Pin button - visible on hover or when pinned */}
                  <button
                    onClick={(e) => togglePin(activity.id, e)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      activity.isPinned
                        ? 'bg-[#FF4500] text-[#F0F0F0]'
                        : 'bg-[#3C3C3C] text-[#A0A0A0] opacity-0 group-hover:opacity-100'
                    }`}
                    title={activity.isPinned ? 'Unpin' : 'Pin to top'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${activity.isPinned ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-[#A0A0A0] text-[11px] mb-2 line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {activity.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#A0A0A0] text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{activity.date}</span>
                  </div>

                  {activity.isActive && (
                    <div className="px-2 py-0.5 bg-[#DC143C] text-[#F0F0F0] rounded-[4px] text-[9px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Active
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] max-w-[400px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-[#505050] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(selectedActivity.type)}`}>
                  {selectedActivity.type === 'active' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : selectedActivity.type === 'resolved' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>
                <h2 className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Activity Details
                </h2>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3C3C3C] transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 space-y-4">
              {/* Status Badge */}
              {selectedActivity.isActive && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-[#DC143C] rounded-[8px]">
                    <p className="text-[#F0F0F0]/70 text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      STATUS
                    </p>
                    <p className="text-[#F0F0F0] text-[14px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Active Emergency
                    </p>
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Title
                </p>
                <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedActivity.title}
                </p>
              </div>

              {/* Description */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Description
                </p>
                <p className="text-[#F0F0F0] text-[13px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedActivity.description.replace('....', ' Full details about this activity would appear here with complete information for residents.')}
                </p>
              </div>

              {/* Location (for active incidents) */}
              {selectedActivity.isActive && (
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#FF4500]" />
                    <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Location
                    </p>
                  </div>
                  <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Tambacan Purok 9-A, near Sari-Sari Store
                  </p>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-[#A0A0A0] text-[12px]">
                <Clock className="w-4 h-4" />
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{selectedActivity.date}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {selectedActivity.isActive && (
                  <button className="flex-1 bg-[#DC143C] hover:bg-[#B71C1C] text-[#F0F0F0] rounded-[10px] py-3 text-[12px] font-bold transition-all" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    View Emergency Info
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(selectedActivity.id, e);
                  }}
                  className={`flex-1 rounded-[10px] py-3 text-[12px] font-bold transition-all ${
                    selectedActivity.isPinned
                      ? 'bg-[#FF4500] hover:bg-[#E03E00] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {selectedActivity.isPinned ? 'Unpin' : 'Pin to Top'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
