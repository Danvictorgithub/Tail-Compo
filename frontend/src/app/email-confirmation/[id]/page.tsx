'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, type ReactElement } from 'react';

async function getVerificationResult(id: string) {
  const resVerifyToken = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/emailConfirmation/${id}`,
  );
  if (resVerifyToken.ok) {
    const resEmailVerification = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/emailConfirmation/${id}`,
      {
        method: 'POST',
      },
    );
    if (resEmailVerification.ok) {
      return 'Email Verified Successfully';
    } else {
      throw new Error('Invalid Token');
    }
  } else {
    throw new Error('Invalid Token');
  }
}

export default function Page(): ReactElement {
  const emailVerificationId = useParams().id as string;
  const router = useRouter();
  const { data, error, isLoading, status } = useQuery({
    queryKey: ['email-verification'],
    queryFn: () => getVerificationResult(emailVerificationId as string),
  });
  useEffect(() => {
    if (status === 'success') {
      setInterval(() => {
        router.push('/');
      }, 5000);
    }
  }, [status, router]);
  return (
    <Suspense>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-sky-500 mb-4"></div>
            <h2 className="text-center text-gray-700 text-xl font-semibold">
              Verifying your email...
            </h2>
            <p className="w-1/3 text-center text-gray-500">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen flex-col">
          <Icon icon="si:warning-duotone" className="text-sky-500 text-5xl" />
          <h1 className="font-bold text-3xl mt-4">
            Email Verification token is Invalid or Expired
          </h1>
          <p className="text-gray-500 mt-2">Here are some useful links</p>
          <Link href="/">
            <button className="text-sm py-1 px-3 bg-sky-500 rounded-md text-white border-2 border-transparent mt-2 hover:bg-white hover:border-sky-500 active:bg-sky-500 hover:text-sky-500">
              Take me Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="flex flex-col items-center bg-white p-8 rounded-lg ">
            <Icon icon="ooui:success" className="text-green-500 text-6xl" />
            <h2 className="text-center text-gray-700 text-2xl font-semibold">
              Email Verified Successfully!
            </h2>
            <p className="w-2/3 text-center text-gray-500 mt-4">
              Thank you for verifying your email address. You can now continue
              using our services.
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
}
