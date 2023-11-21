import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "./AuthValidate";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-40 w-full flex">
      <nav className="flex border-b-2 justify-end items-center p-4  z-50 bg-white relative lg:px-6 w-full">
        <button
          onClick={signOut}
          className="p-2 text-sm flex justify-center items-center gap-2 text-white cursor-pointer px-4 rounded-md hover:bg-gray-800 bg-black"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
