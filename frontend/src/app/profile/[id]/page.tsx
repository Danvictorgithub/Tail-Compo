'use client';
import Header from '@/app/component/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

interface Profile {
  id: string;
  name: string;
  image: string;
  userId: string;
  user: {
    username: string;
  };
}
async function getData(id: string): Promise<Profile | undefined> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${BACKEND_URL}/profiles/${id}`);
    if (!res.ok) {
      throw new Error('Profile not Found');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('it does error');
    console.error(err);
  }
}

export default function Page() {
  const id = useParams().id as string;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getData(id),
  });
  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);
  return (
    <main>
      <Header />
      <section className="bg-white  ">
        <div className="h-[32rem] bg-gray-100  ">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl  ">
              Profile
            </h1>

            <div className="flex justify-center mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-8 xl:mt-16 mx-4">
            {!isLoading && !isError ? (
              <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl   max-w-md mx-4">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="object-cover rounded-xl aspect-square w-[400px]"
                  // src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  src={data!.image}
                  alt="Profile image"
                />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize  ">
                  {data!.name}
                </h1>

                <p className="mt-2 text-gray-500 capitalize  ">
                  @{data!.user.username}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl   max-w-md">
                <Skeleton className="aspect-square w-[400px]" />
                <Skeleton className=" mt-4 w-full h-8" />
                <Skeleton className=" mt-2 w-[80%] h-8" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-64 container mx-auto"></div>
      </section>
    </main>
  );
}
