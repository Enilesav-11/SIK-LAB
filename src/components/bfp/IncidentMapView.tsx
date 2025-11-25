import { X, Flame, MapPin, Navigation, Clock, AlertTriangle, Phone, Users, Send } from 'lucide-react';
import type { User } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useEffect, useRef } from 'react';

interface IncidentMapViewProps {
  user: User;
  incidentId: string;
  onClose: () => void;
}

// Mock incident data - in real app, this would be fetched based on incidentId
const getIncidentData = (id: string) => {
  const incidents: { [key: string]: any } = {
    'FI001': {
      id: 'FI001',
      location: 'Purok 9-A, Tambacan',
      coordinates: { lat: 8.2280, lng: 124.2452 },
      status: 'active',
      severity: 'Critical',
      reportedAt: '2 minutes ago',
      description: 'Active fire incident in residential area. Multiple structures affected.',
      affectedFamilies: 15,
      responseUnits: 3,
      estimatedTime: '5 minutes',
      reporter: 'Juan dela Cruz',
      contactNumber: '+63 917 123 4567'
    },
    'FI002': {
      id: 'FI002',
      location: 'Purok 3, Pala-o',
      coordinates: { lat: 8.2310, lng: 124.2480 },
      status: 'resolved',
      severity: 'Moderate',
      reportedAt: '1 hour ago',
      description: 'Kitchen fire successfully contained and extinguished.',
      affectedFamilies: 1,
      responseUnits: 2,
      estimatedTime: 'N/A',
      reporter: 'Maria Santos',
      contactNumber: '+63 917 987 6543'
    }
  };
  
  return incidents[id] || incidents['FI001'];
};

// BFP Station location
const BFP_LOCATION = { lat: 8.2200, lng: 124.2400 };

// Mock route points that follow realistic road patterns
const getRoutePoints = (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
  // Create a realistic route with intermediate waypoints
  const route = [
    start,
    { lat: start.lat + 0.002, lng: start.lng + 0.001 }, // Turn right
    { lat: start.lat + 0.004, lng: start.lng + 0.003 }, // Continue
    { lat: end.lat - 0.003, lng: end.lng - 0.002 }, // Approach
    { lat: end.lat - 0.001, lng: end.lng - 0.001 }, // Near destination
    end
  ];
  return route;
};

export function IncidentMapView({ user, incidentId, onClose }: IncidentMapViewProps) {
  const incident = getIncidentData(incidentId);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  
  // Calculate simple distance
  const distance = Math.sqrt(
    Math.pow(incident.coordinates.lat - BFP_LOCATION.lat, 2) + 
    Math.pow(incident.coordinates.lng - BFP_LOCATION.lng, 2)
  ) * 111;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Initialize map
      const map = L.map(mapRef.current!, {
        center: [
          (BFP_LOCATION.lat + incident.coordinates.lat) / 2,
          (BFP_LOCATION.lng + incident.coordinates.lng) / 2
        ],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Add tile layer - using CartoDB Dark Matter for dark theme
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Create custom BFP Station icon
      const bfpIcon = L.divIcon({
        className: 'custom-bfp-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 40px; 
              height: 40px; 
              background: #2196F3; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              box-shadow: 0 4px 12px rgba(33, 150, 243, 0.6);
              border: 3px solid white;
              animation: pulse-bfp 2s infinite;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7V17C2 21 12 22 12 22S22 21 22 17V7L12 2Z" />
              </svg>
            </div>
            <div style="
              margin-top: 4px;
              background: #2196F3;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 9px;
              font-weight: bold;
              white-space: nowrap;
              font-family: Montserrat, sans-serif;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">BFP Station</div>
          </div>
        `,
        iconSize: [60, 70],
        iconAnchor: [30, 40]
      });

      // Create custom Fire Location icon
      const fireIcon = L.divIcon({
        className: 'custom-fire-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 48px; 
              height: 48px; 
              background: #DC143C; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              box-shadow: 0 4px 12px rgba(220, 20, 60, 0.6);
              border: 3px solid white;
              animation: bounce-fire 1s infinite;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
            </div>
            <div style="
              margin-top: 4px;
              background: #DC143C;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 9px;
              font-weight: bold;
              white-space: nowrap;
              font-family: Montserrat, sans-serif;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">Fire Location</div>
          </div>
        `,
        iconSize: [60, 80],
        iconAnchor: [30, 48]
      });

      // Add BFP Station marker
      L.marker([BFP_LOCATION.lat, BFP_LOCATION.lng], { icon: bfpIcon }).addTo(map);

      // Add Fire Location marker
      L.marker([incident.coordinates.lat, incident.coordinates.lng], { icon: fireIcon }).addTo(map);

      // Create route
      const routePoints = getRoutePoints(BFP_LOCATION, incident.coordinates);
      const routeLatLngs: [number, number][] = routePoints.map(p => [p.lat, p.lng]);

      // Draw main route line
      L.polyline(routeLatLngs, {
        color: '#FF4500',
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1
      }).addTo(map);

      // Draw dashed outline for route
      L.polyline(routeLatLngs, {
        color: '#FF6B35',
        weight: 6,
        opacity: 0.4,
        dashArray: '10, 10',
        smoothFactor: 1
      }).addTo(map);

      // Add animated arrow markers along the route
      const arrowIcon = L.divIcon({
        className: 'route-arrow',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: #FF4500;
            clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
            transform: rotate(45deg);
            opacity: 0.8;
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // Add intermediate waypoint markers (small dots)
      routePoints.slice(1, -1).forEach((point, index) => {
        L.circleMarker([point.lat, point.lng], {
          radius: 3,
          fillColor: '#FF4500',
          fillOpacity: 0.6,
          color: '#FFF',
          weight: 1
        }).addTo(map);
      });

      // Fit bounds to show entire route
      const bounds = L.latLngBounds(routeLatLngs);
      map.fitBounds(bounds, { padding: [50, 50] });

      // Add custom styles for animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse-bfp {
          0%, 100% { 
            transform: scale(1);
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.8; 
          }
        }
        @keyframes bounce-fire {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .leaflet-container {
          background: #1E1E1E;
        }
        .leaflet-control-zoom {
          border: 1px solid #505050 !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background: #2C2C2C !important;
          color: #F0F0F0 !important;
          border: none !important;
          border-bottom: 1px solid #505050 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #3C3C3C !important;
        }
        .leaflet-control-zoom a:last-child {
          border-bottom: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [incident.coordinates.lat, incident.coordinates.lng]);
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2C2C2C] rounded-[16px] w-full max-w-[340px] max-h-[90vh] overflow-hidden border border-[#505050]">
        {/* Header */}
        <div className="bg-[#DC143C] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Fire Incident
              </h2>
              <p className="text-white/80 text-[10px] font-mono">
                {incident.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Interactive Map Container */}
        <div className="relative h-[300px] bg-[#1E1E1E] border-b border-[#505050]">
          <div ref={mapRef} className="absolute inset-0 z-0" />

          {/* Distance Badge */}
          <div className="absolute top-4 left-4 bg-[#1E1E1E]/90 backdrop-blur-sm border border-[#505050] rounded-[8px] px-3 py-2 z-[1000]">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#FF4500]" />
              <div>
                <p className="text-[#A0A0A0] text-[9px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Distance
                </p>
                <p className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {distance.toFixed(1)} km
                </p>
              </div>
            </div>
          </div>

          {/* ETA Badge */}
          <div className="absolute top-4 right-4 bg-[#FF4500]/90 backdrop-blur-sm rounded-[8px] px-3 py-2 z-[1000]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <div>
                <p className="text-white/80 text-[9px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  ETA
                </p>
                <p className="text-white text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.estimatedTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Details */}
        <div className="p-5 space-y-4 max-h-[300px] overflow-y-auto">
          {/* Location */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#FF4500]" />
              <h3 className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Location
              </h3>
            </div>
            <p className="text-[#A0A0A0] text-[13px] ml-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {incident.location}
            </p>
            <p className="text-[#505050] text-[10px] ml-6 font-mono">
              {incident.coordinates.lat.toFixed(4)}°N, {incident.coordinates.lng.toFixed(4)}°E
            </p>
          </div>

          {/* Status & Severity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] px-3 py-2">
              <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </p>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  incident.status === 'active' ? 'bg-[#DC143C]' : 'bg-[#4CAF50]'
                }`} />
                <p className="text-[#F0F0F0] text-[12px] font-bold capitalize" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.status}
                </p>
              </div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] px-3 py-2">
              <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Severity
              </p>
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-[#FF4500]" />
                <p className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.severity}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[#F0F0F0] text-[12px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Description
            </h3>
            <p className="text-[#A0A0A0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {incident.description}
            </p>
          </div>

          {/* Response Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-3 h-3 text-[#FF4500]" />
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Affected
                </p>
              </div>
              <p className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {incident.affectedFamilies} families
              </p>
            </div>
            <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-3 h-3 text-[#FF4500]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 2L5 6V20C5 21 6 22 7 22H17C18 22 19 21 19 20V6L15 2H9Z" strokeWidth="2"/>
                  <path d="M9 2V6H15" strokeWidth="2"/>
                </svg>
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Units
                </p>
              </div>
              <p className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {incident.responseUnits} trucks
              </p>
            </div>
          </div>

          {/* Reporter Info */}
          <div className="bg-[#1E1E1E] border border-[#505050] rounded-[8px] px-4 py-3">
            <p className="text-[#A0A0A0] text-[10px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Reported By
            </p>
            <p className="text-[#F0F0F0] text-[13px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {incident.reporter}
            </p>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-[#505050]" />
              <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {incident.contactNumber}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-[#505050]" />
              <p className="text-[#505050] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {incident.reportedAt}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                toast.success('Dispatching BFP units...');
              }}
              className="bg-[#FF4500] hover:bg-[#FF5722] text-white px-4 py-3 rounded-[8px] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span className="text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Dispatch BFP
                </span>
              </div>
            </button>
            <button
              onClick={() => {
                toast.success(`Calling ${incident.reporter}...`);
              }}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-4 py-3 rounded-[8px] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Call Reporter
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
