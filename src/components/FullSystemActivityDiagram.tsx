export function FullSystemActivityDiagram() {
  return (
    <svg viewBox="0 0 1600 2200" className="w-full h-auto" style={{ minHeight: '1200px' }}>
      {/* White background */}
      <rect x="0" y="0" width="1600" height="2200" fill="#FFFFFF" />

      {/* Swimlanes */}
      <rect x="50" y="50" width="300" height="2100" fill="none" stroke="#000000" strokeWidth="3" />
      <text x="200" y="85" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">RESIDENT</text>
      
      <rect x="350" y="50" width="350" height="2100" fill="none" stroke="#000000" strokeWidth="3" />
      <text x="525" y="85" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SYSTEM</text>
      
      <rect x="700" y="50" width="400" height="2100" fill="none" stroke="#000000" strokeWidth="3" />
      <text x="900" y="85" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">BFP/LGU OFFICIAL</text>

      <rect x="1100" y="50" width="400" height="2100" fill="none" stroke="#000000" strokeWidth="3" />
      <text x="1300" y="85" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">SYSTEM ADMIN</text>

      {/* Start */}
      <circle cx="200" cy="130" r="25" fill="#000000" stroke="#000000" strokeWidth="3" />
      <circle cx="200" cy="130" r="15" fill="#FFFFFF" />
      <text x="250" y="138" fill="#000000" fontSize="14" fontFamily="Montserrat">Start</text>

      {/* === REGISTRATION & LOGIN FLOW === */}
      <text x="80" y="180" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="Montserrat">📋 Registration & Login</text>

      {/* Register Account */}
      <rect x="100" y="200" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="230" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Register Account</text>

      <rect x="400" y="200" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="220" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Validate User Data</text>
      <text x="500" y="237" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Create Account</text>

      {/* Login */}
      <rect x="100" y="290" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="320" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Login to System</text>

      <rect x="400" y="290" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="310" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Authenticate User</text>
      <text x="500" y="327" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">Generate JWT Token</text>

      {/* Decision: User Role */}
      <path d="M 500 380 L 570 420 L 500 460 L 430 420 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <text x="500" y="420" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">User</text>
      <text x="500" y="433" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Role?</text>

      {/* === RESIDENT WORKFLOWS === */}
      <text x="80" y="520" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="Montserrat">👤 Resident Features</text>

      {/* View Fire Hazard Map */}
      <rect x="100" y="540" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="565" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View Fire</text>
      <text x="200" y="580" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Hazard Map</text>

      <rect x="400" y="540" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="560" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Load Map Data</text>
      <text x="500" y="575" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Hotspots & Statistics</text>

      {/* Report Fire Hazard */}
      <rect x="100" y="630" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="655" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Report Fire Hazard</text>

      <rect x="400" y="630" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="655" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Get GPS Location</text>

      <rect x="400" y="720" width="200" height="80" rx="25" fill="#E0E0E0" stroke="#000000" strokeWidth="2" />
      <text x="500" y="745" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">AI Image Analysis</text>
      <text x="500" y="760" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">• Detect Severity</text>
      <text x="500" y="774" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">• Calculate Confidence</text>
      <text x="500" y="788" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">• Auto-route to Dept</text>

      <rect x="400" y="830" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="855" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Save Report to DB</text>

      {/* Track Report Status */}
      <rect x="100" y="920" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="945" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Track Report Status</text>

      <rect x="400" y="920" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="940" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Query Report</text>
      <text x="500" y="955" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Show Status Updates</text>

      {/* View Notifications */}
      <rect x="100" y="1010" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="1035" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View Notifications</text>

      <rect x="400" y="1010" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1030" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Fetch Notifications</text>
      <text x="500" y="1045" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Mark as Read</text>

      {/* View Safety Tips */}
      <rect x="100" y="1100" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="1125" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View Safety Tips</text>

      <rect x="400" y="1100" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1120" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Load Educational</text>
      <text x="500" y="1135" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Content & Tips</text>

      {/* === BFP/LGU WORKFLOWS === */}
      <text x="730" y="520" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="Montserrat">🚒 BFP/LGU Features</text>

      {/* BFP Dashboard */}
      <rect x="750" y="540" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="565" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Open BFP Dashboard</text>

      {/* Verify Hazard Reports */}
      <rect x="750" y="630" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="655" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Review Pending Reports</text>

      <rect x="400" y="720" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="740" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Fetch Reports by</text>
      <text x="500" y="755" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Status & Priority</text>

      {/* View AI Analysis */}
      <rect x="750" y="810" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="830" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View AI Analysis Results</text>
      <text x="900" y="845" fill="#000000" fontSize="10" textAnchor="middle" fontFamily="Montserrat">(Severity, Confidence, Factors)</text>

      {/* Decision: Validate or Reject */}
      <path d="M 900 910 L 970 950 L 900 990 L 830 950 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <text x="900" y="950" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Report</text>
      <text x="900" y="963" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Valid?</text>

      {/* Validate Report */}
      <rect x="750" y="1030" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1055" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Validate Report</text>

      <rect x="400" y="1100" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1120" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Update Status:</text>
      <text x="500" y="1135" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Verified</text>

      {/* Dispatch Team */}
      <rect x="750" y="1190" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1215" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Dispatch Response Team</text>

      <rect x="400" y="1260" width="200" height="50" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1280" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Create Dispatch</text>
      <text x="500" y="1295" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Record (Team Details)</text>

      {/* Send Area Alerts */}
      <rect x="750" y="1350" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1375" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Send Area Alerts</text>

      <rect x="400" y="1420" width="200" height="60" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1440" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Send Notifications</text>
      <text x="500" y="1455" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">SMS/Email/Push</text>
      <text x="500" y="1468" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">to Residents in Area</text>

      {/* Manage Incidents */}
      <rect x="750" y="1520" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1545" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Update Incident Status</text>

      {/* View Analytics */}
      <rect x="750" y="1610" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1635" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View Analytics Dashboard</text>

      <rect x="400" y="1680" width="200" height="60" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1700" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Generate Reports</text>
      <text x="500" y="1715" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Statistics, Trends,</text>
      <text x="500" y="1728" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Hotspot Analysis</text>

      {/* === ADMIN WORKFLOWS === */}
      <text x="1130" y="520" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="Montserrat">⚙️ Admin Features</text>

      {/* Admin Dashboard */}
      <rect x="1150" y="540" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="565" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Open Admin Console</text>

      {/* Manage Users */}
      <rect x="1150" y="630" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="655" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Manage Users</text>

      <rect x="400" y="700" width="200" height="70" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="725" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">CRUD Operations:</text>
      <text x="500" y="740" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Create, Edit,</text>
      <text x="500" y="753" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Suspend, Delete</text>
      <text x="500" y="766" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">User Accounts</text>

      {/* View System Activity */}
      <rect x="1150" y="810" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="835" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View System Activity Logs</text>

      <rect x="400" y="880" width="200" height="60" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="900" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Fetch Activity Logs</text>
      <text x="500" y="915" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">User Actions,</text>
      <text x="500" y="928" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">IP, Timestamps</text>

      {/* View Audit Logs */}
      <rect x="1150" y="980" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="1005" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">View Audit Logs</text>

      {/* Configure System */}
      <rect x="1150" y="1070" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="1095" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Configure System Settings</text>

      <rect x="400" y="1140" width="200" height="70" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1165" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Update Settings:</text>
      <text x="500" y="1180" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">AI Thresholds,</text>
      <text x="500" y="1193" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Notification Rules,</text>
      <text x="500" y="1206" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">System Parameters</text>

      {/* Export Reports */}
      <rect x="1150" y="1250" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="1275" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Export System Reports</text>

      <rect x="400" y="1320" width="200" height="60" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1340" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Generate Export</text>
      <text x="500" y="1355" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">CSV/Excel/PDF</text>
      <text x="500" y="1368" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Full Data Dump</text>

      {/* Monitor System Health */}
      <rect x="1150" y="1420" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="1445" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Monitor System Health</text>

      <rect x="400" y="1490" width="200" height="70" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1515" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Check Metrics:</text>
      <text x="500" y="1530" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Server Status,</text>
      <text x="500" y="1543" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Database Health,</text>
      <text x="500" y="1556" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">API Performance</text>

      {/* === LOGOUT FLOW === */}
      <text x="80" y="1800" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="Montserrat">🔒 Logout</text>

      <rect x="100" y="1820" width="200" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="200" y="1845" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Logout</text>

      <rect x="750" y="1820" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="900" y="1845" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Logout</text>

      <rect x="1150" y="1820" width="300" height="50" rx="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <text x="1300" y="1845" fill="#000000" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Logout</text>

      <rect x="400" y="1910" width="200" height="60" rx="25" fill="#F5F5F5" stroke="#000000" strokeWidth="2" />
      <text x="500" y="1930" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat">Revoke JWT Token</text>
      <text x="500" y="1945" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Clear Session</text>
      <text x="500" y="1958" fill="#000000" fontSize="9" textAnchor="middle" fontFamily="Montserrat">Log Activity</text>

      {/* End */}
      <circle cx="500" cy="2050" r="25" fill="none" stroke="#000000" strokeWidth="4" />
      <circle cx="500" cy="2050" r="15" fill="#000000" />
      <text x="545" y="2058" fill="#000000" fontSize="14" fontFamily="Montserrat">End</text>

      {/* === ARROWS === */}
      {/* Start to Register/Login */}
      <line x1="200" y1="155" x2="200" y2="200" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Register flow */}
      <line x1="300" y1="225" x2="400" y2="225" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="500" y1="250" x2="500" y2="290" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Login flow */}
      <line x1="200" y1="250" x2="200" y2="290" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="315" x2="400" y2="315" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Role decision */}
      <line x1="500" y1="340" x2="500" y2="380" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Resident path */}
      <line x1="430" y1="420" x2="200" y2="540" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <text x="300" y="470" fill="#000000" fontSize="11" fontWeight="bold" fontFamily="Montserrat">Resident</text>

      {/* BFP path */}
      <line x1="570" y1="420" x2="900" y2="540" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <text x="750" y="470" fill="#000000" fontSize="11" fontWeight="bold" fontFamily="Montserrat">BFP/LGU</text>

      {/* Admin path */}
      <line x1="570" y1="420" x2="1300" y2="540" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <text x="950" y="450" fill="#000000" fontSize="11" fontWeight="bold" fontFamily="Montserrat">Admin</text>

      {/* Resident activities */}
      <line x1="200" y1="590" x2="200" y2="630" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="565" x2="400" y2="565" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      
      <line x1="200" y1="680" x2="200" y2="920" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="655" x2="400" y2="655" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      
      <line x1="500" y1="680" x2="500" y2="720" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="500" y1="800" x2="500" y2="830" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="200" y1="970" x2="200" y2="1010" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="945" x2="400" y2="945" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="200" y1="1060" x2="200" y2="1100" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="1035" x2="400" y2="1035" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="200" y1="1150" x2="200" y2="1820" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="300" y1="1125" x2="400" y2="1125" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* BFP activities */}
      <line x1="900" y1="590" x2="900" y2="630" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="900" y1="680" x2="900" y2="810" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="750" y1="655" x2="600" y2="745" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      
      <line x1="900" y1="860" x2="900" y2="910" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="900" y1="990" x2="900" y2="1030" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <text x="920" y="1010" fill="#000000" fontSize="11" fontWeight="bold" fontFamily="Montserrat">Yes</text>

      <line x1="900" y1="1080" x2="900" y2="1190" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="750" y1="1055" x2="600" y2="1125" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="900" y1="1240" x2="900" y2="1350" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="750" y1="1215" x2="600" y2="1285" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="900" y1="1400" x2="900" y2="1520" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="750" y1="1375" x2="600" y2="1450" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="900" y1="1570" x2="900" y2="1610" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="900" y1="1660" x2="900" y2="1820" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="750" y1="1635" x2="600" y2="1710" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Admin activities */}
      <line x1="1300" y1="590" x2="1300" y2="630" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1300" y1="680" x2="1300" y2="810" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="655" x2="600" y2="735" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="1300" y1="860" x2="1300" y2="980" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="835" x2="600" y2="910" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="1300" y1="1030" x2="1300" y2="1070" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1300" y1="1120" x2="1300" y2="1250" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="1095" x2="600" y2="1175" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="1300" y1="1300" x2="1300" y2="1420" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="1275" x2="600" y2="1350" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="1300" y1="1470" x2="1300" y2="1820" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="1445" x2="600" y2="1525" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Logout flows */}
      <line x1="300" y1="1845" x2="400" y2="1940" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="900" y1="1870" x2="600" y2="1940" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
      <line x1="1150" y1="1845" x2="600" y2="1940" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      <line x1="500" y1="1970" x2="500" y2="2025" stroke="#000000" strokeWidth="2" markerEnd="url(#arrowhead2)" />

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#000000" />
        </marker>
      </defs>

      {/* Labels for sections */}
      <rect x="60" y="170" width="180" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" rx="5" />
      <rect x="60" y="510" width="150" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" rx="5" />
      <rect x="720" y="510" width="180" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" rx="5" />
      <rect x="1120" y="510" width="150" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" rx="5" />
      <rect x="60" y="1790" width="120" height="25" fill="#E0E0E0" stroke="#000000" strokeWidth="1" rx="5" />
    </svg>
  );
}
