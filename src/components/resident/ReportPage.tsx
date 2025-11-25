import { useState } from 'react';
import { ChevronLeft, MapPin, Camera, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import type { User } from '../../App';

interface ReportPageProps {
  user: User;
}

type ReportType = 'urgent' | 'hazard' | null;

export function ReportPage({ user }: ReportPageProps) {
  const [reportType, setReportType] = useState<ReportType>(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [severity, setSeverity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCameraOverlay, setShowCameraOverlay] = useState(false);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-white text-2xl mb-2">
            {reportType === 'urgent' ? 'URGENT ALERT SENT!' : 'REPORT SENT!'}
          </h1>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            {reportType === 'urgent' 
              ? 'We have alerted your Barangay Officials and BFP. Stay safe and move to a secure location.'
              : 'Your fire hazard report has been submitted for validation by officials.'}
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => {
                setShowConfirmation(false);
                setReportType(null);
              }}
              className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white rounded-full h-12"
            >
              Return to Home
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-700 text-gray-300 bg-transparent hover:bg-gray-800 rounded-full h-12"
            >
              View Report History
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!reportType) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-6 pt-16">
        <h1 className="text-white text-2xl mb-2">Report Incident</h1>
        <p className="text-gray-400 mb-8">Choose the type of report</p>

        <div className="space-y-4">
          <button
            onClick={() => setReportType('urgent')}
            className="w-full bg-gradient-to-br from-[#DC143C] to-[#FF4500] rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg mb-1">URGENT FIRE ALERT</h3>
                <p className="text-white/80 text-sm">
                  Report an active fire incident happening right now. Emergency responders will be notified immediately.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setReportType('hazard')}
            className="w-full bg-[#2a2a2a] border-2 border-gray-700 rounded-2xl p-6 text-left hover:border-[#FF4500] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FF4500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#FF4500]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg mb-1">FIRE HAZARD REPORT</h3>
                <p className="text-gray-400 text-sm">
                  Report potential fire hazards like faulty wiring, blocked exits, or unsafe conditions.
                </p>
              </div>
            </div>
          </button>
        </div>

        <Card className="bg-blue-900/20 border-blue-700/30 p-4 rounded-xl mt-8">
          <p className="text-blue-200 text-sm">
            <strong>For immediate emergencies:</strong> Call 911, 160, or (063) 221-4444
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-24">
      {/* Header */}
      <div className="p-6 pt-16 bg-[#2a2a2a]">
        <button onClick={() => setReportType(null)} className="text-gray-400 mb-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl mb-1">
          {reportType === 'urgent' ? 'Urgent Fire Alert' : 'Report Fire Hazard'}
        </h1>
        <p className="text-gray-400 text-sm">
          {reportType === 'urgent' 
            ? 'Provide quick details about the active fire'
            : 'Provide detailed information about the hazard'}
        </p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Map Preview */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">Location</label>
          <div className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-gray-700 h-48 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-[#FF4500]" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <Button className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                Set Location
              </Button>
            </div>
          </div>
          <Input
            placeholder="Nearest Landmark / Additional Details"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 bg-[#2a2a2a] border-gray-700 text-white rounded-xl"
          />
        </div>

        {/* Type of Incident */}
        {reportType === 'hazard' && (
          <div>
            <label className="text-gray-400 text-sm block mb-2">Type of Hazard</label>
            <div className="flex flex-wrap gap-2">
              {['Structural Hazard', 'Electrical Hazard', 'Cluttered Exit Path', 'Other'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedIncidentType(type)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedIncidentType === type
                      ? 'bg-[#FF4500] text-white'
                      : 'bg-[#2a2a2a] text-gray-400 border border-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Severity */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">Perceived Severity</label>
          <input
            type="range"
            min="0"
            max="2"
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">
            {reportType === 'urgent' ? 'What is happening?' : 'Detailed Description'}
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={reportType === 'urgent' 
              ? 'Brief description of the fire...'
              : 'Provide a detailed description of the hazard...'}
            rows={4}
            className="bg-[#2a2a2a] border-gray-700 text-white rounded-xl resize-none"
          />
        </div>

        {/* Photo/Video Upload */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">Attach Media (Optional)</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowCameraOverlay(true)}
              className="border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-[#FF4500] transition-colors"
            >
              <Camera className="w-8 h-8 text-[#FF4500] mx-auto mb-2" />
              <p className="text-gray-400 text-xs">Add Photo</p>
            </button>
            <button
              onClick={() => setShowCameraOverlay(true)}
              className="border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-[#FF4500] transition-colors"
            >
              <Camera className="w-8 h-8 text-[#FF4500] mx-auto mb-2" />
              <p className="text-gray-400 text-xs">Add Video</p>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className={`w-full h-12 rounded-full text-white shadow-lg ${
            reportType === 'urgent'
              ? 'bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#FF4500] hover:to-[#DC143C]'
              : 'bg-[#FF4500] hover:bg-[#FF5722]'
          }`}
        >
          {reportType === 'urgent' ? 'SEND URGENT ALERT' : 'Submit Hazard Report'}
        </Button>
      </div>

      {/* Camera Overlay */}
      {showCameraOverlay && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setShowCameraOverlay(false)}>
          <div className="text-center">
            <Camera className="w-16 h-16 text-white mx-auto mb-4" />
            <p className="text-white">Camera/Gallery Access</p>
            <p className="text-gray-400 text-sm mt-2">Tap to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
