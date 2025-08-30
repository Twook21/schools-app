'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="w-full text-left block p-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;