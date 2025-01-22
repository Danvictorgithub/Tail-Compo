// import Image from "next/image";
'use client';
import Header from './component/Header';
import { Icon } from '@iconify/react';
import Footer from './component/Footer';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface TrendingUser {
  username: string;
  profile: {
    image: string;
    name: string;
  };
}

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/trending-users`,
  );
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Failed to fetch data');
  }
}
export default function Home() {
  const { data: session, status, update } = useSession();
  const { data, isLoading } = useQuery<TrendingUser[]>({
    queryKey: ['trending-users'],
    queryFn: getData,
  });
  useEffect(() => {
    if (status === 'authenticated') {
      console.log(session);
    }
  }, [status]);
  return (
    <main>
      <Header />
      <section className="container px-6 py-16 mx-auto text-center h-[calc(100svh-80px)]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
            Building Your <span className="text-cyan-500"> Next App</span> with
            our Awesome components
          </h1>
          <p className="mt-6 text-gray-500 ">
            A variety of tailwind components available, both made my developers
            and Artificial Intelligence to design your next app.
          </p>
          {/* <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-cyan-600 rounded-lg hover:bg-cyan-500 lg:mx-0 lg:w-auto focus:outline-none">
            Start 14-Day free trial
          </button>
          <p className="mt-3 text-sm text-gray-400 ">No credit card required</p> */}
          <div className="mt-3">
            <div className="relative">
              <input
                type="text"
                name=""
                id=""
                className="border rounded-lg w-full p-3 text-gray-800"
                placeholder="Tell me your design component"
              />
              <button className="absolute top right-1 p-4">
                <Icon
                  icon="mingcute:ai-fill"
                  className="text-gray-400 hover:text-cyan-400 duration-300  hover:animate-spin"
                />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-400 ">
            Try <span className="font-bold">Chro AI</span> Tailwind Generator
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <img
            className="object-cover w-full h-96 rounded-xl lg:w-4/5"
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          />
        </div>
      </section>
      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
              New components
            </h1>

            <p className="max-w-lg mx-auto mt-4 text-gray-500">
              The latest Tailwind CSS components and templates showcased by the
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">Tom Hank</h1>
                    <p className="text-sm text-gray-500 ">Creative Director</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                What do you want to know about UI
              </h1>
            </div>

            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">arthur melo</h1>
                    <p className="text-sm text-gray-500 ">Creative Director</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                All the features you want to know
              </h1>
            </div>

            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">Amelia. Anderson</h1>
                    <p className="text-sm text-gray-500 ">Lead Developer</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                Which services you get from Meraki UI
              </h1>
            </div>
            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">Tom Hank</h1>
                    <p className="text-sm text-gray-500 ">Creative Director</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                What do you want to know about UI
              </h1>
            </div>

            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">arthur melo</h1>
                    <p className="text-sm text-gray-500 ">Creative Director</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                All the features you want to know
              </h1>
            </div>

            <div>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src="https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt=""
                />

                <div className="absolute bottom-0 flex p-3 bg-white  ">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">Amelia. Anderson</h1>
                    <p className="text-sm text-gray-500 ">Lead Developer</p>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-xl font-semibold text-gray-800 ">
                Which services you get from Meraki UI
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold  text-gray-800 capitalize lg:text-3xl ">
            Trending Users
          </h1>

          <p className="max-w-2xl my-6 text-gray-500 ">
            Valuable users who have contributed to share their components for
            free.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
            {!isLoading
              ? data!.map((user) => (
                  <Link key={user.username} href={`/profile/${user.username}`}>
                    <div className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-cyan-600 rounded-xl">
                      <img
                        className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                        src={user.profile.image}
                        alt=""
                      />

                      <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize  group-hover:text-white">
                        {user.profile.name}
                      </h1>

                      <p className="mt-2 text-gray-500 capitalize  group-hover:text-gray-300">
                        {user.username}
                      </p>

                      <div className="flex mt-3 -mx-2"></div>
                    </div>
                  </Link>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-cyan-600 rounded-xl"
                  >
                    <Skeleton className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" />

                    <Skeleton className="mt-4 w-32 h-8 rounded" />

                    <Skeleton className="mt-2 w-24 h-6 rounded" />

                    <div className="flex mt-3 -mx-2"></div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
            Most Popular Components
          </h1>

          <p className="mt-4 text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            quam voluptatibus
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <img
                className="object-cover w-full rounded-lg h-96 "
                src="https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80"
                alt=""
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize ">
                Best website collections
              </h2>
              <p className="mt-2 text-lg tracking-wider text-cyan-500 uppercase  ">
                Website
              </p>
            </div>

            <div>
              <img
                className="object-cover w-full rounded-lg h-96 "
                src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize ">
                Block of Ui kit collections
              </h2>
              <p className="mt-2 text-lg tracking-wider text-cyan-500 uppercase  ">
                Ui kit
              </p>
            </div>

            <div>
              <img
                className="object-cover w-full rounded-lg h-96 "
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize ">
                Ton’s of mobile mockup
              </h2>
              <p className="mt-2 text-lg tracking-wider text-cyan-500 uppercase  ">
                Mockups
              </p>
            </div>
          </div>
          <Link href="/components">
            <button className="mx-auto mt-8 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-600 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-opacity-80">
              <svg
                className="w-5 h-5 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="mx-1">Find More Components</span>
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
