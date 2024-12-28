import React from "react";
import Header from "../component/Header";

export default function page() {
  return (
    <main>
      <Header />
      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
              All Tailwind Components{" "}
            </h1>
            <button className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600 transition-colors duration-300 transform  hover:text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 mt-12">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                      src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1470&q=80"
                      alt=""
                    />
                    <div className="absolute bottom-0 flex p-3 bg-white">
                      <img
                        className="object-cover object-center w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1470&q=80"
                        alt=""
                      />
                      <div className="mx-4">
                        <h1 className="text-sm text-gray-700">Tom Hank</h1>
                        <p className="text-sm text-gray-500">
                          Creative Director
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-6 text-xl font-semibold text-gray-800">
                    What do you want to know about UI
                  </h1>
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center mt-12">
            <div className="flex ">
              <a
                href="#"
                className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed  "
              >
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>

                  <span className="mx-1">previous</span>
                </div>
              </a>

              <a
                href="#"
                className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                1
              </a>

              <a
                href="#"
                className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                2
              </a>

              <a
                href="#"
                className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                3
              </a>

              <a
                href="#"
                className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                4
              </a>

              <a
                href="#"
                className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                5
              </a>

              <a
                href="#"
                className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md   hover:bg-cyan-500 :bg-cyan-500 hover:text-white :text-gray-200"
              >
                <div className="flex items-center -mx-1">
                  <span className="mx-1">Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
