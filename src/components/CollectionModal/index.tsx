import copyrightModel from "@/models/copyright.model";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { useReactive } from "ahooks";
import { Modal, ModalProps, Space } from "antd";
import { useRef } from "react";
import CopyrightModal from "../CopyrightModal";
import UserCollectionModal from "../UserCollectionModal";

interface CollectionModalProps extends ModalProps {
  collection?: any;
  onOpenChange: (visible: boolean) => void;
}

export default ({
  collection,
  onOpenChange,
  ...props
}: CollectionModalProps) => {
  const actionRef = useRef<ActionType>();
  const state = useReactive({
    user: null,
    target: null,
  });
  const columns: ProColumns[] = [
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 80,
      hideInForm: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              state.target = {
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
      title: "姓名",
      dataIndex: "realName",
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
                state.user = {
                  cexId: record.userCode,
                  ...record,
                };
              }}
            >
              持仓
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
      <UserCollectionModal
        title="持仓"
        user={state.target}
        open={!!state.target}
        onOpenChange={(visible) => {
          if (!visible) {
            state.target = null;
          }
        }}
      />
      <CopyrightModal
        title="持仓"
        user={state.user}
        collection={collection}
        open={!!state.user}
        onOpenChange={(visible) => {
          if (!visible) {
            state.user = null;
          }
        }}
      />
      <ProTable
        rowKey="mobile"
        actionRef={actionRef}
        columns={columns}
        request={async (params: any) => {
          const res = await copyrightModel.distribution({
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
