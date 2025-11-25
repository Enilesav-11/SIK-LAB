import { useState } from 'react';
import { LaunchScreen } from './components/LaunchScreen';
import { LoginScreen } from './components/LoginScreen';
import { ResidentDashboardNew } from './components/resident/ResidentDashboardNew';
import { BFPDashboard } from './components/bfp/BFPDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutScreenPublic } from './components/AboutScreenPublic';
import { DataProvider } from './lib/DataContext';

export type UserRole = 'resident' | 'bfp' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  barangay?: string;
  contactNo?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'launch' | 'login' | 'dashboard' | 'about'>('launch');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {currentScreen === 'launch' && (
          <LaunchScreen 
            onGetStarted={() => setCurrentScreen('login')} 
            onAboutClick={() => setCurrentScreen('about')}
          />
        )}
        {currentScreen === 'login' && (
          <LoginScreen 
            onBack={() => setCurrentScreen('launch')} 
            onLogin={handleLogin}
          />
        )}
        {currentScreen === 'dashboard' && currentUser?.role === 'resident' && (
          <ResidentDashboardNew user={currentUser} onLogout={handleLogout} />
        )}
        {currentScreen === 'dashboard' && currentUser?.role === 'bfp' && (
          <BFPDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentScreen === 'dashboard' && currentUser?.role === 'admin' && (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentScreen === 'about' && (
          <AboutScreenPublic onBack={() => setCurrentScreen('launch')} />
        )}
      </div>
    </DataProvider>
  );
}