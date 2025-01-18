'use client';

import Footer from '@/app/component/Footer';
import Header from '@/app/component/Header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  name: string;
  username: string;
  image: FileList;
  password: string;
  confirmPassword: string;
}

export default function Page(): ReactElement {
  const { data: session, update } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  function undoProfile() {
    setImagePreview(null);
    resetField('image');
  }
  async function sendEmailVerification() {
    setLoading(true);
    setLoadingId(1);
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-email/emailConfirmation`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session!.access_token}`,
        },
      },
    );
    if (req.ok) {
      toast({
        title: 'Email Verification sent successfully',
        duration: 5000,
      });
    } else {
      const errorRes = await req.json();
      setShowDialog(true);
      setDialogMessage(errorRes.message || 'An error occurred');
    }
    setLoading(false);
  }
  async function onSubmit(data: ProfileFormData) {
    setLoading(true);
    setLoadingId(0);
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.username) {
      formData.append('username', data.username);
    }
    if (data.image[0]) {
      formData.append('file', data.image[0]);
    }
    if (data.password) {
      formData.append('password', data.password);
    }
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session!.user.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session!.access_token}`,
        },
        body: formData,
      },
    );
    if (req.ok) {
      toast({
        title: 'Profile Updated',
        duration: 5000,
      });
      reset();
      undoProfile();
      await update();
    } else {
      const errorRes = await req.json();
      setShowDialog(true);
      setDialogMessage(errorRes.message || 'An error occurred');
    }
    setLoading(false);
  }
  return (
    <main>
      <Header />
      <section className="min-h-[calc(100svh-80px)] px-4 py-12 sm:px-24 flex jusify-center items-center">
        <div className="max-w-xl mx-auto p-4 space-y-8 border w-full rounded-xl">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-gray-600 text-sm mt-2">
              Manage your public profile information
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 items-center">
              <label
                htmlFor="file"
                className="group hover:cursor-pointer shrink-0"
              >
                <Image
                  src={
                    !imagePreview
                      ? (session?.user?.image as string)
                        ? (session?.user?.image as string)
                        : `https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg`
                      : imagePreview
                  }
                  alt="avatar"
                  className="w-20 h-20 rounded-full group-hover:hidden"
                  width="0"
                  height="0"
                  sizes="100vw"
                />
                <div className="w-20 h-20 rounded-full bg-gray-300 items-center justify-center text-white hidden group-hover:flex">
                  <Icon icon="eva:edit-fill" width="24" height="24" />
                </div>
                <input
                  {...register('image', {
                    validate: {
                      lessThan10MB: (
                        files: any, // eslint-disable-line
                      ) => {
                        if (!files[0]) {
                          return true;
                        } else {
                          return (
                            (files[0] && files[0].size < 10 * 1024 * 1024) ||
                            'Max 5MB'
                          );
                        }
                      },
                      // eslint-disable-next-line
                      acceptedFormats: (files: any) => {
                        if (!files[0]) {
                          return true;
                        }
                        if (files[0]) {
                          if (files[0].type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(files[0]);
                          } else {
                            setImagePreview(null);
                          }
                          return (
                            ['image/jpeg', 'image/png', 'image/gif'].includes(
                              files[0].type,
                            ) || 'Only PNG, JPEG e GIF'
                          );
                        } else {
                          setImagePreview(null);
                          return 'No file selected';
                        }
                      },
                    },
                  })}
                  id="file"
                  type="file"
                  className="hidden"
                />
              </label>
              <div className="">
                <h2 className="font-medium text-xl">Profile Picture</h2>
                <p className="text-sm text-gray-500">
                  Click on the avatar to upload a custom one from your files.
                </p>
              </div>
              {!imagePreview ? null : (
                <button
                  type="button"
                  onClick={undoProfile}
                  className="text-white p-2 bg-red-500 rounded-xl"
                >
                  <Icon icon="eva:trash-2-fill" width="24" height="24" />
                </button>
              )}
            </div>

            {errors.image && (
              <p className="text-sm text-red-500 mt-2">
                * {errors.image.message}
              </p>
            )}
            <div className="mt-12">
              <label htmlFor="name" className="font-medium text-base">
                Name
              </label>
              <input
                {...register('name', {
                  minLength: {
                    value: 4,
                    message: 'Name must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 128,
                    message: 'Name must be at most 32 characters long',
                  },
                })}
                type="text"
                id="name"
                className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                placeholder={session?.user?.name}
              />
              <p className="text-sm text-gray-500 my-2">
                This is your public display name in your profile.
              </p>
            </div>
            {errors.name?.message ? (
              <p className="text-sm text-gray-500 mt-2">
                * {errors.name.message}
              </p>
            ) : null}
            <div className="mt-4">
              <label htmlFor="username" className="font-medium text-base">
                Username
              </label>
              <input
                {...register('username', {
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 32,
                    message: 'Username must be at most 32 characters long',
                  },
                })}
                type="text"
                id="username"
                className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                placeholder={session?.user?.username}
              />
              <p className="text-sm text-gray-500 my-2">
                This is your public display username.
              </p>
            </div>
            {errors.username?.message ? (
              <p className="text-sm text-gray-500 mt-2">
                * {errors.username.message}
              </p>
            ) : null}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <label htmlFor="email" className="font-medium text-base">
                  Email
                </label>
                {session?.user?.emailVerified ? (
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="icon-park-solid:success"
                      width="16"
                      height="16"
                      className="text-green-500"
                    />
                    <p className="text-sm text-green-500">Email verified</p>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="fluent-color:warning-16"
                      width="16"
                      height="16"
                    />
                    <p className="text-sm text-yellow-500">
                      Email not verified
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                  placeholder={session?.user?.email}
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
              {session?.user.emailVerified ? null : (
                <button
                  type="button"
                  onClick={sendEmailVerification}
                  className="flex gap-2 items-center mt-4 bg-sky-500 text-white border-2 border-transparent px-4 py-2 rounded-md hover:border-sky-500 hover:text-sky-500 hover:bg-white active:bg-sky-500 duration-200"
                >
                  {loading && loadingId == 1 ? (
                    <Icon icon="eos-icons:loading" width="24" height="24" />
                  ) : null}
                  Re-send Email Verification
                </button>
              )}
            </div>
            <div className="mt-8 font-bold text-lg">
              <h3>Credentials</h3>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="font-medium text-base">
                Password
              </label>
              <input
                {...register('password', {
                  required: false,
                  validate: (value) => {
                    const errors = [];
                    if (!value) {
                      return true;
                    }
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
                      errors.push('Password must contain at least one number');
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      errors.push('Password must contain at least one symbol');
                    }
                    return errors.length > 0 ? errors.join(', ') : true;
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                placeholder="********"
              />
            </div>
            {errors.password?.message ? (
              <p className="text-sm text-gray-500 mt-2">
                * {errors.password.message}
              </p>
            ) : null}
            <div className="mt-4">
              <label
                htmlFor="confirm-password"
                className="font-medium text-base"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword', {
                    required: false,
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  className="w-full border rounded-lg border-gray-300 focus:border-gray-500 text-base px-4 py-2 mt-2"
                  placeholder="********"
                />

                {showPassword ? (
                  <Icon
                    icon="mdi:show"
                    className="text-xl hover:text-gray-500 duration-200 absolute right-4 top-5"
                    onClick={() => setShowPassword(!showPassword)}
                  ></Icon>
                ) : (
                  <Icon
                    onClick={() => setShowPassword(!showPassword)}
                    icon="mdi:hide"
                    className="text-xl hover:text-gray-500 duration-200 absolute right-4 top-5"
                  ></Icon>
                )}
              </div>
            </div>
            {errors.confirmPassword?.message ? (
              <p className="text-sm text-gray-500 mt-2">
                * {errors.confirmPassword.message}
              </p>
            ) : null}
            <button className="flex gap-2 items-center mt-4 bg-sky-500 text-white border-2 border-transparent px-4 py-2 rounded-md hover:border-sky-500 hover:text-sky-500 hover:bg-white active:bg-sky-500 duration-200">
              {loading && loadingId == 0 ? (
                <Icon icon="eos-icons:loading" width="24" height="24" />
              ) : null}
              Update Profile
            </button>
          </form>
          <div></div>
        </div>
      </section>
      <Footer />
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
