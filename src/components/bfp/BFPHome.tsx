import { Flame, AlertTriangle, Clock, CheckCircle, TrendingUp, Settings, ArrowRight, TriangleAlert, X, MapPin, Users, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '../../App';
import { mockFireIncidents, mockHazardReports } from '../../lib/mockData';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface BFPHomeProps {
  user: User;
  onNavigate: (tab: 'home' | 'incidents' | 'map' | 'profile' | 'verify-report' | 'hazard-reports') => void;
}

interface FireIncident {
  id: string;
  location: string;
  status: string;
  severity: string;
  reportedAt: string;
  description?: string;
  affectedFamilies?: number;
  responseTime?: string;
}

export function BFPHome({ user, onNavigate }: BFPHomeProps) {
  const [selectedIncident, setSelectedIncident] = useState<FireIncident | null>(null);
  
  const totalIncidents = mockFireIncidents.length;
  const activeIncidents = mockFireIncidents.filter(i => i.status === 'active').length;
  const pendingIncidents = mockFireIncidents.filter(i => i.status === 'pending').length;
  const resolvedIncidents = mockFireIncidents.filter(i => i.status === 'resolved').length;
  const totalHazards = mockHazardReports.length;
  const pendingHazards = mockHazardReports.filter(h => h.status === 'pending').length;

  const recentIncidents = mockFireIncidents.slice(0, 3);

  return (
    <div className="h-full bg-[#1E1E1E] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-4 pt-16 pb-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#F0F0F0"/>
                <path d="M6 21V19C6 16.2386 8.23858 14 11 14H13C15.7614 14 18 16.2386 18 19V21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              BFP / LGU Portal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onNavigate('profile');
                toast.success('Opening Settings & Preferences');
              }}
              className="w-9 h-9 rounded-full bg-[#1E1E1E] border border-[#505050] flex items-center justify-center hover:bg-[#505050] transition-colors"
            >
              <Settings className="w-5 h-5 text-[#F0F0F0]" />
            </button>
          </div>
        </div>
        <p className="text-[#A0A0A0] text-[13px] ml-[60px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {user.name}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Immediate Attention Alert */}
        {activeIncidents > 0 && (
          <div className="bg-gradient-to-br from-[#DC143C] to-[#B8112F] rounded-[16px] p-4 border border-[#F0F0F0]/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F0F0F0]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-[#F0F0F0]" fill="#F0F0F0" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Immediate Attention
                </h3>
                <p className="text-[#F0F0F0]/90 text-[12px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {activeIncidents} active fire incident{activeIncidents > 1 ? 's' : ''} requiring immediate attention
                </p>
                <button
                  onClick={() => onNavigate('incidents')}
                  className="text-[#F0F0F0] text-[11px] font-semibold hover:underline flex items-center gap-1"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#FF4500]" />
              </div>
            </div>
            <div className="text-[#F0F0F0] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {totalIncidents}
            </div>
            <div className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Total Alerts
            </div>
          </div>

          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#FF4500]" />
              </div>
            </div>
            <div className="text-[#F0F0F0] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {pendingIncidents}
            </div>
            <div className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Pending
            </div>
          </div>

          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#FF4500]" fill="#FF4500" />
              </div>
            </div>
            <div className="text-[#F0F0F0] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {activeIncidents}
            </div>
            <div className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Active
            </div>
          </div>

          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              </div>
            </div>
            <div className="text-[#F0F0F0] text-[28px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {resolvedIncidents}
            </div>
            <div className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Resolved
            </div>
          </div>
        </div>

        {/* Hazard Reports Section */}
        <div className="bg-[#1E1E1E] rounded-[16px] p-4 border border-[#505050]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Hazard Reports
              </h3>
              <span className="px-2 py-0.5 bg-[#4CAF50]/20 border border-[#4CAF50]/50 text-[#4CAF50] rounded-full text-[9px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                ⚡ AI Verified
              </span>
            </div>
            <button 
              onClick={() => onNavigate('hazard-reports')}
              className="text-[#FF4500] text-[11px] font-semibold hover:underline flex items-center gap-1" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[10px] p-3">
              <div className="text-[#A0A0A0] text-[10px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Total Reports
              </div>
              <div className="text-[#F0F0F0] text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {totalHazards}
              </div>
            </div>
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[10px] p-3 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Need Review
                </div>
                <div className="w-5 h-5 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <TriangleAlert className="w-3 h-3 text-[#4CAF50]" />
                </div>
              </div>
              <div className="text-[#FF4500] text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {pendingHazards}
              </div>
            </div>
          </div>
          
          {/* Verify Report Button */}
          {pendingHazards > 0 && (
            <button
              onClick={() => onNavigate('verify-report')}
              className="w-full bg-gradient-to-r from-[#FF4500] to-[#DC143C] hover:from-[#FF5722] hover:to-[#DC143C] text-[#F0F0F0] py-3 rounded-[10px] font-bold text-[12px] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <CheckCircle className="w-4 h-4" />
              Review AI-Verified Reports ({pendingHazards})
            </button>
          )}
        </div>

        {/* Recent Fire Incidents */}
        <div className="bg-[#1E1E1E] rounded-[16px] p-4 border border-[#505050]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Recent Fire Incidents
            </h3>
            <button
              onClick={() => onNavigate('incidents')}
              className="text-[#FF4500] text-[11px] font-semibold hover:underline flex items-center gap-1"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {recentIncidents.map((incident) => (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident as FireIncident)}
                className="w-full bg-[#2C2C2C] border border-[#505050] rounded-[10px] p-3 hover:border-[#FF4500] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                        incident.status === 'active'
                          ? 'bg-[#DC143C] text-[#F0F0F0]'
                          : incident.status === 'pending'
                          ? 'bg-[#FF4500] text-[#F0F0F0]'
                          : 'bg-[#4CAF50] text-[#F0F0F0]'
                      }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {incident.status}
                      </span>
                      <span className="text-[10px] text-[#505050]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{incident.id}</span>
                    </div>
                    <p className="text-[#F0F0F0] text-[12px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{incident.location}</p>
                    <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{incident.reportedAt}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-[6px] border text-[10px] font-bold uppercase ${
                    incident.severity === 'high'
                      ? 'border-[#DC143C] text-[#DC143C]'
                      : incident.severity === 'medium'
                      ? 'border-[#FF4500] text-[#FF4500]'
                      : 'border-[#FFA500] text-[#FFA500]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {incident.severity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedIncident(null)}
        >
          <div
            className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] max-w-[400px] w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Fire Incident Details
              </h2>
              <button
                onClick={() => setSelectedIncident(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3C3C3C] transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 space-y-4">
              {/* Status and Severity */}
              <div className="flex items-center gap-3">
                <div className={`flex-1 px-3 py-2 rounded-[8px] ${
                  selectedIncident.status === 'active'
                    ? 'bg-[#DC143C]'
                    : selectedIncident.status === 'pending'
                    ? 'bg-[#FF4500]'
                    : 'bg-[#4CAF50]'
                }`}>
                  <p className="text-[#F0F0F0]/70 text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    STATUS
                  </p>
                  <p className="text-[#F0F0F0] text-[14px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedIncident.status}
                  </p>
                </div>
                <div className={`flex-1 px-3 py-2 rounded-[8px] border ${
                  selectedIncident.severity === 'high'
                    ? 'border-[#DC143C] bg-[#DC143C]/10'
                    : selectedIncident.severity === 'medium'
                    ? 'border-[#FF4500] bg-[#FF4500]/10'
                    : 'border-[#FFA500] bg-[#FFA500]/10'
                }`}>
                  <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    SEVERITY
                  </p>
                  <p className={`text-[14px] font-bold uppercase ${
                    selectedIncident.severity === 'high'
                      ? 'text-[#DC143C]'
                      : selectedIncident.severity === 'medium'
                      ? 'text-[#FF4500]'
                      : 'text-[#FFA500]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedIncident.severity}
                  </p>
                </div>
              </div>

              {/* Report ID */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Report ID
                </p>
                <p className="text-[#FF4500] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedIncident.id}
                </p>
              </div>

              {/* Location */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#FF4500]" />
                  <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Location
                  </p>
                </div>
                <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedIncident.location}
                </p>
              </div>

              {/* Time Reported */}
              <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#FF4500]" />
                  <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Reported At
                  </p>
                </div>
                <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedIncident.reportedAt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toast.success('Dispatching emergency response team');
                    setSelectedIncident(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#FF4500] to-[#DC143C] hover:from-[#FF5722] hover:to-[#DC143C] text-[#F0F0F0] py-3 rounded-[10px] font-bold text-[12px] transition-all"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Dispatch Units
                </button>
                <button
                  onClick={() => {
                    onNavigate('incidents');
                    setSelectedIncident(null);
                  }}
                  className="flex-1 bg-[#1E1E1E] border border-[#505050] hover:bg-[#3C3C3C] text-[#F0F0F0] py-3 rounded-[10px] font-bold text-[12px] transition-all"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}