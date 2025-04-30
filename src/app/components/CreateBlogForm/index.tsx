"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";

interface EditorData {
  blocks: Array<any>;
}

export default function CreateBlogForm() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editorRef = useRef<EditorJS | null>(null);

  const initEditor = useCallback(async () => {
    try {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Code = (await import("@editorjs/code")).default;
      const LinkTool = (await import("@editorjs/link")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;
      const ImageTool = (await import("@editorjs/image")).default;

      // Уничтожаем предыдущий экземпляр, если есть
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        await editorRef.current.destroy();
      }

      const editor = new EditorJS({
        holder: "editor",
        onReady: () => {
          editorRef.current = editor;
          setIsEditorReady(true);
          console.log("Editor.js is ready");
        },
        onChange: async () => {
          console.log("Editor content changed");
        },
        onDestroy: () => {
          console.log("Editor.js destroyed");
          editorRef.current = null;
          setIsEditorReady(false);
        },
        placeholder: "Начните писать ваш пост...",
        inlineToolbar: true,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Введите заголовок",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: Code,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/fetchUrl",
            },
          },
          inlineCode: InlineCode,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // Здесь должна быть логика загрузки изображений
                  return {
                    success: 1,
                    file: {
                      url: URL.createObjectURL(file),
                    },
                  };
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error initializing editor:", error);
      setError("Не удалось загрузить редактор контента");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initEditor();

      return () => {
        if (
          editorRef.current &&
          typeof editorRef.current.destroy === "function"
        ) {
          editorRef.current.destroy();
        }
      };
    }
  }, [isMounted, initEditor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Валидация заголовка
      if (!title.trim()) {
        throw new Error("Название поста обязательно");
      }

      // Проверка готовности редактора
      if (!editorRef.current || !isEditorReady) {
        throw new Error("Редактор контента не готов");
      }

      // Проверка наличия метода save
      if (typeof editorRef.current.save !== "function") {
        throw new Error("Редактор контента недоступен");
      }

      // Сохранение данных редактора
      const editorData = await editorRef.current.save().catch((error) => {
        console.error("Error saving editor content:", error);
        throw new Error("Не удалось сохранить содержимое");
      });

      // Валидация содержимого
      if (!editorData?.blocks || editorData.blocks.length === 0) {
        throw new Error("Содержание поста не может быть пустым");
      }

      // Отправка данных на сервер
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: editorData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Ошибка при сохранении поста");
      }

      const data = await response.json();
      router.push(`/blog/${data.id}`);
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        err instanceof Error ? err.message : "Произошла неизвестная ошибка"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  if (error && !isEditorReady) {
    return (
      <div>
        <h1>Создать новый блог</h1>
        <div>{error}</div>
        <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "1000px",
        padding: "0 20px",
      }}
    >
      <h1>Создать новый блог</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Название поста</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название поста"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label>Содержание поста</label>
          <div
            id="editor"
            style={{
              display: isEditorReady ? "block" : "none",
              border: "1px solid black",
            }}
          />
          {!isEditorReady && <div>Загрузка редактора...</div>}
        </div>

        <div>
          <button type="submit" disabled={isLoading || !isEditorReady}>
            {isLoading ? "Сохранение..." : "Опубликовать"}
          </button>
        </div>
      </form>
    </div>
  );
}
