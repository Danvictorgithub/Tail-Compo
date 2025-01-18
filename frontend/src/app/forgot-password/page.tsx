'use client';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface DataForm {
  email: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>();
  const { toast } = useToast();
  async function onSubmit(data: DataForm) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/passwordReset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    if (req.ok) {
      toast({
        title: 'Successfully sent Password Reset Email',
        description: 'Please check your email for further instructions',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        duration: 5000,
      });
    }
  }
  return (
    <section className="bg-white   min-h-svh flex items-center justify-center">
      <div className="max-w-3xl px-6 py-16 mx-auto text-center">
        <Link href="/">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto h-7 sm:h-12 mx-auto mb-4"
            src="/tailchro.png"
            alt=""
          />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800  ">
          Forgot Password
        </h1>
        <p className="max-w-md mx-auto mt-5 text-gray-500  ">
          Please provide your email address. We will send you a link to reset
          your password
        </p>

        <form
          className="flex flex-col mt-8 space-y-3 sm:justify-center sm:-mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email Address is required',
              },
            })}
            id="email"
            type="email"
            className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2       focus:border-sky-400  :border-sky-300 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-40"
            placeholder="Email Address"
          />

          {errors.email?.message ? (
            <p className="text-sm text-gray-500 mt-2 text-left w-full mx-2">
              * {errors.email.message}
            </p>
          ) : null}
          <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-md sm:mx-2 hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
