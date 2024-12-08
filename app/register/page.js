"use client";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const router = useRouter();

  const handleLoginNavigation = () => {
    router.push('/login'); // Correct path to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg.jpg)' }}>
      <div className="bg-white p-12 rounded-lg shadow-lg text-center bg-opacity-80 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form className="flex flex-col">
          <input type="text" id="username" name="username" placeholder="Username" required className="p-3 mb-4 border border-gray-300 rounded" />
          <input type="password" id="password" name="password" placeholder="Password" required className="p-3 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 text-lg w-full">Register</button>
        </form>
        <div className="text-sm text-gray-600">
          Already registered? <button onClick={handleLoginNavigation} className="text-blue-500 hover:text-blue-700">Login</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;