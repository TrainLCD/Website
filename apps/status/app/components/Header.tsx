import Link from "next/link";
import React from "react";
import AppLogo from "./AppLogo";

const Header: React.FC = () => {
  return (
    <header className="border-b h-16 md:px-16 p-4 bg-white fixed top-0 w-full">
      <Link className="inline-flex flex-row items-center" href="/">
        <AppLogo className="size-8" />
        <span className="text-neutral-800 font-semibold ml-2 md:text-xl text-lg">
          Status
        </span>
      </Link>
    </header>
  );
};

export default Header;
