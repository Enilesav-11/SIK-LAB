import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';

interface UseCaseSpecificationsProps {
  onClose: () => void;
}

interface UseCase {
  id: string;
  name: string;
  actors: string;
  description: string;
  trigger: string;
  preconditions: string[];
  normalFlow: string[];
  alternativeFlows?: string[];
  exceptions: string[];
  postconditions: string[];
}

export function UseCaseSpecifications({ onClose }: UseCaseSpecificationsProps) {
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);

  const toggleUseCase = (id: string) => {
    setExpandedUseCase(expandedUseCase === id ? null : id);
  };

  const useCases: UseCase[] = [
    // Use Case 1: User Interface Creation
    {
      id: '1',
      name: 'User Interface Creation',
      actors: 'System Administrator, Development Team',
      description: 'Establishes the foundational user interface architecture and design system for the SIKLAB platform, ensuring consistent visual language and user experience across all modules.',
      trigger: 'System deployment initiation or major UI redesign requirement',
      preconditions: [
        'Design specifications and wireframes are approved',
        'Development environment is configured',
        'UI component library is available'
      ],
      normalFlow: [
        'Development team reviews approved design specifications',
        'Core UI framework and component library are initialized',
        'Base layout templates are created for different user roles',
        'Navigation structure is implemented',
        'Responsive design breakpoints are configured',
        'Theme and styling system is applied',
        'UI components are tested across different devices',
        'Interface is deployed to staging environment'
      ],
      exceptions: [
        'Design specifications are incomplete → Request clarification from design team',
        'Component library conflicts arise → Resolve dependencies or select alternative components',
        'Responsive design fails on specific devices → Adjust breakpoints and test again'
      ],
      postconditions: [
        'User interface framework is operational',
        'All role-based layouts are accessible',
        'UI passes responsive design testing',
        'Interface is ready for feature integration'
      ]
    },
    {
      id: '1.1',
      name: 'Access Web Application',
      actors: 'Residents',
      description: 'Allows residents to access the SIKLAB web application through a browser, providing the entry point to the fire hazard mapping and awareness system.',
      trigger: 'Resident navigates to the SIKLAB web application URL',
      preconditions: [
        'Web application is deployed and accessible',
        'Resident has internet connectivity',
        'Browser is compatible with the application'
      ],
      normalFlow: [
        'Resident opens web browser',
        'Resident enters SIKLAB application URL or clicks bookmark',
        'Browser sends request to application server',
        'Server responds with landing page',
        'Application splash screen or landing page is displayed',
        'Navigation options (Login, Get Started, About) are presented'
      ],
      alternativeFlows: [
        'If resident is already logged in, redirect to dashboard instead of landing page'
      ],
      exceptions: [
        'Server is unreachable → Display connection error message with retry option',
        'Browser is incompatible → Show browser compatibility warning with recommendations',
        'Application is under maintenance → Display maintenance page with estimated completion time'
      ],
      postconditions: [
        'Landing page is successfully loaded',
        'Resident can proceed to login or registration',
        'Application session is initialized'
      ]
    },
    {
      id: '1.2',
      name: 'Login',
      actors: 'Resident, BFP Officer, Barangay Officials, LGU Personnel',
      description: 'Authenticates users and grants role-based access to the SIKLAB system based on credentials.',
      trigger: 'User clicks Login button on landing page or attempts to access protected resource',
      preconditions: [
        'User has registered account with valid credentials',
        'Authentication service is operational',
        'User is on the login page'
      ],
      normalFlow: [
        'System displays login form with email and password fields',
        'User enters registered email address',
        'User enters password',
        'User clicks "Login" button',
        'System validates credentials against database',
        'System verifies user account is active',
        'System creates authenticated session',
        'System identifies user role (Resident/BFP/Barangay/LGU)',
        'System redirects user to role-appropriate dashboard'
      ],
      alternativeFlows: [
        'User selects "Remember Me" option → System stores encrypted session token for auto-login',
        'User clicks "Forgot Password" → System initiates password recovery flow'
      ],
      exceptions: [
        'Invalid credentials → Display error message "Invalid email or password" and clear password field',
        'Account is inactive or suspended → Display "Account inactive. Contact administrator" message',
        'Too many failed login attempts → Lock account temporarily and notify user',
        'Authentication service unavailable → Display "Unable to authenticate. Please try again later"'
      ],
      postconditions: [
        'User is authenticated and session is established',
        'User is redirected to appropriate dashboard based on role',
        'Login activity is logged in system audit trail',
        'Session timeout timer is initiated'
      ]
    },
    {
      id: '1.3',
      name: 'Home Page',
      actors: 'Resident',
      description: 'Displays the main dashboard for residents, providing quick access to fire safety information, recent alerts, hazard reporting, and emergency resources.',
      trigger: 'Resident successfully logs in or clicks Home navigation button',
      preconditions: [
        'Resident is authenticated',
        'Session is active',
        'Home page components are loaded'
      ],
      normalFlow: [
        'System retrieves resident profile data',
        'System loads recent fire alerts for resident\'s barangay',
        'System displays quick action buttons (Report Hazard, View Map, Emergency)',
        'System shows recent activity feed',
        'System displays fire safety tips carousel',
        'System loads nearby hazard statistics',
        'System renders navigation menu with all resident features',
        'Page is fully rendered and interactive'
      ],
      exceptions: [
        'Profile data unavailable → Display default view with limited personalization',
        'Alert service timeout → Show cached alerts with "Last updated" timestamp',
        'Network interruption → Display offline mode indicator and cached content'
      ],
      postconditions: [
        'Home page is displayed with all sections loaded',
        'Resident can navigate to any feature via menu or quick actions',
        'Real-time alert subscription is active',
        'Page state is maintained in session'
      ]
    },
    {
      id: '1.4',
      name: 'Fire Report Page (Dual Mode)',
      actors: 'Resident',
      description: 'Provides residents with two distinct reporting modes: Fire Incident Reporting for active emergencies and Hazard Reporting for potential fire risks.',
      trigger: 'Resident selects "Report" from navigation menu or clicks "Report Hazard/Incident" button',
      preconditions: [
        'Resident is authenticated',
        'Location services are available (optional but recommended)',
        'Camera/photo upload capability is functional'
      ],
      normalFlow: [
        'System displays report mode selection screen',
        'System presents two options: "Report Active Fire Incident" (red, urgent) and "Report Fire Hazard" (orange, preventive)',
        'Resident selects appropriate reporting mode',
        'System loads corresponding report form based on selection',
        'System displays mode-specific instructions and required fields',
        'Resident is ready to fill out report details'
      ],
      alternativeFlows: [
        'System can auto-detect emergency context and pre-select Incident mode',
        'Resident can switch between modes before submission'
      ],
      exceptions: [
        'Form fails to load → Display error and provide "Try Again" option',
        'Location services denied → Proceed with manual location entry'
      ],
      postconditions: [
        'Appropriate report form is displayed',
        'Form is ready for data entry',
        'Help text and validation rules are active'
      ]
    },
    {
      id: '1.5',
      name: 'Navigational Buttons',
      actors: 'Resident',
      description: 'Provides intuitive navigation controls allowing residents to move between different sections of the application seamlessly.',
      trigger: 'Resident interacts with navigation menu or navigation buttons',
      preconditions: [
        'Resident is logged in',
        'Navigation components are rendered',
        'Current page is loaded'
      ],
      normalFlow: [
        'System displays navigation bar/menu with all available sections',
        'System highlights current active section',
        'Resident clicks on navigation button/link',
        'System validates navigation target is accessible to resident role',
        'System saves current page state if needed',
        'System navigates to target page',
        'System updates navigation highlight to new active section',
        'Target page content is loaded and displayed'
      ],
      alternativeFlows: [
        'Back button navigation → Return to previous page in history stack',
        'Breadcrumb navigation → Jump to specific level in navigation hierarchy'
      ],
      exceptions: [
        'Target page requires unsaved data → Prompt "Save changes before leaving?"',
        'Navigation target is temporarily unavailable → Display notification and stay on current page',
        'Session expired during navigation → Redirect to login with return URL'
      ],
      postconditions: [
        'User is on the intended target page',
        'Navigation state is updated',
        'Page transition is complete',
        'All navigation controls remain accessible'
      ]
    },
    {
      id: '1.6',
      name: 'View Fire Hazard Map',
      actors: 'Resident',
      description: 'Displays an interactive map showing fire hazards, incidents, evacuation routes, and safe zones across Iligan City, with focus on specific barangays like Tibanga and Tambacan.',
      trigger: 'Resident clicks "Map" navigation button or "View Map" quick action',
      preconditions: [
        'Resident is authenticated',
        'Map service (e.g., Leaflet) is initialized',
        'Hazard and incident data is available',
        'User location permission is granted (optional)'
      ],
      normalFlow: [
        'System loads interactive map component',
        'System retrieves current hazard and incident markers from database',
        'System plots color-coded hazard markers (red=high, orange=medium, yellow=low)',
        'System displays evacuation routes as highlighted paths',
        'System marks safe zones and evacuation centers with icons',
        'System centers map on resident\'s barangay or current location',
        'System enables map controls (zoom, pan, marker selection)',
        'Resident can click markers to view hazard/incident details',
        'System updates map in real-time as new incidents are reported'
      ],
      alternativeFlows: [
        'Resident can filter markers by hazard type, severity, or date range',
        'Resident can search for specific barangay or location',
        'Resident can toggle layers (hazards, incidents, routes, safe zones)'
      ],
      exceptions: [
        'Map service fails to load → Display static map image with basic markers',
        'No hazards in area → Display message "No active hazards in this area"',
        'Location services denied → Center map on default city view',
        'Network interruption → Display cached map data with "offline mode" indicator'
      ],
      postconditions: [
        'Interactive map is displayed with all current data',
        'Resident can interact with markers and view details',
        'Map controls are functional',
        'Real-time updates are subscribed'
      ]
    },
    {
      id: '1.7',
      name: 'Log Out',
      actors: 'Resident, BFP Officer, LGU Personnel, Admin',
      description: 'Terminates the user session securely and returns the user to the landing page.',
      trigger: 'User clicks "Logout" button in settings or profile menu',
      preconditions: [
        'User is currently logged in with active session',
        'User is on any authenticated page'
      ],
      normalFlow: [
        'User clicks "Logout" option from menu',
        'System displays confirmation dialog "Are you sure you want to log out?"',
        'User confirms logout',
        'System invalidates current session token',
        'System clears all session data and cookies',
        'System logs the logout event in audit trail',
        'System redirects user to landing/login page',
        'System displays "You have been logged out successfully" message'
      ],
      alternativeFlows: [
        'User cancels logout → Remain on current page with session intact',
        'Auto-logout due to inactivity → Skip confirmation and redirect immediately'
      ],
      exceptions: [
        'Network error during logout → Clear session locally and redirect anyway',
        'Session already expired → Redirect to login without error message'
      ],
      postconditions: [
        'User session is terminated',
        'Authentication token is invalidated',
        'User is on landing page',
        'No authenticated resources are accessible',
        'Logout event is recorded'
      ]
    },
    {
      id: '2',
      name: 'BFP/LGU Dashboard',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Provides a comprehensive command center for BFP officers and LGU personnel to monitor, manage, and respond to fire incidents and hazards across Iligan City.',
      trigger: 'BFP officer or LGU personnel logs in successfully',
      preconditions: [
        'User has BFP or LGU role assignment',
        'User is authenticated',
        'Dashboard services are operational'
      ],
      normalFlow: [
        'System identifies user as BFP/LGU personnel',
        'System loads dashboard with real-time incident overview',
        'System displays key metrics: active incidents, pending reports, response times',
        'System shows priority alerts and notifications',
        'System renders incident map with all active cases',
        'System displays quick access panels: Verify Reports, Manage Incidents, History',
        'System loads recent activity timeline',
        'Dashboard auto-refreshes with live updates'
      ],
      exceptions: [
        'High alert count → Display urgent notification banner',
        'Data service timeout → Show cached data with refresh option',
        'No active incidents → Display "No active incidents" with historical summary'
      ],
      postconditions: [
        'Dashboard is fully loaded with real-time data',
        'BFP/LGU user can access all management functions',
        'Notifications are active',
        'Auto-refresh is enabled'
      ]
    },
    {
      id: '2.1',
      name: 'BFP Dashboard Home',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Central hub displaying critical incident statistics, active cases, pending verifications, and operational metrics for fire response management.',
      trigger: 'BFP/LGU user navigates to Dashboard Home or logs in',
      preconditions: [
        'User has BFP/LGU access rights',
        'User is authenticated',
        'Dashboard data is accessible'
      ],
      normalFlow: [
        'System loads dashboard home view',
        'System displays incident statistics cards (Active, Pending, Resolved, Total)',
        'System shows severity distribution chart',
        'System lists recent incident reports with status',
        'System displays map overview with incident clusters',
        'System shows response team availability',
        'System highlights urgent actions required',
        'System provides quick links to common tasks'
      ],
      exceptions: [
        'Statistics service unavailable → Display "Data temporarily unavailable"',
        'No recent activity → Display historical trends instead'
      ],
      postconditions: [
        'Dashboard home is displayed with current data',
        'User has overview of operational status',
        'Quick actions are accessible'
      ]
    },
    {
      id: '2.2',
      name: 'Unified Incident Dashboard',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Consolidates all incident reports (both fire incidents and hazards) into a single, comprehensive management interface with filtering, sorting, and detailed views.',
      trigger: 'BFP/LGU user clicks "Incidents" or "Unified Dashboard" navigation option',
      preconditions: [
        'User is authenticated as BFP/LGU personnel',
        'Incident data is available',
        'Dashboard interface is loaded'
      ],
      normalFlow: [
        'System displays unified incident dashboard',
        'System lists all incidents in table/card view with key details',
        'System shows filter options (status, severity, type, date, barangay)',
        'System provides sort capabilities (date, priority, status)',
        'User can apply filters to narrow down incident list',
        'System updates view based on filter selections',
        'User can click on any incident to view full details',
        'System displays real-time status updates as incidents change'
      ],
      alternativeFlows: [
        'User can switch between list view and map view',
        'User can export filtered incident list to CSV/PDF',
        'User can bulk-assign incidents to response teams'
      ],
      exceptions: [
        'No incidents match filters → Display "No incidents found" with option to clear filters',
        'Database query timeout → Display cached results with "Refresh" option',
        'Too many results → Paginate and warn user to apply filters'
      ],
      postconditions: [
        'Unified incident list is displayed',
        'Filters and sort options are functional',
        'User can navigate to individual incident details',
        'Real-time updates are active'
      ]
    },
    {
      id: '2.3',
      name: 'AI-Powered Report Verification',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Utilizes artificial intelligence to automatically analyze submitted hazard reports, classify severity as Minor or Major, calculate confidence scores, and assist BFP officers in verification decisions.',
      trigger: 'New hazard report is submitted by resident and enters verification queue, or BFP officer opens report for verification',
      preconditions: [
        'Hazard report has been submitted with photos and description',
        'AI analysis service is operational',
        'BFP officer is viewing report details',
        'Report status is "Pending Verification"'
      ],
      normalFlow: [
        'System receives new hazard report in verification queue',
        'AI service analyzes uploaded photos using computer vision',
        'AI evaluates hazard description using natural language processing',
        'AI considers location and historical data',
        'AI generates severity classification (Minor/Major)',
        'AI calculates confidence score (0-100%)',
        'System displays report to BFP officer with AI recommendations',
        'System shows AI classification badge and confidence percentage',
        'System highlights key factors influencing AI decision',
        'BFP officer reviews AI analysis and supporting evidence',
        'BFP officer can accept, modify, or override AI classification',
        'BFP officer confirms final classification and submits decision'
      ],
      alternativeFlows: [
        'If confidence score is below 60% → Flag for manual review priority',
        'If AI detects critical emergency indicators → Auto-escalate to BFP immediately',
        'BFP officer can request re-analysis with different parameters'
      ],
      exceptions: [
        'AI service unavailable → Proceed with manual verification only',
        'Photos are unclear or missing → AI returns low confidence, prompts officer to request better photos',
        'AI classification conflicts with officer assessment → Officer override is logged with reasoning',
        'Analysis timeout → Notify officer and retry or proceed manually'
      ],
      postconditions: [
        'Report has verified severity classification (Minor/Major)',
        'AI analysis results are stored with report',
        'Confidence score is recorded',
        'BFP officer decision (accept/modify/override) is logged',
        'Report is ready for smart routing'
      ]
    },
    {
      id: '2.4',
      name: 'Smart Routing Logic',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Automatically routes verified hazard reports to appropriate authorities based on AI-determined severity: Minor hazards to Barangay Officials, Major hazards to BFP for immediate action.',
      trigger: 'BFP officer completes report verification and confirms classification',
      preconditions: [
        'Report has been verified with confirmed severity classification',
        'AI analysis (if used) is complete',
        'Routing rules are configured in system',
        'Target recipient groups (Barangay/BFP) are defined'
      ],
      normalFlow: [
        'System receives verified report with severity classification',
        'System evaluates classification: Minor or Major',
        'If Minor: System identifies relevant Barangay Official based on report location',
        'If Major: System assigns to BFP response team',
        'System creates task/ticket in recipient\'s queue',
        'System sends notification to assigned recipient',
        'System updates report status to "Assigned - Pending Action"',
        'System logs routing decision with timestamp and reasoning',
        'System monitors for acknowledgment from recipient'
      ],
      alternativeFlows: [
        'If Major hazard in high-risk area → Route to both BFP and Barangay for coordination',
        'If Minor hazard is not acknowledged within 24 hours → Escalate to BFP',
        'Officer can manually override routing destination before final confirmation'
      ],
      exceptions: [
        'No Barangay Official assigned for location → Default to LGU general queue',
        'BFP team at capacity → Queue for next available team and notify supervisor',
        'Notification delivery fails → Retry up to 3 times, then log as delivery failure and alert admin',
        'Invalid routing destination → Revert to manual assignment mode'
      ],
      postconditions: [
        'Report is assigned to appropriate authority',
        'Recipient receives notification with report details',
        'Report status is updated to reflect assignment',
        'Routing decision is logged in audit trail',
        'Escalation timer is set for follow-up if needed'
      ]
    },
    {
      id: '2.5',
      name: 'Hazard Reports Management',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Enables BFP and LGU personnel to view, manage, update, and track all hazard reports from submission through resolution.',
      trigger: 'BFP/LGU user navigates to Hazard Reports section',
      preconditions: [
        'User has BFP/LGU access rights',
        'User is authenticated',
        'Hazard reports exist in system'
      ],
      normalFlow: [
        'System displays hazard reports management interface',
        'System lists all hazard reports with summary information',
        'System shows status indicators (Pending, Verified, Assigned, In Progress, Resolved)',
        'User can filter by status, severity, location, date range',
        'User can search by report ID or description keywords',
        'User selects a report to view full details',
        'System displays complete report information including photos, location, AI analysis',
        'User can update report status',
        'User can add notes or comments',
        'User can assign/reassign to different personnel',
        'System saves changes and updates report timeline'
      ],
      alternativeFlows: [
        'User can bulk-update status for multiple reports',
        'User can generate reports summary for specific date range or area',
        'User can flag report for supervisor review'
      ],
      exceptions: [
        'Report update conflicts with another user\'s changes → Display conflict resolution dialog',
        'Required fields missing for status change → Validate and prompt for completion',
        'Network error during save → Cache changes and retry when connection restored'
      ],
      postconditions: [
        'Report management interface is displayed',
        'User can view and modify reports as authorized',
        'All changes are logged with timestamp and user',
        'Affected parties receive notifications of changes'
      ]
    },
    {
      id: '2.6',
      name: 'Reports History Archive',
      actors: 'BFP Officers, LGU Personnel',
      description: 'Provides access to comprehensive archive of all historical reports for analysis, auditing, and trend identification.',
      trigger: 'BFP/LGU user navigates to Reports History or Archive section',
      preconditions: [
        'User has BFP/LGU access rights',
        'Historical report data is available',
        'Archive system is operational'
      ],
      normalFlow: [
        'System loads reports history interface',
        'System displays archived reports with search and filter capabilities',
        'User can filter by date range, location, type, severity',
        'System presents results in chronological or relevance order',
        'User can view read-only details of archived reports',
        'System displays resolution notes and outcomes',
        'User can export archive data for analysis',
        'System shows statistics and trends based on historical data'
      ],
      alternativeFlows: [
        'User can generate custom reports from archived data',
        'User can compare current patterns with historical trends',
        'User can restore archived report to active if needed'
      ],
      exceptions: [
        'Archive database slow → Display loading indicator and paginate results',
        'No results found → Display "No matching records" with filter suggestions',
        'Export size too large → Prompt to narrow filters or split export'
      ],
      postconditions: [
        'Historical reports are accessible and searchable',
        'User can analyze past incidents and patterns',
        'Archive integrity is maintained',
        'Access is logged for audit purposes'
      ]
    },
    {
      id: '3',
      name: 'Admin Panel',
      actors: 'System Administrator',
      description: 'Provides comprehensive system administration interface for managing users, monitoring system health, and maintaining data integrity.',
      trigger: 'Administrator logs in with admin credentials',
      preconditions: [
        'User has Administrator role',
        'User is authenticated',
        'Admin panel is accessible'
      ],
      normalFlow: [
        'System verifies administrator role',
        'System loads admin panel dashboard',
        'System displays system health metrics',
        'System shows user management quick access',
        'System presents system activity monitors',
        'System displays backup and maintenance controls',
        'Administrator can navigate to specific admin functions',
        'All administrative tools are available'
      ],
      exceptions: [
        'Critical system alert → Display prominent warning banner',
        'Admin privileges insufficient for requested action → Display permission denied',
        'System maintenance mode → Restrict certain admin functions'
      ],
      postconditions: [
        'Admin panel is loaded and functional',
        'Administrator has access to all management tools',
        'System monitoring is active',
        'Admin actions are logged'
      ]
    },
    {
      id: '3.1',
      name: 'User Management Interface',
      actors: 'System Administrator',
      description: 'Allows administrators to create, view, edit, deactivate user accounts, assign roles, and manage access permissions across the SIKLAB system.',
      trigger: 'Administrator navigates to User Management section',
      preconditions: [
        'Administrator is authenticated',
        'Administrator has user management permissions',
        'User database is accessible'
      ],
      normalFlow: [
        'System displays user management interface',
        'System lists all user accounts with key information (name, email, role, status)',
        'Administrator can search/filter users by role, status, barangay',
        'Administrator selects "Add New User" to create account',
        'System displays user creation form',
        'Administrator enters user details (name, email, role, contact, barangay)',
        'System validates input data',
        'Administrator assigns role (Resident/BFP/Barangay/LGU/Admin)',
        'System creates user account and generates temporary password',
        'System sends activation email to new user',
        'Administrator can edit existing users by clicking on user row',
        'Administrator can deactivate/activate user accounts',
        'Administrator can reset user passwords',
        'System logs all user management actions'
      ],
      alternativeFlows: [
        'Administrator can bulk-import users from CSV file',
        'Administrator can export user list for reporting',
        'Administrator can assign multiple roles to a user'
      ],
      exceptions: [
        'Email already exists → Display "Email already registered" error',
        'Invalid email format → Validate and highlight field',
        'Required fields missing → Prevent submission and highlight errors',
        'Email service unavailable → Create account but warn activation email not sent',
        'Attempting to deactivate own admin account → Prevent and display warning'
      ],
      postconditions: [
        'User accounts are created/modified as requested',
        'New users receive activation emails',
        'All changes are logged in audit trail',
        'User list is updated to reflect changes',
        'Role-based access is enforced immediately'
      ]
    },
    {
      id: '3.2',
      name: 'System Activity Monitor',
      actors: 'System Administrator',
      description: 'Provides real-time and historical monitoring of system activities, user actions, and system events for security and operational oversight.',
      trigger: 'Administrator navigates to System Activity Monitor section',
      preconditions: [
        'Administrator is authenticated',
        'Activity logging service is operational',
        'Audit log database is accessible'
      ],
      normalFlow: [
        'System loads activity monitor interface',
        'System displays real-time activity feed',
        'System shows activity categories: User Actions, System Events, Security Events',
        'Administrator can filter by activity type, user, date range, severity',
        'System displays activity details: timestamp, user, action, resource, result',
        'Administrator can drill down into specific activity for full details',
        'System highlights suspicious or error activities',
        'Administrator can search activity logs by keyword',
        'System provides activity analytics and charts',
        'Administrator can export activity logs for external analysis'
      ],
      alternativeFlows: [
        'Administrator can set up alerts for specific activity patterns',
        'Administrator can bookmark frequently monitored activities',
        'Administrator can compare activity across date ranges'
      ],
      exceptions: [
        'Log volume is high → Implement pagination and performance optimization',
        'No activity found for filters → Display "No matching activity"',
        'Log database slow to respond → Show loading indicator and suggest narrower filters',
        'Export size exceeds limit → Prompt to narrow date range'
      ],
      postconditions: [
        'Activity monitoring interface is functional',
        'Administrator can track system and user activities',
        'Suspicious activities are flagged for review',
        'Activity data is available for audit and compliance'
      ]
    },
    {
      id: '3.3',
      name: 'Data Backup System',
      actors: 'System Administrator',
      description: 'Manages automated and manual database backups, ensures data integrity, and enables system recovery in case of data loss.',
      trigger: 'Scheduled backup time reached, or Administrator initiates manual backup',
      preconditions: [
        'Backup service is operational',
        'Sufficient storage space is available',
        'Database is accessible',
        'Administrator has backup permissions (for manual trigger)'
      ],
      normalFlow: [
        'Administrator navigates to Data Backup section',
        'System displays current backup status and schedule',
        'System shows list of existing backups with dates and sizes',
        'Administrator can view backup configuration (frequency, retention)',
        'Administrator clicks "Create Backup Now" for manual backup',
        'System displays confirmation dialog with estimated time',
        'Administrator confirms backup initiation',
        'System begins database backup process',
        'System creates compressed backup file',
        'System verifies backup integrity',
        'System stores backup in secure location (local/cloud)',
        'System updates backup log with completion status',
        'System notifies administrator of successful backup',
        'System displays updated backup list'
      ],
      alternativeFlows: [
        'Administrator can restore from a previous backup',
        'Administrator can download backup file for offline storage',
        'Administrator can configure automated backup schedule',
        'Administrator can test backup integrity without restoration'
      ],
      exceptions: [
        'Insufficient storage space → Display error and suggest cleanup or storage expansion',
        'Database is locked or busy → Queue backup for next available window',
        'Backup fails integrity check → Retry backup and alert administrator',
        'Network error during cloud upload → Save locally and retry upload',
        'Restoration requested on wrong environment → Require additional confirmation with warnings'
      ],
      postconditions: [
        'Backup is created and stored securely',
        'Backup integrity is verified',
        'Backup log is updated',
        'Administrator is notified of backup status',
        'System can be restored from backup if needed'
      ]
    },
    {
      id: '4',
      name: 'Core Functionality',
      actors: 'All Users',
      description: 'Encompasses the essential features that define the SIKLAB system purpose: reporting, alerting, and tracking fire incidents and hazards.',
      trigger: 'Various user actions related to incident and hazard management',
      preconditions: [
        'System is operational',
        'Users are authenticated',
        'Core services are available'
      ],
      normalFlow: [
        'Users access core functionality based on their roles',
        'System provides appropriate tools for each user type',
        'Core features operate reliably and responsively',
        'Data flows correctly between modules',
        'Notifications and alerts function properly'
      ],
      exceptions: [
        'Service interruption → Fallback to cached data and queue actions',
        'High load → Prioritize critical functions like incident reporting'
      ],
      postconditions: [
        'Core functionality is accessible to users',
        'System fulfills primary mission of fire safety management',
        'Data integrity is maintained'
      ]
    },
    {
      id: '4.1',
      name: 'Fire Incident Reporting',
      actors: 'Residents',
      description: 'Enables residents to immediately report active fire emergencies with location, photos, and description for urgent BFP response.',
      trigger: 'Resident witnesses active fire and clicks "Report Fire Incident" button',
      preconditions: [
        'Resident is authenticated',
        'GPS/location services are enabled',
        'Camera access is granted',
        'Network connectivity is available'
      ],
      normalFlow: [
        'Resident selects "Report Fire Incident" (red, urgent mode)',
        'System displays emergency incident form',
        'System automatically captures GPS coordinates',
        'System displays map to confirm/adjust incident location',
        'Resident provides incident description',
        'Resident selects fire intensity (Small/Medium/Large)',
        'Resident uploads photos/videos of the fire',
        'Resident adds additional notes (people affected, address landmarks)',
        'Resident provides contact number for follow-up',
        'Resident reviews entered information',
        'Resident clicks "Submit Emergency Report"',
        'System validates all required fields',
        'System submits report with "URGENT" priority',
        'System immediately notifies BFP dispatch',
        'System displays confirmation with report ID',
        'System provides "Track Response" option',
        'BFP receives instant push notification'
      ],
      alternativeFlows: [
        'If location services unavailable → Resident manually enters address',
        'If network is poor → System compresses photos and queues submission',
        'Resident can call emergency number directly from form'
      ],
      exceptions: [
        'GPS unavailable → Prompt manual address entry',
        'Photo upload fails → Allow submission without photos but mark as incomplete',
        'Network completely unavailable → Save report locally and submit when connection restored',
        'Required fields missing → Highlight and prevent submission',
        'Duplicate report detected (same location, time) → Confirm "Are you reporting same incident?"'
      ],
      postconditions: [
        'Fire incident report is submitted with URGENT status',
        'BFP is immediately notified',
        'Report is logged in system with timestamp',
        'Resident receives confirmation and report tracking ID',
        'Report appears on incident map',
        'Nearby residents may receive alert notifications'
      ]
    },
    {
      id: '4.2',
      name: 'Hazard Reporting',
      actors: 'Residents',
      description: 'Allows residents to report potential fire hazards (e.g., faulty wiring, gas leaks, blocked exits) for preventive assessment and action by authorities.',
      trigger: 'Resident identifies fire hazard and clicks "Report Hazard" button',
      preconditions: [
        'Resident is authenticated',
        'Location services are available',
        'Camera access is granted'
      ],
      normalFlow: [
        'Resident selects "Report Fire Hazard" (orange, preventive mode)',
        'System displays hazard reporting form',
        'System captures GPS coordinates or resident enters location',
        'Resident selects hazard type from dropdown (Electrical, Gas, Flammable Materials, Structural, Other)',
        'Resident provides detailed description of hazard',
        'Resident uploads up to 5 photos of the hazard',
        'Resident marks exact location on map',
        'Resident adds any relevant notes',
        'Resident reviews report information',
        'Resident submits report',
        'System validates submission',
        'System assigns report to verification queue',
        'System displays "Report submitted for verification" message',
        'Resident receives report tracking ID'
      ],
      alternativeFlows: [
        'Resident can save draft and complete later',
        'Resident can report hazard anonymously (optional setting)'
      ],
      exceptions: [
        'Location cannot be determined → Resident must manually specify address',
        'Photos exceed size limit → System compresses or prompts to select fewer photos',
        'Hazard type not in list → Resident selects "Other" and describes',
        'Incomplete required fields → Highlight fields and prevent submission'
      ],
      postconditions: [
        'Hazard report is submitted and logged',
        'Report enters BFP verification queue',
        'Resident receives confirmation with tracking ID',
        'Report status is "Pending Verification"',
        'Report is visible in resident\'s submission history',
        'BFP receives notification in verification dashboard'
      ]
    },
    {
      id: '4.3',
      name: 'Real-Time Alerts & Notifications',
      actors: 'Residents, BFP Officers, LGU Personnel',
      description: 'Delivers immediate push notifications and in-app alerts to users about fire incidents, hazards, evacuations, and system updates based on location and role.',
      trigger: 'Critical event occurs: fire incident reported, hazard verified, evacuation order issued, or system announcement',
      preconditions: [
        'Users are registered and have notification preferences set',
        'Notification service is operational',
        'User devices have granted notification permissions',
        'User location/barangay information is available'
      ],
      normalFlow: [
        'System detects triggering event (e.g., new fire incident)',
        'System determines affected geographic area',
        'System identifies users to notify based on location and role',
        'System generates notification content with appropriate urgency level',
        'System sends push notifications to user devices',
        'System displays in-app alert banner/modal',
        'Users receive notification with sound/vibration based on urgency',
        'User taps notification to view full details',
        'System opens relevant page (incident map, alert details)',
        'User can acknowledge receipt of alert',
        'System logs notification delivery and user acknowledgment'
      ],
      alternativeFlows: [
        'For BFP officers → Include quick action buttons (Accept/Dispatch/View)',
        'For critical evacuations → Override "Do Not Disturb" settings',
        'User can share alert with contacts'
      ],
      exceptions: [
        'User device offline → Queue notification for delivery when online',
        'Notification permission denied → Display in-app only and prompt to enable',
        'Notification service unavailable → Log and retry, escalate to SMS if critical',
        'Too many alerts in short time → Bundle similar alerts to prevent overload'
      ],
      postconditions: [
        'Users receive timely notifications about relevant incidents',
        'Notification delivery is logged',
        'Users can access full details through notification',
        'User acknowledgment is tracked',
        'Alert fatigue is managed through intelligent bundling'
      ]
    },
    {
      id: '4.4',
      name: 'Report Status Tracking',
      actors: 'All Users (Residents, BFP, LGU, Admin)',
      description: 'Allows users to track the status and progress of submitted reports through their lifecycle from submission to resolution.',
      trigger: 'User clicks "History" or "Track Report" or views report details',
      preconditions: [
        'User is authenticated',
        'User has submitted reports or has access rights to view reports',
        'Report tracking service is operational'
      ],
      normalFlow: [
        'User navigates to "My Reports" or "History" section',
        'System retrieves all reports associated with user or user\'s jurisdiction',
        'System displays report list with summary (ID, type, date, current status)',
        'System shows status badge (Submitted, Verifying, Assigned, In Progress, Resolved, Closed)',
        'User selects a specific report to view details',
        'System displays complete report information',
        'System shows status timeline with timestamps for each stage',
        'System displays any updates or comments from BFP/Officials',
        'For residents: System shows assigned authority and estimated response time',
        'For BFP/LGU: System shows task assignment and action taken',
        'User can see complete audit trail of report',
        'User can receive notifications for status changes'
      ],
      alternativeFlows: [
        'User can filter reports by status, date, or type',
        'User can search for report by ID',
        'Residents can provide feedback/rating after resolution',
        'BFP can attach resolution photos or documentation'
      ],
      exceptions: [
        'Report ID not found → Display "Report not found or access denied"',
        'Status update delay → Display last known status with "pending update" indicator',
        'User lacks permission to view report → Display access denied message',
        'No reports found for user → Display "No reports yet" with option to submit'
      ],
      postconditions: [
        'User can view current status of their reports',
        'Complete status history is accessible',
        'Status changes trigger notifications if enabled',
        'Transparency is maintained throughout report lifecycle',
        'Users stay informed of progress on their submissions'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-7xl h-[95vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
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
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div className="text-center">
            <h1 className="text-xl mb-1" style={{ fontWeight: 600 }}>
              SIKLAB: Fire Hazard Mapping and Awareness System
            </h1>
            <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
              Use Case Specifications
            </h2>
            <p className="text-sm text-gray-600">Detailed Functional Requirements & System Behavior</p>
          </div>
        </div>

        {/* Use Cases List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
          <div className="space-y-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.id}
                className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Use Case Header - Clickable */}
                <button
                  onClick={() => toggleUseCase(useCase.id)}
                  className="w-full p-4 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded" style={{ fontWeight: 600 }}>
                        UC-{useCase.id}
                      </span>
                      <h3 className="text-lg" style={{ fontWeight: 600 }}>
                        {useCase.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      <span style={{ fontWeight: 600 }}>Actors:</span> {useCase.actors}
                    </p>
                  </div>
                  {expandedUseCase === useCase.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
                  )}
                </button>

                {/* Use Case Details - Expandable */}
                {expandedUseCase === useCase.id && (
                  <div className="p-6 pt-0 space-y-4 bg-gray-50">
                    {/* Description */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Description
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Trigger */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Trigger
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {useCase.trigger}
                      </p>
                    </div>

                    {/* Preconditions */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Preconditions
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {useCase.preconditions.map((precondition, index) => (
                          <li key={index} className="leading-relaxed">
                            {precondition}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Normal Flow */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Normal Flow
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        {useCase.normalFlow.map((step, index) => (
                          <li key={index} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Alternative Flows */}
                    {useCase.alternativeFlows && useCase.alternativeFlows.length > 0 && (
                      <div>
                        <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                          Alternative Flows
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {useCase.alternativeFlows.map((flow, index) => (
                            <li key={index} className="leading-relaxed">
                              {flow}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Exceptions */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Exceptions
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {useCase.exceptions.map((exception, index) => (
                          <li key={index} className="leading-relaxed">
                            {exception}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Postconditions */}
                    <div>
                      <h4 className="text-sm mb-2 text-blue-700" style={{ fontWeight: 600 }}>
                        Postconditions
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {useCase.postconditions.map((postcondition, index) => (
                          <li key={index} className="leading-relaxed">
                            {postcondition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

            {/* Summary Stats */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>
                Documentation Summary
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-1 text-blue-700" style={{ fontWeight: 700 }}>
                    {useCases.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Use Cases Documented</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-blue-700" style={{ fontWeight: 700 }}>
                    4
                  </div>
                  <div className="text-sm text-gray-600">Major Functional Categories</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-blue-700" style={{ fontWeight: 700 }}>
                    6
                  </div>
                  <div className="text-sm text-gray-600">Actor Roles Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
