import { useState, useEffect, useRef } from 'react';
import { MapPin, AlertTriangle, Home, Droplet, Flame, X, Navigation, Clock, Phone, Zap, Info, Filter, Plus, Building2, Users } from 'lucide-react';
import type { User } from '../../App';
import { mockFireIncidents, mockHazardReports, fireProneAreas, evacuationCenters, fireStations, waterSources } from '../../lib/mockData';
import type { FireIncident, HazardReport } from '../../lib/mockData';

interface BFPMapProps {
  user: User;
}

export function BFPMap({ user }: BFPMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [selectedIncident, setSelectedIncident] = useState<FireIncident | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<HazardReport | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEvacuationCenter, setShowAddEvacuationCenter] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const miniMapRef = useRef<any>(null);
  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const [newEvacuationCenter, setNewEvacuationCenter] = useState({
    name: '',
    address: '',
    capacity: '',
    contactPerson: '',
    contactNumber: '',
    lat: 8.2280,
    lng: 124.2452
  });
  const [tempMarker, setTempMarker] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState({
    fires: true,
    hazards: true,
    stations: true,
    evacuation: true,
    water: true,
    proneAreas: true
  });
  const [isMapReady, setIsMapReady] = useState(false);

  const activeIncidents = mockFireIncidents.filter(i => i.status === 'active');
  const pendingIncidents = mockFireIncidents.filter(i => i.status === 'pending');
  const pendingHazards = mockHazardReports.filter(h => h.status === 'pending' || h.status === 'validated');

  // Load Leaflet CSS and Script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load Leaflet CSS
    const linkId = 'leaflet-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const scriptId = 'leaflet-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setIsMapReady(true);
      };
      document.head.appendChild(script);
    } else if ((window as any).L) {
      setIsMapReady(true);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !isMapReady) return;

    const L = (window as any).L;
    if (!L) return;

    // Create map centered on Iligan City
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([8.2280, 124.2452], 14);

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add zoom control to top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapRef.current = map;

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-fire {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.15);
          opacity: 0.7;
        }
      }
      .fire-marker-pulse {
        animation: pulse-fire 2s ease-in-out infinite;
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
  }, [isMapReady]);

  // Add markers when filters change
  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Clear all layers except tile layer
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) return;
      mapRef.current.removeLayer(layer);
    });

    // Add click handler for adding evacuation center
    if (isAddingLocation) {
      mapRef.current.once('click', handleAddLocation);
    }

    // Add fire-prone areas
    if (activeFilters.proneAreas) {
      fireProneAreas.forEach(area => {
        L.circle([area.lat, area.lng], {
          color: area.riskLevel === 'high' ? '#DC143C' : '#FF4500',
          fillColor: area.riskLevel === 'high' ? '#DC143C' : '#FF4500',
          fillOpacity: 0.15,
          radius: 150,
          weight: 1,
        }).addTo(mapRef.current);
      });
    }

    // Add active fire incidents (pulsing red markers)
    if (activeFilters.fires) {
      activeIncidents.forEach(incident => {
        const fireIcon = L.divIcon({
          className: 'custom-fire-marker',
          html: `
            <div class="fire-marker-pulse" style="position: relative;">
              <div style="
                width: 56px;
                height: 56px;
                background: linear-gradient(135deg, #DC143C 0%, #FF4500 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 30px rgba(220, 20, 60, 0.8), 0 0 60px rgba(220, 20, 60, 0.4);
                border: 4px solid #F0F0F0;
              ">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#F0F0F0">
                  <path d="M12 2C12 2 7 6 7 11C7 14.31 9.69 17 13 17C16.31 17 19 14.31 19 11C19 6 14 2 14 2C14 2 13 4 12 6C11 4 12 2 12 2Z"/>
                  <path d="M12 11C12 11 10 12 10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14C14 12 12 11 12 11Z"/>
                </svg>
              </div>
              <div style="
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                background: #DC143C;
                color: #F0F0F0;
                padding: 4px 10px;
                border-radius: 6px;
                font-family: Montserrat, sans-serif;
                font-size: 11px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
              ">ACTIVE FIRE</div>
            </div>
          `,
          iconSize: [56, 56],
          iconAnchor: [28, 28],
        });

        L.marker([incident.lat, incident.lng], { icon: fireIcon })
          .on('click', () => {
            setSelectedIncident(incident);
            setSelectedHazard(null);
          })
          .addTo(mapRef.current);
      });

      // Add pending fire incidents (red markers, no pulse)
      pendingIncidents.forEach(incident => {
        const pendingIcon = L.divIcon({
          className: 'custom-pending-marker',
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
                box-shadow: 0 4px 12px rgba(220, 20, 60, 0.5);
                border: 3px solid #F0F0F0;
              ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div style="
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: #FF4500;
                color: #F0F0F0;
                padding: 3px 8px;
                border-radius: 4px;
                font-family: Montserrat, sans-serif;
                font-size: 9px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              ">PENDING</div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        });

        L.marker([incident.lat, incident.lng], { icon: pendingIcon })
          .on('click', () => {
            setSelectedIncident(incident);
            setSelectedHazard(null);
          })
          .addTo(mapRef.current);
      });
    }

    // Add hazard reports (orange markers)
    if (activeFilters.hazards) {
      pendingHazards.forEach(hazard => {
        const hazardIcon = L.divIcon({
          className: 'custom-hazard-marker',
          html: `
            <div style="position: relative;">
              <div style="
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #FF4500 0%, #FF8C00 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(255, 69, 0, 0.4);
                border: 3px solid #F0F0F0;
              ">
                ${hazard.type === 'electrical' ? 
                  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' :
                  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
                }
              </div>
            </div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        L.marker([hazard.lat, hazard.lng], { icon: hazardIcon })
          .on('click', () => {
            setSelectedHazard(hazard);
            setSelectedIncident(null);
          })
          .addTo(mapRef.current);
      });
    }

    // Add fire stations
    if (activeFilters.stations) {
      fireStations.forEach(station => {
        const stationIcon = L.divIcon({
          className: 'custom-station-marker',
          html: `
            <div style="
              width: 40px;
              height: 40px;
              background: #8B0000;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 8px rgba(0,0,0,0.4);
              border: 3px solid #F0F0F0;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0F0F0">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        L.marker([station.lat, station.lng], { icon: stationIcon })
          .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; min-width: 150px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #8B0000;">${station.name}</div>
              <div style="font-size: 12px; color: #505050;">Units: ${station.units}</div>
            </div>
          `)
          .addTo(mapRef.current);
      });
    }

    // Add evacuation centers
    if (activeFilters.evacuation) {
      evacuationCenters.forEach(center => {
        const centerIcon = L.divIcon({
          className: 'custom-center-marker',
          html: `
            <div style="
              width: 36px;
              height: 36px;
              background: #4CAF50;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              border: 2.5px solid #F0F0F0;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" stroke-width="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.marker([center.lat, center.lng], { icon: centerIcon })
          .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; min-width: 150px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #4CAF50;">${center.name}</div>
              <div style="font-size: 12px; color: #505050;">Capacity: ${center.capacity} persons</div>
            </div>
          `)
          .addTo(mapRef.current);
      });
    }

    // Add water sources
    if (activeFilters.water) {
      waterSources.forEach(source => {
        const waterIcon = L.divIcon({
          className: 'custom-water-marker',
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background: #2196F3;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2.5px solid #F0F0F0;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F0F0F0">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([source.lat, source.lng], { icon: waterIcon })
          .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; min-width: 120px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #2196F3;">${source.type}</div>
              <div style="font-size: 12px; color: #505050;">${source.location}</div>
            </div>
          `)
          .addTo(mapRef.current);
      });
    }

  }, [activeFilters, isMapReady]);

  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleAddEvacuationCenter = () => {
    setShowAddEvacuationCenter(true);
    setIsAddingLocation(false);
  };

  const handleAddLocation = (e: any) => {
    const L = (window as any).L;
    if (!L) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    setNewEvacuationCenter(prev => ({ ...prev, lat, lng }));

    if (tempMarker) {
      mapRef.current.removeLayer(tempMarker);
    }

    const marker = L.marker([lat, lng], {
      draggable: true
    })
    .on('dragend', (event: any) => {
      const newLat = event.target.getLatLng().lat;
      const newLng = event.target.getLatLng().lng;
      setNewEvacuationCenter(prev => ({ ...prev, lat: newLat, lng: newLng }));
    })
    .addTo(mapRef.current);

    setTempMarker(marker);
    setIsAddingLocation(false);
  };

  const handleStartAddingLocation = () => {
    setShowMiniMap(true);
  };

  const handleMiniMapClick = (e: any) => {
    const L = (window as any).L;
    if (!L || !miniMapRef.current) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    setNewEvacuationCenter(prev => ({ ...prev, lat, lng }));

    // Remove old marker if exists
    if (tempMarker) {
      miniMapRef.current.removeLayer(tempMarker);
    }

    // Add new marker
    const marker = L.marker([lat, lng], {
      draggable: true
    })
    .on('dragend', (event: any) => {
      const newLat = event.target.getLatLng().lat;
      const newLng = event.target.getLatLng().lng;
      setNewEvacuationCenter(prev => ({ ...prev, lat: newLat, lng: newLng }));
    })
    .addTo(miniMapRef.current);

    setTempMarker(marker);
  };

  // Initialize mini-map
  useEffect(() => {
    if (!miniMapContainerRef.current || miniMapRef.current || !isMapReady || !showMiniMap) return;

    const L = (window as any).L;
    if (!L) return;

    // Create mini map
    const miniMap = L.map(miniMapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView([newEvacuationCenter.lat, newEvacuationCenter.lng], 14);

    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(miniMap);

    miniMapRef.current = miniMap;

    // Add click handler
    miniMap.on('click', handleMiniMapClick);

    return () => {
      if (miniMapRef.current) {
        miniMapRef.current.remove();
        miniMapRef.current = null;
      }
    };
  }, [showMiniMap, isMapReady]);

  const handleSaveEvacuationCenter = () => {
    const L = (window as any).L;
    if (!L) return;

    // Remove temp marker
    if (tempMarker) {
      mapRef.current.removeLayer(tempMarker);
      setTempMarker(null);
    }

    const centerIcon = L.divIcon({
      className: 'custom-center-marker',
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background: #4CAF50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
          border: 2.5px solid #F0F0F0;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" stroke-width="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    L.marker([newEvacuationCenter.lat, newEvacuationCenter.lng], { icon: centerIcon })
      .bindPopup(`
        <div style="font-family: Montserrat, sans-serif; min-width: 150px;">
          <div style="font-weight: bold; margin-bottom: 4px; color: #4CAF50;">${newEvacuationCenter.name}</div>
          <div style="font-size: 12px; color: #505050;">Capacity: ${newEvacuationCenter.capacity} persons</div>
        </div>
      `)
      .addTo(mapRef.current);

    // Reset form
    setNewEvacuationCenter({
      name: '',
      address: '',
      capacity: '',
      contactPerson: '',
      contactNumber: '',
      lat: 8.2280,
      lng: 124.2452
    });
    setShowAddEvacuationCenter(false);
    setIsAddingLocation(false);
    setShowMiniMap(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] relative">
      {/* Header */}
      <div className="p-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex-shrink-0 z-20">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6 text-[#FF4500]" />
          <h1 className="text-[#F0F0F0] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Operational Map View
          </h1>
        </div>
        <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Real-time incident tracking and emergency response
        </p>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] px-4 py-3 flex-shrink-0 z-20">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#DC143C]/20 border border-[#DC143C]/50 rounded-[8px] p-3 text-center">
            <div className="text-[#DC143C] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {activeIncidents.length}
            </div>
            <div className="text-[#F0F0F0] text-[10px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              ACTIVE FIRES
            </div>
          </div>
          <div className="bg-[#FF4500]/20 border border-[#FF4500]/50 rounded-[8px] p-3 text-center">
            <div className="text-[#FF4500] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {pendingIncidents.length}
            </div>
            <div className="text-[#F0F0F0] text-[10px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              PENDING
            </div>
          </div>
          <div className="bg-[#FF8C00]/20 border border-[#FF8C00]/50 rounded-[8px] p-3 text-center">
            <div className="text-[#FF8C00] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {pendingHazards.length}
            </div>
            <div className="text-[#F0F0F0] text-[10px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              HAZARDS
            </div>
          </div>
        </div>
      </div>

      {/* Map Layers Filter Section */}
      <div className="bg-[#2C2C2C] border-b border-[#505050] px-4 py-3 flex-shrink-0 z-20 space-y-3">
        {/* Filter Button */}
        <div className="flex items-center justify-between">
          <span className="text-[#A0A0A0] text-[11px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Map Layers
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              showFilters || Object.values(activeFilters).some(v => !v)
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Layer Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.fires ? 'bg-[#DC143C]' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">🔥</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.fires ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire Incidents
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.fires}
                  onChange={() => toggleFilter('fires')}
                  className="w-5 h-5 accent-[#DC143C] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.hazards ? 'bg-[#FF4500]' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">⚠️</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.hazards ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Hazard Reports
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.hazards}
                  onChange={() => toggleFilter('hazards')}
                  className="w-5 h-5 accent-[#FF4500] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.proneAreas ? 'bg-[#DC143C]/80' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">🚨</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.proneAreas ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire-Prone Risk Zones
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.proneAreas}
                  onChange={() => toggleFilter('proneAreas')}
                  className="w-5 h-5 accent-[#DC143C] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.stations ? 'bg-[#8B0000]' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">🚒</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.stations ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire Stations
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.stations}
                  onChange={() => toggleFilter('stations')}
                  className="w-5 h-5 accent-[#8B0000] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.evacuation ? 'bg-[#4CAF50]' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">🏠</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.evacuation ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Evacuation Centers
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.evacuation}
                  onChange={() => toggleFilter('evacuation')}
                  className="w-5 h-5 accent-[#4CAF50] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeFilters.water ? 'bg-[#2196F3]' : 'bg-[#3C3C3C]'
                  }`}>
                    <span className="text-[16px]">💧</span>
                  </div>
                  <span className={`text-[12px] font-medium ${
                    activeFilters.water ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Water Sources
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activeFilters.water}
                  onChange={() => toggleFilter('water')}
                  className="w-5 h-5 accent-[#2196F3] cursor-pointer"
                />
              </label>
            </div>

            {/* Select All / Clear All */}
            <div className="pt-2 border-t border-[#505050] flex gap-2">
              <button
                onClick={() => setActiveFilters({
                  fires: true,
                  hazards: true,
                  stations: true,
                  evacuation: true,
                  water: true,
                  proneAreas: true
                })}
                className="flex-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[8px] py-2 text-[11px] font-semibold transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Select All
              </button>
              <button
                onClick={() => setActiveFilters({
                  fires: false,
                  hazards: false,
                  stations: false,
                  evacuation: false,
                  water: false,
                  proneAreas: false
                })}
                className="flex-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[8px] py-2 text-[11px] font-semibold transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative min-h-0">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Legend Toggle Button */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          className={`absolute bottom-20 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
            showLegend ? 'bg-[#FF4500]' : 'bg-[#2C2C2C] border border-[#505050]'
          }`}
          title="Toggle Legend"
        >
          <Info className={`w-5 h-5 ${
            showLegend ? 'text-[#F0F0F0]' : 'text-[#A0A0A0]'
          }`} />
        </button>

        {/* Legend */}
        {showLegend && (
          <div className="absolute bottom-32 left-4 bg-[#2C2C2C]/95 backdrop-blur-md border border-[#505050] rounded-[12px] p-3 shadow-lg z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#DC143C] to-[#FF4500] border-2 border-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Active Fire (Pulsing)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8C00] border-2 border-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Hazard Report
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#8B0000] border-2 border-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Fire Station
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#4CAF50] border-2 border-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Evacuation Center
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sheet - Fire Incident Details */}
      {selectedIncident && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#2C2C2C] border-t-4 border-[#DC143C] rounded-t-[20px] shadow-2xl max-h-[60vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedIncident.status === 'active' ? 'bg-[#DC143C]' : 'bg-[#FF4500]'
                }`}>
                  <Flame className="w-6 h-6 text-[#F0F0F0]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Fire Incident
                    </h3>
                    <span className={`px-2 py-1 rounded-[6px] text-[10px] font-bold ${
                      selectedIncident.status === 'active' 
                        ? 'bg-[#DC143C] text-[#F0F0F0]'
                        : 'bg-[#FF4500] text-[#F0F0F0]'
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedIncident.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedIncident.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#FF4500] mt-0.5" />
                  <div>
                    <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      LOCATION
                    </p>
                    <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedIncident.location}
                    </p>
                    <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Barangay {selectedIncident.barangay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                <p className="text-[#A0A0A0] text-[10px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  DESCRIPTION
                </p>
                <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedIncident.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#FF4500] mt-0.5" />
                    <div>
                      <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        REPORTED
                      </p>
                      <p className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {selectedIncident.reportedAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF4500] mt-0.5" />
                    <div>
                      <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        SEVERITY
                      </p>
                      <p className={`text-[11px] font-bold uppercase ${
                        selectedIncident.severity === 'high' ? 'text-[#DC143C]' :
                        selectedIncident.severity === 'medium' ? 'text-[#FF4500]' :
                        'text-[#FFA500]'
                      }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {selectedIncident.severity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#FF4500] mt-0.5" />
                  <div>
                    <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      REPORTED BY
                    </p>
                    <p className="text-[#F0F0F0] text-[12px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedIncident.reportedBy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="bg-[#4CAF50] hover:bg-[#45a049] rounded-[10px] p-3 flex items-center justify-center gap-2 transition-colors">
                  <Navigation className="w-5 h-5 text-[#F0F0F0]" />
                  <span className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Navigate
                  </span>
                </button>
                <button className="bg-[#DC143C] hover:bg-[#b8112f] rounded-[10px] p-3 flex items-center justify-center gap-2 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-[#F0F0F0]" />
                  <span className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Dispatch Units
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet - Hazard Details */}
      {selectedHazard && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#2C2C2C] border-t-4 border-[#FF4500] rounded-t-[20px] shadow-2xl max-h-[60vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8C00] flex items-center justify-center">
                  {selectedHazard.type === 'electrical' ? (
                    <Zap className="w-6 h-6 text-[#F0F0F0]" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-[#F0F0F0]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Hazard Report
                    </h3>
                    <span className={`px-2 py-1 rounded-[6px] text-[10px] font-bold ${
                      selectedHazard.status === 'validated' 
                        ? 'bg-[#4CAF50] text-[#F0F0F0]'
                        : 'bg-[#FF4500] text-[#F0F0F0]'
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedHazard.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedHazard.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHazard(null)}
                className="text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#FF4500] mt-0.5" />
                  <div>
                    <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      LOCATION
                    </p>
                    <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedHazard.location}
                    </p>
                    <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Barangay {selectedHazard.barangay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                <p className="text-[#A0A0A0] text-[10px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  DESCRIPTION
                </p>
                <p className="text-[#F0F0F0] text-[12px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedHazard.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    TYPE
                  </p>
                  <p className="text-[#FF4500] text-[11px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedHazard.type}
                  </p>
                </div>

                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    SEVERITY
                  </p>
                  <p className={`text-[11px] font-bold uppercase ${
                    selectedHazard.severity === 'high' ? 'text-[#DC143C]' :
                    selectedHazard.severity === 'medium' ? 'text-[#FF4500]' :
                    'text-[#FFA500]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedHazard.severity}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#FF4500] mt-0.5" />
                    <div>
                      <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        REPORTED
                      </p>
                      <p className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {selectedHazard.reportedAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E1E1E] rounded-[8px] p-3">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#FF4500] mt-0.5" />
                    <div>
                      <p className="text-[#A0A0A0] text-[10px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        REPORTED BY
                      </p>
                      <p className="text-[#F0F0F0] text-[11px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {selectedHazard.reportedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="bg-[#4CAF50] hover:bg-[#45a049] rounded-[10px] p-3 flex items-center justify-center gap-2 transition-colors">
                  <span className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Validate
                  </span>
                </button>
                <button className="bg-[#505050] hover:bg-[#606060] rounded-[10px] p-3 flex items-center justify-center gap-2 transition-colors">
                  <span className="text-[#F0F0F0] text-[12px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Schedule Inspection
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Evacuation Center Modal */}
      {showAddEvacuationCenter && (
        <div className="absolute inset-0 bg-[#000000]/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2C2C2C] rounded-[16px] w-full max-w-[360px] shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#1E1E1E] p-4 flex items-center justify-between border-b border-[#505050]">
              <h3 className="text-[#F0F0F0] text-[16px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Add Evacuation Center
              </h3>
              <button
                onClick={() => {
                  if (tempMarker) {
                    mapRef.current.removeLayer(tempMarker);
                    setTempMarker(null);
                  }
                  setShowAddEvacuationCenter(false);
                  setNewEvacuationCenter({
                    name: '',
                    address: '',
                    capacity: '',
                    contactPerson: '',
                    contactNumber: '',
                    lat: 8.2280,
                    lng: 124.2452
                  });
                }}
                className="w-8 h-8 rounded-full bg-[#3C3C3C] hover:bg-[#4C4C4C] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  NAME
                </p>
                <input
                  type="text"
                  value={newEvacuationCenter.name}
                  onChange={(e) => setNewEvacuationCenter(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#1E1E1E] text-[#F0F0F0] text-[13px] rounded-[8px] px-3 py-2.5 border border-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Enter name"
                />
              </div>

              <div>
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  ADDRESS
                </p>
                <input
                  type="text"
                  value={newEvacuationCenter.address}
                  onChange={(e) => setNewEvacuationCenter(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-[#1E1E1E] text-[#F0F0F0] text-[13px] rounded-[8px] px-3 py-2.5 border border-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Enter address"
                />
              </div>

              <div>
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  CAPACITY
                </p>
                <input
                  type="number"
                  value={newEvacuationCenter.capacity}
                  onChange={(e) => setNewEvacuationCenter(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full bg-[#1E1E1E] text-[#F0F0F0] text-[13px] rounded-[8px] px-3 py-2.5 border border-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Enter capacity"
                />
              </div>

              <div>
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  CONTACT PERSON
                </p>
                <input
                  type="text"
                  value={newEvacuationCenter.contactPerson}
                  onChange={(e) => setNewEvacuationCenter(prev => ({ ...prev, contactPerson: e.target.value }))}
                  className="w-full bg-[#1E1E1E] text-[#F0F0F0] text-[13px] rounded-[8px] px-3 py-2.5 border border-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Enter contact person"
                />
              </div>

              <div>
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  CONTACT NUMBER
                </p>
                <input
                  type="text"
                  value={newEvacuationCenter.contactNumber}
                  onChange={(e) => setNewEvacuationCenter(prev => ({ ...prev, contactNumber: e.target.value }))}
                  className="w-full bg-[#1E1E1E] text-[#F0F0F0] text-[13px] rounded-[8px] px-3 py-2.5 border border-[#505050] focus:border-[#FF4500] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="pt-1">
                <p className="text-[#A0A0A0] text-[10px] mb-2 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  LOCATION
                </p>
                <button
                  onClick={handleStartAddingLocation}
                  className="w-full bg-[#FF4500] hover:bg-[#FF5722] rounded-[8px] px-4 py-3 flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#F0F0F0]" />
                  <span className="text-[#F0F0F0] text-[13px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {isAddingLocation ? 'Click on map...' : tempMarker ? 'Location added' : 'Add Location'}
                  </span>
                </button>
              </div>

              {/* Mini Map */}
              {showMiniMap && (
                <div className="relative mt-3">
                  <div ref={miniMapContainerRef} className="w-full h-40 z-10" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-[#505050] grid grid-cols-2 gap-3">
              <button
                onClick={handleSaveEvacuationCenter}
                disabled={!newEvacuationCenter.name || !newEvacuationCenter.capacity || !tempMarker}
                className="bg-[#4CAF50] hover:bg-[#45a049] disabled:bg-[#3C3C3C] disabled:text-[#505050] rounded-[8px] px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <Building2 className="w-5 h-5 text-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[13px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Add Center
                </span>
              </button>
              <button
                onClick={() => {
                  if (tempMarker) {
                    mapRef.current.removeLayer(tempMarker);
                    setTempMarker(null);
                  }
                  setShowAddEvacuationCenter(false);
                  setNewEvacuationCenter({
                    name: '',
                    address: '',
                    capacity: '',
                    contactPerson: '',
                    contactNumber: '',
                    lat: 8.2280,
                    lng: 124.2452
                  });
                }}
                className="bg-[#505050] hover:bg-[#606060] rounded-[8px] px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <X className="w-5 h-5 text-[#F0F0F0]" />
                <span className="text-[#F0F0F0] text-[13px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Evacuation Center Button */}
      <button
        onClick={handleAddEvacuationCenter}
        className="absolute bottom-20 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all bg-[#FF4500] text-[#F0F0F0]"
        title="Add Evacuation Center"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}