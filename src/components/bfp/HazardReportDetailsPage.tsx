import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, AlertTriangle, CheckCircle, XCircle, Phone, MessageSquare } from 'lucide-react';
import type { User as UserType } from '../../App';
import { mockHazardReports } from '../../lib/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface HazardReportDetailsPageProps {
  user: UserType;
  reportId: string;
  onBack: () => void;
}

export function HazardReportDetailsPage({ user, reportId, onBack }: HazardReportDetailsPageProps) {
  const report = mockHazardReports.find(r => r.id === reportId);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showValidateDialog, setShowValidateDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localStatus, setLocalStatus] = useState(report?.status || 'pending');

  if (!report) {
    return (
      <div className="min-h-full bg-[#1E1E1E] flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-[#FF4500] mx-auto mb-4" />
          <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Report not found
          </p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-[#FF4500] text-[#F0F0F0] rounded-[8px] text-[12px] font-semibold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return { bg: 'bg-[#DC143C]', text: 'text-[#DC143C]', border: 'border-[#DC143C]', label: 'HIGH RISK' };
      case 'medium':
        return { bg: 'bg-[#FF4500]', text: 'text-[#FF4500]', border: 'border-[#FF4500]', label: 'MEDIUM RISK' };
      case 'low':
        return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', label: 'LOW RISK' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500', label: 'UNKNOWN' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { bg: 'bg-[#FF4500]', text: 'text-[#FF4500]', border: 'border-[#FF4500]' };
      case 'validated':
        return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' };
      case 'resolved':
        return { bg: 'bg-[#4CAF50]', text: 'text-[#4CAF50]', border: 'border-[#4CAF50]' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500' };
    }
  };

  const severityStyle = getSeverityColor(report.severity);
  const statusStyle = getStatusColor(report.status);

  const handleValidate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setLocalStatus('validated');
      toast.success('Report validated successfully!');
      setIsProcessing(false);
      setShowValidateDialog(false);
    }, 1000);
  };

  const handleReject = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setLocalStatus('rejected');
      toast.error('Report rejected successfully!');
      setIsProcessing(false);
      setShowRejectDialog(false);
    }, 1000);
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-6">
      {/* Header */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] p-4 pt-16 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#FF4500] text-[14px] font-semibold hover:underline mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </button>
        <h1 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Hazard Details
        </h1>
        <p className="text-[#A0A0A0] text-[12px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {report.id}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Hazard Photo */}
        {report.imageUrl && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
            <div 
              className="relative h-[240px] bg-[#1E1E1E] cursor-pointer"
              onClick={() => setShowFullImage(true)}
            >
              <ImageWithFallback
                src={report.imageUrl}
                alt={`Hazard at ${report.location}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[#F0F0F0] text-[10px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tap to view full image
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] overflow-hidden">
          <div className="relative h-[200px] bg-[#1E1E1E]">
            {/* Map placeholder - In production, this would be a real map */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2C2C2C] to-[#1E1E1E]">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${report.lng-0.005},${report.lat-0.005},${report.lng+0.005},${report.lat+0.005}&marker=${report.lat},${report.lng}`}
                className="w-full h-full border-0"
                title="Hazard Location Map"
              />
            </div>
            {/* Map Controls */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <button className="w-8 h-8 bg-[#2C2C2C] border border-[#505050] rounded-[6px] flex items-center justify-center text-[#F0F0F0] hover:bg-[#3C3C3C]">
                +
              </button>
              <button className="w-8 h-8 bg-[#2C2C2C] border border-[#505050] rounded-[6px] flex items-center justify-center text-[#F0F0F0] hover:bg-[#3C3C3C]">
                −
              </button>
            </div>
            {/* Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-[#DC143C] rounded-full flex items-center justify-center animate-pulse">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Status and Severity */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#A0A0A0] text-[10px] font-semibold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </p>
              <div className={`inline-flex px-3 py-1.5 rounded-[6px] ${statusStyle.bg} text-[#F0F0F0] text-[11px] font-bold uppercase`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.status}
              </div>
            </div>
            <div>
              <p className="text-[#A0A0A0] text-[10px] font-semibold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Severity
              </p>
              <div className={`inline-flex px-3 py-1.5 rounded-[6px] ${severityStyle.bg} text-[#F0F0F0] text-[11px] font-bold uppercase`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {severityStyle.label}
              </div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF4500]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#FF4500]" />
            </div>
            <div className="flex-1">
              <p className="text-[#A0A0A0] text-[10px] font-semibold uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Location
              </p>
              <h3 className="text-[#F0F0F0] text-[14px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.location}
              </h3>
              <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.barangay}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <p className="text-[#A0A0A0] text-[10px] font-semibold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Description
          </p>
          <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {report.description}
          </p>
        </div>

        {/* Reporter Information */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4500] to-[#DC143C] flex items-center justify-center flex-shrink-0">
              <span className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.reportedBy.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.reportedBy}
              </p>
              <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Reporter
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-[#505050]">
            <Calendar className="w-4 h-4 text-[#A0A0A0]" />
            <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Reported on {report.reportedAt}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-[#F0F0F0] py-3 rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-bold transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            onClick={() => setShowValidateDialog(true)}
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Validated
          </button>
          <button
            className="w-full bg-[#DC143C] hover:bg-[#c41230] text-[#F0F0F0] py-3 rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-bold transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            onClick={() => setShowRejectDialog(true)}
          >
            <XCircle className="w-5 h-5" />
            Reject Report
          </button>
          <button className="w-full bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] py-3 rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-bold transition-all" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <User className="w-5 h-5" />
            Contact Reporter
          </button>
        </div>
      </div>

      {/* Full Image Modal */}
      {showFullImage && report.imageUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center text-[#F0F0F0] hover:bg-[#3C3C3C]"
            >
              ✕
            </button>
            <ImageWithFallback
              src={report.imageUrl}
              alt={`Hazard at ${report.location}`}
              className="max-w-full max-h-[80vh] object-contain rounded-[12px]"
            />
          </div>
        </div>
      )}

      {/* Validate Dialog */}
      {showValidateDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 max-w-[400px] w-full">
            <h2 className="text-[#F0F0F0] text-[16px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Validate Report
            </h2>
            <p className="text-[#A0A0A0] text-[12px] leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Are you sure you want to validate this report?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                className="px-4 py-2 bg-[#FF4500] text-[#F0F0F0] rounded-[8px] text-[12px] font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={() => setShowValidateDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#4CAF50] text-[#F0F0F0] rounded-[8px] text-[12px] font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={handleValidate}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Validate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 max-w-[400px] w-full">
            <h2 className="text-[#F0F0F0] text-[16px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Reject Report
            </h2>
            <p className="text-[#A0A0A0] text-[12px] leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Are you sure you want to reject this report?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                className="px-4 py-2 bg-[#FF4500] text-[#F0F0F0] rounded-[8px] text-[12px] font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={() => setShowRejectDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#DC143C] text-[#F0F0F0] rounded-[8px] text-[12px] font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={handleReject}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}