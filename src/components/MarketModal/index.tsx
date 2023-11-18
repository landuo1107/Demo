import { CopyrightStatusMaps } from "@/enums";
import collectionModel from "@/models/collection.model";
import copyrightModel from "@/models/copyright.model";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { useReactive } from "ahooks";
import { Button, Modal, ModalProps } from "antd";
import { useRef } from "react";
import UserCollectionModal from "../UserCollectionModal";

interface MarketModalProps extends ModalProps {
  collection?: any;
  onOpenChange: (visible: boolean) => void;
}

export default ({ collection, onOpenChange, ...props }: MarketModalProps) => {
  const state = useReactive({
    user: null,
  });
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: "哈希",
      dataIndex: "copyrightHash",
      width: 80,
      readonly: true,
      hideInForm: true,
      hideInSearch: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: "编号",
      dataIndex: "copyrightNo",
      hideInSearch: true,
      renderText: (no) => `# ${no}`,
    },
    {
      title: "价格",
      dataIndex: "price",
      valueType: "money",
      hideInSearch: true,
    },
    {
      title: "卖家",
      dataIndex: "realname",
      hideInSearch: true,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      hideInSearch: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              state.user = {
                cexId: record.userCode,
                ...record,
              };
            }}
          >
            {record.mobile}
          </a>
        );
      },
    },
    {
      title: "交易所ID",
      dataIndex: "userCode",
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: CopyrightStatusMaps,
    },
  ];
  return (
    <Modal
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
      <UserCollectionModal
        title="持仓"
        user={state.user}
        open={!!state.user}
        onOpenChange={(visible) => {
          if (!visible) {
            state.user = null;
          }
        }}
      />
      <ProTable
        rowKey="copyrightHash"
        actionRef={actionRef}
        search={false}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={async () => {
              await collectionModel.unsell({
                collectionCode: collection.collectionCode,
              });
              await actionRef?.current?.reload();
            }}
          >
            自动下架
          </Button>,
        ]}
        request={async (params: any) => {
          const res = await copyrightModel.list({
            ...params,
            ...(params.state ? { state: Number(params.state) } : {}),
            collectionCode: collection.collectionCode,
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
