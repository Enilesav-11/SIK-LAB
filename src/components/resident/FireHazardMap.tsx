import { MapPin, AlertTriangle, Home, Droplet, Navigation, Flame } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '../../App';
import { mockFireIncidents, mockHazardReports, fireProneAreas, evacuationCenters, waterSources } from '../../lib/mockData';
import { useState } from 'react';

interface FireHazardMapProps {
  user: User;
}

export function FireHazardMap({ user }: FireHazardMapProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'incidents' | 'hazards' | 'evacuation'>('all');

  const activeIncidents = mockFireIncidents.filter(i => i.status !== 'resolved');
  const pendingHazards = mockHazardReports.filter(h => h.status === 'pending' || h.status === 'validated');

  return (
    <div className="h-full flex flex-col pt-12">
      {/* Header */}
      <div className="p-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-white fill-white" />
            <h1 className="text-white">VIEW FIRE HAZARD MAP</h1>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Navigation className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-white text-orange-600'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('incidents')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              selectedFilter === 'incidents'
                ? 'bg-red-600 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
            }`}
          >
            Active Fires
          </button>
          <button
            onClick={() => setSelectedFilter('hazards')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              selectedFilter === 'hazards'
                ? 'bg-yellow-600 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
            }`}
          >
            Hazards
          </button>
          <button
            onClick={() => setSelectedFilter('evacuation')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              selectedFilter === 'evacuation'
                ? 'bg-green-600 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
            }`}
          >
            Evacuation
          </button>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="flex-1 bg-orange-900/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Grid Background */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-3 text-xs space-y-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-white">Active Fire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-white">Hazard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-white">Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-white">Water Source</span>
            </div>
          </div>

          {/* Map Markers */}
          <div className="absolute inset-0 overflow-auto">
            <div className="relative w-full h-full min-w-[600px] min-h-[600px]">
              {/* Active Fire Incidents */}
              {(selectedFilter === 'all' || selectedFilter === 'incidents') &&
                activeIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    style={{
                      left: `${((incident.lng - 124.244) / 0.003) * 100}%`,
                      top: `${100 - ((incident.lat - 8.227) / 0.003) * 100}%`
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {incident.purok}
                      </div>
                    </div>
                  </div>
                ))}

              {/* Hazard Reports */}
              {(selectedFilter === 'all' || selectedFilter === 'hazards') &&
                pendingHazards.map((hazard) => (
                  <div
                    key={hazard.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((hazard.lng - 124.244) / 0.003) * 100}%`,
                      top: `${100 - ((hazard.lat - 8.227) / 0.003) * 100}%`
                    }}
                  >
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                ))}

              {/* Evacuation Centers */}
              {(selectedFilter === 'all' || selectedFilter === 'evacuation') &&
                evacuationCenters.map((center, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((center.lng - 124.244) / 0.003) * 100}%`,
                      top: `${100 - ((center.lat - 8.227) / 0.003) * 100}%`
                    }}
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <Home className="w-3 h-3 text-white" />
                    </div>
                  </div>
                ))}

              {/* Water Sources */}
              {(selectedFilter === 'all' || selectedFilter === 'evacuation') &&
                waterSources.map((source, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((source.lng - 124.244) / 0.003) * 100}%`,
                      top: `${100 - ((source.lat - 8.227) / 0.003) * 100}%`
                    }}
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <Droplet className="w-3 h-3 text-white" />
                    </div>
                  </div>
                ))}

              {/* User Location */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: '45%',
                  top: '55%'
                }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-xl border-3 border-white animate-pulse">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    You
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Details Panel */}
      <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4 space-y-3 max-h-48 overflow-y-auto">
        <h3 className="text-sm text-white">Nearby Locations</h3>
        
        {activeIncidents.length > 0 && (
          <Card className="p-3 bg-red-900/40 backdrop-blur-sm border-red-300/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white">{activeIncidents[0].location}</p>
                <p className="text-xs text-white/80 mt-1">{activeIncidents[0].status.toUpperCase()}</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-3 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-start gap-2">
            <Home className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white">Nearest Evacuation Center</p>
              <p className="text-xs text-white/80 mt-1">
                {evacuationCenters.find(e => e.barangay === user.barangay)?.name || evacuationCenters[0].name}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}