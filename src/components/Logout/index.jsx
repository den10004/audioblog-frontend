import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Logout() {
  const cookieStore = cookies();

  const deleteCookie = () => {
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
    redirect(`/`);
  };

  return (
    <div>
      <button onClick={deleteCookie}>Выход</button>
    </div>
  );
}
