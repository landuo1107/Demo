import cexModel from "@/models/cex.model";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, ImageProps, Space, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useRef } from "react";

interface UploadSingleImageProps {
  value?: string;
  onChange?: (value: string) => void;
  crop?: boolean;
  imageProps?: ImageProps;
}

export default ({
  value,
  onChange,
  crop = false,
  imageProps,
}: UploadSingleImageProps) => {
  const ref = useRef<any>(null);

  const Comp = (
    <Upload
      accept="image/png, image/jpeg"
      maxCount={1}
      showUploadList={false}
      action={async (file) => {
        const formData = new FormData();
        formData.append("uploadFile", file);
        const res = await cexModel.fileUpload(formData);
        onChange!(res?.data);
        return res?.data;
      }}
    >
      <Button
        style={{ display: value ? "none" : "block" }}
        ref={ref}
        icon={<UploadOutlined />}
      >
        上传
      </Button>
    </Upload>
  );
  return (
    <div>
      {crop ? <ImgCrop rotate>{Comp}</ImgCrop> : Comp}
      {value && (
        <Image
          {...imageProps}
          src={value}
          preview={{
            mask: (
              <Space direction="vertical">
                <Button type="primary" size="small">
                  图片预览
                </Button>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    ref?.current?.click();
                  }}
                >
                  重新上传
                </Button>
              </Space>
            ),
          }}
        />
      )}
    </div>
  );
};
