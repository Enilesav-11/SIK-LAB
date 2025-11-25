import { useState } from 'react';
import { ArrowLeft, AlertTriangle, MapPin, Clock, Filter, Search } from 'lucide-react';
import type { User } from '../../App';
import { mockHazardReports } from '../../lib/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HazardReportsPageProps {
  user: User;
  onBack: () => void;
  onViewReport?: (reportId: string) => void;
}

export function HazardReportsPage({ user, onBack, onViewReport }: HazardReportsPageProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'validated' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = mockHazardReports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.barangay.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewDetails = (reportId: string) => {
    if (onViewReport) {
      onViewReport(reportId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#FF4500]/20 border-[#FF4500]/50 text-[#FF4500]';
      case 'validated':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'resolved':
        return 'bg-[#4CAF50]/20 border-[#4CAF50]/50 text-[#4CAF50]';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-[#DC143C]/20 border-[#DC143C]/50 text-[#DC143C]';
      case 'medium':
        return 'bg-[#FF4500]/20 border-[#FF4500]/50 text-[#FF4500]';
      case 'low':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'electrical':
        return '⚡';
      case 'structural':
        return '🏗️';
      case 'gas':
        return '🔥';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-6">
      {/* Header */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] p-4 pt-16 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#3C3C3C] hover:bg-[#4C4C4C] flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#F0F0F0]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Hazard Reports
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
              </p>
              <span className="px-2 py-0.5 bg-[#4CAF50]/20 border border-[#4CAF50]/50 text-[#4CAF50] rounded-full text-[9px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                ⚡ AI Verified
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
          <input
            type="text"
            placeholder="Search by location or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E1E1E] border border-[#505050] rounded-[10px] pl-10 pr-4 py-2.5 text-[#F0F0F0] text-[12px] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FF4500]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'pending', 'validated', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-[#FF4500] text-[#F0F0F0]'
                  : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        {filteredReports.length === 0 ? (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-[#505050] mx-auto mb-3" />
            <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              No hazard reports found
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleViewDetails(report.id)}
              className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden hover:border-[#FF4500] transition-all cursor-pointer"
            >
              {/* Image Thumbnail */}
              {report.imageUrl && (
                <div className="relative h-[180px] bg-[#1E1E1E]">
                  <ImageWithFallback
                    src={report.imageUrl}
                    alt={`Hazard at ${report.location}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with hazard type */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#1E1E1E]/90 backdrop-blur-sm border border-[#505050] rounded-[6px] flex items-center gap-1.5">
                    <span className="text-[14px]">{getTypeIcon(report.type)}</span>
                    <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.type}
                    </span>
                  </div>
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-[6px] border ${getStatusColor(report.status)}`}>
                    <span className="text-[10px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Report Details */}
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#A0A0A0] text-[10px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {report.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-[4px] border text-[9px] font-bold uppercase ${getSeverityColor(report.severity)}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {report.severity}
                      </span>
                    </div>
                    <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.location}
                    </h3>
                    <p className="text-[#A0A0A0] text-[11px] line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.description}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 pt-2 border-t border-[#505050]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                    <span className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.barangay}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A0A0A0]" />
                    <span className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {report.reportedAt}
                    </span>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF4500] to-[#DC143C] flex items-center justify-center">
                      <span className="text-[#F0F0F0] text-[9px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {report.reportedBy.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {report.reportedBy}
                      </p>
                      <p className="text-[#A0A0A0] text-[9px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Reporter
                      </p>
                    </div>
                  </div>
                  <button className="text-[#FF4500] text-[10px] font-semibold hover:underline" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}