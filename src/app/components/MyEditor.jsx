import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";

const EDITOR_HOLDER_ID = "editorjs";

const Editor = ({ data, onChange, holder }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: holder || EDITOR_HOLDER_ID,
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
        linkTool: LinkTool,
        inlineCode: InlineCode,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload-image", // Ваш эндпоинт для загрузки изображений
            },
          },
        },
      },
      data: data || {},
      async onChange(api) {
        const content = await api.saver.save();
        onChange(content);
      },
    });

    editorRef.current = editor;
  };

  return <div id={holder || EDITOR_HOLDER_ID} />;
};

export default Editor;
