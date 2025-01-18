'use client';
import { useToast } from '@/hooks/use-toast';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

async function getVerificationResult(id: string) {
  const resVerifyToken = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/passwordReset/${id}`,
  );
  if (resVerifyToken.ok) {
    return resVerifyToken.json();
  } else {
    throw new Error('Invalid Token');
  }
}
interface APIResponse {
  message: string;
  email: string;
}
interface DataForm {
  password: string;
  confirmPassword: string;
}
export default function Page(): ReactElement {
  const emailVerificationId = useParams().id as string;
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onChange',
  });
  const router = useRouter();
  const { data, error, isLoading, status } = useQuery<APIResponse>({
    queryKey: ['email-verification'],
    queryFn: () => getVerificationResult(emailVerificationId as string),
  });

  async function changePassword(data: DataForm) {
    setLoading(true);
    const { password } = data;
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/passwordReset/${emailVerificationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      },
    );
    if (req.ok) {
      toast({
        title: 'Password Changed',
        description: 'You have successfully changed your password',
        duration: 2000,
      });
      setInterval(() => {
        router.push('/auth/signin');
      }, 2000);
    } else {
      toast({
        title: 'Error',
        description: 'An error occured while changing your password',
        duration: 5000,
      });
    }
    setLoading(false);
  }
  return (
    <Suspense>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 justify-center items-center dark:invert">
              <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-8 w-8 bg-sky-500 rounded-full animate-bounce"></div>
            </div>
            <h2 className="text-center text-gray-700 text-xl font-semibold mt-4">
              Verifying your reset token
            </h2>
            <p className="w-1/2 text-center text-gray-500 mt-5">
              Please wait while we verify your password reset token.
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen flex-col">
          <Icon icon="si:warning-duotone" className="text-sky-500 text-5xl" />
          <h1 className="font-bold text-3xl mt-4 text-gray-800">
            Password token is Invalid or Expired
          </h1>
          <p className="text-gray-500 mt-2">Here are some useful links</p>
          <div className="flex gap-2">
            <Link href="/">
              <button className="text-sm py-1 px-3 bg-sky-500 rounded-md text-white border-2 border-transparent mt-2 hover:bg-white hover:border-sky-500 active:bg-sky-500 hover:text-sky-500">
                Take me Home
              </button>
            </Link>

            <Link href="/forgot-password">
              <button className="text-sm py-1 px-3 bg-sky-500 rounded-md text-white border-2 border-transparent mt-2 hover:bg-white hover:border-sky-500 active:bg-sky-500 hover:text-sky-500">
                Forgot Password
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen max-w-md mx-auto">
          <div className="flex flex-col items-center bg-white p-8 rounded-lg">
            <Icon
              icon="material-symbols:lock"
              className="text-gray-600 text-6xl"
            />
            <h2 className="text-center text-gray-700 text-2xl font-semibold">
              Change Password
            </h2>
            <p className="w-2/3 text-center text-gray-500 mt-4">
              You are changing the password for the account with email address{' '}
              {data?.email}
            </p>
            <form onSubmit={handleSubmit(changePassword)} className="w-full">
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type={toggle ? 'password' : 'text'}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => {
                      const errors = [];
                      if (value.length < 8) {
                        errors.push(
                          'Password must be at least 8 characters long',
                        );
                      }
                      if (!/[a-z]/.test(value)) {
                        errors.push(
                          'Password must contain at least one lowercase letter',
                        );
                      }
                      if (!/[A-Z]/.test(value)) {
                        errors.push(
                          'Password must contain at least one uppercase letter',
                        );
                      }
                      if (!/\d/.test(value)) {
                        errors.push(
                          'Password must contain at least one number',
                        );
                      }
                      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        errors.push(
                          'Password must contain at least one symbol',
                        );
                      }
                      return errors.length > 0 ? errors.join(', ') : true;
                    },
                  })}
                />
              </div>
              {errors.password?.message ? (
                <p className="text-sm text-gray-500 mt-2 w-full">
                  * {errors.password.message as string}
                </p>
              ) : null}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  type={toggle ? 'password' : 'text'}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
                <div className="absolute right-4">
                  {toggle ? (
                    <Icon
                      icon="mdi:show"
                      className="text-xl hover:text-gray-500 duration-200"
                      onClick={() => setToggle(!toggle)}
                    ></Icon>
                  ) : (
                    <Icon
                      onClick={() => setToggle(!toggle)}
                      icon="mdi:hide"
                      className="text-xl hover:text-gray-500 duration-200"
                    ></Icon>
                  )}
                </div>
              </div>
              {errors.confirmPassword?.message ? (
                <p className="text-sm text-gray-500 mt-2 w-full ">
                  * {errors.confirmPassword.message as string}
                </p>
              ) : null}
              <button className="flex gap-2 mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
                {loading ? (
                  <Icon icon="eos-icons:loading" width="24" height="24" />
                ) : null}
                <p>Change Pasword</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </Suspense>
  );
}
