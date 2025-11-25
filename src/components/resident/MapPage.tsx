import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Flame, Navigation, Locate, ZoomIn, ZoomOut } from 'lucide-react';
import type { User } from '../../App';
import { mockFireIncidents } from '../../lib/mockData';

interface MapPageProps {
  user: User;
}

type FilterType = 'all' | 'incidents' | 'hazards' | 'evacuation';

const evacuationCenters = [
  { id: 1, name: 'Tambacan Elementary School', lat: 8.2290, lng: 124.2462, barangay: 'Tambacan' },
  { id: 2, name: 'Poblacion Gymnasium', lat: 8.2275, lng: 124.2440, barangay: 'Poblacion' },
  { id: 3, name: 'Saray Covered Court', lat: 8.2295, lng: 124.2455, barangay: 'Saray' }
];

const hazardLocations = [
  { id: 1, type: 'Electrical Hazard', lat: 8.2285, lng: 124.2448, severity: 'medium' },
  { id: 2, type: 'Blocked Exit', lat: 8.2272, lng: 124.2458, severity: 'low' },
  { id: 3, type: 'Structural Issue', lat: 8.2288, lng: 124.2435, severity: 'high' }
];

export function MapPage({ user }: MapPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [MapComponent, setMapComponent] = useState<any>(null);

  // Load map component on client side only
  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== 'undefined') {
        // Load Leaflet CSS
        const linkId = 'leaflet-css';
        if (!document.getElementById(linkId)) {
          const link = document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Dynamically import map component
        const { InteractiveMap } = await import('./InteractiveMap');
        setMapComponent(() => InteractiveMap);
      }
    };
    
    loadMap();
  }, []);

  const activeIncidents = mockFireIncidents.filter(i => i.status === 'active');

  // Get user's barangay location
  const getUserLocation = (): [number, number] => {
    const barangayCoords: Record<string, [number, number]> = {
      'Tambacan': [8.2290, 124.2462],
      'Poblacion': [8.2275, 124.2440],
      'Saray': [8.2295, 124.2455]
    };
    return barangayCoords[user.barangay || 'Tambacan'] || [8.2280, 124.2452];
  };

  const handleNavigateToUser = () => {
    setSelectedLocation(getUserLocation());
  };

  return (
    <div className="min-h-full flex flex-col bg-[#1E1E1E]">
      {/* Header */}
      <div className="p-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#FF4500] fill-[#FF4500]" />
            <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              FIRE HAZARD MAP
            </h1>
          </div>
          <button 
            onClick={handleNavigateToUser}
            className="w-10 h-10 rounded-full bg-[#FF4500] hover:bg-[#FF5722] flex items-center justify-center transition-all"
            title="Go to My Location"
          >
            <Navigation className="w-5 h-5 text-[#F0F0F0]" />
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#2C2C2C] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('incidents')}
            className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap font-semibold transition-all ${
              selectedFilter === 'incidents'
                ? 'bg-[#DC143C] text-[#F0F0F0]'
                : 'bg-[#2C2C2C] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Active Fires ({activeIncidents.length})
          </button>
          <button
            onClick={() => setSelectedFilter('hazards')}
            className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap font-semibold transition-all ${
              selectedFilter === 'hazards'
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#2C2C2C] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Hazards ({hazardLocations.length})
          </button>
          <button
            onClick={() => setSelectedFilter('evacuation')}
            className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap font-semibold transition-all ${
              selectedFilter === 'evacuation'
                ? 'bg-[#4CAF50] text-[#F0F0F0]'
                : 'bg-[#2C2C2C] text-[#A0A0A0] border border-[#505050]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Evacuation ({evacuationCenters.length})
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-[350px]">
        {MapComponent ? (
          <MapComponent 
            selectedFilter={selectedFilter}
            selectedLocation={selectedLocation}
            activeIncidents={activeIncidents}
            hazardLocations={hazardLocations}
            evacuationCenters={evacuationCenters}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-[#1E1E1E]">
            <div className="text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Loading map...
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="absolute top-4 left-4 bg-[#1E1E1E]/95 backdrop-blur-md border border-[#505050] rounded-[12px] shadow-lg p-3 text-[12px] space-y-2 z-[1000]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#DC143C]" />
            <span className="text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Active Fire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4500]" />
            <span className="text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hazard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
            <span className="text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Safe Zone</span>
          </div>
        </div>
      </div>

      {/* Bottom Details Panel */}
      <div className="bg-[#2C2C2C] border-t border-[#505050] p-4 space-y-3">
        <h3 className="text-[#F0F0F0] text-[14px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Nearby Locations
        </h3>
        
        {activeIncidents.length > 0 && (
          <div className="bg-[#DC143C]/10 border border-[#DC143C]/30 p-3 rounded-[8px]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#DC143C] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {activeIncidents[0].location}
                </p>
                <p className="text-[12px] text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {activeIncidents[0].status.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 p-3 rounded-[8px]">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Nearest Evacuation Center
              </p>
              <p className="text-[12px] text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {evacuationCenters.find(e => e.barangay === user.barangay)?.name || evacuationCenters[0].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}