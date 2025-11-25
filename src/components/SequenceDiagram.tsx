export function SequenceDiagram() {
  return (
    <svg viewBox="0 0 1000 700" className="w-full h-auto" style={{ minHeight: '500px' }}>
      {/* White background */}
      <rect x="0" y="0" width="1000" height="700" fill="#FFFFFF" />

      {/* Actors/Objects - Only up to AI Service for Tier 3 */}
      <rect x="60" y="30" width="110" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="5" />
      <text x="115" y="55" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Resident</text>

      <rect x="230" y="30" width="110" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="5" />
      <text x="285" y="55" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Web App</text>

      <rect x="400" y="30" width="110" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="5" />
      <text x="455" y="55" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">API Server</text>

      <rect x="570" y="30" width="110" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="5" />
      <text x="625" y="55" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Database</text>

      <rect x="740" y="30" width="110" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="5" />
      <text x="795" y="55" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI Service</text>

      {/* Lifelines */}
      <line x1="115" y1="80" x2="115" y2="650" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="285" y1="80" x2="285" y2="650" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="455" y1="80" x2="455" y2="650" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="625" y1="80" x2="625" y2="650" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="795" y1="80" x2="795" y2="650" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />

      {/* Activation boxes for Tier 1-3 only */}
      {/* Tier 1: Login */}
      <rect x="110" y="100" width="10" height="40" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="280" y="120" width="10" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="450" y="140" width="10" height="80" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      
      {/* Tier 2: Open Form */}
      <rect x="110" y="260" width="10" height="40" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="280" y="280" width="10" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="450" y="300" width="10" height="80" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />

      {/* Tier 3: Upload Photo & AI Analysis */}
      <rect x="110" y="420" width="10" height="40" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="280" y="440" width="10" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="450" y="460" width="10" height="140" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
      <rect x="790" y="480" width="10" height="80" fill="#F0F0F0" stroke="#000000" strokeWidth="1" />

      {/* Messages - Tier 1: Login (Messages 1-3) */}
      <line x1="120" y1="120" x2="280" y2="120" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="195" y="115" fill="#000000" fontSize="10" fontFamily="Montserrat">1: Login</text>

      <line x1="290" y1="140" x2="450" y2="140" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="365" y="135" fill="#000000" fontSize="10" fontFamily="Montserrat">2: Auth Request</text>

      <line x1="450" y1="160" x2="280" y2="180" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" strokeDasharray="5,3" />
      <text x="365" y="175" fill="#000000" fontSize="10" fontFamily="Montserrat">3: JWT Token</text>

      {/* Messages - Tier 2: Open Form (Messages 4-6) */}
      <line x1="120" y1="280" x2="280" y2="280" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="195" y="275" fill="#000000" fontSize="10" fontFamily="Montserrat">4: Open Form</text>

      <line x1="290" y1="300" x2="450" y2="300" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="365" y="295" fill="#000000" fontSize="10" fontFamily="Montserrat">5: Get GPS</text>

      <line x1="450" y1="320" x2="280" y2="340" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" strokeDasharray="5,3" />
      <text x="365" y="335" fill="#000000" fontSize="10" fontFamily="Montserrat">6: Coordinates</text>

      {/* Messages - Tier 3: Upload Photo & AI Analysis (Messages 7-11) */}
      <line x1="120" y1="440" x2="280" y2="440" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="195" y="435" fill="#000000" fontSize="10" fontFamily="Montserrat">7: Upload Photo</text>

      <line x1="290" y1="460" x2="450" y2="460" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="365" y="455" fill="#000000" fontSize="10" fontFamily="Montserrat">8: Send Image</text>

      <line x1="460" y1="500" x2="790" y2="500" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" />
      <text x="615" y="495" fill="#000000" fontSize="10" fontFamily="Montserrat">9: Analyze Image</text>

      <rect x="785" y="515" width="160" height="40" fill="#F5F5F5" stroke="#000000" strokeWidth="1" />
      <text x="865" y="530" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI Processing:</text>
      <text x="865" y="545" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Severity: Major (90%)</text>

      <line x1="790" y1="565" x2="460" y2="565" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" strokeDasharray="5,3" />
      <text x="615" y="560" fill="#000000" fontSize="10" fontFamily="Montserrat">10: AI Results</text>

      <line x1="450" y1="585" x2="280" y2="605" stroke="#000000" strokeWidth="2" markerEnd="url(#msg-arrow)" strokeDasharray="5,3" />
      <text x="365" y="600" fill="#000000" fontSize="10" fontFamily="Montserrat">11: Show Analysis</text>

      {/* Tier Labels */}
      <rect x="10" y="95" width="40" height="130" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" rx="5" />
      <text x="30" y="120" fill="#1976D2" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat" transform="rotate(-90 30 160)">TIER 1</text>

      <rect x="10" y="255" width="40" height="130" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" rx="5" />
      <text x="30" y="280" fill="#388E3C" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat" transform="rotate(-90 30 320)">TIER 2</text>

      <rect x="10" y="415" width="40" height="220" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" rx="5" />
      <text x="30" y="440" fill="#F57C00" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat" transform="rotate(-90 30 525)">TIER 3</text>

      {/* Arrow marker */}
      <defs>
        <marker id="msg-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#000000" />
        </marker>
      </defs>
    </svg>
  );
}
