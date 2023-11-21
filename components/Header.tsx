"use client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "./AuthValidate";

type Props = {};

const Header = (props: Props) => {
  // const signOut = async () => {
  //   "use server";

  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   await supabase.auth.signOut();
  //   return redirect("/login");
  // };
  return (
    <header className="sticky top-0 z-40 w-full flex">
      <nav className="flex border-b-2 justify-end items-center p-4  z-50 bg-white relative lg:px-6 w-full">
        <button
          onClick={() => console.log(456)}
          className="p-2 text-sm flex justify-center items-center gap-2 text-white cursor-pointer px-4 rounded-md hover:bg-gray-800 bg-black"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
