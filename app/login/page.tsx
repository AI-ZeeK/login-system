"use client";
import { signIn, signUp } from "@/components/AuthValidate";
import Input from "@/components/Input/Input";
import PageWrapper from "@/components/PageWrapper";
import Spinner from "@/components/Spinner";
import { setUser } from "@/redux/features/AppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createClient } from "@/utils/supabase/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const Auth = (props: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [PIN, setPIN] = useState(false);
  const [CPIN, setCPIN] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { user } = useAppSelector((state) => state.AppReducer);
  // const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      dispatch(setUser(user));
      setLoading(false);
      console.log(user, 789);
    }
    if (user) {
      router.push("/");
    }
    getUser();
  }, [user]);

  const handleAuthValidate = async (e: any) => {
    e.preventDefault();
    if (isLogin) {
      setLoading(true);
      signIn(formData);
    } else {
      if (formData.password !== formData.confirm_password)
        return toast("Password and Confirm Password don't match");
      setLoading(true);
      await signUp(formData);
      toast("Check email to continue sign in process", { autoClose: 10000 });
    }
  };

  return (
    <PageWrapper modeKey="auth">
      {loading && <Spinner />}

      <div className="p-8 min-h-screen flex justify-center items-center">
        <div className="p-4 py-8 border rounded-md shadow-md flex flex-col justify-center items-center gap-8 min-w-[20rem] max-w-[45rem] w-full">
          <h3 className="font-semibold text-3xl">
            {isLogin ? "Login" : "Register"}
          </h3>
          <motion.form
            action="
          "
            onSubmit={handleAuthValidate}
            className="flex flex-col gap-4 w-full justify-center items-center"
          >
            <section className="grid sm:grid-cols-2 gap-4 w-full">
              {/* {!isLogin && (
                <>
                  <Input
                    modeKey={"First Name"}
                    label={"First Name"}
                    placeholder={"Enter your first name"}
                    name={"first_name"}
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                  <Input
                    modeKey={"Last Name"}
                    label={"Last Name"}
                    placeholder={"Enter your last name"}
                    name={"last_name"}
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </>
              )} */}

              <Input
                modeKey={"Email"}
                label={"Email"}
                type="email"
                placeholder={"Enter your email address"}
                name={"email"}
                value={formData.email}
                onChange={handleInputChange}
              />
              {isLogin ? (
                <div className="flex flex-col text-xs gap-2 w-full">
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
                  <Link
                    href="/forgot-password"
                    className="flex justify-end underline text-sm text-gray-500"
                  >
                    Forgot PIN?
                  </Link>
                </div>
              ) : (
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
              )}

              {!isLogin && (
                <>
                  <Input
                    modeKey={"Confirm Password"}
                    label={"Confirm Password"}
                    password
                    placeholder={"Confirm your password"}
                    setShowPassword={setCPIN}
                    showPassword={CPIN}
                    name={"confirm_password"}
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </section>

            <button className="bg-teal-800 transition-all hover:bg-teal-600 p-2 px-4 rounded-md text-white text-sm uppercase shadow-md w-full">
              {isLogin ? "Login" : "Register"}
            </button>
            <div
              onClick={() => setIsLogin((prev) => !prev)}
              className="hover:underline flex gap-2 text-xs cursor-pointer"
            >
              {isLogin ? (
                <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 200,
                    transition: {
                      ease: "easeOut",
                      duration: 0.5,
                      type: "tween",
                    },
                  }}
                  className="hover:underline transition-all duration-300 flex gap-2 text-xs cursor-pointer"
                >
                  <span>Don't have an account?</span>
                  <span className="text-green-500 font-semibold">Register</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 200,
                    transition: {
                      ease: "easeOut",
                      duration: 0.5,
                      type: "tween",
                    },
                  }}
                  className="hover:underline flex gap-2 text-xs cursor-pointer"
                >
                  <span>Already registered?</span>
                  <span className="text-green-500 font-semibold">Login</span>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Auth;
