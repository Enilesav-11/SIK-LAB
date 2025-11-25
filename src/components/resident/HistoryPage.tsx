import { useState } from 'react';
import { ChevronLeft, AlertTriangle, MapPin, Clock, X, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '../../App';
import { mockFireIncidents, mockHazardReports } from '../../lib/mockData';
import { Map as PigeonMap, Marker } from 'pigeon-maps';

interface HistoryPageProps {
  user: User;
}

type TabType = 'all' | 'hazard' | 'urgent';

// Combine incidents and hazards into unified report format
const mockReports = [
  ...mockFireIncidents.map(incident => ({
    id: incident.id,
    type: 'urgent' as const,
    title: incident.location.split(',')[0],
    location: incident.location,
    barangay: incident.barangay,
    date: incident.reportedAt,
    status: incident.status,
    description: incident.description,
    reportedBy: incident.reportedBy,
    severity: incident.severity,
    lat: incident.lat,
    lng: incident.lng,
    imageUrl: incident.imageUrl,
    category: 'Fire Incident'
  })),
  ...mockHazardReports.map(hazard => ({
    id: hazard.id,
    type: 'hazard' as const,
    title: hazard.type.charAt(0).toUpperCase() + hazard.type.slice(1) + ' Hazard',
    location: hazard.location,
    barangay: hazard.barangay,
    date: hazard.reportedAt,
    status: hazard.status,
    description: hazard.description,
    reportedBy: hazard.reportedBy,
    severity: hazard.severity,
    lat: hazard.lat,
    lng: hazard.lng,
    imageUrl: hazard.imageUrl,
    category: hazard.type.charAt(0).toUpperCase() + hazard.type.slice(1) + ' Hazard'
  }))
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function HistoryPage({ user }: HistoryPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [showFullImage, setShowFullImage] = useState(false);

  const filteredReports = mockReports.filter(report => {
    if (activeTab === 'all') return true;
    if (activeTab === 'hazard') return report.type === 'hazard';
    if (activeTab === 'urgent') return report.type === 'urgent';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-[#4CAF50] text-[#F0F0F0]';
      case 'validated':
      case 'active':
        return 'bg-[#FF4500] text-[#F0F0F0]';
      case 'pending':
        return 'bg-[#A0A0A0] text-[#1E1E1E]';
      case 'rejected':
        return 'bg-[#DC143C] text-[#F0F0F0]';
      default:
        return 'bg-[#A0A0A0] text-[#1E1E1E]';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-[#DC143C]';
      case 'medium':
        return 'text-[#FF4500]';
      case 'low':
        return 'text-[#FFA500]';
      default:
        return 'text-[#A0A0A0]';
    }
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Top App Bar */}
      <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050]">
        <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Report History
        </h1>
      </div>

      {/* Tab/Segmented Control */}
      <div className="px-5 py-4 bg-[#2C2C2C] border-b border-[#505050]">
        <div className="flex gap-2 bg-[#1E1E1E] rounded-[12px] p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-[8px] text-[14px] font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            All Reports
          </button>
          <button
            onClick={() => setActiveTab('hazard')}
            className={`flex-1 py-2 px-4 rounded-[8px] text-[14px] font-semibold transition-all ${
              activeTab === 'hazard'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Hazards
          </button>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`flex-1 py-2 px-4 rounded-[8px] text-[14px] font-semibold transition-all ${
              activeTab === 'urgent'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Urgent
          </button>
        </div>
      </div>

      {/* Report List */}
      <div className="px-5 py-6 space-y-3">
        {filteredReports.map((report) => (
          <Card 
            key={report.id} 
            onClick={() => setSelectedReport(report)}
            className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px] hover:border-[#FF4500] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                report.type === 'urgent' ? 'bg-[#DC143C]/20' : 'bg-[#FF4500]/20'
              }`}>
                {report.type === 'urgent' ? (
                  <AlertTriangle className="w-5 h-5 text-[#DC143C]" />
                ) : (
                  <MapPin className="w-5 h-5 text-[#FF4500]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {report.title}
                  </h4>
                  <Badge className={`text-[10px] px-2 py-1 ${getStatusColor(report.status)}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {report.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-[#A0A0A0] text-[12px] flex items-center gap-1 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <MapPin className="w-3 h-3" />
                  {report.location}
                </p>
                <p className="text-[#A0A0A0] text-[12px] flex items-center gap-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Clock className="w-3 h-3" />
                  {report.date}
                </p>
                <p className="text-[#A0A0A0] text-[12px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  ID: {report.id}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A0A0] flex-shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] max-w-[500px] w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Report Details
              </h2>
              <button 
                onClick={() => setSelectedReport(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3C3C3C] transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Image Preview */}
              {selectedReport.imageUrl && (
                <div 
                  className="relative rounded-[12px] overflow-hidden cursor-pointer group"
                  onClick={() => setShowFullImage(true)}
                >
                  <img 
                    src={selectedReport.imageUrl} 
                    alt="Report" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}

              {/* Report Info */}
              <div className="space-y-4">
                {/* ID and Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Report ID
                    </p>
                    <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedReport.id}
                    </p>
                  </div>
                  <Badge className={`text-[12px] px-3 py-1 ${getStatusColor(selectedReport.status)}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedReport.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Category */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedReport.type === 'urgent' ? 'bg-[#DC143C]/20' : 'bg-[#FF4500]/20'
                    }`}>
                      {selectedReport.type === 'urgent' ? (
                        <AlertTriangle className="w-5 h-5 text-[#DC143C]" />
                      ) : (
                        <MapPin className="w-5 h-5 text-[#FF4500]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Category
                      </p>
                      <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {selectedReport.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Severity */}
                <div>
                  <p className="text-[#A0A0A0] text-[12px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Severity Level
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`flex-1 h-2 rounded-full ${
                      selectedReport.severity === 'high' ? 'bg-[#DC143C]' :
                      selectedReport.severity === 'medium' ? 'bg-[#FF4500]' :
                      'bg-[#FFA500]'
                    }`} />
                    <span className={`text-[14px] font-semibold uppercase ${getSeverityColor(selectedReport.severity)}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedReport.severity}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-[#A0A0A0] text-[12px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Location
                  </p>
                  <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#FF4500] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {selectedReport.location}
                        </p>
                        <p className="text-[#A0A0A0] text-[12px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {selectedReport.barangay}
                        </p>
                      </div>
                    </div>
                    {/* Mini Map Preview */}
                    <div className="mt-3 h-32 rounded-[8px] overflow-hidden">
                      <PigeonMap
                        center={[selectedReport.lat, selectedReport.lng]}
                        zoom={15}
                        height={128}
                      >
                        <Marker 
                          anchor={[selectedReport.lat, selectedReport.lng]} 
                          color="#FF4500"
                        />
                      </PigeonMap>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-[#A0A0A0] text-[12px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Description
                  </p>
                  <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                    <p className="text-[#F0F0F0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                {/* Report Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                    <p className="text-[#A0A0A0] text-[12px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Reported By
                    </p>
                    <p className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedReport.reportedBy}
                    </p>
                  </div>
                  <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                    <p className="text-[#A0A0A0] text-[12px] mb-1 flex items-center gap-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <Clock className="w-3 h-3" />
                      Date & Time
                    </p>
                    <p className="text-[#F0F0F0] text-[14px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedReport.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {showFullImage && selectedReport?.imageUrl && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setShowFullImage(false)} 
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#2C2C2C] hover:bg-[#3C3C3C] transition-colors"
            >
              <X className="w-6 h-6 text-[#F0F0F0]" />
            </button>
            <img 
              src={selectedReport.imageUrl} 
              alt="Report Full View" 
              className="w-full h-auto rounded-[12px]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}