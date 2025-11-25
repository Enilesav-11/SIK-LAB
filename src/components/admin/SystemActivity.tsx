import { Activity, Clock, User, AlertTriangle, CheckCircle, Database, Download, X, MapPin, AlertCircle, Users } from 'lucide-react';
import type { User as UserType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface SystemActivityProps {
  user: UserType;
}

interface ActivityLog {
  id: string;
  role: 'Resident' | 'BFP/LGU' | 'System';
  activity: string;
  status: 'success' | 'pending' | 'error';
  time: string;
  details?: {
    location?: string;
    reportId?: string;
    affectedCount?: number;
    description?: string;
  };
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    role: 'Resident',
    activity: 'Submitted urgent fire alert for Purok 9-A, Tambacan',
    status: 'success',
    time: '2 minutes ago',
    details: {
      location: 'Purok 9-A, near Sari-Sari Store, Tambacan',
      reportId: 'FI001',
      description: 'House fire caused by ceiling fan explosion. Heavy smoke, multiple families affected. Emergency response units dispatched immediately.',
      affectedCount: 5
    }
  },
  {
    id: '2',
    role: 'BFP/LGU',
    activity: 'Received fire incident report FI001',
    status: 'success',
    time: '5 minutes ago',
    details: {
      location: 'Purok 9-A, Tambacan',
      reportId: 'FI001',
      description: 'Fire incident report received and verified. Units dispatched to location.',
      affectedCount: 5
    }
  },
  {
    id: '3',
    role: 'BFP/LGU',
    activity: 'Dispatched units to Purok 9-A location',
    status: 'success',
    time: '8 minutes ago',
    details: {
      location: 'Purok 9-A, Tambacan',
      reportId: 'FI001',
      description: 'Fire trucks and emergency response team dispatched. ETA: 5 minutes.',
      affectedCount: 5
    }
  },
  {
    id: '4',
    role: 'Resident',
    activity: 'Submitted hazard report for electrical wiring',
    status: 'pending',
    time: '15 minutes ago',
    details: {
      location: 'Purok 5, near basketball court, Tambacan',
      reportId: 'HR006',
      description: 'Tangled electrical wires hanging low, touching metal roofs. Risk of electrocution and fire. Awaiting BFP validation.',
      affectedCount: 12
    }
  },
  {
    id: '5',
    role: 'BFP/LGU',
    activity: 'Validated hazard report HR001',
    status: 'success',
    time: '28 minutes ago',
    details: {
      location: 'Purok 5, Tambacan',
      reportId: 'HR001',
      description: 'Hazard report validated and escalated to appropriate authorities for immediate action.',
      affectedCount: 8
    }
  },
  {
    id: '6',
    role: 'System',
    activity: 'Automated backup completed successfully',
    status: 'success',
    time: '1 hour ago',
    details: {
      description: 'Full system backup completed. All data, reports, and user information successfully archived.',
      affectedCount: 0
    }
  },
  {
    id: '7',
    role: 'Resident',
    activity: 'New user registration - Juan Dela Cruz',
    status: 'success',
    time: '2 hours ago',
    details: {
      location: 'Tambacan',
      description: 'New resident account created. User verified and granted access to SIKLAB features.',
      affectedCount: 1
    }
  },
  {
    id: '8',
    role: 'BFP/LGU',
    activity: 'Marked incident FI002 as resolved',
    status: 'success',
    time: '3 hours ago',
    details: {
      location: 'Purok 3, Poblacion',
      reportId: 'FI002',
      description: 'Fire incident successfully contained and resolved. All affected families safe. Area secured.',
      affectedCount: 3
    }
  },
  {
    id: '9',
    role: 'System',
    activity: 'Sent SMS alerts to 150 residents in affected area',
    status: 'success',
    time: '4 hours ago',
    details: {
      location: 'Tambacan area',
      description: 'Mass notification sent to all residents in fire-affected zone. Emergency instructions delivered.',
      affectedCount: 150
    }
  },
  {
    id: '10',
    role: 'Resident',
    activity: 'Accessed fire hazard map',
    status: 'success',
    time: '5 hours ago',
    details: {
      description: 'Resident viewed fire hazard map to check risk levels in their area.',
      affectedCount: 1
    }
  }
];

export function SystemActivity({ user }: SystemActivityProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);
  
  const handleBackup = () => {
    toast.success('Full backup initiated successfully!');
  };

  const handleExport = () => {
    toast.success('Activity log exported successfully!');
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] p-4 pt-16 pb-24 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-[#F0F0F0] text-[20px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          System Activity Monitor
        </h1>
        <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Real-time activity log of all system operations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#2C2C2C] border border-[#4CAF50] rounded-[12px] p-3 text-center">
          <CheckCircle className="w-5 h-5 text-[#4CAF50] mx-auto mb-2" />
          <div className="text-[#4CAF50] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {mockActivityLogs.filter(log => log.status === 'success').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Success
          </div>
        </div>
        <div className="bg-[#2C2C2C] border border-[#FF4500] rounded-[12px] p-3 text-center">
          <Clock className="w-5 h-5 text-[#FF4500] mx-auto mb-2" />
          <div className="text-[#FF4500] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {mockActivityLogs.filter(log => log.status === 'pending').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Pending
          </div>
        </div>
        <div className="bg-[#2C2C2C] border border-[#DC143C] rounded-[12px] p-3 text-center">
          <AlertTriangle className="w-5 h-5 text-[#DC143C] mx-auto mb-2" />
          <div className="text-[#DC143C] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {mockActivityLogs.filter(log => log.status === 'error').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Errors
          </div>
        </div>
      </div>

      {/* Data Backup Card */}
      <div className="bg-[#2C2C2C] border border-[#2196F3] rounded-[16px] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2196F3]/20 rounded-full flex items-center justify-center">
              <Database className="w-5 h-5 text-[#2196F3]" />
            </div>
            <h3 className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Database Backup
            </h3>
          </div>
          <div className="px-2 py-1 bg-[#4CAF50] text-[#F0F0F0] rounded-[6px] text-[10px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Complete
          </div>
        </div>
        <p className="text-[#A0A0A0] text-[11px] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Last backup: Today, 10:45 PM
        </p>
        <button
          onClick={handleBackup}
          className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-[#F0F0F0] rounded-[10px] py-2.5 px-4 flex items-center justify-center gap-2 text-[12px] font-bold transition-all"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <Database className="w-4 h-4" />
          Initiate Full Backup
        </button>
      </div>

      {/* Activity Log */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Activity Log
          </h3>
          <button
            onClick={handleExport}
            className="text-[#FF4500] text-[11px] font-semibold hover:underline flex items-center gap-1"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Download className="w-3 h-3" />
            Export Log
          </button>
        </div>

        <div className="space-y-2">
          {mockActivityLogs.map((log) => (
            <button
              key={log.id}
              onClick={() => setSelectedActivity(log)}
              className="w-full bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-3 hover:border-[#FF4500] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  log.role === 'Resident' ? 'bg-[#2196F3]/20' :
                  log.role === 'BFP/LGU' ? 'bg-[#DC143C]/20' :
                  'bg-[#A0A0A0]/20'
                }`}>
                  {log.role === 'System' ? (
                    <Activity className="w-4 h-4 text-[#A0A0A0]" />
                  ) : (
                    <User className={`w-4 h-4 ${
                      log.role === 'Resident' ? 'text-[#2196F3]' :
                      log.role === 'BFP/LGU' ? 'text-[#DC143C]' :
                      'text-[#A0A0A0]'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className={`px-2 py-0.5 rounded-[4px] border text-[9px] font-bold uppercase ${
                      log.role === 'Resident' ? 'border-[#2196F3] text-[#2196F3]' :
                      log.role === 'BFP/LGU' ? 'border-[#DC143C] text-[#DC143C]' :
                      'border-[#A0A0A0] text-[#A0A0A0]'
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {log.role}
                    </div>
                    <div className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                      log.status === 'success' ? 'bg-[#4CAF50]' :
                      log.status === 'pending' ? 'bg-[#FF4500]' :
                      'bg-[#DC143C]'
                    } text-[#F0F0F0]`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {log.status}
                    </div>
                  </div>
                  <p className="text-[#F0F0F0] text-[11px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {log.activity}
                  </p>
                  <div className="flex items-center gap-1 text-[#A0A0A0] text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{log.time}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
        <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          System Health Status
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-[#505050]">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Database Connection
            </span>
            <div className="px-2 py-1 bg-[#4CAF50] text-[#F0F0F0] rounded-[6px] text-[10px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Active
            </div>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#505050]">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              API Services
            </span>
            <div className="px-2 py-1 bg-[#4CAF50] text-[#F0F0F0] rounded-[6px] text-[10px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Running
            </div>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[#505050]">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Storage Available
            </span>
            <span className="text-[#F0F0F0] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              58%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Active Users
            </span>
            <span className="text-[#F0F0F0] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              3 online
            </span>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] max-w-[500px] w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Activity Details
              </h2>
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3C3C3C] transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 space-y-4">
              {/* Role and Status */}
              <div className="flex items-center justify-between gap-3">
                <div className={`flex-1 px-3 py-2 rounded-[8px] border ${
                  selectedActivity.role === 'Resident' ? 'border-[#2196F3] bg-[#2196F3]/10' :
                  selectedActivity.role === 'BFP/LGU' ? 'border-[#DC143C] bg-[#DC143C]/10' :
                  'border-[#A0A0A0] bg-[#A0A0A0]/10'
                }`}>
                  <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    ROLE
                  </p>
                  <p className={`text-[14px] font-bold ${
                    selectedActivity.role === 'Resident' ? 'text-[#2196F3]' :
                    selectedActivity.role === 'BFP/LGU' ? 'text-[#DC143C]' :
                    'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.role}
                  </p>
                </div>
                <div className={`flex-1 px-3 py-2 rounded-[8px] ${
                  selectedActivity.status === 'success' ? 'bg-[#4CAF50]' :
                  selectedActivity.status === 'pending' ? 'bg-[#FF4500]' :
                  'bg-[#DC143C]'
                }`}>
                  <p className="text-[#F0F0F0]/70 text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    STATUS
                  </p>
                  <p className="text-[#F0F0F0] text-[14px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.status}
                  </p>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Activity
                </p>
                <p className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedActivity.activity}
                </p>
              </div>

              {/* Report ID */}
              {selectedActivity.details?.reportId && (
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Report ID
                  </p>
                  <p className="text-[#FF4500] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.details.reportId}
                  </p>
                </div>
              )}

              {/* Location */}
              {selectedActivity.details?.location && (
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#FF4500]" />
                    <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Location
                    </p>
                  </div>
                  <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.details.location}
                  </p>
                </div>
              )}

              {/* Description */}
              {selectedActivity.details?.description && (
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Description
                  </p>
                  <p className="text-[#F0F0F0] text-[13px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.details.description}
                  </p>
                </div>
              )}

              {/* Affected Count */}
              {selectedActivity.details && selectedActivity.details.affectedCount !== undefined && selectedActivity.details.affectedCount > 0 && (
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#FF4500]" />
                    <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Affected People
                    </p>
                  </div>
                  <p className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedActivity.details.affectedCount}
                  </p>
                </div>
              )}

              {/* Timestamp */}
              <div className="flex items-center gap-2 text-[#A0A0A0] text-[12px]">
                <Clock className="w-4 h-4" />
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{selectedActivity.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
