'use client';
import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

function AuthCallback() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const access_token = searchParams.get('access_token');

  useEffect(() => {
    if (status === 'unauthenticated' && access_token) {
      signIn('credentials', {
        access_token,
        callbackUrl: '/',
      });
    } else if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, access_token, router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-ping bg-blue-500"></div>
          <div className="w-4 h-4 rounded-full animate-ping bg-blue-500"></div>
          <div className="w-4 h-4 rounded-full animate-ping bg-blue-500"></div>
        </div>
        <p className="mt-4 text-lg text-gray-700">Logging in...</p>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
