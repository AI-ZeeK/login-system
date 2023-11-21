"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect, useRouter } from "next/navigation";
const cookieStore = cookies();

export const signIn = async (formData: any) => {
  const email = formData.email;
  const password = formData.password;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const signUp = async (formData: any) => {
  const origin = headers().get("origin");
  const email = formData.email;
  const password = formData.password;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/login/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};

export const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient(cookieStore);
    return true;
  } catch (e) {
    return false;
  }
};

export const signOut = async () => {
  console.log(1);
  const cookieStore = cookies();
  console.log(2);
  const supabase = createClient(cookieStore);
  console.log(3);
  await supabase.auth.signOut();
  console.log(4);
  return redirect("/login");
};
