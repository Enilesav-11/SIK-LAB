# Interactive Data Management Guide

## Overview
The SIKLAB system now has a fully interactive mock data management system using React Context. All dashboards can add, edit, and delete data in real-time.

## Data Context Setup

### Location
`/lib/DataContext.tsx` - Central data management system

### Provided Data & Functions

#### Fire Incidents
- `fireIncidents` - Array of all fire incidents
- `addFireIncident(incident)` - Add new incident
- `updateFireIncident(id, updates)` - Update existing incident
- `deleteFireIncident(id)` - Delete incident

#### Hazard Reports
- `hazardReports` - Array of all hazard reports
- `addHazardReport(report)` - Add new report
- `updateHazardReport(id, updates)` - Update existing report
- `deleteHazardReport(id)` - Delete report

#### News/Updates
- `newsItems` - Array of news items
- `addNewsItem(news)` - Add new news
- `updateNewsItem(id, updates)` - Update news
- `deleteNewsItem(id)` - Delete news

#### Users
- `users` - Array of all users
- `addUser(user)` - Add new user
- `updateUser(id, updates)` - Update user
- `deleteUser(id)` - Delete user

#### Emergency Notifications
- `emergencyNotifications` - Array of notifications
- `addEmergencyNotification(notification)` - Add notification
- `updateEmergencyNotification(id, updates)` - Update notification
- `deleteEmergencyNotification(id)` - Delete notification

#### Activity Logs
- `activityLogs` - Array of activity logs
- `addActivityLog(log)` - Add new log entry

## Usage Examples

### In Any Component

```tsx
import { useData } from '../../lib/DataContext';

function MyComponent() {
  const {
    fireIncidents,
    addFireIncident,
    updateFireIncident,
    deleteFireIncident
  } = useData();

  // READ: Display data
  const activeIncidents = fireIncidents.filter(i => i.status === 'active');

  // CREATE: Add new incident
  const handleSubmit = (data) => {
    const newIncident = addFireIncident({
      location: data.location,
      barangay: data.barangay,
      purok: data.purok,
      description: data.description,
      reportedBy: user.name,
      reportedAt: 'Just now',
      status: 'pending',
      severity: data.severity,
      lat: data.lat,
      lng: data.lng
    });
    // ID is auto-generated
  };

  // UPDATE: Change incident status
  const handleResolve = (id) => {
    updateFireIncident(id, {
      status: 'resolved'
    });
  };

  // DELETE: Remove incident
  const handleDelete = (id) => {
    if (confirm('Delete this incident?')) {
      deleteFireIncident(id);
    }
  };
}
```

## Dashboard-Specific Functionality

### Resident Dashboard
- ✅ Submit fire incidents (Urgent Alert)
- ✅ Submit hazard reports
- ✅ View their submission history
- ✅ Receive emergency notifications

### BFP Dashboard
- ✅ View all pending incidents
- ✅ Update incident status (pending → active → resolved)
- ✅ Validate hazard reports
- ✅ Send emergency notifications
- ✅ View response statistics

### Admin Dashboard
- ✅ Manage all users (add, edit, delete)
- ✅ View all incidents and reports
- ✅ Monitor system activity logs
- ✅ Manage news/updates
- ✅ Generate system reports

## Key Features

### Real-Time Updates
- All changes are immediately reflected across all components
- No page refresh needed
- Data persists during the session

### Activity Logging
- Automatically log user actions
- Track who did what and when
- Useful for audit trails

### Automatic ID Generation
- IDs are auto-generated using timestamp + random number
- Format: PREFIX + timestamp + random (e.g., "FI17001234567890")

## Components To Update

### High Priority (Already Updated)
1. ✅ HomePage.tsx - Now uses fireIncidents from context

### To Be Updated (Resident)
2. UrgentAlertPage.tsx - Add incident submission
3. ReportHazardPage.tsx - Add hazard report submission
4. HistoryPage.tsx - Show user's submissions
5. MapPage.tsx - Use live incident data

### To Be Updated (BFP)
6. BFPHome.tsx - Use live incident data
7. BFPIncidents.tsx - Add status update functions
8. BFPReports.tsx - Add report validation functions

### To Be Updated (Admin)
9. AdminHome.tsx - Use live stats
10. AdminUsers.tsx - Add user CRUD operations
11. SystemActivity.tsx - Use activity logs
12. ManageNews.tsx - Add news management

## Migration Pattern

### Before (Static Data)
```tsx
import { mockFireIncidents } from '../../lib/mockData';

function Component() {
  const incidents = mockFireIncidents;
  // Can only read, no modifications
}
```

### After (Interactive Data)
```tsx
import { useData } from '../../lib/DataContext';

function Component() {
  const { fireIncidents, addFireIncident, updateFireIncident } = useData();
  // Can read AND modify
}
```

## Testing the System

1. **Login as Resident** (`juan@resident.com` / `resident123`)
   - Submit a new fire incident via Urgent Alert
   - Submit a hazard report
   - Check History page to see your submissions

2. **Login as BFP** (`santos@bfp.gov.ph` / `bfp123`)
   - View the new incident submitted by resident
   - Update incident status from pending → active → resolved
   - Validate the hazard report

3. **Login as Admin** (`admin@siklab.gov.ph` / `admin123`)
   - View all incidents in the system
   - Add/edit/delete users
   - Check activity logs to see all actions

## Benefits

✅ **Realistic Interaction** - Buttons actually do something
✅ **Data Persistence** - Changes stay until refresh/logout
✅ **Cross-Component Sync** - Updates reflect everywhere
✅ **No Backend Needed** - Perfect for prototyping
✅ **Easy to Extend** - Add new data types easily
✅ **Type-Safe** - Full TypeScript support
