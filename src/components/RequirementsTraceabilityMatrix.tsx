import { X } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface RTMProps {
  onClose: () => void;
}

export function RequirementsTraceabilityMatrix({ onClose }: RTMProps) {
  const rtmData = [
    // Use Case 1: User Interface Layout
    {
      useCaseNo: '1',
      useCase: 'User Interface Layout',
      endUsers: 'Residents',
      startDate: '1-Oct-24',
      targetDate: '14-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '1.1',
      useCase: 'Application Logo',
      endUsers: 'Residents',
      startDate: '1-Oct-24',
      targetDate: '14-Oct-24',
      priority: 'Low',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '1.2',
      useCase: 'Login',
      endUsers: 'Resident, BFP, Barangay Officials, LGU',
      startDate: '1-Oct-24',
      targetDate: '14-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '1.3',
      useCase: 'Home Page',
      endUsers: 'Resident',
      startDate: '1-Oct-24',
      targetDate: '14-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '1.4',
      useCase: 'Fire Report Page',
      endUsers: 'Resident',
      startDate: '14-Oct-24',
      targetDate: '15-Oct-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '1.5',
      useCase: 'Navigational Buttons',
      endUsers: 'Resident',
      startDate: '15-Oct-24',
      targetDate: '18-Oct-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '1.6',
      useCase: 'View Fire Hazard Map',
      endUsers: 'Resident',
      startDate: '15-Oct-24',
      targetDate: '18-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: 'Include existing hazard map i.e. from Tibanga, Tambacan'
    },
    {
      useCaseNo: '1.7',
      useCase: 'Log Out',
      endUsers: 'Resident, BFP, Barangay Officials, LGU',
      startDate: '15-Oct-24',
      targetDate: '18-Oct-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '2',
      useCase: 'Receive Fire Alerts and Notifications',
      endUsers: 'Resident',
      startDate: '15-Oct-24',
      targetDate: '18-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '2.1',
      useCase: 'Report A Fire Incident Function',
      endUsers: 'Resident',
      startDate: '19-Oct-24',
      targetDate: '21-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '2.2',
      useCase: 'Alert Residents Notification',
      endUsers: 'BFP, Barangay Officials',
      startDate: '19-Oct-24',
      targetDate: '21-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '2.3',
      useCase: 'Hazardous Area Report Page',
      endUsers: 'Barangay Officials',
      startDate: '19-Oct-24',
      targetDate: '21-Oct-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: 'Mapping feature'
    },
    {
      useCaseNo: '2.4',
      useCase: 'Public Fire Safety Information Page',
      endUsers: 'LGU',
      startDate: '19-Oct-24',
      targetDate: '21-Oct-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '3',
      useCase: 'Manage User Accounts and Access Levels',
      endUsers: 'System Administrator',
      startDate: '22-Oct-24',
      targetDate: '26-Oct-24',
      priority: 'Normal',
      status: 'Incomplete',
      assignedDeveloper: 'Jhen',
      comments: 'BFP as system admin'
    },
    {
      useCaseNo: '3.1',
      useCase: 'Monitor System Activity',
      endUsers: 'System Administrator',
      startDate: '22-Oct-24',
      targetDate: '26-Oct-24',
      priority: 'Low',
      status: 'Incomplete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '3.2',
      useCase: 'Maintain System Database',
      endUsers: 'System Administrator',
      startDate: '22-Oct-24',
      targetDate: '26-Oct-24',
      priority: 'Normal',
      status: 'Incomplete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '3.3',
      useCase: 'Backup and Secure Data',
      endUsers: 'System Administrator',
      startDate: '22-Oct-24',
      targetDate: '26-Oct-24',
      priority: 'Normal',
      status: 'Incomplete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '4',
      useCase: 'Interactive Fire Hazard Mapping',
      endUsers: 'Resident, BFP',
      startDate: '27-Oct-24',
      targetDate: '2-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: 'Real-time map updates'
    },
    {
      useCaseNo: '4.1',
      useCase: 'Display Hazard Markers',
      endUsers: 'Resident, BFP',
      startDate: '27-Oct-24',
      targetDate: '2-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: 'Color-coded severity levels'
    },
    {
      useCaseNo: '4.2',
      useCase: 'Show Evacuation Routes',
      endUsers: 'Resident',
      startDate: '27-Oct-24',
      targetDate: '2-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '4.3',
      useCase: 'Mark Safe Zones',
      endUsers: 'Resident',
      startDate: '27-Oct-24',
      targetDate: '2-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: 'Evacuation centers'
    },
    {
      useCaseNo: '5',
      useCase: 'BFP Report Verification',
      endUsers: 'BFP Officers',
      startDate: '3-Nov-24',
      targetDate: '8-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '5.1',
      useCase: 'AI Severity Analysis',
      endUsers: 'BFP Officers',
      startDate: '3-Nov-24',
      targetDate: '8-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: 'Auto-classify Minor/Major hazards'
    },
    {
      useCaseNo: '5.2',
      useCase: 'Smart Routing Logic',
      endUsers: 'BFP Officers',
      startDate: '3-Nov-24',
      targetDate: '8-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: 'Route to Barangay or BFP based on severity'
    },
    {
      useCaseNo: '5.3',
      useCase: 'Update Report Status',
      endUsers: 'BFP Officers',
      startDate: '3-Nov-24',
      targetDate: '8-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: 'Pending, In Progress, Resolved'
    },
    {
      useCaseNo: '6',
      useCase: 'Incident Dashboard',
      endUsers: 'BFP Officers',
      startDate: '9-Nov-24',
      targetDate: '15-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '6.1',
      useCase: 'View Reports History',
      endUsers: 'BFP Officers',
      startDate: '9-Nov-24',
      targetDate: '15-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: 'Filter and search functionality'
    },
    {
      useCaseNo: '6.2',
      useCase: 'View Report Details',
      endUsers: 'BFP Officers',
      startDate: '9-Nov-24',
      targetDate: '15-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
    {
      useCaseNo: '7',
      useCase: 'User Profile Management',
      endUsers: 'Resident, BFP, Admin',
      startDate: '16-Nov-24',
      targetDate: '20-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '7.1',
      useCase: 'Edit Profile Information',
      endUsers: 'Resident, BFP, Admin',
      startDate: '16-Nov-24',
      targetDate: '20-Nov-24',
      priority: 'Normal',
      status: 'Complete',
      assignedDeveloper: 'Jhen',
      comments: ''
    },
    {
      useCaseNo: '7.2',
      useCase: 'Notification Settings',
      endUsers: 'Resident, BFP, Admin',
      startDate: '16-Nov-24',
      targetDate: '20-Nov-24',
      priority: 'Low',
      status: 'Complete',
      assignedDeveloper: 'Sweet',
      comments: ''
    },
    {
      useCaseNo: '7.3',
      useCase: 'Privacy and Security Controls',
      endUsers: 'Resident, BFP, Admin',
      startDate: '16-Nov-24',
      targetDate: '20-Nov-24',
      priority: 'High',
      status: 'Complete',
      assignedDeveloper: 'Rv',
      comments: ''
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[95vw] h-[95vh] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 z-10"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="p-6 border-b">
          <div className="text-center">
            <h1 className="text-xl mb-1" style={{ fontWeight: 600 }}>
              SIKLAB: A Web-based Fire Hazard Mapping and Awareness System
            </h1>
            <h2 className="text-2xl" style={{ fontWeight: 700 }}>
              Requirements Traceability Matrix
            </h2>
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="flex-1 p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#D6DCE5' }}>
                  <th className="border border-gray-400 p-2 text-center" style={{ minWidth: '100px', fontWeight: 600 }}>
                    Use case no.
                  </th>
                  <th className="border border-gray-400 p-2 text-left" style={{ minWidth: '280px', fontWeight: 600 }}>
                    Use case
                  </th>
                  <th className="border border-gray-400 p-2 text-left" style={{ minWidth: '180px', fontWeight: 600 }}>
                    End-users
                  </th>
                  <th className="border border-gray-400 p-2 text-center" style={{ minWidth: '100px', fontWeight: 600 }}>
                    Start date
                  </th>
                  <th className="border border-gray-400 p-2 text-center" style={{ minWidth: '100px', fontWeight: 600 }}>
                    Target date
                  </th>
                  <th className="border border-gray-400 p-2 text-center" style={{ minWidth: '80px', fontWeight: 600 }}>
                    Priority
                  </th>
                  <th className="border border-gray-400 p-2 text-center" style={{ minWidth: '120px', fontWeight: 600 }}>
                    Status
                  </th>
                  <th className="border border-gray-400 p-2 text-left" style={{ minWidth: '150px', fontWeight: 600 }}>
                    Assigned developer
                  </th>
                  <th className="border border-gray-400 p-2 text-left" style={{ minWidth: '200px', fontWeight: 600 }}>
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {rtmData.map((item, index) => (
                  <tr key={item.useCaseNo}>
                    <td className="border border-gray-400 p-2 text-center">{item.useCaseNo}</td>
                    <td className="border border-gray-400 p-2">{item.useCase}</td>
                    <td className="border border-gray-400 p-2">{item.endUsers}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.startDate}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.targetDate}</td>
                    <td 
                      className="border border-gray-400 p-2 text-center"
                      style={{
                        backgroundColor: item.priority === 'Normal' ? '#FFF2CC' : 'transparent'
                      }}
                    >
                      {item.priority}
                    </td>
                    <td 
                      className="border border-gray-400 p-2 text-center"
                      style={{
                        backgroundColor: item.status === 'Complete' ? '#C6E0B4' : 
                                       item.status === 'Incomplete' ? '#F8CBAD' : 
                                       item.status === 'No progress' ? '#FFC7CE' : 'transparent'
                      }}
                    >
                      {item.status}
                    </td>
                    <td className="border border-gray-400 p-2">{item.assignedDeveloper}</td>
                    <td className="border border-gray-400 p-2">{item.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-8 flex gap-12">
            <div>
              <div className="mb-3" style={{ fontWeight: 600 }}>Status Legend:</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-32 h-7 flex items-center justify-center border border-gray-400" style={{ backgroundColor: '#C6E0B4', fontSize: '13px' }}>
                    Complete
                  </div>
                  <span className="text-sm text-gray-600">Use case fully implemented</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-7 flex items-center justify-center border border-gray-400" style={{ backgroundColor: '#F8CBAD', fontSize: '13px' }}>
                    Incomplete
                  </div>
                  <span className="text-sm text-gray-600">Use case in progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-7 flex items-center justify-center border border-gray-400" style={{ backgroundColor: '#FFC7CE', fontSize: '13px' }}>
                    No progress
                  </div>
                  <span className="text-sm text-gray-600">Use case not started</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-3" style={{ fontWeight: 600 }}>Priority Legend:</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-7 flex items-center justify-center border border-gray-400 text-sm">
                    High
                  </div>
                  <span className="text-sm text-gray-600">Critical functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-7 flex items-center justify-center border border-gray-400 text-sm" style={{ backgroundColor: '#FFF2CC' }}>
                    Normal
                  </div>
                  <span className="text-sm text-gray-600">Standard functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-7 flex items-center justify-center border border-gray-400 text-sm">
                    Low
                  </div>
                  <span className="text-sm text-gray-600">Optional enhancement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-2xl mb-1" style={{ fontWeight: 700, color: '#2C5F2D' }}>{rtmData.length}</div>
                <div className="text-sm text-gray-600">Total Use Cases</div>
              </div>
              <div>
                <div className="text-2xl mb-1" style={{ fontWeight: 700, color: '#2C5F2D' }}>
                  {rtmData.filter(r => r.status === 'Complete').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl mb-1" style={{ fontWeight: 700, color: '#C65911' }}>
                  {rtmData.filter(r => r.status === 'Incomplete').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl mb-1" style={{ fontWeight: 700, color: '#2C5F2D' }}>
                  {Math.round((rtmData.filter(r => r.status === 'Complete').length / rtmData.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}