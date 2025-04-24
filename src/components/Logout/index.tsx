"use client";
import { redirect } from "next/navigation";

export default function Logout() {
  const deleteCookie = () => {
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    redirect(`/`);
  };

  return (
    <div>
      <button onClick={deleteCookie}>Выход</button>
    </div>
  );
}
