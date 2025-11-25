import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, AlertTriangle, Flame, Phone, MapPin, Clock, Crosshair, Camera, X, Check } from 'lucide-react';
import type { User } from '../../App';
import { useData } from '../../lib/DataContext';

interface UrgentAlertPageProps {
  user: User;
  onBack: () => void;
}

export function UrgentAlertPage({ user, onBack }: UrgentAlertPageProps) {
  const { addFireIncident, addActivityLog } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([8.2280, 124.2452]); // Default Iligan City
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Create map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView(userLocation, 15);

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Create custom icon for user location
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative;">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #DC143C 0%, #FF4500 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.6), 0 0 40px rgba(220, 20, 60, 0.4);
            animation: pulse 2s ease-in-out infinite;
            border: 3px solid #F0F0F0;
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F0F0F0" stroke="#F0F0F0" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div style="
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            background: #DC143C;
            color: #F0F0F0;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: Montserrat, sans-serif;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">FIRE EMERGENCY</div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    // Add user marker
    const marker = L.marker(userLocation, { icon: userIcon }).addTo(map);
    
    // Add pulsing circle
    const circle = L.circle(userLocation, {
      color: '#DC143C',
      fillColor: '#DC143C',
      fillOpacity: 0.2,
      radius: 200,
      weight: 2,
    }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;
    circleRef.current = circle;

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(newLocation);
          
          if (mapRef.current && markerRef.current) {
            mapRef.current.setView(newLocation, 16);
            markerRef.current.setLatLng(newLocation);
            circleRef.current.setLatLng(newLocation);
          }
          setIsLocationLoading(false);
        },
        (error) => {
          console.log('Location access denied, using default location');
          setIsLocationLoading(false);
        }
      );
    }
  }, []);

  const handleConfirmLocation = () => {
    setLocationConfirmed(true);
  };

  const handleRecenterLocation = () => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(newLocation);
          
          if (mapRef.current && markerRef.current) {
            mapRef.current.setView(newLocation, 16, { animate: true });
            markerRef.current.setLatLng(newLocation);
            circleRef.current.setLatLng(newLocation);
          }
          setIsLocationLoading(false);
        },
        (error) => {
          console.log('Location access denied');
          setIsLocationLoading(false);
        }
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUrgentAlert = () => {
    setIsSubmitting(true);
    
    // Actually add the fire incident to the data context
    setTimeout(() => {
      const newIncident = addFireIncident({
        location: `Emergency near ${user.barangay}`,
        barangay: user.barangay || 'Unknown',
        purok: 'Emergency Alert',
        description: `Urgent fire emergency reported by ${user.name}. ${photos.length > 0 ? `${photos.length} photo(s) attached.` : 'No photos provided.'}`,
        reportedBy: user.name,
        reportedAt: 'Just now',
        status: 'active',
        severity: 'high',
        lat: userLocation[0],
        lng: userLocation[1],
        imageUrl: photos[0] || undefined
      });

      // Log the activity
      addActivityLog({
        userId: user.id,
        userName: user.name,
        userRole: 'Resident',
        action: 'Fire Emergency Reported',
        description: `Urgent fire alert submitted for ${user.barangay} - ${newIncident.id}`
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto-reset after 3 seconds
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <h2 className="text-[#F0F0F0] text-[24px] font-bold mb-3 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Alert Sent!
        </h2>
        <p className="text-[#A0A0A0] text-[14px] text-center mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          BFP and emergency responders have been notified
        </p>
        <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-[12px] p-4 w-full max-w-sm">
          <p className="text-[#4CAF50] text-[12px] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Help is on the way. Stay safe and evacuate if necessary.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E]">
      {/* Header */}
      <div className="p-4 pt-16 bg-[#DC143C] border-b border-[#DC143C]/50">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="text-[#F0F0F0] hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <AlertTriangle className="w-6 h-6 text-[#F0F0F0]" />
          <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            URGENT FIRE ALERT
          </h1>
        </div>
        <p className="text-[#F0F0F0]/80 text-[12px] ml-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Emergency fire alert - immediate response
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Warning Banner */}
        <div className="bg-[#DC143C]/20 border-2 border-[#DC143C] rounded-[12px] p-4">
          <div className="flex items-start gap-3">
            <Flame className="w-6 h-6 text-[#DC143C] fill-[#DC143C] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Emergency Fire Alert
              </h3>
              <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Use this button ONLY for active fire emergencies. This will immediately alert BFP Iligan and emergency responders to your location.
              </p>
            </div>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="bg-[#2C2C2C] border border-[#DC143C] rounded-[12px] overflow-hidden">
          <div className="bg-[#DC143C] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-[#F0F0F0]" />
              <h3 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Emergency Location
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#F0F0F0] animate-pulse" />
              <span className="text-[#F0F0F0] text-[10px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                LIVE
              </span>
            </div>
          </div>
          
          <div 
            ref={mapContainerRef}
            className="w-full h-[280px] bg-[#1E1E1E]"
          />
          
          <div className="bg-[#1E1E1E] p-3 border-t border-[#505050]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DC143C]" />
                <span className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Coordinates:
                </span>
              </div>
              <span className="text-[#A0A0A0] text-[11px] font-mono" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </span>
            </div>

            {/* Location Confirmation Buttons */}
            <div className="flex gap-2">
              {locationConfirmed ? (
                <div className="flex-1 bg-[#4CAF50]/20 border border-[#4CAF50] rounded-[8px] p-2 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-[#4CAF50] text-[11px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Location Confirmed
                  </span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleRecenterLocation}
                    disabled={isLocationLoading}
                    className="flex-1 bg-[#505050] hover:bg-[#606060] disabled:opacity-50 rounded-[8px] p-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Crosshair className="w-4 h-4 text-[#F0F0F0]" />
                    <span className="text-[#F0F0F0] text-[11px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Recenter
                    </span>
                  </button>
                  <button
                    onClick={handleConfirmLocation}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] rounded-[8px] p-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check className="w-4 h-4 text-[#F0F0F0]" />
                    <span className="text-[#F0F0F0] text-[11px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Confirm
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#FF4500]" />
              <h3 className="text-[#FF4500] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Emergency Photos
              </h3>
            </div>
            <span className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {photos.length}/5 photos
            </span>
          </div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square bg-[#1E1E1E] rounded-[8px] overflow-hidden group">
                  <img src={photo} alt={`Emergency ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-[#DC143C] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-[#F0F0F0]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {photos.length < 5 && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#1E1E1E] border-2 border-dashed border-[#505050] hover:border-[#FF4500] rounded-[8px] p-4 transition-colors flex flex-col items-center gap-2"
              >
                <Camera className="w-6 h-6 text-[#505050]" />
                <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Add photos of the emergency
                </span>
                <span className="text-[#505050] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  (Optional but recommended)
                </span>
              </button>
            </>
          )}
        </div>

        {/* Auto-detected Information */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <h3 className="text-[#FF4500] text-[14px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[#1E1E1E] rounded-[8px]">
              <MapPin className="w-5 h-5 text-[#FF4500] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  LOCATION
                </p>
                <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Barangay {user.barangay}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#1E1E1E] rounded-[8px]">
              <Phone className="w-5 h-5 text-[#FF4500] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  CONTACT
                </p>
                <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {user.contactNo || 'No contact number'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#1E1E1E] rounded-[8px]">
              <Clock className="w-5 h-5 text-[#FF4500] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  TIME
                </p>
                <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
          <h3 className="text-[#FF4500] text-[14px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What Happens Next
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#DC143C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC143C] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>1</span>
              </div>
              <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                BFP Iligan will be immediately notified
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#DC143C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC143C] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>2</span>
              </div>
              <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Emergency responders will be dispatched to your location
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#DC143C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC143C] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>3</span>
              </div>
              <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                You may receive a call to confirm details
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#4CAF50]/5 border border-[#4CAF50]/30 rounded-[12px] p-4">
          <h3 className="text-[#4CAF50] text-[12px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            EMERGENCY HOTLINES
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Fire Emergency
              </span>
              <span className="text-[#4CAF50] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                911 / 160
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#F0F0F0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                BFP Iligan
              </span>
              <span className="text-[#4CAF50] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                (063) 221-4444
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="p-4 bg-[#2C2C2C] border-t border-[#505050]">
        <button
          onClick={handleUrgentAlert}
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-br from-[#DC143C] to-[#FF4500] rounded-[12px] p-4 flex items-center justify-center gap-3 shadow-lg transition-all ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-3 border-[#F0F0F0] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sending Alert...
              </span>
            </>
          ) : (
            <>
              <Flame className="w-6 h-6 text-[#F0F0F0] fill-[#F0F0F0]" />
              <span className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SEND URGENT ALERT
              </span>
            </>
          )}
        </button>
        
        <p className="text-[#A0A0A0] text-[10px] text-center mt-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Only use for active fire emergencies
        </p>
      </div>
    </div>
  );
}