import { AuthForm } from "@/components/AuthForm";
import styles from "./../page.module.css";
import { cookies } from "next/headers";

export default async function User() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session");
  const sessionValue = sessionCookie?.value;

  if (!sessionValue) {
    return <div>Войдите</div>;
  }

  return (
    <div>
      <h1>Админка пользователя</h1>
      <div>{sessionValue}</div>
      <div>
        <span>Регистрация</span>

        <AuthForm type="regist" />
      </div>
    </div>
  );
}
