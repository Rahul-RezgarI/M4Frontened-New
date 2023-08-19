import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSidebarContext } from "../context/toggle.context";
import logo from "../assets/brands/logo.png";
import Image from "next/image";

function Header() {
  const { data: session } = useSession();

  const { toggleSidebar } = useSidebarContext();

  const handleLogut = () => {
    signOut();
  };

  return (
    <div className="sticky z-40 top-0 bg-[#003049] h-16 min-w-max flex justify-between items-center px-2 lg:px-36 overflow-hidden">
      <div className="flex items-center lg:justify-between w-1/2">
        <div onClick={toggleSidebar}>
          <svg
            className="md:hidden mr-4 peer"
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12V10.5H18V12H0ZM0 6.75V5.25H18V6.75H0ZM0 1.5V0H18V1.5H0Z"
              fill="white"
            />
          </svg>
        </div>
        <Link href={"/"} className="text-[14px] lg:text-3xl text-white">
          <Image
            src={logo}
            alt="plant"
            className="h-5 w-auto lg:h-[50px] cursor-pointer hover:ease-linear"
          />
        </Link>
      </div>
      {session ? (
        <div className="text-white flex items-center">
          <i
            onClick={handleLogut}
            className="ri-logout-box-line text-xl m-2 cursor-pointer"
          ></i>
          <span className="hidden lg:block"> {session?.user?.email}</span>
        </div>
      ) : (
        <Link
          href={"/auth/signup"}
          className="relative lg:inline-flex text-sm sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-[#003049] bg-white hover:bg-slate-400 focus:border-[#B3B3FD] px-4 py-1 sm:py-1.5 sm:px-5"
        >
          Sign Up
        </Link>
      )}
    </div>
  );
}

export default Header;
