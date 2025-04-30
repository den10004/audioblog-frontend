"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import CreateBlogForm from "../components/CreateBlogForm";

export default function UserPage() {
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [content, setContent] = useState(null);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/auth/login";
    },
  });

  useEffect(() => {
    if (!status) {
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const handleSave = () => {
    console.log("handleSave");
  };

  return (
    <div>
      <div>
        <h1>
          Пользователь <UserProfile />
        </h1>
        <p>Роль </p>
        <CreateBlogForm />
      </div>
    </div>
  );
}
