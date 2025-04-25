import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession() as {
    data: {
      user: {
        user: any;
        email: string;
        role: string;
      };
    } | null;
  };

  return <div></div>;
}
