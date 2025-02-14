"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { SignUpFormSchema } from "./signup/signUpFormSchema";
import { LoginFormSchema } from "./login/loginFormSchema";
import { ROUTES } from "../constants/routes";

export async function login(formData: LoginFormSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect(ROUTES.ERROR.GENERIC);
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.DASHBOARD.HOME);
}

export async function signup(formData: SignUpFormSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        display_name: formData.name,
      },
    },
  });
  if (error) {
    redirect(ROUTES.ERROR.GENERIC);
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.DASHBOARD.HOME);
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect(ROUTES.ERROR.GENERIC);
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.AUTH.LOGIN);
}
