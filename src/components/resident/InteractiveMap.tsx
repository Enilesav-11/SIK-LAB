import { useEffect, useRef, useState } from 'react';
import { Locate, ZoomIn, ZoomOut } from 'lucide-react';

type FilterType = 'all' | 'incidents' | 'hazards' | 'evacuation';

interface InteractiveMapProps {
  selectedFilter: FilterType;
  selectedLocation: [number, number] | null;
  activeIncidents: any[];
  hazardLocations: any[];
  evacuationCenters: any[];
}

export function InteractiveMap({ 
  selectedFilter, 
  selectedLocation, 
  activeIncidents, 
  hazardLocations, 
  evacuationCenters 
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = await import('leaflet');
      
      // Initialize map
      const map = L.map(mapRef.current!, {
        center: [8.2280, 124.2452],
        zoom: 14,
        zoomControl: false
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle markers based on filter
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    const updateMarkers = async () => {
      const L = await import('leaflet');
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Create custom icons
      const fireIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" fill="#DC143C" stroke="white" stroke-width="2"/>
            <path d="M16 8L18 14L22 12L19 18L24 20L16 24L14 18L10 20L13 14L8 12L16 8Z" fill="white"/>
          </svg>
        `),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const hazardIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" fill="#FF4500" stroke="white" stroke-width="2"/>
            <path d="M16 10L17 19H15L16 10Z" fill="white"/>
            <circle cx="16" cy="22" r="1.5" fill="white"/>
          </svg>
        `),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const safeZoneIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" fill="#4CAF50" stroke="white" stroke-width="2"/>
            <path d="M12 16L15 19L21 13" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      // Add active fire incidents
      if (selectedFilter === 'all' || selectedFilter === 'incidents') {
        activeIncidents.forEach((incident) => {
          const coords = incident.barangay === 'Tambacan' ? [8.2290, 124.2465] :
                        incident.barangay === 'Poblacion' ? [8.2270, 124.2438] :
                        [8.2298, 124.2450];
          
          const marker = L.marker(coords as [number, number], { icon: fireIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center;">
                <strong style="color: #DC143C;">ACTIVE FIRE</strong>
                <p style="font-size: 14px; margin: 4px 0;">${incident.location}</p>
                <p style="font-size: 12px; color: #666; margin: 2px 0;">${incident.type}</p>
                <p style="font-size: 12px; margin: 2px 0;">${incident.reportedAt}</p>
              </div>
            `);
          
          const circle = L.circle(coords as [number, number], {
            color: '#DC143C',
            fillColor: '#DC143C',
            fillOpacity: 0.2,
            radius: 300
          }).addTo(mapInstanceRef.current);

          markersRef.current.push(marker, circle);
        });
      }

      // Add hazard locations
      if (selectedFilter === 'all' || selectedFilter === 'hazards') {
        hazardLocations.forEach((hazard) => {
          const marker = L.marker([hazard.lat, hazard.lng], { icon: hazardIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center;">
                <strong style="color: #FF4500;">HAZARD</strong>
                <p style="font-size: 14px; margin: 4px 0;">${hazard.type}</p>
                <p style="font-size: 12px; margin: 2px 0; text-transform: capitalize;">Severity: ${hazard.severity}</p>
              </div>
            `);
          
          markersRef.current.push(marker);
        });
      }

      // Add evacuation centers
      if (selectedFilter === 'all' || selectedFilter === 'evacuation') {
        evacuationCenters.forEach((center) => {
          const marker = L.marker([center.lat, center.lng], { icon: safeZoneIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center;">
                <strong style="color: #4CAF50;">SAFE ZONE</strong>
                <p style="font-size: 14px; margin: 4px 0;">${center.name}</p>
                <p style="font-size: 12px; margin: 2px 0;">${center.barangay}</p>
              </div>
            `);
          
          const circle = L.circle([center.lat, center.lng], {
            color: '#4CAF50',
            fillColor: '#4CAF50',
            fillOpacity: 0.1,
            radius: 200
          }).addTo(mapInstanceRef.current);

          markersRef.current.push(marker, circle);
        });
      }
    };

    updateMarkers();
  }, [selectedFilter, activeIncidents, hazardLocations, evacuationCenters, isLoaded]);

  // Handle fly to location
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation) return;
    
    mapInstanceRef.current.flyTo(selectedLocation, 16, {
      duration: 1.5
    });
  }, [selectedLocation]);

  const handleLocate = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.locate({ setView: true, maxZoom: 16 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Map Controls */}
      <div className="absolute right-4 top-4 z-[1000] space-y-2">
        <button
          onClick={handleLocate}
          className="w-10 h-10 bg-[#2C2C2C] border border-[#505050] rounded-[8px] flex items-center justify-center hover:bg-[#FF4500] hover:border-[#FF4500] transition-all shadow-lg"
          title="Locate Me"
        >
          <Locate className="w-5 h-5 text-[#F0F0F0]" />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-[#2C2C2C] border border-[#505050] rounded-[8px] flex items-center justify-center hover:bg-[#FF4500] hover:border-[#FF4500] transition-all shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-[#F0F0F0]" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-[#2C2C2C] border border-[#505050] rounded-[8px] flex items-center justify-center hover:bg-[#FF4500] hover:border-[#FF4500] transition-all shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-[#F0F0F0]" />
        </button>
      </div>
    </div>
  );
}
