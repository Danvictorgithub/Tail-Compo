'use client';

import { type ReactElement } from 'react';
import Header from '../component/Header';

export default function Page(): ReactElement {
  return (
    <main>
      <Header />
      <section className="min-h-[calc(100svh-80px)]">test</section>
    </main>
  );
}
