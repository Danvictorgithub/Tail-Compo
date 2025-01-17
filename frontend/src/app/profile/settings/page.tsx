'use client';

import Footer from '@/app/component/Footer';
import Header from '@/app/component/Header';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { type ReactElement } from 'react';

export default function Page(): ReactElement {
  const { data } = useSession();
  return (
    <main>
      <Header />
      <section className="h-[calc(100svh-80px)] px-4 py-12 sm:px-24 flex jusify-center items-center">
        <div className="max-w-xl mx-auto p-4 space-y-8 border w-full rounded-xl">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-gray-600 text-sm mt-2">
              Manage your public profile information
            </p>
          </div>
          <form onSubmit={() => {}}>
            <div className="flex gap-4 items-center">
              <Image
                src={data?.user?.image as string}
                alt="avatar"
                className="w-20 h-20 rounded-full"
                width="0"
                height="0"
                sizes="100vw"
              />
              <div className="">
                <h2 className="font-medium text-xl">Profile Picture</h2>
                <p className="text-sm text-gray-500">
                  Click on the avatar to upload a custom one from your files.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <label htmlFor="name" className="font-medium text-base">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                placeholder={data?.user?.name}
              />
              <p className="text-sm text-gray-500 my-2">
                This is your public display name in your profile.
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="username" className="font-medium text-base">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                placeholder={data?.user?.username}
              />
              <p className="text-sm text-gray-500 my-2">
                This is your public display username.
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="font-medium text-base">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                  placeholder={data?.user?.email}
                  disabled
                />
                <Icon
                  icon="tabler:lock-filled"
                  width="24"
                  height="24"
                  className="text-gray-400 absolute right-4 top-4"
                  type="text"
                />
              </div>
              <p className="text-sm text-gray-500 my-2">
                This is your public display email.
              </p>
            </div>
            <button className="mt-4 bg-sky-500 text-white border-2 border-transparent px-4 py-2 rounded-md hover:border-sky-500 hover:text-sky-500 hover:bg-white active:bg-sky-500 duration-200">
              Update Profile
            </button>
          </form>
          <div></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
