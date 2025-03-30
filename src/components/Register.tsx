import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const validatePassword = (password: string) => {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
    return re.test(password);
  }

  const validateName = (name: string) => {
    const re = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ .'-]+$/;
    return re.test(name);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName) {
      setError('Imię i nazwisko jest wymagane');
      return;
    }

    if (fullName.length < 3 || fullName.length > 100) {
      setError('Imię i nazwisko musi mieć od 3 do 100 znaków');
      return;
    }

    if (!validateName(fullName)) {
      setError('Imię i nazwisko może zawierać tylko litery, spacje oraz znaki .\'-');
      return;
    }

    if (!email) {
      setError('Email jest wymagany');
      return;
    }

    if (!validateEmail(email)) {
      setError('Proszę podać prawidłowy adres email');
      return;
    }

    if (!password) {
      setError('Hasło jest wymagane');
      return;
    }

    if (password.length < 8) {
      setError('Hasło musi mieć co najmniej 8 znaków');
      return;
    }

    if (!validatePassword(password)) {
      setError('Hasło musi zawierać co najmniej jedną cyfrę, jedną małą literę i jedną wielką literę');
      return;
    }

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    try {
      await register(email, password, fullName);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Błąd rejestracji');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Rejestracja</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Imię i nazwisko</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Hasło</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required 
            />
            <p className="text-xs text-gray-500 mt-1">
              Hasło musi mieć co najmniej 8 znaków i zawierać cyfrę, małą i wielką literę
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Potwierdź hasło</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Zarejestruj się
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Masz już konto? 
            <Link 
              to="/login" 
              className="text-blue-500 ml-2 hover:underline"
            >
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;