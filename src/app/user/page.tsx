"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Editor from "../components/MyEditor";
import UserProfile from "../components/UserProfile";

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

        <h3>Создать блог</h3>

        <form>
          <div>
            <label htmlFor="title">Заголовок</label>
            <input
              type="text"
              id="title"
              placeholder="Введите заголовок блога"
              required
            />
          </div>
          <div>
            <label htmlFor="content">Содержание</label>
          </div>
          <button onClick={handleSave}>Сохранить</button>
        </form>

        <div>
          <label>Изображения (максимум 5)</label>
          <div className="flex items-center space-x-4">
            <button type="button">Добавить изображения</button>
            <span className="text-sm text-gray-500">
              {images.length} / 5 загружено
            </span>
          </div>
          <input type="file" className="hidden" accept="image/*" multiple />
        </div>
      </div>
    </div>
  );
}
