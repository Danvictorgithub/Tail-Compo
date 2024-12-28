"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface UserSignUp {
  image: File;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSignUp>({
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const password = watch("password");

  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }
  function onSubmit(data: UserSignUp) {
    console.log(data);
  }
  return (
    <section className="bg-white ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mx-auto mb-12">
            <Link href="/" className="fixed">
              <Image
                width="0"
                height="0"
                sizes="100vw"
                className="w-auto h-7 sm:h-12"
                src="/tailchro.png"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6">
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl ">
              sign Up
            </h1>
          </div>

          <div className="relative flex items-center mt-8">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              {...register("username", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
                maxLength: {
                  value: 32,
                  message: "Username must be at most 32 characters long",
                },
              })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
            />
          </div>
          {errors.username?.message ? (
            <p className="text-sm text-gray-500 mt-2">
              * {errors.username.message}
            </p>
          ) : null}

          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <h2 className="mx-3 text-gray-400">Profile Photo: {fileName}</h2>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("image", {
                validate: {
                  lessThan10MB: (
                    files: any // eslint-disable-line
                  ) => files[0].size < 10 * 1024 * 1024 || "Max 5MB",
                  // eslint-disable-next-line
                  acceptedFormats: (files: any) => {
                    setFileName(files[0].name);
                    if (files[0] && files[0].type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(files[0]);
                    } else {
                      setImagePreview(null);
                    }
                    return (
                      ["image/jpeg", "image/png", "image/gif"].includes(
                        files[0].type
                      ) || "Only PNG, JPEG e GIF"
                    );
                  },
                },
              })}
              // onChange={onImageChange}
            />
          </label>
          {errors.image && (
            <p className="text-sm text-red-500 mt-2">
              * {errors.image.message}
            </p>
          )}
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width="0"
                height="0"
                sizes="100vw"
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
          )}

          <div className="relative flex items-center mt-6">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Address is required",
                },
              })}
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
            />
          </div>
          {errors.email?.message ? (
            <p className="text-sm text-gray-500 mt-2">
              * {errors.email.message}
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
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const errors = [];
                  if (value.length < 8) {
                    errors.push("Password must be at least 8 characters long");
                  }
                  if (!/[a-z]/.test(value)) {
                    errors.push(
                      "Password must contain at least one lowercase letter"
                    );
                  }
                  if (!/[A-Z]/.test(value)) {
                    errors.push(
                      "Password must contain at least one uppercase letter"
                    );
                  }
                  if (!/\d/.test(value)) {
                    errors.push("Password must contain at least one number");
                  }
                  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    errors.push("Password must contain at least one symbol");
                  }
                  return errors.length > 0 ? errors.join(", ") : true;
                },
              })}
            />
          </div>
          {errors.password?.message ? (
            <p className="text-sm text-gray-500 mt-2">
              * {errors.password.message}
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
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 :border-cyan-300 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-gray-500 mt-2">
              * {errors.confirmPassword.message}
            </p>
          ) : null}
          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center ">
              <Link
                href="signin"
                className="text-sm text-cyan-500 hover:underline "
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
