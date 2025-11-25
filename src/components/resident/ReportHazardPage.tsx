import { useState, useRef } from 'react';
import { ChevronLeft, MapPin, Camera, Send, X, MapPinned, Navigation, CheckCircle2, Info } from 'lucide-react';
import type { User } from '../../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Map, Marker } from 'pigeon-maps';

interface ReportHazardPageProps {
  user: User;
  onBack: () => void;
}

interface AIAnalysis {
  severity: 'Minor' | 'Major';
  confidence: number;
  factors: string[];
  routing: string;
}

export function ReportHazardPage({ user, onBack }: ReportHazardPageProps) {
  const [hazardType, setHazardType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [mapPosition, setMapPosition] = useState<[number, number]>([8.228000, 124.245300]);
  const [gpsLocation, setGpsLocation] = useState({
    address: 'Bunawan Road, Brgy. Bunawan, Iligan City',
    latitude: 8.228000,
    longitude: 124.245300
  });
  const [noDuplicates, setNoDuplicates] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hazardTypes = [
    'Electrical Hazard',
    'Blocked Fire Exit',
    'Flammable Materials Storage',
    'Garbage Blocking Drainage',
    'Faulty Equipment',
    'Gas Leak',
    'Other'
  ];

  // Mock AI Analysis based on photo upload
  const performAIAnalysis = (photoData: string) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      let severity: 'Minor' | 'Major' = 'Minor';
      let confidence = 85;
      let factors: string[] = [];
      let routing = '';

      if (hazardType.includes('Gas Leak')) {
        severity = 'Major';
        confidence = 92;
        factors = [
          'Flammable gas detected in area',
          'High ignition risk from nearby sources',
          'Poor ventilation increases accumulation',
          'Potential for explosion if concentrated'
        ];
        routing = 'BFP Main Office';
      } else if (hazardType.includes('Electrical Hazard')) {
        severity = 'Major';
        confidence = 90;
        factors = [
          'Exposed wiring detected',
          'Risk of electrical arcing and sparks',
          'Overloaded circuits identified',
          'Combustible materials in proximity'
        ];
        routing = 'BFP Main Office';
      } else if (hazardType.includes('Flammable Materials Storage')) {
        severity = 'Major';
        confidence = 88;
        factors = [
          'Improper storage of combustibles',
          'Lack of fire suppression equipment',
          'High fuel load concentration',
          'Inadequate ventilation detected'
        ];
        routing = 'BFP Field Unit';
      } else if (hazardType.includes('Blocked Fire Exit')) {
        severity = 'Major';
        confidence = 87;
        factors = [
          'Emergency egress obstruction',
          'Delays evacuation during fire',
          'Trapped combustible materials',
          'Violates fire safety regulations'
        ];
        routing = 'BFP Field Unit';
      } else if (hazardType.includes('Faulty Equipment')) {
        severity = 'Major';
        confidence = 86;
        factors = [
          'Equipment overheating detected',
          'Potential ignition source',
          'Lack of maintenance evident',
          'Fire risk from mechanical failure'
        ];
        routing = 'BFP Field Unit';
      } else if (hazardType.includes('Garbage Blocking Drainage')) {
        severity = 'Minor';
        confidence = 85;
        factors = [
          'Dry combustible waste accumulation',
          'Proximity to residential structures',
          'Potential ignition from discarded materials',
          'Low immediate fire risk'
        ];
        routing = 'Barangay Official';
      } else {
        severity = 'Minor';
        confidence = 83;
        factors = [
          'General fire hazard identified',
          'Moderate fuel load present',
          'No immediate ignition sources',
          'Preventive action recommended'
        ];
        routing = 'Barangay Official';
      }

      setAiAnalysis({ severity, confidence, factors, routing });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result as string;
        setUploadedPhoto(photoData);
        
        if (hazardType) {
          performAIAnalysis(photoData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setAiAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUseGPS = () => {
    const newLat = 8.228000 + (Math.random() - 0.5) * 0.01;
    const newLng = 124.245300 + (Math.random() - 0.5) * 0.01;
    setGpsLocation({
      address: 'Current Location, Brgy. ' + user.barangay + ', Iligan City',
      latitude: newLat,
      longitude: newLng
    });
    setMapPosition([newLat, newLng]);
  };

  const handleSelectOnMap = () => {
    setShowMapDialog(true);
  };

  const handleConfirmLocation = () => {
    setGpsLocation({
      address: `Custom Location, Brgy. ${user.barangay}, Iligan City`,
      latitude: mapPosition[0],
      longitude: mapPosition[1]
    });
    setShowMapDialog(false);
  };

  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setMapPosition(latLng);
  };

  const handleSubmit = () => {
    if (!hazardType || !description) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="h-screen flex flex-col bg-[#1E1E1E] items-center justify-center p-6">
        <div className="w-24 h-24 rounded-full bg-[#4CAF50]/20 flex items-center justify-center mb-6 animate-pulse">
          <div className="w-20 h-20 rounded-full bg-[#4CAF50]/40 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-[#4CAF50]" />
          </div>
        </div>
        <h2 className="text-[#F0F0F0] text-[24px] font-bold mb-3 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Report Submitted!
        </h2>
        <p className="text-[#A0A0A0] text-[14px] text-center mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Your fire hazard report has been sent
        </p>
        {aiAnalysis && (
          <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-[12px] p-4 w-full max-w-sm">
            <p className="text-[#4CAF50] text-[12px] text-center font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Routed to: {aiAnalysis.routing}
            </p>
            <p className="text-[#A0A0A0] text-[11px] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              You'll receive notifications about status updates
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E]">
      {/* Header */}
      <div className="p-4 pt-16 bg-[#2C2C2C] border-b border-[#505050]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="text-[#F0F0F0] hover:text-[#FF4500] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            File a Report
          </h1>
        </div>
        <p className="text-[#A0A0A0] text-[13px] ml-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Report fire hazards in your area
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Automatic Location Detection Info */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <div className="flex items-start gap-3 mb-2">
            <MapPin className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#F0F0F0] text-[13px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Automatic Location Detection:
              </p>
              <p className="text-[#A0A0A0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your GPS coordinates and address are being captured automatically. This ensures accurate positioning and helps detect duplicate reports in the same area.
              </p>
            </div>
          </div>
          {noDuplicates && (
            <div className="flex items-center gap-2 mt-3 bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-lg p-2">
              <CheckCircle2 className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
              <span className="text-[#4CAF50] text-[11px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                No duplicate reports found in this area
              </span>
            </div>
          )}
        </div>

        {/* Report Type Selection */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <label className="text-[#F0F0F0] text-[13px] font-bold mb-3 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Report Type <span className="text-[#DC143C]">*</span>
          </label>
          
          <select
            value={hazardType}
            onChange={(e) => {
              setHazardType(e.target.value);
              if (uploadedPhoto && e.target.value) {
                performAIAnalysis(uploadedPhoto);
              }
            }}
            className="w-full bg-[#1E1E1E] border-2 border-[#505050] rounded-[8px] p-3 text-[#F0F0F0] text-[14px] focus:border-[#FF4500] focus:outline-none transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <option value="" className="bg-[#1E1E1E]">Select hazard type...</option>
            {hazardTypes.map((type) => (
              <option key={type} value={type} className="bg-[#1E1E1E]">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <label className="text-[#F0F0F0] text-[13px] font-bold mb-3 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Description <span className="text-[#DC143C]">*</span>
          </label>
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder="Describe the fire hazard in detail..."
            rows={4}
            className="w-full bg-[#1E1E1E] border-2 border-[#505050] rounded-[8px] p-3 text-[#F0F0F0] text-[14px] placeholder-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors resize-none"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
          
          <p className="text-[#A0A0A0] text-[11px] mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {description.length} / 20 minimum characters
          </p>
        </div>

        {/* Location Auto-detected */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <label className="text-[#F0F0F0] text-[13px] font-bold mb-3 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Location (Auto-detected from GPS) <span className="text-[#DC143C]">*</span>
          </label>
          
          <div className="bg-[#1E1E1E] border-2 border-[#505050] rounded-[8px] p-3 mb-3">
            <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {gpsLocation.address}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-3 bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-lg p-2">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
            <span className="text-[#4CAF50] text-[11px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Address automatically detected from your GPS coordinates
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[#A0A0A0] text-[11px] mb-1 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Location Coordinates
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A0A0A0] text-[10px] mb-1 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={gpsLocation.latitude.toFixed(6)}
                    readOnly
                    className="w-full bg-[#1E1E1E] border border-[#505050] rounded-[6px] p-2 text-[#F0F0F0] text-[13px]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="text-[#A0A0A0] text-[10px] mb-1 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={gpsLocation.longitude.toFixed(6)}
                    readOnly
                    className="w-full bg-[#1E1E1E] border border-[#505050] rounded-[6px] p-2 text-[#F0F0F0] text-[13px]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleUseGPS}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1E1E1E] border-2 border-[#505050] rounded-[8px] p-2.5 text-[#F0F0F0] text-[12px] font-semibold hover:border-[#4285F4] transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Navigation className="w-4 h-4" />
                Use GPS
              </button>
              <button
                onClick={handleSelectOnMap}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4285F4] border-2 border-[#4285F4] rounded-[8px] p-2.5 text-white text-[12px] font-semibold hover:bg-[#357AE8] transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <MapPinned className="w-4 h-4" />
                Select on Map
              </button>
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <label className="text-[#F0F0F0] text-[13px] font-bold mb-3 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Photo Evidence
          </label>
          
          {uploadedPhoto ? (
            <div className="relative">
              <img 
                src={uploadedPhoto} 
                alt="Uploaded hazard" 
                className="w-full h-48 object-cover rounded-[8px] border-2 border-[#505050]"
              />
              <button
                onClick={removePhoto}
                className="absolute top-2 right-2 bg-[#DC143C] hover:bg-[#FF4500] rounded-full p-2 shadow-lg transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Remove Photo
                </span>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#1E1E1E] border-2 border-dashed border-[#505050] rounded-[8px] p-8 hover:border-[#FF4500] transition-colors flex flex-col items-center gap-3"
            >
              <Camera className="w-10 h-10 text-[#505050]" />
              <span className="text-[#A0A0A0] text-[13px] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Tap to add photo
              </span>
              <span className="text-[#505050] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Recommended for AI analysis
              </span>
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* AI Severity Analysis */}
        {isAnalyzing && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 border-3 border-[#FF4500] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Analyzing image with AI...
              </span>
            </div>
          </div>
        )}

        {aiAnalysis && !isAnalyzing && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#F0F0F0] text-[13px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                AI Severity Analysis
              </span>
              <span className="bg-[#4285F4]/20 border border-[#4285F4] text-[#4285F4] px-2 py-1 rounded-md text-[10px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                ⚡ Automated
              </span>
            </div>

            <div className={`border-2 rounded-[8px] p-3 mb-3 ${
              aiAnalysis.severity === 'Major' 
                ? 'bg-[#DC143C]/10 border-[#DC143C]' 
                : 'bg-[#4285F4]/10 border-[#4285F4]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[16px] font-bold ${
                  aiAnalysis.severity === 'Major' 
                    ? 'text-[#DC143C]' 
                    : 'text-[#4285F4]'
                }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {aiAnalysis.severity}
                </span>
                <span className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {aiAnalysis.confidence}% confidence
                </span>
              </div>
              
              <p className="text-[#F0F0F0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                This severity level has been automatically determined based on AI analysis.
              </p>
              
              <div className="space-y-1">
                <p className="text-[#A0A0A0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Analysis factors:
                </p>
                {aiAnalysis.factors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                    <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {factor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#1E1E1E] border border-[#505050] rounded-[8px] p-3">
              <Info className="w-4 h-4 text-[#4285F4] flex-shrink-0 mt-0.5" />
              <p className="text-[#A0A0A0] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your report will be automatically routed to the appropriate department based on severity. You'll receive notifications about status updates.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="p-4 bg-[#2C2C2C] border-t border-[#505050] space-y-2">
        <button
          onClick={handleSubmit}
          disabled={!hazardType || description.length < 20 || isSubmitting}
          className={`w-full rounded-[12px] p-3.5 flex items-center justify-center gap-3 transition-all ${
            !hazardType || description.length < 20 || isSubmitting
              ? 'bg-[#505050] text-[#A0A0A0] cursor-not-allowed'
              : 'bg-[#4285F4] text-white hover:bg-[#357AE8] shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-[15px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Submitting...
              </span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span className="text-[15px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Submit Report
              </span>
            </>
          )}
        </button>
        
        <button
          onClick={onBack}
          className="w-full rounded-[12px] p-3 text-[#A0A0A0] text-[14px] font-semibold hover:text-[#F0F0F0] transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Cancel
        </button>
      </div>

      {/* Map Selection Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-[90vw] w-full bg-[#2C2C2C] border border-[#505050]">
          <DialogHeader>
            <DialogTitle className="text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Select Location on Map
            </DialogTitle>
            <DialogDescription className="text-[#A0A0A0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Click anywhere on the map to mark the exact location of the hazard. Drag the pin to fine-tune the position.
            </DialogDescription>
          </DialogHeader>
          
          <div className="w-full h-[400px] rounded-[8px] overflow-hidden border-2 border-[#505050]">
            <Map 
              center={mapPosition} 
              zoom={16}
              onClick={handleMapClick}
            >
              <Marker 
                anchor={mapPosition}
                color="#DC143C"
                onClick={() => {}}
              />
            </Map>
          </div>

          <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] p-3">
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Latitude:</span>
                <span className="text-[#F0F0F0] ml-2 font-mono" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {mapPosition[0].toFixed(6)}
                </span>
              </div>
              <div>
                <span className="text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Longitude:</span>
                <span className="text-[#F0F0F0] ml-2 font-mono" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {mapPosition[1].toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConfirmLocation}
              className="flex-1 bg-[#4285F4] hover:bg-[#357AE8] text-white rounded-[8px] p-3 font-semibold transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Confirm Location
            </button>
            <button
              onClick={() => setShowMapDialog(false)}
              className="px-6 bg-[#505050] hover:bg-[#606060] text-[#F0F0F0] rounded-[8px] p-3 font-semibold transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
