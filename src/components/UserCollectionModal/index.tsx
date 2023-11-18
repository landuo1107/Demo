import collectionModel from "@/models/collection.model";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { useReactive } from "ahooks";
import { Modal, ModalProps, Space } from "antd";
import { useRef } from "react";
import CopyrightModal from "../CopyrightModal";

interface UserCollectionModalProps extends ModalProps {
  user?: any;
  onOpenChange: (visible: boolean) => void;
}

export default ({ user, onOpenChange, ...props }: UserCollectionModalProps) => {
  const actionRef = useRef<ActionType>();
  const state = useReactive({
    collection: null,
  });
  const columns: ProColumns[] = [
    {
      title: "ID",
      dataIndex: "collectionCode",
      width: 80,
      readonly: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "名称",
      dataIndex: "title",
      hideInSearch: true,
    },
    {
      title: "数量",
      dataIndex: "num",
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => {
        return (
          <Space>
            <a
              onClick={() => {
                state.collection = record;
              }}
            >
              分布
            </a>
          </Space>
        );
      },
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
      <CopyrightModal
        title="持仓"
        user={user}
        collection={state.collection}
        open={!!state.collection}
        onOpenChange={(visible) => {
          if (!visible) {
            state.collection = null;
          }
        }}
      />
      <ProTable
        rowKey="collectionCode"
        actionRef={actionRef}
        columns={columns}
        search={false}
        request={async (params: any) => {
          const res = await collectionModel.hold({
            ...params,
            ...(params.state ? { state: Number(params.state) } : {}),
            userCode: user.cexId,
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
