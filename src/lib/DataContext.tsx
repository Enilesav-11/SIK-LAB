import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  mockFireIncidents as initialFireIncidents, 
  mockHazardReports as initialHazardReports,
  mockNews as initialNews,
  mockUsers as initialUsers,
  FireIncident,
  HazardReport,
  NewsItem
} from './mockData';

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'resident' | 'bfp' | 'admin';
  barangay: string;
  contactNo: string;
  profilePicture?: string;
}

// Emergency Notification type
export interface EmergencyNotification {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  barangay: string;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

// Activity Log type
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  description: string;
  timestamp: string;
}

interface DataContextType {
  // Fire Incidents
  fireIncidents: FireIncident[];
  addFireIncident: (incident: Omit<FireIncident, 'id'>) => FireIncident;
  updateFireIncident: (id: string, updates: Partial<FireIncident>) => void;
  deleteFireIncident: (id: string) => void;

  // Hazard Reports
  hazardReports: HazardReport[];
  addHazardReport: (report: Omit<HazardReport, 'id'>) => HazardReport;
  updateHazardReport: (id: string, updates: Partial<HazardReport>) => void;
  deleteHazardReport: (id: string) => void;

  // News/Updates
  newsItems: NewsItem[];
  addNewsItem: (news: Omit<NewsItem, 'id'>) => NewsItem;
  updateNewsItem: (id: string, updates: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;

  // Users
  users: User[];
  addUser: (user: Omit<User, 'id'>) => User;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Emergency Notifications
  emergencyNotifications: EmergencyNotification[];
  addEmergencyNotification: (notification: Omit<EmergencyNotification, 'id'>) => EmergencyNotification;
  updateEmergencyNotification: (id: string, updates: Partial<EmergencyNotification>) => void;
  deleteEmergencyNotification: (id: string) => void;

  // Activity Logs
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // State management
  const [fireIncidents, setFireIncidents] = useState<FireIncident[]>(initialFireIncidents);
  const [hazardReports, setHazardReports] = useState<HazardReport[]>(initialHazardReports);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [emergencyNotifications, setEmergencyNotifications] = useState<EmergencyNotification[]>([
    {
      id: 'EN001',
      title: 'Fire Alert in Tambacan',
      message: 'Active fire reported in Purok 9-A. Residents advised to stay alert and follow evacuation protocols if needed.',
      severity: 'critical',
      barangay: 'Tambacan',
      createdAt: 'Today at 8:35 AM',
      createdBy: 'Fire Officer Santos',
      isActive: true
    },
    {
      id: 'EN002',
      title: 'Fire Prevention Advisory',
      message: 'Monthly fire drill scheduled for all barangays. Please participate and know your evacuation routes.',
      severity: 'info',
      barangay: 'All',
      createdAt: 'Nov 20, 9:00 AM',
      createdBy: 'Admin User',
      isActive: true
    }
  ]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'AL001',
      userId: '1',
      userName: 'Juan Dela Cruz',
      userRole: 'Resident',
      action: 'Report Submitted',
      description: 'Fire hazard reported at Purok 5',
      timestamp: 'Today at 10:30 AM'
    },
    {
      id: 'AL002',
      userId: '2',
      userName: 'Fire Officer Santos',
      userRole: 'BFP Officer',
      action: 'Incident Updated',
      description: 'Status changed to "Active" for FI001',
      timestamp: 'Today at 9:15 AM'
    },
    {
      id: 'AL003',
      userId: '3',
      userName: 'Admin User',
      userRole: 'Administrator',
      action: 'User Created',
      description: 'New resident account registered',
      timestamp: 'Yesterday at 3:45 PM'
    }
  ]);

  // Generate unique IDs
  const generateId = (prefix: string) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${random}`;
  };

  // Fire Incidents CRUD
  const addFireIncident = (incident: Omit<FireIncident, 'id'>) => {
    const newIncident: FireIncident = {
      ...incident,
      id: generateId('FI')
    };
    setFireIncidents(prev => [newIncident, ...prev]);
    return newIncident;
  };

  const updateFireIncident = (id: string, updates: Partial<FireIncident>) => {
    setFireIncidents(prev =>
      prev.map(incident =>
        incident.id === id ? { ...incident, ...updates } : incident
      )
    );
  };

  const deleteFireIncident = (id: string) => {
    setFireIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  // Hazard Reports CRUD
  const addHazardReport = (report: Omit<HazardReport, 'id'>) => {
    const newReport: HazardReport = {
      ...report,
      id: generateId('HR')
    };
    setHazardReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const updateHazardReport = (id: string, updates: Partial<HazardReport>) => {
    setHazardReports(prev =>
      prev.map(report =>
        report.id === id ? { ...report, ...updates } : report
      )
    );
  };

  const deleteHazardReport = (id: string) => {
    setHazardReports(prev => prev.filter(report => report.id !== id));
  };

  // News Items CRUD
  const addNewsItem = (news: Omit<NewsItem, 'id'>) => {
    const newNews: NewsItem = {
      ...news,
      id: generateId('N')
    };
    setNewsItems(prev => [newNews, ...prev]);
    return newNews;
  };

  const updateNewsItem = (id: string, updates: Partial<NewsItem>) => {
    setNewsItems(prev =>
      prev.map(news =>
        news.id === id ? { ...news, ...updates } : news
      )
    );
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(prev => prev.filter(news => news.id !== id));
  };

  // Users CRUD
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: generateId('U')
    };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Emergency Notifications CRUD
  const addEmergencyNotification = (notification: Omit<EmergencyNotification, 'id'>) => {
    const newNotification: EmergencyNotification = {
      ...notification,
      id: generateId('EN')
    };
    setEmergencyNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const updateEmergencyNotification = (id: string, updates: Partial<EmergencyNotification>) => {
    setEmergencyNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, ...updates } : notification
      )
    );
  };

  const deleteEmergencyNotification = (id: string) => {
    setEmergencyNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Activity Logs
  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: generateId('AL'),
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const value: DataContextType = {
    fireIncidents,
    addFireIncident,
    updateFireIncident,
    deleteFireIncident,
    hazardReports,
    addHazardReport,
    updateHazardReport,
    deleteHazardReport,
    newsItems,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    users,
    addUser,
    updateUser,
    deleteUser,
    emergencyNotifications,
    addEmergencyNotification,
    updateEmergencyNotification,
    deleteEmergencyNotification,
    activityLogs,
    addActivityLog
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
