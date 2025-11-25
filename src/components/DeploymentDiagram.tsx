export function DeploymentDiagram() {
  return (
    <svg viewBox="0 0 1400 900" className="w-full h-auto" style={{ minHeight: '600px' }}>
      {/* White background */}
      <rect x="0" y="0" width="1400" height="900" fill="#FFFFFF" />

      {/* Title */}
      <text x="700" y="30" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SIKLAB System Deployment Architecture</text>

      {/* === CLIENT TIER === */}
      <g id="client-tier">
        <rect x="50" y="80" width="280" height="320" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <text x="190" y="110" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«device» Client Tier</text>
        
        {/* Web Browser */}
        <rect x="80" y="140" width="220" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="190" y="165" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«browser»</text>
        <text x="190" y="182" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Web Browser</text>
        <text x="190" y="200" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Chrome, Firefox, Safari</text>

        {/* Mobile App */}
        <rect x="80" y="240" width="220" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="190" y="265" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«mobile»</text>
        <text x="190" y="282" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Mobile App</text>
        <text x="190" y="300" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">iOS / Android (PWA)</text>

        <text x="190" y="365" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">Resident Interface</text>
        <text x="190" y="380" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">BFP/LGU Dashboard</text>
      </g>

      {/* === WEB TIER === */}
      <g id="web-tier">
        <rect x="400" y="80" width="280" height="320" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <text x="540" y="110" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«server» Web Tier</text>
        
        {/* React Frontend */}
        <rect x="430" y="140" width="220" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="540" y="165" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«component»</text>
        <text x="540" y="182" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">React Frontend</text>
        <text x="540" y="200" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">React 18 + TypeScript</text>

        {/* Nginx */}
        <rect x="430" y="240" width="220" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="540" y="265" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«web server»</text>
        <text x="540" y="282" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Nginx</text>
        <text x="540" y="300" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Load Balancer & CDN</text>

        <text x="540" y="365" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">Static Assets</text>
        <text x="540" y="380" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">SSL/TLS Termination</text>
      </g>

      {/* === APPLICATION TIER === */}
      <g id="app-tier">
        <rect x="750" y="80" width="280" height="420" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <text x="890" y="110" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«server» Application Tier</text>
        
        {/* API Server */}
        <rect x="780" y="140" width="220" height="70" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="890" y="162" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«API»</text>
        <text x="890" y="179" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">REST API Server</text>
        <text x="890" y="196" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Node.js / Express</text>

        {/* Authentication */}
        <rect x="780" y="230" width="220" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
        <text x="890" y="252" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«service»</text>
        <text x="890" y="269" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Auth Service (JWT)</text>

        {/* AI Service */}
        <rect x="780" y="310" width="220" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
        <text x="890" y="332" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«service»</text>
        <text x="890" y="349" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI Analysis Service</text>

        {/* Notification Service */}
        <rect x="780" y="390" width="220" height="60" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
        <text x="890" y="412" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«service»</text>
        <text x="890" y="429" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Notification Service</text>

        <text x="890" y="475" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">Business Logic</text>
        <text x="890" y="490" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">HTTPS / REST</text>
      </g>

      {/* === DATA TIER === */}
      <g id="data-tier">
        <rect x="1100" y="80" width="250" height="420" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <text x="1225" y="110" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«database» Data Tier</text>
        
        {/* PostgreSQL */}
        <rect x="1130" y="140" width="190" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="1225" y="165" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«database»</text>
        <text x="1225" y="182" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">PostgreSQL</text>
        <text x="1225" y="200" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Primary Database</text>

        {/* File Storage */}
        <rect x="1130" y="240" width="190" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="1225" y="265" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«storage»</text>
        <text x="1225" y="282" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">File Storage</text>
        <text x="1225" y="300" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Images & Documents</text>

        {/* Redis Cache */}
        <rect x="1130" y="340" width="190" height="80" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
        <text x="1225" y="365" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«cache»</text>
        <text x="1225" y="382" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Redis Cache</text>
        <text x="1225" y="400" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Session & Cache</text>

        <text x="1225" y="465" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">Data Persistence</text>
        <text x="1225" y="480" fill="#666666" fontSize="11" fontStyle="italic" textAnchor="middle" fontFamily="Montserrat">Backups & Replication</text>
      </g>

      {/* === EXTERNAL SERVICES === */}
      <g id="external-services">
        <rect x="400" y="550" width="630" height="300" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeDasharray="8,4" />
        <text x="715" y="580" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">External Services / Third-Party APIs</text>
        
        {/* Google Maps */}
        <rect x="430" y="610" width="180" height="70" fill="#F0F0F0" stroke="#000000" strokeWidth="2" />
        <text x="520" y="635" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«external»</text>
        <text x="520" y="652" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Google Maps API</text>
        <text x="520" y="667" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Mapping & Geocoding</text>

        {/* SMS Gateway */}
        <rect x="630" y="610" width="180" height="70" fill="#F0F0F0" stroke="#000000" strokeWidth="2" />
        <text x="720" y="635" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«external»</text>
        <text x="720" y="652" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SMS Gateway</text>
        <text x="720" y="667" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Twilio / Semaphore</text>

        {/* Email Service */}
        <rect x="830" y="610" width="180" height="70" fill="#F0F0F0" stroke="#000000" strokeWidth="2" />
        <text x="920" y="635" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«external»</text>
        <text x="920" y="652" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Email Service</text>
        <text x="920" y="667" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">SendGrid / SMTP</text>

        {/* AI Model API */}
        <rect x="430" y="700" width="280" height="70" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
        <text x="570" y="725" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«external»</text>
        <text x="570" y="742" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI/ML Service (OpenAI / Custom)</text>
        <text x="570" y="757" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Computer Vision & Image Analysis</text>

        {/* Weather API */}
        <rect x="730" y="700" width="280" height="70" fill="#F0F0F0" stroke="#000000" strokeWidth="2" />
        <text x="870" y="725" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">«external»</text>
        <text x="870" y="742" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Weather API (Optional)</text>
        <text x="870" y="757" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Risk Factor Enhancement</text>
      </g>

      {/* === CONNECTIONS === */}
      {/* Client to Web */}
      <line x1="330" y1="200" x2="400" y2="200" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow-deploy)" />
      <text x="365" y="190" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">HTTPS</text>

      {/* Web to App */}
      <line x1="680" y1="200" x2="750" y2="200" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow-deploy)" />
      <text x="715" y="190" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">REST API</text>

      {/* App to Data */}
      <line x1="1030" y1="200" x2="1100" y2="200" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow-deploy)" />
      <text x="1065" y="190" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">SQL</text>

      {/* App to External Services */}
      <line x1="890" y1="500" x2="715" y2="550" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow-deploy)" />
      <text x="820" y="520" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">API Calls</text>

      {/* Arrow marker */}
      <defs>
        <marker id="arrow-deploy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#000000" />
        </marker>
      </defs>

      {/* Legend */}
      <g transform="translate(80, 810)">
        <text x="0" y="0" fill="#000000" fontSize="12" fontWeight="bold" fontFamily="Montserrat">Legend:</text>
        
        <rect x="0" y="10" width="60" height="25" fill="#F5F5F5" stroke="#000000" strokeWidth="1" />
        <text x="70" y="27" fill="#000000" fontSize="10" fontFamily="Montserrat">Main Component</text>
        
        <rect x="200" y="10" width="60" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" />
        <text x="270" y="27" fill="#000000" fontSize="10" fontFamily="Montserrat">Core Service</text>

        <rect x="400" y="10" width="60" height="25" fill="#F0F0F0" stroke="#000000" strokeWidth="1" />
        <text x="470" y="27" fill="#000000" fontSize="10" fontFamily="Montserrat">External API</text>

        <line x1="620" y1="22" x2="680" y2="22" stroke="#000000" strokeWidth="2" />
        <polygon points="680 22, 672 19, 672 25" fill="#000000" />
        <text x="690" y="27" fill="#000000" fontSize="10" fontFamily="Montserrat">Communication</text>
      </g>
    </svg>
  );
}
