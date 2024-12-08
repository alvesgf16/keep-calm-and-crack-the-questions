"use client";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useState } from 'react';

function RegisterPage() {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      await createUserWithEmailAndPassword(username, password);
      setSuccessMessage('User created successfully!');
      alert('User created successfully!'); // Show alert pop-up
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email is already in use.');
      } else {
        setErrorMessage(error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg.jpg)' }}>
      <div className="bg-white p-12 rounded-lg shadow-lg text-center bg-opacity-80 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form className="flex flex-col" onSubmit={handleSignup}>
          <input type="text" id="username" name="username" placeholder="Username" required className="p-3 mb-4 border border-gray-300 rounded" />
          <input type="password" id="password" name="password" placeholder="Password" required className="p-3 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 text-lg w-full">Register</button>
        </form>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <div className="text-sm text-gray-600">
          Already registered? <button onClick={() => router.push('/login')} className="text-blue-500 hover:text-blue-700">Login</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;