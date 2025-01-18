import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-white   ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500  ">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800   md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500  ">
            Sorry, the page you are looking for doesn`t exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link href="/">
              <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600  :bg-blue-500  ">
                Take me home
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <Image
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover "
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
            width="0"
            height="0"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
