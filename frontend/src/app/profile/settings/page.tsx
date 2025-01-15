'use client';

import Header from '@/app/component/Header';
import { type ReactElement } from 'react';

export default function Page(): ReactElement {
  return (
    <main>
      <Header />
      <section className="h-[calc(100svh-80px)] px-4 py-12 sm:px-24 flex jusify-center items-center">
        <div className="h-full border mx-auto ">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p>Manage your public profile information</p>
          </div>
        </div>
      </section>
    </main>
  );
}
