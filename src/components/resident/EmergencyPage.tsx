import { MapPin, Phone, Shield, Book, X, AlertTriangle, Flame, Home, Users, Wind, Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { User } from '../../App';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface EmergencyPageProps {
  user: User;
  onNavigate?: (page: string) => void;
}

export function EmergencyPage({ user, onNavigate }: EmergencyPageProps) {
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ name: string; number: string } | null>(null);
  const [showGuide, setShowGuide] = useState<'fire' | 'prevention' | null>(null);
  const [showEvacuationMap, setShowEvacuationMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const previewMapContainerRef = useRef<HTMLDivElement | null>(null);
  const previewMapInstanceRef = useRef<L.Map | null>(null);

  const handleCallClick = (name: string, number: string) => {
    setSelectedContact({ name, number });
    setShowCallDialog(true);
  };

  const confirmCall = () => {
    if (selectedContact) {
      window.location.href = `tel:${selectedContact.number}`;
      setShowCallDialog(false);
    }
  };

  // Initialize preview map
  useEffect(() => {
    if (previewMapContainerRef.current && !previewMapInstanceRef.current) {
      previewMapInstanceRef.current = L.map(previewMapContainerRef.current, {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
      }).setView([8.2280, 124.2453], 15);
      
      // Add dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(previewMapInstanceRef.current);
      
      // Add user location marker
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `<div style="background: #4CAF50; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      L.marker([8.2280, 124.2453], { icon: userIcon })
        .addTo(previewMapInstanceRef.current);
      
      // Add evacuation center marker
      const evacuationIcon = L.divIcon({
        className: 'custom-evacuation-marker',
        html: `<div style="background: #FF4500; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255, 69, 0, 0.6);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      
      L.marker([8.2297, 124.2468], { icon: evacuationIcon })
        .addTo(previewMapInstanceRef.current);
      
      // Draw evacuation route following actual roads
      const route = [
        [8.2280, 124.2453],  // Start: User location
        [8.2282, 124.2455],  // Move northeast on local street
        [8.2284, 124.2456],  // Continue on street
        [8.2286, 124.2458],  // Turn slightly
        [8.2288, 124.2460],  // Follow road
        [8.2290, 124.2462],  // Continue
        [8.2291, 124.2464],  // Slight curve
        [8.2293, 124.2465],  // Main street
        [8.2295, 124.2467],  // Approach plaza
        [8.2297, 124.2468]   // End: Barangay Plaza
      ] as [number, number][];
      
      L.polyline(route, {
        color: '#FF4500',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10'
      }).addTo(previewMapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    if (showEvacuationMap && mapContainerRef.current && !mapInstanceRef.current) {
      // Add a small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        if (!mapContainerRef.current) {
          console.log('Map container not found');
          return;
        }
        
        console.log('Initializing full map...');
        console.log('Container dimensions:', mapContainerRef.current.offsetWidth, mapContainerRef.current.offsetHeight);
        
        try {
          // Initialize map centered on Iligan City
          mapInstanceRef.current = L.map(mapContainerRef.current, {
            center: [8.2288, 124.2460],
            zoom: 16,
            zoomControl: true
          });
          
          console.log('Map instance created');
          
          // Add dark tile layer
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap © CartoDB',
            subdomains: 'abcd',
            maxZoom: 20
          }).addTo(mapInstanceRef.current);
          
          console.log('Tile layer added');
          
          // Add user location marker
          const userIcon = L.divIcon({
            className: 'custom-user-marker',
            html: `<div style="background: #4CAF50; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" />
              </svg>
            </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          
          L.marker([8.2280, 124.2453], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<div style="font-family: Montserrat, sans-serif;"><strong style="color: #4CAF50;">Your Location</strong><br><span style="color: #666;">Starting point</span></div>');
          
          // Add evacuation center marker
          const evacuationIcon = L.divIcon({
            className: 'custom-evacuation-marker',
            html: `<div style="background: #FF4500; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255, 69, 0, 0.6);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
          
          L.marker([8.2297, 124.2468], { icon: evacuationIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<div style="font-family: Montserrat, sans-serif;"><strong style="color: #FF4500;">Barangay Plaza</strong><br><span style="color: #666;">Evacuation Center</span><br><span style="color: #999; font-size: 12px;">350m • 5 min walk</span></div>');
          
          // Draw detailed evacuation route following roads
          const route = [
            [8.2280, 124.2453],  // Start: User location
            [8.2282, 124.2455],  // Move northeast on local street
            [8.2284, 124.2456],  // Continue on street
            [8.2286, 124.2458],  // Turn slightly
            [8.2288, 124.2460],  // Follow road
            [8.2290, 124.2462],  // Continue
            [8.2291, 124.2464],  // Slight curve
            [8.2293, 124.2465],  // Main street
            [8.2295, 124.2467],  // Approach plaza
            [8.2297, 124.2468]   // End: Barangay Plaza
          ] as [number, number][];
          
          // Main route line
          L.polyline(route, {
            color: '#FF4500',
            weight: 5,
            opacity: 0.9,
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(mapInstanceRef.current);
          
          // Dashed overlay for animated effect
          L.polyline(route, {
            color: '#FFFFFF',
            weight: 2,
            opacity: 0.6,
            dashArray: '10, 15',
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(mapInstanceRef.current);
          
          // Add directional arrows along the route
          const arrowPoints = [
            [8.2284, 124.2456],
            [8.2290, 124.2462],
            [8.2295, 124.2467]
          ];
          
          arrowPoints.forEach(point => {
            const arrowIcon = L.divIcon({
              className: 'route-arrow',
              html: `<div style="width: 16px; height: 16px; transform: rotate(45deg);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12M19 12L12 5M19 12L12 19" stroke="#FF4500" stroke-width="3" fill="none"/>
                </svg>
              </div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            });
            
            L.marker(point as [number, number], { 
              icon: arrowIcon,
              interactive: false 
            }).addTo(mapInstanceRef.current!);
          });
          
          console.log('Markers and route added');
          
          // Ensure map size is correct
          setTimeout(() => {
            if (mapInstanceRef.current) {
              console.log('Invalidating map size');
              mapInstanceRef.current.invalidateSize();
            }
          }, 300);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      }, 300);
    }
    
    return () => {
      if (!showEvacuationMap && mapInstanceRef.current) {
        console.log('Cleaning up map');
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showEvacuationMap]);

  return (
    <div className="min-h-full bg-[#1E1E1E] pb-24">
      {/* Top App Bar */}
      <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050]">
        <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          My Emergency Plan
        </h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Emergency Contact Section */}
        <div>
          <h2 className="text-[#FF4500] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Emergency Contact
          </h2>
          <div className="space-y-3">
            <a href="tel:911" className="flex items-center justify-between p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#4CAF50] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire Emergency
                  </p>
                  <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    911 / 160
                  </p>
                </div>
              </div>
              <Phone className="w-5 h-5 text-[#4CAF50]" />
            </a>

            <a href="tel:0632214444" className="flex items-center justify-between p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#4CAF50] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    BFP Iligan
                  </p>
                  <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    (063) 221-4444
                  </p>
                </div>
              </div>
              <Phone className="w-5 h-5 text-[#4CAF50]" />
            </a>

            <a href="tel:0632215555" className="flex items-center justify-between p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#4CAF50] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    CDRRMO
                  </p>
                  <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    (063) 221-5555
                  </p>
                </div>
              </div>
              <Phone className="w-5 h-5 text-[#4CAF50]" />
            </a>
          </div>
        </div>

        {/* Evacuation Route Section */}
        <div>
          <h2 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your Nearest Evacuation Route
          </h2>
          <Card className="bg-[#2C2C2C] border-[#505050] rounded-[12px] overflow-hidden">
            <div 
              ref={previewMapContainerRef} 
              className="h-48 relative z-0 cursor-pointer"
              onClick={() => setShowEvacuationMap(true)}
            >
              {/* Map will render here */}
            </div>
            <div className="p-4 space-y-3">
              {/* Route Info */}
              <div className="flex items-start gap-3 pb-3 border-b border-[#505050]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-[#4CAF50] rounded-full border-2 border-white"></div>
                    <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Your Location
                    </p>
                  </div>
                  <p className="text-[#A0A0A0] text-[11px] ml-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Current position
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#A0A0A0]">
                  <Navigation className="w-4 h-4 text-[#FF4500]" />
                  <span className="text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>350m</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-[#FF4500] rounded-full border-2 border-white"></div>
                    <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Barangay Plaza
                    </p>
                  </div>
                  <p className="text-[#A0A0A0] text-[11px] ml-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Evacuation Center • 5 min walk
                  </p>
                </div>
              </div>
              <Button className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-12 text-[16px] font-semibold mt-3"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={() => setShowEvacuationMap(true)}>
                View Full Evacuation Map
              </Button>
            </div>
          </Card>
        </div>

        {/* Actionable Guides Section */}
        <div>
          <h2 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Fire Safety Guides
          </h2>
          <div className="space-y-3">
            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors text-left"
              onClick={() => setShowGuide('fire')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FF4500]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    What to Do During a Fire
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Step-by-step emergency response guide
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full p-4 bg-[#2C2C2C] border border-[#505050] rounded-[12px] hover:border-[#FF4500] transition-colors text-left"
              onClick={() => setShowGuide('prevention')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF4500]/20 rounded-full flex items-center justify-center">
                  <Book className="w-6 h-6 text-[#FF4500]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#F0F0F0] text-[16px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Home Fire Prevention Tips
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Protect your home and family
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Resources for {user.barangay || 'Your Barangay'}
          </h2>
          <Card className="bg-[#2C2C2C] border-[#505050] p-4 rounded-[12px]">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-1.5" />
                <div>
                  <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Fire Hydrants
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Corner of Main St & Rizal Ave
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full mt-1.5" />
                <div>
                  <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Safe Zones
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Barangay Plaza, Elementary School
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-1.5" />
                <div>
                  <p className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Nearest Hospital
                  </p>
                  <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Iligan City Medical Center - 2.3km
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Call Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="bg-[#2C2C2C] border-[#505050] rounded-[12px] p-6">
          <DialogHeader>
            <DialogTitle className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Call {selectedContact?.name}
            </DialogTitle>
            <DialogDescription className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Are you sure you want to call {selectedContact?.name} at {selectedContact?.number}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button className="bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-12 text-[16px] font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={confirmCall}>
              Call
            </Button>
            <Button className="bg-[#505050] hover:bg-[#606060] text-[#F0F0F0] rounded-[12px] h-12 text-[16px] font-semibold ml-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={() => setShowCallDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guide Dialog */}
      <Dialog open={showGuide !== null} onOpenChange={() => setShowGuide(null)}>
        <DialogContent className="bg-[#2C2C2C] border-[#505050] rounded-[12px] p-0 max-w-2xl max-h-[80vh] overflow-hidden">
          <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-6 py-4 z-10">
            <DialogTitle className="text-[#F0F0F0] text-[20px] font-bold flex items-center gap-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {showGuide === 'fire' ? (
                <>
                  <Shield className="w-6 h-6 text-[#FF4500]" />
                  What to Do During a Fire
                </>
              ) : (
                <>
                  <Book className="w-6 h-6 text-[#FF4500]" />
                  Home Fire Prevention Tips
                </>
              )}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {showGuide === 'fire' 
                ? 'Step-by-step emergency response guide for fire situations'
                : 'Essential fire prevention tips to protect your home and family'}
            </DialogDescription>
          </div>
          
          <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
            {showGuide === 'fire' ? (
              <div className="space-y-5">
                {/* Step 1 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <AlertTriangle className="w-4 h-4 inline mr-2 text-[#FF4500]" />
                        Alert Everyone Immediately
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Shout "FIRE!" loudly to warn everyone in the building. Make sure all family members and neighbors are alerted to the danger.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Phone className="w-4 h-4 inline mr-2 text-[#4CAF50]" />
                        Call Emergency Services
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Call 911 or 160 immediately. Provide clear information about your location and the situation.
                      </p>
                      <div className="bg-[#2C2C2C] p-3 rounded-lg">
                        <p className="text-[#4CAF50] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                           Emergency Hotlines: 911 | 160 | BFP Iligan (063) 221-4444
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Wind className="w-4 h-4 inline mr-2 text-[#FF4500]" />
                        Get Low and Go
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Smoke rises, so stay low to the ground where the air is clearer. Crawl on your hands and knees to avoid inhaling toxic fumes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Navigation className="w-4 h-4 inline mr-2 text-[#FF4500]" />
                        Exit Immediately
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Leave the building immediately using the nearest safe exit. Do NOT use elevators. Feel doors with the back of your hand before opening - if hot, use another exit.
                      </p>
                      <div className="bg-[#DC143C]/20 border border-[#DC143C] p-3 rounded-lg">
                        <p className="text-[#DC143C] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          ⚠️ NEVER go back inside for belongings!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Users className="w-4 h-4 inline mr-2 text-[#4CAF50]" />
                        Meet at Assembly Point
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Go to your predetermined assembly point. Account for all family members. Wait for emergency responders and follow their instructions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Prevention Tip 1 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Install Smoke Alarms
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Install smoke alarms on every level of your home and inside bedrooms. Test them monthly and replace batteries at least once a year.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prevention Tip 2 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Kitchen Safety
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Never leave cooking unattended. Keep flammable items away from the stove. Keep a fire extinguisher in the kitchen and know how to use it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prevention Tip 3 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Electrical Safety
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Don't overload electrical outlets. Replace damaged cords immediately. Unplug appliances when not in use. Have a licensed electrician check your wiring regularly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prevention Tip 4 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Candles and Open Flames
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Keep candles away from flammable materials. Never leave candles burning unattended. Use sturdy candleholders. Consider using flameless LED candles.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prevention Tip 5 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Home className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Create an Escape Plan
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Plan two ways out of every room. Practice your fire escape plan twice a year. Choose a meeting place outside. Make sure everyone knows how to call 911.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prevention Tip 6 */}
                <div className="bg-[#1E1E1E] border border-[#505050] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="w-6 h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Heating Equipment Safety
                      </h3>
                      <p className="text-[#A0A0A0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Keep portable heaters at least 3 feet away from anything that can burn. Turn off heaters when leaving the room or going to sleep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-[#2C2C2C] border-t border-[#505050] px-6 py-4">
            <Button 
              className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-12 text-[16px] font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              onClick={() => setShowGuide(null)}
            >
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Evacuation Map Dialog */}
      {showEvacuationMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowEvacuationMap(false)}>
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] w-full max-w-4xl max-h-[90vh] overflow-hidden m-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#2C2C2C] border-b border-[#505050] px-6 py-4">
              <h2 className="text-[#F0F0F0] text-[20px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Evacuation Map
              </h2>
              <p className="text-[#A0A0A0] text-[14px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your route to Barangay Plaza Evacuation Center
              </p>
            </div>
            <div 
              ref={mapContainerRef} 
              style={{ 
                width: '100%', 
                height: '500px', 
                position: 'relative', 
                zIndex: 0,
                background: '#1E1E1E'
              }}
            ></div>
            <div className="bg-[#2C2C2C] border-t border-[#505050] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#4CAF50] rounded-full border-2 border-white"></div>
                  <span className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF4500] rounded-full border-2 border-white"></div>
                  <span className="text-[#F0F0F0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Evacuation Center</span>
                </div>
                <div className="flex items-center gap-2 text-[#A0A0A0]">
                  <Navigation className="w-4 h-4 text-[#FF4500]" />
                  <span className="text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>350m • 5 min</span>
                </div>
              </div>
              <Button className="bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-10 px-6"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                onClick={() => setShowEvacuationMap(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}