// app/page.tsx (Server Component)
import Header from "@/components/Header";
import { cookies } from "next/headers";
import User from "../user/page";

export default async function ifcookies() {
  const sessionToken: string | undefined = (await cookies()).get(
    "session"
  )?.value;
  console.log(sessionToken);

  return (
    <div>
      <Header sessionToken={sessionToken} />
    </div>
  );
}
