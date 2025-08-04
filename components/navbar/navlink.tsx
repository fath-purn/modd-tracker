"use client";
import { IoClose, IoMenu, IoAddOutline } from "react-icons/io5";
import clsx from "clsx";
import Link from "next/link";

export default function NavLink() {
  return (
    <>
      <div className="bg-gray-900 text-gray-200 px-10 rounded-full">
        <ul className="flex flex-col font-semibold rounded-sm text-sm uppercase md:flex-row md:items-center space-x-10">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-200 hover:bg-gray-800 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Entri
            </Link>
          </li>
          <li>
            <Link
              href="/mood/add"
              className="block py-2 px-3 relative bottom-5 rounded-full text-gray-200 border-2 hover:scale-110 border-gray-800 hover:bg-gray-800 transition duration-300 md:hover:bg-transparent md:p-0"
            >
              <IoAddOutline className="size-13 bg-gray-900 border-2 border-gray-200 shadow rounded-full" />
            </Link>
          </li>
          <li>
            <Link
              href="/statistik"
              className="block py-2 px-3 text-gray-200 hover:bg-gray-800 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Statistik
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
