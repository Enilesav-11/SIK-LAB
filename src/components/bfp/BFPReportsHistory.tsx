import { ArrowLeft, Clock, MapPin, CheckCircle, AlertTriangle, Calendar, Filter } from 'lucide-react';
import type { User } from '../../App';
import { useState } from 'react';

interface BFPReportsHistoryProps {
  user: User;
  onBack: () => void;
}

interface Report {
  id: string;
  type: 'incident' | 'hazard';
  title: string;
  location: string;
  status: 'verified' | 'resolved' | 'pending';
  severity: 'high' | 'medium' | 'low';
  date: string;
  verifiedBy: string;
  description: string;
}

const mockReports: Report[] = [
  {
    id: 'FI001',
    type: 'incident',
    title: 'House fire from ceiling fan explosion',
    location: 'Purok 9-A, Tambacan',
    status: 'resolved',
    severity: 'high',
    date: 'Nov 14, 2024 - 9:15 PM',
    verifiedBy: 'Officer Santos',
    description: 'Successfully contained. Fire trucks dispatched within 3 minutes. All families evacuated safely.'
  },
  {
    id: 'HR005',
    type: 'hazard',
    title: 'Tangled electrical wires near houses',
    location: 'Purok 5, Tambacan',
    status: 'verified',
    severity: 'medium',
    date: 'Nov 14, 2024 - 8:30 PM',
    verifiedBy: 'Officer Santos',
    description: 'AI verified as Major hazard. Escalated to electrical authority for immediate action.'
  },
  {
    id: 'FI002',
    type: 'incident',
    title: 'Kitchen fire from gas stove leak',
    location: 'Purok 3, Poblacion',
    status: 'resolved',
    severity: 'medium',
    date: 'Nov 13, 2024 - 5:45 PM',
    verifiedBy: 'Officer Reyes',
    description: 'Minor kitchen fire. Extinguished by residents before unit arrival. Area inspected and cleared.'
  },
  {
    id: 'HR004',
    type: 'hazard',
    title: 'Blocked fire exit in apartment building',
    location: 'Purok 7, Pala-o',
    status: 'pending',
    severity: 'high',
    date: 'Nov 13, 2024 - 2:20 PM',
    verifiedBy: 'Officer Santos',
    description: 'Under investigation. Building management contacted for immediate compliance.'
  },
  {
    id: 'FI003',
    type: 'incident',
    title: 'Small trash fire near market',
    location: 'Public Market, City Proper',
    status: 'resolved',
    severity: 'low',
    date: 'Nov 12, 2024 - 11:30 AM',
    verifiedBy: 'Officer Cruz',
    description: 'Isolated trash fire. Quick response, no damages. Area cleaned and monitored.'
  }
];

export function BFPReportsHistory({ user, onBack }: BFPReportsHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'incident' | 'hazard'>('all');

  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(r => r.type === filter);

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-4 pt-16 pb-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#1E1E1E] border border-[#505050] flex items-center justify-center hover:bg-[#505050] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#F0F0F0]" />
          </button>
          <div>
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              My Reports History
            </h1>
            <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              All verified and resolved reports
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-3 rounded-[8px] text-[11px] font-bold transition-colors ${
              filter === 'all'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            All ({mockReports.length})
          </button>
          <button
            onClick={() => setFilter('incident')}
            className={`flex-1 py-2 px-3 rounded-[8px] text-[11px] font-bold transition-colors ${
              filter === 'incident'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Incidents ({mockReports.filter(r => r.type === 'incident').length})
          </button>
          <button
            onClick={() => setFilter('hazard')}
            className={`flex-1 py-2 px-3 rounded-[8px] text-[11px] font-bold transition-colors ${
              filter === 'hazard'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Hazards ({mockReports.filter(r => r.type === 'hazard').length})
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                    report.type === 'incident'
                      ? 'bg-[#DC143C] text-[#F0F0F0]'
                      : 'bg-[#FF4500] text-[#F0F0F0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {report.type}
                  </span>
                  <span className="text-[#505050] text-[10px] font-mono" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {report.id}
                  </span>
                </div>
                <h3 className="text-[#F0F0F0] text-[13px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.title}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-[6px] border text-[10px] font-bold uppercase ${
                report.severity === 'high'
                  ? 'border-[#DC143C] text-[#DC143C] bg-[#DC143C]/10'
                  : report.severity === 'medium'
                  ? 'border-[#FF4500] text-[#FF4500] bg-[#FF4500]/10'
                  : 'border-[#FFA500] text-[#FFA500] bg-[#FFA500]/10'
              }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.severity}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3 h-3 text-[#FF4500]" />
              <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.location}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-3 h-3 text-[#A0A0A0]" />
              <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.date}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#F0F0F0] text-[11px] leading-relaxed mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {report.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#505050]">
              <div className="flex items-center gap-2">
                {report.status === 'resolved' ? (
                  <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
                ) : report.status === 'verified' ? (
                  <CheckCircle className="w-4 h-4 text-[#2196F3]" />
                ) : (
                  <Clock className="w-4 h-4 text-[#FF4500]" />
                )}
                <span className={`text-[10px] font-bold uppercase ${
                  report.status === 'resolved'
                    ? 'text-[#4CAF50]'
                    : report.status === 'verified'
                    ? 'text-[#2196F3]'
                    : 'text-[#FF4500]'
                }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.status}
                </span>
              </div>
              <span className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                by {report.verifiedBy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
