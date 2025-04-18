"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(data) {
  // Эмуляция запроса к API
  const response = await fetch(`${process.env.URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Неверный email или пароль");
  }

  const { token } = await response.json();

  // Сохраняем токен в куки
  cookies().set("session", token, { secure: true });

  // Перенаправляем на страницу пользователя
  redirect(`/user`);
}

export async function signUp(data) {
  const response = await fetch(`${process.env.URL}auth/register`, {
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
  cookies().set("session", token, { secure: true });
}

export async function signOut() {
  cookies().delete("session");
  redirect("/login");
}
