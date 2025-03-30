import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        {user ? (
          <>
            <p>Witaj, {user.fullName}!</p>
            <p>Twój email: {user.email}</p>
          </>
        ) : (
          <p>Brak danych użytkownika</p>
        )}
        <button 
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Dashboard;