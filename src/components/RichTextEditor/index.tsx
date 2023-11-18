import constants from "@/constants";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.less";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default ({ value, onChange }: RichTextEditorProps) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = useMemo(() => {
    const token = localStorage.getItem("admin-token");
    return {
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          server: `${constants.apiUrl}/api/v1/cex/upload`,
          fieldName: "file",
          headers: { Authorization: "Bearer " + token },
          timeout: 30 * 1000,
          maxFileSize: 50 * 1024 * 1024,
          base64LimitSize: 5 * 1024,
        },
        uploadVideo: {
          server: `${constants.apiUrl}/api/v1/cex/upload`,
          fieldName: "file",
          headers: { Authorization: "Bearer " + token },
          timeout: 30 * 1000,
          maxFileSize: 50 * 1024 * 1024,
          base64LimitSize: 5 * 1024,
        },
      },
    };
  }, []);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className={styles.container}>
      <Toolbar
        className={styles.toolbar}
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
      />
      <Editor
        className={styles.editor}
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={(editor) => onChange && onChange(editor.getHtml())}
        mode="default"
      />
    </div>
  );
};
