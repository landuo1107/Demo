import { getRowsFromWorkbook, readExcelFromBuffer } from "@/utils/excel";
import { downloadFromUrl, openFile } from "@/utils/file";
import { ClearOutlined, UploadOutlined } from "@ant-design/icons";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { CellValue } from "exceljs";
import styles from "./index.module.less";

interface ImportExcelProps {
  value?: Record<string, CellValue>[] | null;
  onChange?: (value: Record<string, CellValue>[] | null) => void;
  templateUrl?: string;
  columns?: ProColumns[];
}

export default ({
  value,
  onChange,
  columns = [
    {
      title: "手机号",
      dataIndex: "mobile",
    },
    {
      title: "数量",
      dataIndex: "quantity",
    },
  ],
  templateUrl = `${import.meta.env.VITE_API_URL}/static/templates/白名单.xlsx`,
}: ImportExcelProps) => {
  return (
    <ProTable
      className={styles.container}
      rowKey="mobile"
      search={false}
      pagination={{
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 200, 500, 1000, 2000],
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={async () => {
            const buffer = await openFile();
            message.loading("正在导入", 30);
            const wb = await readExcelFromBuffer(buffer as ArrayBuffer);
            const rows = getRowsFromWorkbook(
              wb,
              columns.map((c) => c.dataIndex?.toString() ?? "")
            );
            onChange && onChange(rows);
            message.success("导入成功", 1, () => {
              message.destroy();
            });
          }}
        >
          导入
        </Button>,
        <Button
          icon={<ClearOutlined />}
          onClick={() => {
            onChange && onChange([]);
          }}
        >
          清空
        </Button>,
        <Button
          onClick={() => {
            downloadFromUrl(templateUrl);
          }}
        >
          下载模板
        </Button>,
      ]}
      columns={columns}
      dataSource={value ?? []}
    />
  );
};
