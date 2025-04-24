"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Неверный email или пароль");
  }
  const { token } = await response.json();

  (await cookies()).set("session", token, { secure: true });
  redirect(`/user`);
}

export async function signUp(data: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Ошибка регистрации");
  }

  const { token } = await response.json();
  (await cookies()).set("session", token, { secure: true });
}

export async function signOut() {
  (await cookies()).delete("session");
  redirect("/login");
}
