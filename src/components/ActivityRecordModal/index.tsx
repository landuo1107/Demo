import activityModel from "@/models/activity.model";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Modal, ModalProps, message } from "antd";
import { useRef } from "react";
import { groupBy, orderBy } from "lodash";
import Excel from "exceljs";
import dayjs from "dayjs";
import { downloadFromBuffer } from "@/utils/file";

interface ActivityRecordModalProps extends ModalProps {
  activity?: any;
  onOpenChange: (visible: boolean) => void;
}

export default ({
  activity,
  onOpenChange,
  ...props
}: ActivityRecordModalProps) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      readonly: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "姓名",
      dataIndex: "realname",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
    },
    {
      title: "日志",
      dataIndex: "description",
      hideInSearch: true,
    },
    {
      title: "时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
    },
  ];
  return (
    <Modal
      title={activity?.title}
      width="80%"
      {...props}
      destroyOnClose
      footer={false}
      onCancel={(e) => {
        props.onCancel && props.onCancel(e);
        onOpenChange(false);
      }}
      onOk={(e) => {
        props.onOk && props.onOk(e);
        onOpenChange(false);
      }}
    >
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            danger
            onClick={async () => {
              message.loading("正在快照", 10);
              const res = await activityModel.recordList({
                id: activity?.id,
                page: 1,
                pageSize: 100000,
              });
              if (res?.success) {
                let result = res?.data?.list ?? [];
                result = groupBy(result, "description");
                const list: any = {};
                Object.keys(result).map((k) => {
                  const items = result[k] ?? [];
                  list[k] = groupBy(items, "userMobile");
                });

                const fileName = `${activity?.title}-${
                  activity?.id
                }-${dayjs().format("YYYY年MM月DD日HH点mm分ss秒")}-快照`;
                const workbook = new Excel.Workbook();

                Object.keys(list).map((k) => {
                  const data = list[k];
                  const items = orderBy(
                    Object.keys(data).map((key) => {
                      const item = data[key];
                      return {
                        mobile: key,
                        count: item.length,
                      };
                    }),
                    "count",
                    "desc"
                  );

                  const sheet = workbook.addWorksheet(k);

                  sheet.columns = [
                    {
                      header: "手机号",
                      key: "mobile",
                    },
                    {
                      header: "数量",
                      key: "count",
                    },
                  ];

                  sheet.addRows(items ?? []);
                });

                const buffer = await workbook.xlsx.writeBuffer();
                downloadFromBuffer(buffer as Buffer, `${fileName}.xlsx`);

                message.success("快照成功", 1, () => {
                  message.destroy();
                });
              }
            }}
          >
            快照
          </Button>,
        ]}
        request={async (params: any) => {
          const res = await activityModel.recordList({
            ...params,
            id: activity?.id,
            page: params.current ?? 1,
            pageSize: params.pageSize ?? 10,
          });
          return {
            success: res?.success,
            total: res.data?.total,
            current: res.data?.page ?? 1,
            pageSize: res.data?.pageSize ?? 10,
            data: res.data?.list ?? [],
          };
        }}
      />
    </Modal>
  );
};
