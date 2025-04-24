import { AuthForm } from "@/components/AuthForm";
import styles from "./../page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function User() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session");
  const sessionValue = sessionCookie?.value;

  if (!sessionValue) {
    redirect(`/login`);
  }

  return (
    <div>
      <h1>Админка пользователя</h1>
      <div>{sessionValue}</div>
      <div>
        <span>Регистрация</span>
        <AuthForm type="register" />
      </div>
    </div>
  );
}
