"use client";
import { signIn, signUp } from "@/components/AuthValidate";
import Input from "@/components/Input/Input";
import PageWrapper from "@/components/PageWrapper";
import Spinner from "@/components/Spinner";
import { createClient } from "@/utils/supabase/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { cookies, headers } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const UpdatePassword = (props: Props) => {
  const [PIN, setPIN] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });
    if (data) {
      toast("password updated successfully");
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
      setLoading(false);
      return router.push("/login");
    }

    if (error) {
      toast("password reset unsuccessful");
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
      return setLoading(false);
    }
  };

  const handleInputChange = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PageWrapper modeKey="auth">
      {loading && <Spinner />}

      <div className="p-8 min-h-screen flex justify-center items-center">
        <div className="p-4 py-8 border rounded-md shadow-md flex flex-col justify-center items-center gap-8 min-w-[20rem] max-w-[30rem] w-full">
          <h3 className="font-semibold text-3xl">Update password</h3>
          <motion.form
            action="
          "
            onSubmit={handleResetPassword}
            transition={{
              delay: 0.25,
              ease: "easeOut",
              duration: 0.5,
              type: "spring",
            }}
            className="flex flex-col gap-4 w-full justify-center items-center"
          >
            <section className="grid gap-4 w-full">
              <Input
                modeKey={"Password"}
                label={"Password"}
                password
                placeholder={"Enter your password"}
                setShowPassword={setPIN}
                showPassword={PIN}
                name={"password"}
                value={formData.password}
                onChange={handleInputChange}
              />

              <button className="bg-teal-800 transition-all hover:bg-teal-600 p-2 px-4 rounded-md text-white text-sm uppercase shadow-md w-full">
                Update Password{" "}
              </button>
            </section>
          </motion.form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UpdatePassword;
