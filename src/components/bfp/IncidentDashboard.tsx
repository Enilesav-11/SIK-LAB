import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Search, Filter, Send, CheckCircle, XCircle, ArrowLeft, MapPin, Clock, User, Navigation, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { User } from '../../App';
import { mockFireIncidents, mockHazardReports } from '../../lib/mockData';
import L from 'leaflet';
import '../../styles/leaflet.css';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface IncidentDashboardProps {
  user: User;
}

export function IncidentDashboard({ user }: IncidentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'incidents' | 'hazards'>('incidents');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<'validate' | 'reject' | 'bfp' | 'alert' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  // Hazard Report Filters
  const [hazardStatusFilter, setHazardStatusFilter] = useState<'all' | 'pending' | 'validated' | 'resolved'>('all');
  const [hazardTypeFilter, setHazardTypeFilter] = useState<'all' | 'structural' | 'electrical' | 'gas' | 'other'>('all');
  const [hazardDateFilter, setHazardDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  // Unified filter panel state - stays open across tab switches
  const [showFilters, setShowFilters] = useState(false);

  // Sort function: Status (Active > Pending > Resolved) then Severity (High > Medium > Low)
  const sortIncidents = (incidents: any[]) => {
    const statusOrder = { active: 1, pending: 2, resolved: 3 };
    const severityOrder = { high: 1, medium: 2, low: 3 };
    
    return [...incidents].sort((a, b) => {
      // First sort by status
      const statusDiff = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
      if (statusDiff !== 0) return statusDiff;
      
      // Then sort by severity
      return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
    });
  };

  const filteredIncidents = sortIncidents(
    mockFireIncidents.filter(
      (inc) => {
        const matchesSearch = inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inc.barangay.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || inc.status === statusFilter;
        const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
        const matchesDate = dateFilter === 'all' || (dateFilter === 'today' && inc.reportedAt.includes('Today')) ||
          (dateFilter === 'week' && inc.reportedAt.includes('Week')) || (dateFilter === 'month' && inc.reportedAt.includes('Month'));
        return matchesSearch && matchesStatus && matchesSeverity && matchesDate;
      }
    )
  );

  const filteredHazards = mockHazardReports.filter(
    (haz) => {
      const matchesSearch = haz.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        haz.barangay.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = hazardStatusFilter === 'all' || haz.status === hazardStatusFilter;
      const matchesType = hazardTypeFilter === 'all' || haz.type === hazardTypeFilter;
      const matchesDate = hazardDateFilter === 'all' || (hazardDateFilter === 'today' && haz.reportedAt.includes('Today')) ||
        (hazardDateFilter === 'week' && haz.reportedAt.includes('Week')) || (hazardDateFilter === 'month' && haz.reportedAt.includes('Month'));
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    }
  );

  const selectedReport = selectedIncident
    ? mockFireIncidents.find((i) => i.id === selectedIncident) ||
      mockHazardReports.find((h) => h.id === selectedIncident)
    : null;

  useEffect(() => {
    if (selectedReport && mapContainerRef.current) {
      // Get lat/lng from the report data
      const lat = (selectedReport as any).lat || 8.2280;
      const lng = (selectedReport as any).lng || 124.2453;
      
      if (!mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = L.map(mapContainerRef.current).setView([lat, lng], 16);
        
        // Add dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap © CartoDB',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(mapInstanceRef.current);
        
        // Create custom icon
        const fireIcon = L.divIcon({
          className: 'custom-fire-marker',
          html: `<div style="background: #DC143C; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #FF4500; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(220, 20, 60, 0.6);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2Z" />
            </svg>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        // Add marker
        L.marker([lat, lng], { icon: fireIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; padding: 4px;">
              <strong style="color: #DC143C; font-size: 12px;">${selectedReport.location}</strong><br>
              <span style="color: #666; font-size: 11px;">${selectedReport.barangay}</span>
            </div>
          `);
      } else {
        // Update existing map
        mapInstanceRef.current.setView([lat, lng], 16);
        mapInstanceRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapInstanceRef.current!.removeLayer(layer);
          }
        });
        
        const fireIcon = L.divIcon({
          className: 'custom-fire-marker',
          html: `<div style="background: #DC143C; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #FF4500; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(220, 20, 60, 0.6);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2Z" />
            </svg>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        L.marker([lat, lng], { icon: fireIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; padding: 4px;">
              <strong style="color: #DC143C; font-size: 12px;">${selectedReport.location}</strong><br>
              <span style="color: #666; font-size: 11px;">${selectedReport.barangay}</span>
            </div>
          `);
      }
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current && !selectedReport) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedReport]);

  const handleConfirmAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (showConfirmDialog === 'validate') {
        toast.success('Report validated successfully!');
      } else if (showConfirmDialog === 'reject') {
        toast.error('Report rejected');
      } else if (showConfirmDialog === 'bfp') {
        toast.success('🚒 BFP units dispatched! ETA: 5 minutes');
      } else if (showConfirmDialog === 'alert') {
        toast.success('Alert sent to all BFP units in the area');
      }
      setIsProcessing(false);
      setShowConfirmDialog(null);
    }, 1000);
  };

  if (selectedReport) {
    const isFireIncident = mockFireIncidents.find(i => i.id === selectedReport.id);
    
    return (
      <div className="h-full bg-[#1E1E1E] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-4 pt-16 pb-4 z-10">
          <button
            onClick={() => setSelectedIncident(null)}
            className="flex items-center gap-2 text-[#FF4500] text-[13px] font-semibold mb-3 hover:underline"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Reports
          </button>
          <h1 className="text-[#F0F0F0] text-[18px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isFireIncident ? 'Incident Details' : 'Hazard Details'}
          </h1>
          <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{selectedReport.id}</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Incident/Hazard Photo */}
          {(selectedReport as any).imageUrl && (
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] overflow-hidden">
              <div className="relative h-[200px] bg-[#1E1E1E]">
                <ImageWithFallback
                  src={(selectedReport as any).imageUrl}
                  alt={`${isFireIncident ? 'Incident' : 'Hazard'} at ${selectedReport.location}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-[#DC143C] text-[#F0F0F0] rounded-[6px] text-[10px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {isFireIncident ? 'Fire Incident' : 'Hazard Report'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Map Area */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] overflow-hidden relative z-0">
            <div className="p-3 border-b border-[#505050] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF4500]" />
                <label className="text-[#F0F0F0] text-[11px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  INCIDENT LOCATION
                </label>
              </div>
              <Navigation className="w-4 h-4 text-[#A0A0A0]" />
            </div>
            <div ref={mapContainerRef} className="w-full h-[240px] relative z-0" />
          </div>

          {/* Status & Severity Card */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#A0A0A0] text-[10px] block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  STATUS
                </label>
                <span className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase inline-block ${
                  selectedReport.status === 'active' || selectedReport.status === 'pending'
                    ? 'bg-[#DC143C] text-[#F0F0F0]'
                    : selectedReport.status === 'validated'
                    ? 'bg-[#FF4500] text-[#F0F0F0]'
                    : 'bg-[#4CAF50] text-[#F0F0F0]'
                }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedReport.status}
                </span>
              </div>
              <div>
                <label className="text-[#A0A0A0] text-[10px] block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  SEVERITY
                </label>
                <span className={`px-3 py-1 rounded-[6px] border text-[10px] font-bold uppercase inline-block ${
                  selectedReport.severity === 'high'
                    ? 'border-[#DC143C] text-[#DC143C]'
                    : selectedReport.severity === 'medium'
                    ? 'border-[#FF4500] text-[#FF4500]'
                    : 'border-[#FFA500] text-[#FFA500]'
                }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedReport.severity} RISK
                </span>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="flex-1">
                <label className="text-[#A0A0A0] text-[10px] block mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  LOCATION
                </label>
                <p className="text-[#F0F0F0] text-[14px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedReport.location}
                </p>
                <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedReport.barangay}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <label className="text-[#A0A0A0] text-[10px] block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              DESCRIPTION
            </label>
            <p className="text-[#F0F0F0] text-[13px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {selectedReport.description}
            </p>
          </div>

          {/* Reporter Info */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-[#FF4500]" />
              </div>
              <div className="flex-1">
                <label className="text-[#A0A0A0] text-[10px] block mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  REPORTED BY
                </label>
                <p className="text-[#F0F0F0] text-[13px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedReport.reportedBy}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-[#505050]">
              <Clock className="w-4 h-4 text-[#A0A0A0]" />
              <p className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {selectedReport.reportedAt}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedReport.status !== 'resolved' && (
            <div className="space-y-3 pt-2">
              {/* Check if this is a fire incident or hazard report */}
              {mockFireIncidents.find(i => i.id === selectedReport.id) ? (
                // Fire Incident - Show BFP on the way button
                <button 
                  onClick={() => setShowConfirmDialog('bfp')}
                  className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8112F] hover:to-[#DC143C] text-[#F0F0F0] rounded-[12px] py-3 px-4 flex items-center justify-center gap-2 transition-all font-bold text-[13px]" 
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  <Send className="w-4 h-4" />
                  BFP on the way
                </button>
              ) : (
                // Hazard Report - Show existing validation buttons
                <>
                  <button 
                    onClick={() => setShowConfirmDialog('alert')}
                    className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8112F] hover:to-[#DC143C] text-[#F0F0F0] rounded-[12px] py-3 px-4 flex items-center justify-center gap-2 transition-all font-bold text-[13px]" 
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Send className="w-4 h-4" />
                    Send Alert to BFP Units
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setShowConfirmDialog('validate')}
                      className="bg-[#2C2C2C] border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 rounded-[12px] py-3 px-4 flex items-center justify-center gap-2 transition-all font-bold text-[12px]" 
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Validate
                    </button>
                    <button 
                      onClick={() => setShowConfirmDialog('reject')}
                      className="bg-[#2C2C2C] border-2 border-[#A0A0A0] text-[#A0A0A0] hover:bg-[#505050] rounded-[12px] py-3 px-4 flex items-center justify-center gap-2 transition-all font-bold text-[12px]" 
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Info Note */}
          <div className="bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-[12px] p-4">
            <p className="text-[#FF4500] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <strong>Note:</strong> All actions are logged and can be reviewed in the system activity monitor.
            </p>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-6 max-w-[400px] w-full">
              <h2 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {showConfirmDialog === 'validate' && 'Validate Report'}
                {showConfirmDialog === 'reject' && 'Reject Report'}
                {showConfirmDialog === 'bfp' && 'Dispatch BFP Units'}
                {showConfirmDialog === 'alert' && 'Send Alert'}
              </h2>
              <p className="text-[#A0A0A0] text-[13px] leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {showConfirmDialog === 'validate' && 'Are you sure you want to validate this hazard report?'}
                {showConfirmDialog === 'reject' && 'Are you sure you want to reject this report? This action cannot be undone.'}
                {showConfirmDialog === 'bfp' && 'Confirm dispatch of BFP units to this location?'}
                {showConfirmDialog === 'alert' && 'Send emergency alert to all BFP units in the area?'}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2.5 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[10px] text-[13px] font-semibold transition-all"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={isProcessing}
                  className={`flex-1 px-4 py-2.5 rounded-[10px] text-[#F0F0F0] text-[13px] font-semibold transition-all ${
                    showConfirmDialog === 'validate' 
                      ? 'bg-[#4CAF50] hover:bg-[#45a049]'
                      : showConfirmDialog === 'reject'
                      ? 'bg-[#DC143C] hover:bg-[#c41230]'
                      : 'bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8112F] hover:to-[#DC143C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {isProcessing ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1E1E1E] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#2C2C2C] border-b border-[#505050] px-4 pt-16 pb-4 z-10">
        <h1 className="text-[#F0F0F0] text-[18px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Incident & Hazard Reports
        </h1>
        <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Monitor and manage fire-related reports
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location or barangay..."
            className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 pl-12 pr-12 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              showFilters || 
              (activeTab === 'incidents' && (statusFilter !== 'all' || severityFilter !== 'all' || dateFilter !== 'all')) ||
              (activeTab === 'hazards' && (hazardStatusFilter !== 'all' || hazardTypeFilter !== 'all' || hazardDateFilter !== 'all'))
                ? 'bg-[#FF4500] text-[#F0F0F0]'
                : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Dropdown - Fire Incidents */}
        {showFilters && activeTab === 'incidents' && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Status Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    statusFilter === 'active'
                      ? 'bg-[#DC143C] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    statusFilter === 'pending'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter('resolved')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    statusFilter === 'resolved'
                      ? 'bg-[#4CAF50] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Resolved
                </button>
              </div>
            </div>

            {/* Severity Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Severity
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSeverityFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    severityFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setSeverityFilter('high')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    severityFilter === 'high'
                      ? 'bg-[#DC143C] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  High
                </button>
                <button
                  onClick={() => setSeverityFilter('medium')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    severityFilter === 'medium'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Medium
                </button>
                <button
                  onClick={() => setSeverityFilter('low')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    severityFilter === 'low'
                      ? 'bg-[#FFA500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Low
                </button>
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Date
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    dateFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    dateFilter === 'today'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Today
                </button>
                <button
                  onClick={() => setDateFilter('week')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    dateFilter === 'week'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Week
                </button>
                <button
                  onClick={() => setDateFilter('month')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    dateFilter === 'month'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {(statusFilter !== 'all' || severityFilter !== 'all' || dateFilter !== 'all') && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSeverityFilter('all');
                  setDateFilter('all');
                }}
                className="w-full bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[8px] py-2 text-[12px] font-semibold transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Filter Dropdown - Hazard Reports */}
        {showFilters && activeTab === 'hazards' && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Status Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setHazardStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardStatusFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setHazardStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardStatusFilter === 'pending'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Pending
                </button>
                <button
                  onClick={() => setHazardStatusFilter('validated')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardStatusFilter === 'validated'
                      ? 'bg-[#2196F3] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Validated
                </button>
                <button
                  onClick={() => setHazardStatusFilter('resolved')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardStatusFilter === 'resolved'
                      ? 'bg-[#4CAF50] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Resolved
                </button>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Type
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setHazardTypeFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardTypeFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setHazardTypeFilter('electrical')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardTypeFilter === 'electrical'
                      ? 'bg-[#FFB300] text-[#1E1E1E]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Electrical
                </button>
                <button
                  onClick={() => setHazardTypeFilter('structural')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardTypeFilter === 'structural'
                      ? 'bg-[#9C27B0] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Structural
                </button>
                <button
                  onClick={() => setHazardTypeFilter('gas')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardTypeFilter === 'gas'
                      ? 'bg-[#F44336] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Gas
                </button>
                <button
                  onClick={() => setHazardTypeFilter('other')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardTypeFilter === 'other'
                      ? 'bg-[#607D8B] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Other
                </button>
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <p className="text-[#A0A0A0] text-[11px] font-bold uppercase mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Date
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setHazardDateFilter('all')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardDateFilter === 'all'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All
                </button>
                <button
                  onClick={() => setHazardDateFilter('today')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardDateFilter === 'today'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Today
                </button>
                <button
                  onClick={() => setHazardDateFilter('week')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardDateFilter === 'week'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Week
                </button>
                <button
                  onClick={() => setHazardDateFilter('month')}
                  className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-colors ${
                    hazardDateFilter === 'month'
                      ? 'bg-[#FF4500] text-[#F0F0F0]'
                      : 'bg-[#3C3C3C] text-[#A0A0A0] hover:bg-[#4C4C4C]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {(hazardStatusFilter !== 'all' || hazardTypeFilter !== 'all' || hazardDateFilter !== 'all') && (
              <button
                onClick={() => {
                  setHazardStatusFilter('all');
                  setHazardTypeFilter('all');
                  setHazardDateFilter('all');
                }}
                className="w-full bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[8px] py-2 text-[12px] font-semibold transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#505050]">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`pb-3 px-4 text-[13px] font-semibold transition-colors relative ${
              activeTab === 'incidents'
                ? 'text-[#FF4500]'
                : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Fire Incidents ({filteredIncidents.length})
            {activeTab === 'incidents' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4500]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('hazards')}
            className={`pb-3 px-4 text-[13px] font-semibold transition-colors relative ${
              activeTab === 'hazards'
                ? 'text-[#FF4500]'
                : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Hazard Reports ({filteredHazards.length})
            {activeTab === 'hazards' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4500]" />
            )}
          </button>
        </div>

        {/* Active Filters Indicator - Fire Incidents */}
        {activeTab === 'incidents' && (statusFilter !== 'all' || severityFilter !== 'all' || dateFilter !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Filtered by:
            </span>
            {statusFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {statusFilter}
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {severityFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {severityFilter}
                </span>
                <button
                  onClick={() => setSeverityFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {dateFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {dateFilter}
                </span>
                <button
                  onClick={() => setDateFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Indicator - Hazard Reports */}
        {activeTab === 'hazards' && (hazardStatusFilter !== 'all' || hazardTypeFilter !== 'all' || hazardDateFilter !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#A0A0A0] text-[11px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Filtered by:
            </span>
            {hazardStatusFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazardStatusFilter}
                </span>
                <button
                  onClick={() => setHazardStatusFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {hazardTypeFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazardTypeFilter}
                </span>
                <button
                  onClick={() => setHazardTypeFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {hazardDateFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-[#3C3C3C] px-2 py-1 rounded-[6px]">
                <span className="text-[#F0F0F0] text-[10px] font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazardDateFilter}
                </span>
                <button
                  onClick={() => setHazardDateFilter('all')}
                  className="text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Incidents List */}
        {activeTab === 'incidents' && (
          <div className="space-y-3">
            {filteredIncidents.length === 0 ? (
              <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-[#A0A0A0] mx-auto mb-3" />
                <p className="text-[#F0F0F0] text-[14px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  No incidents found
                </p>
                <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => setSelectedIncident(incident.id)}
                className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 cursor-pointer hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                      incident.status === 'active'
                        ? 'bg-[#DC143C] text-[#F0F0F0]'
                        : incident.status === 'pending'
                        ? 'bg-[#FF4500] text-[#F0F0F0]'
                        : 'bg-[#4CAF50] text-[#F0F0F0]'
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {incident.status}
                    </span>
                    <span className="text-[10px] text-[#505050]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{incident.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-[6px] border text-[10px] font-bold uppercase ${
                    incident.severity === 'high'
                      ? 'border-[#DC143C] text-[#DC143C]'
                      : incident.severity === 'medium'
                      ? 'border-[#FF4500] text-[#FF4500]'
                      : 'border-[#FFA500] text-[#FFA500]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-[#F0F0F0] text-[13px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.location}
                </p>
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.barangay} • {incident.purok}
                </p>
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {incident.reportedAt}
                </p>
              </div>
              ))
            )}
          </div>
        )}

        {/* Hazards List */}
        {activeTab === 'hazards' && (
          <div className="space-y-3">
            {filteredHazards.length === 0 ? (
              <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-[#A0A0A0] mx-auto mb-3" />
                <p className="text-[#F0F0F0] text-[14px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  No hazard reports found
                </p>
                <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              filteredHazards.map((hazard) => (
              <div
                key={hazard.id}
                onClick={() => setSelectedIncident(hazard.id)}
                className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 cursor-pointer hover:border-[#FF4500] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                      hazard.status === 'pending'
                        ? 'bg-[#FF4500] text-[#F0F0F0]'
                        : hazard.status === 'validated'
                        ? 'bg-[#2196F3] text-[#F0F0F0]'
                        : hazard.status === 'resolved'
                        ? 'bg-[#4CAF50] text-[#F0F0F0]'
                        : 'bg-[#757575] text-[#F0F0F0]'
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {hazard.status}
                    </span>
                    <span className="text-[10px] text-[#505050]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{hazard.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-[6px] text-[9px] font-bold uppercase ${
                    hazard.type === 'electrical'
                      ? 'bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]'
                      : hazard.type === 'structural'
                      ? 'bg-[#9C27B0]/20 text-[#9C27B0] border border-[#9C27B0]'
                      : hazard.type === 'gas'
                      ? 'bg-[#F44336]/20 text-[#F44336] border border-[#F44336]'
                      : 'bg-[#607D8B]/20 text-[#607D8B] border border-[#607D8B]'
                  }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {hazard.type}
                  </span>
                </div>
                <p className="text-[#F0F0F0] text-[13px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazard.location}
                </p>
                <p className="text-[#A0A0A0] text-[11px] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazard.barangay}
                </p>
                <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {hazard.reportedAt}
                </p>
              </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}