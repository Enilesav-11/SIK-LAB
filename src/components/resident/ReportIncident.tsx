import { useState } from 'react';
import { AlertTriangle, MapPin, Camera, Send, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import type { User } from '../../App';

interface ReportIncidentProps {
  user: User;
}

type ReportType = 'fire' | 'hazard' | null;

export function ReportIncident({ user }: ReportIncidentProps) {
  const [reportType, setReportType] = useState<ReportType>(null);
  const [location, setLocation] = useState(user.barangay + ', Iligan City');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [hazardType, setHazardType] = useState<'electrical' | 'structural' | 'gas' | 'other'>('electrical');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setReportType(null);
      setDescription('');
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="h-full flex items-center justify-center p-6 pt-12">
        <Card className="p-8 text-center bg-white/10 backdrop-blur-md border-white/20">
          <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white mb-2">Report Sent!</h2>
          <p className="text-sm text-white/80 mb-4">
            {reportType === 'fire' 
              ? 'We have alerted your Barangay Officials and BFP. Stay safe!'
              : 'Your hazard report has been submitted for validation.'}
          </p>
          <Button onClick={() => setSubmitted(false)} className="bg-white hover:bg-gray-100 text-orange-600">
            Report Another
          </Button>
        </Card>
      </div>
    );
  }

  if (!reportType) {
    return (
      <div className="p-6 space-y-6 pt-12 min-h-full">
        <div>
          <h1 className="text-white mb-2">Report an Incident</h1>
          <p className="text-sm text-white/80">Choose the type of report you want to submit</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => setReportType('fire')}
            className="p-6 cursor-pointer hover:border-red-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-red-900/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-300/30">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">URGENT FIRE ALERT</h3>
                <p className="text-sm text-white/80">
                  Report an active fire incident happening right now. BFP and officials will be notified immediately.
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => setReportType('hazard')}
            className="p-6 cursor-pointer hover:border-orange-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-orange-900/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-orange-300/30">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">FIRE HAZARD REPORT</h3>
                <p className="text-sm text-white/80">
                  Report potential fire hazards like faulty wiring, blocked exits, or unsafe conditions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 bg-blue-500/20 backdrop-blur-sm border-blue-300/30">
          <p className="text-xs text-white">
            <strong>For immediate emergencies:</strong> Call 911, 160, or (063) 221-4444
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pt-12 pb-24 min-h-full">
      <div>
        <button
          onClick={() => setReportType(null)}
          className="text-sm text-white mb-4 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-white mb-2">Report Fire Hazard</h1>
        <p className="text-sm text-white/80">
          {reportType === 'fire' 
            ? 'Provide details about the active fire incident'
            : 'Provide details about the potential hazard'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location */}
        <div>
          <label className="text-sm text-white mb-2 block">Hazard Location</label>
          <div className="relative mb-2">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
              placeholder="123, Main St. Brgy, San Jose, City"
              required
            />
          </div>
          <Button type="button" className="w-full bg-white hover:bg-gray-100 text-orange-600">
            Set Location
          </Button>
          <Input
            placeholder="Nearest Landmark / Additional Location Details"
            className="mt-2 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        {/* Hazard Type */}
        {reportType === 'hazard' && (
          <div>
            <label className="text-sm text-white mb-2 block">Type of Hazard</label>
            <div className="flex gap-2 flex-wrap">
              {['Structural Hazard', 'Electrical Hazard', 'Cluttered Exit Path'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setHazardType(type.toLowerCase().split(' ')[0] as any)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    hazardType === type.toLowerCase().split(' ')[0]
                      ? 'bg-white text-orange-600'
                      : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Severity Slider */}
        <div>
          <label className="text-sm text-white mb-2 block">Perceived Severity</label>
          <input
            type="range"
            min="0"
            max="2"
            value={severity === 'low' ? 0 : severity === 'medium' ? 1 : 2}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setSeverity(val === 0 ? 'low' : val === 1 ? 'medium' : 'high');
            }}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a Detailed Description of the Hazard"
            rows={3}
            required
            className="resize-none bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
          />
          <Textarea
            placeholder="Suggest any Immediate Actions or Recommendations (optional)"
            rows={2}
            className="resize-none mt-2 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        {/* Photo/Video Upload */}
        <div>
          <label className="text-sm text-white mb-2 block">Attach Photos/Videos</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center bg-white/5 backdrop-blur-sm">
              <Camera className="w-6 h-6 text-white mx-auto mb-1" />
              <p className="text-xs text-white/70">Add Photo</p>
            </div>
            <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center bg-white/5 backdrop-blur-sm">
              <Camera className="w-6 h-6 text-white mx-auto mb-1" />
              <p className="text-xs text-white/70">Add Video</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-white hover:bg-gray-100 text-orange-600 h-12 rounded-lg"
        >
          Submit Hazard Report
        </Button>
      </form>
    </div>
  );
}