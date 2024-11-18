import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { auth, signOut } from '@/auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/">
          <h3>LMS Om Nyaman</h3>
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-900">
            {/* Menu for users */}
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/artikel">Artikel</Link>
            </li>
            {session && (
              <>
                {session?.user.role == 'user' ? (
                  <>
                    <li>
                      <Link href="/kelas">Kelas</Link>
                    </li>
                    <li>
                      <Link href="/tugas">Tugas</Link>
                    </li>
                  </>
                ) : null}
                {session?.user.role === 'admin' ? (
                  <>
                    <li>
                      <Link href="/kelas-admin">Management Kelas</Link>
                    </li>
                    <li>
                      <Link href="/manage-artikel">Manage Artikel</Link>
                    </li>
                    <li>
                      <Link href="/mahasiswa">Mahasiswa</Link>
                    </li>
                  </>
                ) : null}
              </>
            )}
          </ul>

          {session ? (
            <div className="flex gap-3 items-center">
              {/* User Info */}
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-gray-600 text-right capitalize">
                  {session.user.name}
                </span>
                <span className="font-xs text-gray-400 text-right capitalize">
                  {session.user.role}
                </span>
              </div>

              {/* User Avatar */}
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  src={session.user.image || '/avatar.png'}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          ) : null}

          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
              }}
            >
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
