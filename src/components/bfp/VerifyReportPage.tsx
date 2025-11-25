import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Camera, MapPin, Clock, User, Trash2, Info } from 'lucide-react';
import type { User as UserType } from '../../App';
import exampleImage from 'figma:asset/5399df42a96d109744f956a1008d312c15665621.png';

interface VerifyReportPageProps {
  user: UserType;
  onBack: () => void;
}

interface Report {
  id: string;
  reporterName: string;
  location: string;
  address: string;
  coordinates: [number, number];
  timestamp: string;
  photoUrl: string;
  description: string;
  aiAnalysis: {
    severity: 'Minor' | 'Major';
    confidence: number;
    factors: string[];
    recommendation: string;
  };
}

// Mock report data
const mockReport: Report = {
  id: 'RPT-2024-001',
  reporterName: 'Juan Dela Cruz',
  location: 'Tambacan, Iligan City',
  address: 'Purok 5, Tambacan',
  coordinates: [8.2290, 124.2462],
  timestamp: '2024-11-14 10:36 AM',
  photoUrl: exampleImage,
  description: 'Exposed electrical wiring with visible sparking near residential area posing fire hazard risk',
  aiAnalysis: {
    severity: 'Major',
    confidence: 92,
    factors: [
      'Active electrical sparking detected',
      'Exposed and damaged electrical wiring',
      'Proximity to residential structures',
      'High immediate fire risk',
      'Potential for electrical short circuit'
    ],
    recommendation: 'Route to BFP immediately for urgent response and inspection'
  }
};

export function VerifyReportPage({ user, onBack }: VerifyReportPageProps) {
  const [report, setReport] = useState<Report>(mockReport);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'Major':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const handleRemovePhoto = () => {
    setPhotoRemoved(true);
  };

  const handleSubmit = () => {
    setVerificationStatus('approved');
    // Here you would submit the verification to backend
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleReject = () => {
    setVerificationStatus('rejected');
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-6">
      {/* Header */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] p-4 pt-16 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#3C3C3C] hover:bg-[#4C4C4C] flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#F0F0F0]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Verify Fire Hazard Report
            </h1>
            <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Report ID: {report.id}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Report Details */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 space-y-3">
          <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Report Details
          </h2>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-[#A0A0A0] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Reported by
                </p>
                <p className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.reporterName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#A0A0A0] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Location
                </p>
                <p className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.address}
                </p>
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#A0A0A0] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Reported on
                </p>
                <p className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.timestamp}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#505050]">
              <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Description
              </p>
              <p className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.description}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Evidence */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Photo Evidence
            </h2>
            {!photoRemoved && (
              <button
                onClick={handleRemovePhoto}
                className="text-[#DC143C] text-[12px] hover:text-[#FF4500] transition-colors flex items-center gap-1"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Trash2 className="w-3 h-3" />
                Remove Photo
              </button>
            )}
          </div>

          {!photoRemoved ? (
            <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#1E1E1E]">
              <img
                src={report.photoUrl}
                alt="Hazard evidence"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-[12px] border-2 border-dashed border-[#505050] bg-[#1E1E1E] flex flex-col items-center justify-center gap-2">
              <Camera className="w-8 h-8 text-[#505050]" />
              <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Photo Removed
              </p>
            </div>
          )}
        </div>

        {/* AI Severity Analysis */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              AI Severity Analysis
            </h2>
            <span className="px-2 py-1 bg-[#4CAF50]/20 border border-[#4CAF50]/50 text-[#4CAF50] rounded-full text-[10px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              ⚡ Automated
            </span>
          </div>

          {/* Severity Badge */}
          <div className={`px-4 py-3 rounded-[12px] border ${getSeverityColor(report.aiAnalysis.severity)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {report.aiAnalysis.severity}
                </span>
              </div>
              <span className="text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {report.aiAnalysis.confidence}% confidence
              </span>
            </div>

            <p className="text-[11px] opacity-90" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              This severity level has been automatically determined based on AI analysis.
            </p>
          </div>

          {/* Analysis Factors */}
          <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-3 space-y-2">
            <p className="text-[#F0F0F0] text-[12px] font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Analysis factors:
            </p>
            <ul className="space-y-1.5">
              {report.aiAnalysis.factors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#4CAF50] text-[14px] flex-shrink-0">✓</span>
                  <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {factor}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Routing Information */}
          <div className="bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-[12px] p-3 flex gap-2">
            <Info className="w-4 h-4 text-[#FF4500] flex-shrink-0 mt-0.5" />
            <p className="text-[#F0F0F0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Your report will be automatically routed to the appropriate department based on severity. You'll receive notifications about status updates.
            </p>
          </div>
        </div>

        {/* Verification Status */}
        {verificationStatus === 'approved' && (
          <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/50 rounded-[16px] p-4 flex items-center gap-3 animate-in fade-in">
            <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
            <div>
              <p className="text-[#4CAF50] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Report Verified
              </p>
              <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Report has been approved and forwarded to appropriate department
              </p>
            </div>
          </div>
        )}

        {verificationStatus === 'rejected' && (
          <div className="bg-[#DC143C]/10 border border-[#DC143C]/50 rounded-[16px] p-4 flex items-center gap-3 animate-in fade-in">
            <XCircle className="w-6 h-6 text-[#DC143C]" />
            <div>
              <p className="text-[#DC143C] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Report Rejected
              </p>
              <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Report has been rejected and reporter will be notified
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {verificationStatus === 'pending' && (
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] py-4 rounded-[12px] font-bold text-[14px] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <CheckCircle className="w-5 h-5" />
              Verify & Submit Report
            </button>
            <button
              onClick={handleReject}
              className="w-full bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] py-4 rounded-[12px] font-bold text-[14px] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <XCircle className="w-5 h-5" />
              Reject Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}