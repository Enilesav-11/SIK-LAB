import { Table, FileCode, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function RTMSection() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[20px] font-bold text-[#F0F0F0] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Requirements Traceability Matrix (RTM)
            </h2>
            <p className="text-[13px] text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Complete requirements aligned with SRS v4.0 and Figma prototype
            </p>
          </div>
          <a 
            href="https://docs.google.com/spreadsheets/d/1C8q4XEJNHdC1yANH5mhjQjTlFHNe29ZU/edit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[12px] text-[#FF4500] hover:text-[#DC143C] underline flex items-center gap-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Table className="w-4 h-4" />
            View in Google Sheets →
          </a>
        </div>

        {/* RTM Table */}
        <div className="overflow-x-auto rounded-lg border border-[#505050]">
          <table className="w-full text-sm">
            <thead className="bg-[#2C2C2C] border-b border-[#505050] sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>RTM ID</th>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Requirements</th>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Notes</th>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Requestor</th>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Request Date</th>
                <th className="px-4 py-3 text-left text-[#F0F0F0] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#505050]">
              {/* Category 1: User Interface Creation */}
              <tr className="bg-[#2C2C2C]/80">
                <td className="px-4 py-3 font-bold text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1</td>
                <td className="px-4 py-3 font-bold text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }} colSpan={5}>User Interface Creation</td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.1</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Application Logo</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Centered SIKLAB branding with gradient, removed sidebar & profile pic</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Residents</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/13/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Updated v4.0
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.2</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Login</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>With Terms of Service acceptance</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident, BFP, Barangay Officials, LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/13/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.3</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Home Page</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>With alert banner, stats, quick actions, recent activity</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/13/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.4</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Fire Report Page (Dual Mode)</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Urgent Fire Alert + Hazard Report with photo upload</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/14/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.5</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Navigational Buttons</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Bottom navigation bar (5 tabs for Resident)</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/15/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.6</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>View Fire Hazard Map</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Interactive map with real-time incident markers</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/15/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>1.7</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Log Out</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Secure session termination with confirmation</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident, BFP, LGU, Admin</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/15/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>

              {/* Category 2: BFP/LGU Dashboard */}
              <tr className="bg-[#2C2C2C]/80">
                <td className="px-4 py-3 font-bold text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2</td>
                <td className="px-4 py-3 font-bold text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }} colSpan={5}>BFP/LGU Dashboard</td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.1</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP Dashboard Home</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Metrics cards, quick access, recent reports</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/18/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.2</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Unified Incident Dashboard</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Persistent filter panel across Fire Incidents/Hazard tabs</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>11/17/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed v4.0
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.3</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>AI-Powered Report Verification</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Moved to BFP verification phase (not resident submission)</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>11/17/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed v4.0
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.4</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Smart Routing Logic</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Minor→Barangay Officials, Major→BFP with confidence scores</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/19/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.5</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hazard Reports Management</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>List view, filter, details, verification workflow</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/19/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2.6</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Reports History Archive</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Comprehensive archive with advanced filtering</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/20/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>

              {/* Category 3: Admin Panel */}
              <tr className="bg-[#2C2C2C]/80">
                <td className="px-4 py-3 font-bold text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>3</td>
                <td className="px-4 py-3 font-bold text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }} colSpan={5}>Admin Panel</td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>3.1</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>User Management Interface</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Create, list, search, role assignment for users</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Admin</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/22/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>3.2</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>System Activity Monitor</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Real-time log with search, auto-refresh</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Admin</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/22/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>3.3</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Data Backup System</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Manual backup initiation with status display</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Admin</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/22/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>

              {/* Category 4: Core Functionality */}
              <tr className="bg-[#2C2C2C]/80">
                <td className="px-4 py-3 font-bold text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4</td>
                <td className="px-4 py-3 font-bold text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }} colSpan={5}>Core Functionality</td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.1</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Fire Incident Reporting</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Urgent alerts with photo upload, auto-location</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/14/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.2</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hazard Reporting</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>With severity levels, hazard types, photo upload</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/14/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.3</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Real-Time Alerts & Notifications</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Push notifications for residents and BFP</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Resident, BFP/LGU</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/19/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="bg-[#1E1E1E] hover:bg-[#2C2C2C]/30 transition-colors">
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.4</td>
                <td className="px-4 py-3 text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Report Status Tracking</td>
                <td className="px-4 py-3 text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pending, Verified, Resolved, Rejected statuses</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>All Users</td>
                <td className="px-4 py-3 text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>10/20/25</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function UseCasesSection() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6">
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-[#F0F0F0] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Use Case Descriptions
          </h2>
          <p className="text-[13px] text-[#A0A0A0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Complete use case descriptions aligned with SRS v4.0 and Figma prototype implementation
          </p>
        </div>

        {/* Use Case Template Component */}
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index} useCase={useCase} />
        ))}
      </div>
    </div>
  );
}

// Use Case Card Component
interface UseCase {
  id: string;
  name: string;
  actors: string;
  description: string;
  trigger: string;
  preconditions: string[];
  normalFlow: string[];
  alternativeFlows?: { name: string; steps: string[] }[];
  exceptions?: { name: string; steps: string[] }[];
  postconditions: { success: string; minimal: string };
}

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div className="bg-[#2C2C2C] rounded-lg border border-[#505050] p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[#505050] pb-3">
        <h3 className="text-[18px] font-bold text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {useCase.id}: {useCase.name}
        </h3>
        <FileCode className="w-5 h-5 text-[#A0A0A0]" />
      </div>

      <div className="space-y-4">
        <Field label="Use Case ID" value={useCase.id} />
        <Field label="Use Case Name" value={useCase.name} />
        <Field label="Actors" value={useCase.actors} />
        <Field label="Description" value={useCase.description} />
        <Field label="Trigger" value={useCase.trigger} />
        
        <div>
          <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Preconditions
          </label>
          <ol className="list-decimal list-inside space-y-1 text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {useCase.preconditions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        <div>
          <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Normal Flow
          </label>
          <ol className="list-decimal list-inside space-y-1 text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {useCase.normalFlow.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {useCase.alternativeFlows && useCase.alternativeFlows.length > 0 && (
          <div>
            <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Alternative Flows
            </label>
            <div className="space-y-3">
              {useCase.alternativeFlows.map((flow, i) => (
                <div key={i}>
                  <p className="font-semibold text-[#FF4500] text-[14px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {flow.name}
                  </p>
                  <ol className="list-decimal list-inside ml-4 space-y-1 text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {flow.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        {useCase.exceptions && useCase.exceptions.length > 0 && (
          <div>
            <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Exceptions
            </label>
            <div className="space-y-3">
              {useCase.exceptions.map((exception, i) => (
                <div key={i}>
                  <p className="font-semibold text-[#DC143C] text-[14px] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {exception.name}
                  </p>
                  <ol className="list-decimal list-inside ml-4 space-y-1 text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {exception.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Postconditions
          </label>
          <ul className="space-y-1 text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <li><span className="font-semibold text-green-400">Success Guarantee:</span> {useCase.postconditions.success}</li>
            <li><span className="font-semibold text-yellow-400">Minimal Guarantee:</span> {useCase.postconditions.minimal}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[#A0A0A0] text-[12px] font-semibold uppercase tracking-wider block mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {label}
      </label>
      <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {value}
      </p>
    </div>
  );
}

// ALL USE CASES DATA - Directly from SRS v4.0
const useCases: UseCase[] = [
  {
    id: "UC-1.1",
    name: "Log Into Account",
    actors: "Residents, BFP/LGU, System Administrator",
    description: "Allows a registered user to gain access to the SIKLAB system by providing valid credentials. The system validates the credentials and directs the user to their role-appropriate dashboard.",
    trigger: "The user accesses the Login Screen and inputs their credentials.",
    preconditions: [
      "The user must have a previously created and activated account.",
      "The user must agree to the Terms of Service and Privacy Policy."
    ],
    normalFlow: [
      "User navigates to the Login Screen.",
      "User enters their Email and Password.",
      "User selects 'Sign in'.",
      "The system validates the credentials against the user database.",
      "The system displays the appropriate dashboard based on user role: Resident → Resident Mobile App (with centered SIKLAB header), BFP/LGU → BFP Dashboard, Admin → Admin Dashboard.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. First-Time Login - Terms Acceptance",
        steps: [
          "System displays Terms of Service screen.",
          "User scrolls through document.",
          "User selects 'I have read the Terms of Service and Privacy Policy'.",
          "Use Case resumes at step 4 of Normal Flow."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Invalid Credentials (At step 4 of Normal Flow)",
        steps: [
          "System displays error message: 'Invalid email or password'.",
          "Use Case resumes at step 2 of Normal Flow."
        ]
      }
    ],
    postconditions: {
      success: "User is logged in and viewing their role-appropriate dashboard.",
      minimal: "User remains on Login Screen."
    }
  },
  {
    id: "UC-1.2",
    name: "Report Fire Incident (Urgent Alert)",
    actors: "Resident",
    description: "Allows a logged-in resident to quickly report a real-time fire incident with photo evidence and auto-detected location.",
    trigger: "Resident selects 'URGENT FIRE ALERT' from Report page.",
    preconditions: [
      "Resident must be logged into SIKLAB.",
      "Resident must allow location access."
    ],
    normalFlow: [
      "Resident navigates to Report tab (bottom navigation).",
      "System displays report type selection screen.",
      "Resident selects 'URGENT FIRE ALERT' card.",
      "System navigates to Urgent Fire Alert form.",
      "System automatically detects and displays resident's location.",
      "Resident confirms or manually adjusts location.",
      "Resident provides description: 'What is happening?'",
      "Resident attaches photo/video (optional but recommended).",
      "Resident selects 'SEND URGENT ALERT'.",
      "System submits report to SIKLAB monitoring system.",
      "System displays confirmation screen: 'REPORT SENT!' and 'We have alerted your Barangay Officials and BFP. Stay safe!'",
      "System routes alert to BFP for AI severity analysis.",
      "System sends report details to BFP/LGU Dashboard.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Manual Location Update (At step 6)",
        steps: [
          "Resident selects option to update location manually.",
          "System allows resident to input new address or drop map pin.",
          "Use Case resumes at step 7."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Location Service Disabled (At step 5)",
        steps: [
          "System cannot detect resident's location.",
          "System prompts resident to enable location services.",
          "Use Case resumes at Alternative Flow A1."
        ]
      },
      {
        name: "E2. Network Failure (At step 10)",
        steps: [
          "System fails to establish network connection.",
          "System displays 'Report Failed' message.",
          "System prompts user to dial BFP Hotline (911/160/161).",
          "Use Case terminates."
        ]
      }
    ],
    postconditions: {
      success: "Urgent Alert record submitted and logged; BFP/LGU notified; resident alerted count incremented.",
      minimal: "Resident prompted to take immediate safety actions."
    }
  },
  {
    id: "UC-1.3",
    name: "Report Fire Hazard",
    actors: "Resident",
    description: "Allows resident to report potential fire hazard (e.g., faulty wiring, cluttered exit) requiring review by officials.",
    trigger: "Resident selects 'REPORT A FIRE HAZARD' from Report page.",
    preconditions: [
      "Resident must be logged into SIKLAB.",
      "Resident is aware of a potential fire hazard."
    ],
    normalFlow: [
      "Resident navigates to Report tab.",
      "System displays report type selection.",
      "Resident selects 'REPORT A FIRE HAZARD' card.",
      "System navigates to Fire Hazard Report form.",
      "Resident confirms or sets hazard location.",
      "Resident selects hazard type: Electrical Hazard, Structural Hazard, Gas/Flammable Materials, Other.",
      "Resident sets perceived severity: Low / Medium / High Risk.",
      "Resident provides detailed description.",
      "Resident attaches photos/videos (optional).",
      "Resident selects 'Submit Hazard Report'.",
      "System submits report.",
      "System displays 'REPORT SENT!' confirmation: 'Your hazard report has been submitted for validation.'",
      "System notifies Barangay Officials of new hazard report.",
      "Use Case concludes."
    ],
    exceptions: [
      {
        name: "E1. Missing Mandatory Data (At step 10)",
        steps: [
          "System detects missing required fields (location, type, or description).",
          "System highlights required fields and displays error message.",
          "Use Case resumes at step 5."
        ]
      }
    ],
    postconditions: {
      success: "Fire Hazard Report submitted to SIKLAB; pending validation by officials.",
      minimal: "Resident returned to Home/Main Menu."
    }
  },
  {
    id: "UC-1.4",
    name: "View Fire Hazard Map",
    actors: "Resident",
    description: "Allows resident to view interactive map showing fire hazards, active incidents, and user location with real-time updates.",
    trigger: "Resident selects Map tab from bottom navigation.",
    preconditions: [
      "Resident must be logged in.",
      "System has active hazard data to display."
    ],
    normalFlow: [
      "Resident selects Map tab (second icon from left in bottom nav).",
      "System retrieves and displays interactive map interface.",
      "System displays map centered on user's barangay.",
      "System displays markers: Red pins (Active fire incidents), Orange pins (Reported fire hazards), User location marker.",
      "Resident interacts with map (zoom, pan, tap markers).",
      "Resident taps on marker to view details.",
      "Use Case concludes when resident exits map (selects another tab)."
    ],
    alternativeFlows: [
      {
        name: "A1. No Hazard Data Available (At step 4)",
        steps: [
          "System displays message: 'No active hazards in your area'.",
          "Use Case resumes at step 5."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Location Services Disabled",
        steps: [
          "System cannot determine resident's location.",
          "System prompts resident to enable location services.",
          "System allows manual input of viewing area.",
          "Use Case resumes at step 2."
        ]
      }
    ],
    postconditions: {
      success: "Resident viewed map and current fire hazard locations.",
      minimal: "Resident returned to previous screen."
    }
  },
  {
    id: "UC-1.5",
    name: "View Profile and Report History",
    actors: "Resident",
    description: "Allows resident to view account information, activity statistics, and history of all submitted reports.",
    trigger: "Resident selects Profile tab from bottom navigation.",
    preconditions: [
      "Resident must be logged in."
    ],
    normalFlow: [
      "Resident selects Profile tab (rightmost icon in bottom nav).",
      "System displays Profile Screen.",
      "System displays account information: Name, Email, Contact Number, Barangay.",
      "System displays activity statistics: Reports Submitted, Urgent Alerts Sent, Validated Reports.",
      "Resident selects 'View Report History'.",
      "System navigates to Report History page.",
      "System displays list of submitted reports: Report ID, Date/Time, Description/Location, Status (Pending/Verified/Resolved).",
      "Resident can filter by report type (Fire Incidents / Hazards).",
      "Use Case concludes when resident navigates away."
    ],
    alternativeFlows: [
      {
        name: "A1. No Report History (At step 7)",
        steps: [
          "System displays 'No reports found'.",
          "Use Case resumes at step 9."
        ]
      }
    ],
    postconditions: {
      success: "Resident viewed profile and report history.",
      minimal: "Resident returned to profile screen."
    }
  },
  {
    id: "UC-1.6",
    name: "Stay Updated and Safe",
    actors: "Resident",
    description: "Provides resident with consolidated safety information, current fire risk status, community news, and educational resources.",
    trigger: "Resident selects Updates tab (4th icon in bottom navigation).",
    preconditions: [
      "Resident must be logged in.",
      "System has localized risk and news data."
    ],
    normalFlow: [
      "Resident selects Stay Updated tab.",
      "System displays 'Stay Safe and Updated' screen.",
      "System displays localized area status: 'LOW FIRE RISK' or 'HIGH FIRE RISK' banner.",
      "System displays local incidents map snippet.",
      "Resident can select 'View Full Map' to navigate to Map tab.",
      "System displays Community Newsfeed: BFP Advisories, Incident Resolved notifications, Safety reminders.",
      "System displays access links to safety resources: Emergency Evacuation Plan, Home Fire Prevention Tips, Fire Safety Checklist.",
      "Resident selects a safety resource.",
      "System navigates to detailed safety content page.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. No Local Incidents (At step 4)",
        steps: [
          "System displays 'No active incidents in your area'.",
          "Use Case resumes at step 6."
        ]
      }
    ],
    postconditions: {
      success: "Resident informed of current fire risk and local updates.",
      minimal: "Resident viewed localized safety information."
    }
  },
  {
    id: "UC-1.7",
    name: "Log Out",
    actors: "Resident, BFP/LGU, System Administrator",
    description: "Allows logged-in user to securely end their session with confirmation dialog.",
    trigger: "User selects 'Log Out' from Profile Screen.",
    preconditions: [
      "User must be logged in.",
      "User must be viewing Profile Screen."
    ],
    normalFlow: [
      "User selects 'Log Out' button.",
      "System displays confirmation dialog: 'Are you sure to log out?'",
      "User selects 'OK' to confirm.",
      "System terminates current user session.",
      "System clears local session data.",
      "System redirects user to initial Login Screen.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Cancel Log Out (At step 3)",
        steps: [
          "User selects 'Cancel'.",
          "System dismisses confirmation dialog.",
          "Use Case resumes on Profile Screen."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Session Failure",
        steps: [
          "System fails to clear session data.",
          "System displays error message.",
          "System forces redirect to Login Screen.",
          "Use Case resumes at step 6."
        ]
      }
    ],
    postconditions: {
      success: "User session terminated; credentials required for re-access.",
      minimal: "System displays Login Screen."
    }
  },
  {
    id: "UC-2.1",
    name: "View Incident Dashboard with Unified Filters",
    actors: "BFP/LGU",
    description: "Allows BFP/LGU personnel to view, filter, and monitor all incoming Fire Incidents and Hazard Reports using a unified filter panel that persists across tabs.",
    trigger: "BFP/LGU user successfully logs in and selects Incidents tab.",
    preconditions: [
      "BFP/LGU user must be logged in.",
      "Reports must exist in system database."
    ],
    normalFlow: [
      "User logs into BFP/LGU Portal.",
      "System displays BFP Dashboard.",
      "User selects 'Incidents' tab from bottom navigation.",
      "System displays Incident Dashboard with key metrics (Total Alerts, Pending Alerts, Active Alerts), two tabs ('Fire Incidents' | 'Hazard Reports'), and Unified Filter Panel (Search bar, Date range filter, Location/Barangay filter, Severity filter).",
      "System defaults to 'Fire Incidents' tab view.",
      "User applies filters (e.g., selects specific barangay, date range).",
      "System updates incident list based on filters.",
      "User switches to 'Hazard Reports' tab.",
      "CRITICAL: System maintains filter panel in open state.",
      "CRITICAL: System preserves applied filter values.",
      "System displays hazard reports matching current filters.",
      "User can continue adjusting filters without closing panel.",
      "Filters apply to whichever tab is active.",
      "User selects an incident/report to view details.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Clear All Filters (Any step after step 6)",
        steps: [
          "User selects 'Clear Filters' button.",
          "System resets all filter values to defaults.",
          "System updates list to show all reports.",
          "Use Case resumes at step 13."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. No Active Alerts (At step 4)",
        steps: [
          "All counters show '0'.",
          "List displays 'No active incidents or reports'.",
          "Use Case resumes at step 14."
        ]
      }
    ],
    postconditions: {
      success: "BFP/LGU user accessed dashboard with persistent filtering capability across both incident and hazard views.",
      minimal: "User informed of current incident/hazard report status."
    }
  },
  {
    id: "UC-2.2",
    name: "Verify Report with AI Severity Analysis",
    actors: "BFP/LGU",
    description: "Allows BFP/LGU to review incoming hazard reports with AI-powered severity analysis and route appropriately. AI analysis occurs during BFP verification (not resident submission) for faster reporting.",
    trigger: "BFP/LGU user selects a pending hazard report from the dashboard.",
    preconditions: [
      "BFP/LGU user must be logged in.",
      "Hazard report must exist with status 'Pending Validation'."
    ],
    normalFlow: [
      "User views Hazard Reports list.",
      "User selects a pending report.",
      "System navigates to Hazard Report Details page.",
      "System triggers AI severity analysis: Analyzes report description, uploaded photo (if available), hazard type, location context.",
      "System displays AI Analysis Results: Severity Classification (Minor / Major), Confidence Score (0-100%), Reasoning (Brief explanation).",
      "System shows Smart Routing Recommendation: If Minor Severity → 'Route to Barangay Officials', If Major Severity → 'Route to BFP'.",
      "User reviews: Report details (location, description, photos), AI analysis, Reporter information.",
      "User can override AI recommendation if needed.",
      "User selects routing action: 'Route to Barangay Officials', 'Route to BFP', 'Mark as Resolved' (false alarm), 'Request More Information'.",
      "System updates report status.",
      "System sends notification to routed party.",
      "System may send update notification to original reporter.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Override AI Recommendation (At step 8)",
        steps: [
          "User disagrees with AI severity classification.",
          "User manually selects different severity level.",
          "System logs override for future AI training.",
          "Use Case resumes at step 9."
        ]
      },
      {
        name: "A2. Request More Information (At step 9)",
        steps: [
          "User determines report lacks sufficient detail.",
          "User selects 'Request More Information'.",
          "System sends notification to reporter requesting additional details/photos.",
          "Report status set to 'Pending Additional Info'.",
          "Use Case concludes."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. AI Analysis Failure (At step 4)",
        steps: [
          "AI service unavailable or encounters error.",
          "System displays message: 'AI analysis unavailable - manual review required'.",
          "System provides manual severity classification options.",
          "Use Case resumes at step 7 without AI recommendation."
        ]
      }
    ],
    postconditions: {
      success: "Report verified, routed appropriately based on AI analysis + human review; notifications sent.",
      minimal: "Report remains in pending state for future review."
    }
  },
  {
    id: "UC-2.3",
    name: "Send Alert to BFP",
    actors: "BFP/LGU",
    description: "Allows BFP/LGU user to officially dispatch incident to field units with optional resident notification.",
    trigger: "BFP/LGU user is viewing incident details and selects 'Send Alert to BFP'.",
    preconditions: [
      "User must be viewing a verified incident/report.",
      "Report has not been marked as Resolved or Rejected."
    ],
    normalFlow: [
      "User reviews incident details (Location, Type, Description, Photos).",
      "User selects 'Send Alert to BFP'.",
      "System forwards report details to BFP response team (via internal alert or external messaging).",
      "System updates report status from 'Pending' to 'Active' or 'Dispatched'.",
      "System optionally sends notification to resident: 'BFP On the way'.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Send Resident Notification (At step 5)",
        steps: [
          "User also selects 'Send Notification: BFP On the way'.",
          "System sends push notification to resident's app.",
          "Use Case resumes at step 6."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Network/System Error (At step 3)",
        steps: [
          "Forwarding fails due to network issue.",
          "System displays error message.",
          "System prompts user to call BFP Hotline as backup.",
          "Use Case terminates."
        ]
      }
    ],
    postconditions: {
      success: "Incident escalated to BFP field units for response.",
      minimal: "User prompted to use alternative communication means."
    }
  },
  {
    id: "UC-2.4",
    name: "View Reports History",
    actors: "BFP/LGU",
    description: "Allows BFP/LGU to access comprehensive archive of all fire incidents and hazard reports with advanced filtering.",
    trigger: "User selects 'Reports History' from Profile menu.",
    preconditions: [
      "BFP/LGU user must be logged in."
    ],
    normalFlow: [
      "User navigates to Profile tab.",
      "User selects 'Reports History'.",
      "System displays Reports History page.",
      "System shows tabbed interface: All Reports, Fire Incidents, Hazard Reports.",
      "System displays list with columns: Report ID, Type (Fire/Hazard), Date/Time, Location, Status (Pending/Verified/Resolved/Rejected), Severity.",
      "User can apply filters: Date range, Status, Severity, Location.",
      "User can search by keyword.",
      "User selects a report to view full details.",
      "System displays comprehensive report view.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Export Reports (At step 6)",
        steps: [
          "User selects 'Export' button.",
          "System generates CSV/PDF report.",
          "System downloads report file.",
          "Use Case resumes at step 8."
        ]
      }
    ],
    postconditions: {
      success: "User accessed historical report data with filtering capabilities.",
      minimal: "User viewed reports history page."
    }
  },
  {
    id: "UC-3.1",
    name: "Create User Accounts",
    actors: "System Administrator",
    description: "Allows admin to create new user accounts for BFP/LGU personnel with role assignment.",
    trigger: "Admin selects 'Create Account' from User Management page.",
    preconditions: [
      "Admin must be logged into Admin Dashboard.",
      "Admin has new user details (name, email, role)."
    ],
    normalFlow: [
      "Admin navigates to Users tab.",
      "Admin selects 'Create Account' button.",
      "System displays account creation form.",
      "Admin inputs required details: Full Name, Email Address, Role/Agency (BFP Officer / LGU Official / Barangay Official), Assigned Barangay (if applicable).",
      "System validates email uniqueness.",
      "Admin sets initial password or system auto-generates.",
      "Admin submits form.",
      "System creates user record in database.",
      "System displays confirmation: 'Account successfully created'.",
      "System optionally sends welcome email to new user.",
      "Use Case concludes."
    ],
    exceptions: [
      {
        name: "E1. Existing Email (At step 5)",
        steps: [
          "System detects email already registered.",
          "System displays error: 'Email already in use'.",
          "Use Case resumes at step 4."
        ]
      },
      {
        name: "E2. Validation Error (At step 5)",
        steps: [
          "System detects invalid email format or missing required field.",
          "System highlights errors.",
          "Use Case resumes at step 4."
        ]
      }
    ],
    postconditions: {
      success: "New official user account created and accessible.",
      minimal: "Admin notified of outcome."
    }
  },
  {
    id: "UC-3.2",
    name: "Monitor System Activity",
    actors: "System Administrator",
    description: "Allows admin to view real-time log of all major system actions with search and filter capabilities.",
    trigger: "Admin accesses Admin Dashboard or selects Activity tab.",
    preconditions: [
      "Admin must be logged into Admin Dashboard.",
      "System has recent activity to log."
    ],
    normalFlow: [
      "Admin selects Activity tab from bottom navigation.",
      "System displays System Activity page.",
      "System shows real-time activity log table with columns: Role (Resident / BFP / LGU / Admin), Activity (description), Status (Success / Failed / Pending), Time (timestamp).",
      "Admin can search activity log using search bar.",
      "Admin can filter by: Role, Status, Date range.",
      "System auto-refreshes log every 30 seconds.",
      "Admin reviews activity for monitoring purposes.",
      "Use Case concludes when admin navigates away."
    ],
    alternativeFlows: [
      {
        name: "A1. Search Activity Log (At step 4)",
        steps: [
          "Admin inputs search query (e.g., 'Resident Report').",
          "System filters table to show matching entries.",
          "Use Case resumes at step 7."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. System Log Error (At step 3)",
        steps: [
          "System fails to load activity data.",
          "System displays error: 'Could not retrieve activity logs'.",
          "Admin may attempt to refresh view.",
          "Use Case resumes at step 8."
        ]
      }
    ],
    postconditions: {
      success: "Admin reviewed activity log to ensure normal system operations.",
      minimal: "Admin attempted to view log."
    }
  },
  {
    id: "UC-3.3",
    name: "Backup and Secure Data",
    actors: "System Administrator",
    description: "Allows admin to initiate full data backup with status display and timestamp.",
    trigger: "Admin selects 'Initiate Full Backup' from Admin Dashboard.",
    preconditions: [
      "Admin must be logged into Admin Dashboard.",
      "System has functioning backup destination configured."
    ],
    normalFlow: [
      "Admin navigates to Dashboard home.",
      "Admin selects 'Initiate Full Backup' button.",
      "System initiates database and file backup to secure remote location.",
      "System displays backup status: 'Backup in progress...'",
      "System performs backup operation.",
      "Upon completion, system displays confirmation: 'Full Backup Done', Timestamp (e.g., '10:45 PM'), Data size.",
      "System logs backup event in activity log.",
      "Use Case concludes."
    ],
    alternativeFlows: [
      {
        name: "A1. Automated Backup (Scheduled)",
        steps: [
          "System automatically initiates backup based on schedule.",
          "Admin monitors process via dashboard activity log.",
          "Use Case resumes at step 7."
        ]
      }
    ],
    exceptions: [
      {
        name: "E1. Backup Destination Failure (At step 5)",
        steps: [
          "System fails to connect to backup destination.",
          "System displays error: 'Backup Failed: Destination Unreachable'.",
          "Admin prompted to check connection or retry.",
          "Use Case terminates."
        ]
      },
      {
        name: "E2. Insufficient Storage (At step 5)",
        steps: [
          "Backup destination has insufficient storage.",
          "System displays error: 'Backup Failed: Insufficient Storage'.",
          "Use Case terminates."
        ]
      }
    ],
    postconditions: {
      success: "Complete, secure, verifiable copy of system data stored in designated backup location.",
      minimal: "Admin informed of backup status."
    }
  }
];
