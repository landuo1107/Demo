import commonModel from "@/models/common.model";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const mdParser = new MarkdownIt();

export default ({ value, onChange }: MarkdownEditorProps) => {
  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    onChange!(text);
  };

  const handleImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await commonModel.fileUpload(formData);
    return res?.data;
  };

  return (
    <MdEditor
      style={{ height: "400px" }}
      defaultValue={value}
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      onImageUpload={handleImageUpload}
    />
  );
};
