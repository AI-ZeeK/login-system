"use client";
import Input from "@/components/Input/Input";
import PageWrapper from "@/components/PageWrapper";
import Spinner from "@/components/Spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AnimatePresence, motion } from "framer-motion";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email
    );
    if (data) {
      toast("password reset link sent ");
      setFormData((prev) => ({
        ...prev,
        email: "",
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
          <h3 className="font-semibold text-3xl">Forgot password?</h3>
          <motion.form
            action="
          "
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4 w-full justify-center items-center"
          >
            <section className="grid gap-4 w-full">
              <Input
                modeKey={"Email"}
                label={"Email"}
                type="email"
                placeholder={"Enter your email address"}
                name={"email"}
                value={formData.email}
                onChange={handleInputChange}
              />

              <button className="bg-teal-800 transition-all hover:bg-teal-600 p-2 px-4 rounded-md text-white text-sm uppercase shadow-md w-full">
                Send Reset Link{" "}
              </button>
            </section>
          </motion.form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ForgotPassword;
