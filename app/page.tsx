"use client";
import PageWrapper from "@/components/PageWrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default async function Index() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.AppReducer);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // const {
  //   //   data: { user },
  //   // } = await supabase.auth.getUser();
  //   // dispatch(setUser(user));
  //   if (!user) {
  //     router.push("/");
  //   }*
  // }, []);

  console.log(user, user, 789);
  return (
    <PageWrapper modeKey="home">
      <Header />
      <div className="justify-center w-full flex flex-col gap-20 items-center py-8">
        <div className="p-2 bg-red-900 flex max-w-[26rem] flex-col gap-4 rounded-md my-shadow-md justify-start items-center cursor-pointer">
          <div className="rounded-md overflow-hidden min-h-[10rem] h-52 w-full flex justify-center items-center relative file-box">
            <>
              <div className="bg-gray-100 flex justify-center items-center h-full w-full ">
                <div className="text-4xl font-semibold flex w-full justify-center items-center bg-gray-200">
                  {/* {user && user.email.slice(0, 1)} */}
                </div>
                <div>
                  <span>Email</span>
                  {/* <span>{user && user.email}</span> */}
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
