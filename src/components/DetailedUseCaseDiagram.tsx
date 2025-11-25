export function DetailedUseCaseDiagram() {
  return (
    <svg viewBox="0 0 1600 1400" className="w-full h-auto" style={{ minHeight: '900px' }}>
      {/* White background */}
      <rect x="0" y="0" width="1600" height="1400" fill="#FFFFFF" />

      {/* System Boundary */}
      <rect x="350" y="50" width="900" height="1300" fill="none" stroke="#000000" strokeWidth="3" strokeDasharray="8,4" />
      <text x="800" y="35" fill="#000000" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SIKLAB Fire Hazard Mapping System</text>
      
      {/* Resident Actor */}
      <g id="resident">
        <circle cx="150" cy="300" r="30" fill="none" stroke="#000000" strokeWidth="3" />
        <line x1="150" y1="330" x2="150" y2="410" stroke="#000000" strokeWidth="3" />
        <line x1="150" y1="360" x2="110" y2="400" stroke="#000000" strokeWidth="3" />
        <line x1="150" y1="360" x2="190" y2="400" stroke="#000000" strokeWidth="3" />
        <line x1="150" y1="410" x2="120" y2="470" stroke="#000000" strokeWidth="3" />
        <line x1="150" y1="410" x2="180" y2="470" stroke="#000000" strokeWidth="3" />
        <text x="150" y="500" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">RESIDENT</text>
      </g>

      {/* BFP/LGU Official Actor */}
      <g id="bfp">
        <circle cx="1450" cy="350" r="30" fill="none" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="380" x2="1450" y2="460" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="410" x2="1410" y2="450" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="410" x2="1490" y2="450" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="460" x2="1420" y2="520" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="460" x2="1480" y2="520" stroke="#000000" strokeWidth="3" />
        <text x="1450" y="550" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">BFP/LGU</text>
        <text x="1450" y="570" fill="#000000" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">OFFICIAL</text>
      </g>

      {/* System Admin Actor */}
      <g id="admin">
        <circle cx="1450" cy="1000" r="30" fill="none" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="1030" x2="1450" y2="1110" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="1060" x2="1410" y2="1100" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="1060" x2="1490" y2="1100" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="1110" x2="1420" y2="1170" stroke="#000000" strokeWidth="3" />
        <line x1="1450" y1="1110" x2="1480" y2="1170" stroke="#000000" strokeWidth="3" />
        <text x="1450" y="1200" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SYSTEM</text>
        <text x="1450" y="1220" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">ADMIN</text>
      </g>

      {/* SHARED Use Cases */}
      <ellipse cx="500" cy="100" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="105" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Register Account</text>

      <ellipse cx="500" cy="170" rx="90" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="175" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Login to System</text>

      <ellipse cx="700" cy="100" rx="90" ry="35" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
      <text x="700" y="105" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Authentication</text>

      {/* RESIDENT Use Cases - Column 1 */}
      <ellipse cx="500" cy="260" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="265" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Fire Hazard Map</text>

      <ellipse cx="500" cy="340" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="340" fill="#000000" fontSize="11" textAnchor="middle" fontFamily="Montserrat">Report Fire Hazard</text>
      <text x="500" y="353" fill="#000000" fontSize="11" textAnchor="middle" fontFamily="Montserrat">(with AI Analysis)</text>

      <ellipse cx="500" cy="420" rx="95" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="425" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Track Report Status</text>

      <ellipse cx="500" cy="500" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="505" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Notifications</text>

      <ellipse cx="500" cy="580" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="585" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Safety Tips</text>

      <ellipse cx="500" cy="660" rx="115" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="665" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Emergency Contacts</text>

      <ellipse cx="500" cy="740" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="745" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Report History</text>

      <ellipse cx="500" cy="820" rx="95" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="500" y="825" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Update Profile</text>

      {/* RESIDENT Use Cases - Sub-features (included) */}
      <ellipse cx="750" cy="260" rx="90" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="750" y="260" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">View Hotspots</text>
      <text x="750" y="273" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">& Statistics</text>

      <ellipse cx="750" cy="340" rx="95" ry="30" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
      <text x="750" y="345" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI Image Analysis</text>

      <ellipse cx="750" cy="400" rx="85" ry="30" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
      <text x="750" y="405" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Auto-Routing</text>

      <ellipse cx="950" cy="340" rx="95" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="950" y="345" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Select on Map</text>

      <ellipse cx="950" cy="400" rx="95" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="950" y="405" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Upload Photo</text>

      <ellipse cx="950" cy="460" rx="95" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="950" y="465" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Use GPS Location</text>

      {/* BFP/LGU Use Cases */}
      <ellipse cx="1050" cy="200" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="205" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Verify Hazard Reports</text>

      <ellipse cx="1050" cy="280" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="285" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Review Report Details</text>

      <ellipse cx="1050" cy="360" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="365" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View AI Analysis</text>

      <ellipse cx="1050" cy="440" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="445" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Validate Report</text>

      <ellipse cx="1050" cy="520" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="525" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Reject Report</text>

      <ellipse cx="1050" cy="600" rx="95" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="605" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Dispatch Team</text>

      <ellipse cx="1050" cy="680" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="685" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Send Area Alerts</text>

      <ellipse cx="1050" cy="760" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="765" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Manage Incidents</text>

      <ellipse cx="1050" cy="840" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="845" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Update Report Status</text>

      <ellipse cx="1050" cy="920" rx="90" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="925" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Add Notes</text>

      <ellipse cx="1050" cy="1000" rx="95" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="1005" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Analytics</text>

      <ellipse cx="1050" cy="1080" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1050" y="1085" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Filter Reports</text>

      {/* ADMIN Use Cases */}
      <ellipse cx="800" cy="1000" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="800" y="1005" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Manage Users</text>

      <ellipse cx="800" cy="1080" rx="110" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="800" y="1085" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View System Activity</text>

      <ellipse cx="800" cy="1160" rx="105" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="800" y="1165" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Configure System</text>

      <ellipse cx="800" cy="1240" rx="100" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="800" y="1245" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">View Audit Logs</text>

      <ellipse cx="800" cy="1320" rx="95" ry="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="800" y="1325" fill="#000000" fontSize="12" textAnchor="middle" fontFamily="Montserrat">Export Reports</text>

      {/* ADMIN Sub-features */}
      <ellipse cx="570" cy="1000" rx="85" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="570" y="1005" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Create User</text>

      <ellipse cx="570" cy="1060" rx="85" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="570" y="1065" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Edit User</text>

      <ellipse cx="570" cy="1120" rx="85" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="570" y="1125" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Suspend User</text>

      <ellipse cx="570" cy="1180" rx="85" ry="30" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="570" y="1185" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Delete User</text>

      {/* Associations - Resident */}
      <line x1="200" y1="350" x2="390" y2="100" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="350" x2="410" y2="170" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="350" x2="400" y2="260" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="360" x2="400" y2="340" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="370" x2="405" y2="420" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="380" x2="395" y2="500" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="390" x2="395" y2="580" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="400" x2="385" y2="660" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="410" x2="390" y2="740" stroke="#000000" strokeWidth="2" />
      <line x1="200" y1="420" x2="405" y2="820" stroke="#000000" strokeWidth="2" />

      {/* Associations - BFP */}
      <line x1="1410" y1="400" x2="1160" y2="200" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="410" x2="1155" y2="280" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="420" x2="1155" y2="360" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="430" x2="1150" y2="440" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="440" x2="1150" y2="520" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="450" x2="1145" y2="600" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="460" x2="1155" y2="680" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="470" x2="1150" y2="760" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="480" x2="1155" y2="840" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="490" x2="1145" y2="920" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="500" x2="1145" y2="1000" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="510" x2="1160" y2="1080" stroke="#000000" strokeWidth="2" />

      {/* Associations - Admin */}
      <line x1="1410" y1="1050" x2="900" y2="1000" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="1060" x2="910" y2="1080" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="1070" x2="905" y2="1160" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="1080" x2="900" y2="1240" stroke="#000000" strokeWidth="2" />
      <line x1="1410" y1="1090" x2="895" y2="1320" stroke="#000000" strokeWidth="2" />

      {/* Include relationships - Authentication */}
      <line x1="600" y1="170" x2="610" y2="110" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <text x="640" y="135" fill="#000000" fontSize="10" fontWeight="bold" fontFamily="Montserrat">«include»</text>

      {/* Include relationships - Map features */}
      <line x1="610" y1="260" x2="660" y2="260" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <text x="635" y="250" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="Montserrat">«include»</text>

      {/* Include relationships - Report Hazard */}
      <line x1="600" y1="340" x2="655" y2="340" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <text x="627" y="330" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="Montserrat">«include»</text>

      <line x1="845" y1="340" x2="855" y2="340" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <text x="850" y="330" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="Montserrat">«include»</text>

      <line x1="845" y1="350" x2="855" y2="400" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <line x1="845" y1="360" x2="855" y2="460" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />

      {/* Include relationships - Manage Users */}
      <line x1="700" y1="1000" x2="655" y2="1000" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <text x="677" y="990" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="Montserrat">«include»</text>

      <line x1="655" y1="1010" x2="655" y2="1060" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <line x1="655" y1="1020" x2="655" y2="1120" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />
      <line x1="655" y1="1030" x2="655" y2="1180" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#include-arrow)" />

      {/* Shared access - BFP and Resident */}
      <line x1="200" y1="340" x2="400" y2="260" stroke="#666666" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="1410" y1="400" x2="610" y2="260" stroke="#666666" strokeWidth="2" strokeDasharray="3,3" />
      <text x="700" y="220" fill="#666666" fontSize="10" fontStyle="italic" fontFamily="Montserrat">Shared Access</text>

      {/* Legend */}
      <g transform="translate(370, 1360)">
        <text x="0" y="0" fill="#000000" fontSize="13" fontWeight="bold" fontFamily="Montserrat">Legend:</text>
        
        <line x1="80" y1="-5" x2="140" y2="-5" stroke="#000000" strokeWidth="2" />
        <text x="150" y="0" fill="#000000" fontSize="11" fontFamily="Montserrat">Association</text>
        
        <line x1="260" y1="-5" x2="320" y2="-5" stroke="#000000" strokeWidth="2" strokeDasharray="5,3" />
        <polygon points="320 -5, 312 -8, 312 -2" fill="#000000" />
        <text x="330" y="0" fill="#000000" fontSize="11" fontFamily="Montserrat">Include</text>
        
        <line x1="410" y1="-5" x2="470" y2="-5" stroke="#666666" strokeWidth="2" strokeDasharray="3,3" />
        <text x="480" y="0" fill="#000000" fontSize="11" fontFamily="Montserrat">Extend/Share</text>

        <ellipse cx="610" cy="-5" rx="40" ry="15" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <text x="660" y="0" fill="#000000" fontSize="11" fontFamily="Montserrat">Use Case</text>

        <ellipse cx="770" cy="-5" rx="40" ry="15" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
        <text x="820" y="0" fill="#000000" fontSize="11" fontFamily="Montserrat">Core Feature</text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker id="include-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#000000" />
        </marker>
      </defs>
    </svg>
  );
}
