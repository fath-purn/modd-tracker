"use client";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";

export default function NavLink() {
  return (
    <>
      <div className="bg-[#15b790] md:px-10 md:rounded-full pb-1 md:pb-0">
        <ul className="flex flex-row items-center uppercase gap-8 font-semibold">
          <li className="flex rounded-sm text-sm md:flex-row md:items-center space-x-10 md:rounded-full ">
            <Link
              href="/"
              className="px-3 cursor-pointer py-1 mx-[17px] focus:outline-none"
            >
              Entri
            </Link>
          </li>
          <li>
            <Link
              href="/mood/add"
              className="block relative bottom-4 rounded-full hover:scale-110 border border-gray-100 hover:bg-gray-800 transition duration-300 cursor-pointer"
            >
              <IoAddOutline className="size-15 bg-white text-[#15b790] rounded-full border-4 border-[#15b790] shadow-lg focus:outline-none" />
            </Link>
          </li>
          <li>
            <Link
              href="/statistik"
              className="px-3 cursor-pointer py-1 focus:outline-none"
            >
              Statistik
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
