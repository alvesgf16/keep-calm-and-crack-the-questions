"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import Image from 'next/image'; // Import Image from next/image
import googleLogo from '/public/google.png'; // Static import for the Google logo

function Loginpage() {
  const router = useRouter();

  const handleRegisterNavigation = () => {
    router.push('/register'); // Correct path to the register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg.jpg)' }}>
      <div className="bg-white p-12 rounded-lg shadow-lg text-center bg-opacity-80 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Trivia Game</h1>
        <form className="flex flex-col">
          <input type="text" id="username" name="username" placeholder="Username" required className="p-3 mb-4 border border-gray-300 rounded" />
          <input type="password" id="password" name="password" placeholder="Password" required className="p-3 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 text-lg w-full">Login</button>
        </form>
        <button className="p-3 bg-blue-400 text-white rounded hover:bg-blue-600 mb-4 flex items-center justify-center w-full">
          <Image src={googleLogo} alt="Google logo" width={24} height={24} className="mr-2" />
          Login with Google
        </button>
        <div className="text-sm text-gray-600">
          Not registered? <button onClick={handleRegisterNavigation} className="text-blue-500 hover:text-blue-700">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;