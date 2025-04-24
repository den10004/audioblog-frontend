"use client";
import styles from "./../page.module.css";
import Cookies from "js-cookie";

export default function User() {
  const sessionCookieValue: string | undefined = Cookies.get("session");

  return (
    <div>
      <h1>Админка пользователя</h1>

      <div>{sessionCookieValue}</div>
      <div>
        <span>Регистрация</span>
      </div>
    </div>
  );
}
