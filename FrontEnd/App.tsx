import { useState } from 'react';
import { AuthPage } from './components/auth/AuthPage';
import { HelperDashboard } from './components/dashboard/HelperDashboard';
import { NeederDashboard } from './components/dashboard/NeederDashboard';

interface User {
  id: string;
  name: string;
  role: 'helper' | 'needer';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleAuth = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen">
      {user.role === 'helper' ? (
        <HelperDashboard user={user} onLogout={handleLogout} />
      ) : (
        <NeederDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}