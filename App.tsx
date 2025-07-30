import React, { useState, useCallback } from 'react';
import { Journalist, User, AdminCredentials, GuestUserCredentials } from './types';
import LoginPage from './components/LoginPage';
import VotingPage from './components/VotingPage';
import AdminPage from './components/AdminPage';
import Header from './components/Header';

// Initial mock data for journalists
const INITIAL_JOURNALISTS: Journalist[] = [
  { id: 1, name: 'آریا دیبا', imageUrl: 'https://picsum.photos/seed/journalist1/400/400', votes: 125 },
  { id: 2, name: 'سارا امینی', imageUrl: 'https://picsum.photos/seed/journalist2/400/400', votes: 98 },
  { id: 3, name: 'بهرام راد', imageUrl: 'https://picsum.photos/seed/journalist3/400/400', votes: 210 },
  { id: 4, name: 'نیلوفر بهرامی', imageUrl: 'https://picsum.photos/seed/journalist4/400/400', votes: 75 },
  { id: 5, name: 'کامران صالحی', imageUrl: 'https://picsum.photos/seed/journalist5/400/400', votes: 150 },
  { id: 6, name: 'مریم اکبری', imageUrl: 'https://picsum.photos/seed/journalist6/400/400', votes: 182 },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [journalists, setJournalists] = useState<Journalist[]>(INITIAL_JOURNALISTS);
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>({ email: 'admin@example.com', pass: 'password123' });
  const [guestUsers, setGuestUsers] = useState<GuestUserCredentials[]>([]);


  const handleLogin = useCallback((email: string, pass: string) => {
    // Check for admin
    if (email === adminCredentials.email && pass === adminCredentials.pass) {
      setCurrentUser({ email, role: 'admin' });
      return;
    }

    // For any other user, treat as registration, log them in, and record their credentials.
    setGuestUsers(prevGuests => [...prevGuests, { email, pass }]);
    setCurrentUser({ email, role: 'user' });
  }, [adminCredentials]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const handleVote = useCallback((journalistId: number) => {
    setJournalists(prevJournalists =>
      prevJournalists.map(j =>
        j.id === journalistId ? { ...j, votes: j.votes + 1 } : j
      )
    );
  }, []);

  const handleResetVotes = useCallback(() => {
    setJournalists(prevJournalists =>
      prevJournalists.map(j => ({ ...j, votes: 0 }))
    );
  }, []);
  
  const handleUpdateAdminCredentials = useCallback((newCreds: AdminCredentials) => {
    setAdminCredentials(newCreds);
  }, []);

  const handleAddJournalist = useCallback((name: string, imageUrl: string) => {
    const newJournalist: Journalist = {
        id: Date.now(),
        name,
        imageUrl,
        votes: 0
    };
    setJournalists(prev => [...prev, newJournalist]);
  }, []);

  const handleDeleteJournalist = useCallback((id: number) => {
      if (window.confirm('آیا از حذف این خبرنگار مطمئن هستید؟ این عمل آرا او را نیز پاک می‌کند.')) {
          setJournalists(prev => prev.filter(j => j.id !== id));
      }
  }, []);

  const renderContent = () => {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} />;
    }
    
    // Layout for logged-in users
    return (
        <>
            <Header user={currentUser} onLogout={handleLogout} />
            <main className="container mx-auto p-4 md:p-8">
                {currentUser.role === 'admin' && (
                    <AdminPage 
                        journalists={journalists} 
                        onResetVotes={handleResetVotes} 
                        onUpdateCredentials={handleUpdateAdminCredentials} 
                        currentCredentials={adminCredentials}
                        onAddJournalist={handleAddJournalist}
                        onDeleteJournalist={handleDeleteJournalist}
                        guestUsers={guestUsers}
                    />
                )}
                {currentUser.role === 'user' && <VotingPage journalists={journalists} onVote={handleVote} />}
            </main>
        </>
    );
  };

  return (
    <div className={`min-h-screen text-gray-100 font-sans flex flex-col ${!currentUser ? 'login-background' : 'bg-gray-900'}`}>
        <div className="flex-1 flex flex-col">
            {renderContent()}
        </div>
        <footer className="w-full text-center py-4 px-4 text-gray-400 text-sm bg-transparent backdrop-blur-sm">
            کلیه حقوق این وب‌سایت برای باشگاه خبرنگاران محفوظ است.
        </footer>
    </div>
  );
};

export default App;
