import {
  CopyrightSaleStatusEnum,
  CopyrightSaleStatusMaps,
  CopyrightStatusMaps,
} from "@/enums";
import collectionModel from "@/models/collection.model";
import copyrightModel from "@/models/copyright.model";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal, ModalProps, Space, Table, message } from "antd";
import { useRef } from "react";
import UserSelector from "../UserSelector";

interface CopyrightModalProps extends ModalProps {
  collection?: any;
  user?: any;
  onOpenChange: (visible: boolean) => void;
}

export default ({
  collection,
  user,
  onOpenChange,
  ...props
}: CopyrightModalProps) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: "哈希",
      dataIndex: "copyrightHash",
      width: 80,
      readonly: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "编号",
      dataIndex: "copyrightNo",
      hideInSearch: true,
    },
    {
      title: "价格",
      dataIndex: "price",
      valueType: "money",
      hideInSearch: true,
    },
    {
      title: "寄售状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: CopyrightStatusMaps,
    },
    {
      title: "锁仓状态",
      dataIndex: "isSaleLocked",
      valueType: "select",
      valueEnum: CopyrightSaleStatusMaps,
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => {
        return (
          <Space>
            <UserSelector
              target="转移"
              onChange={async (to) => {
                message.loading("正在转移", 30);
                const airdropList = [
                  {
                    copyrightHash: record.copyrightHash,
                    collectionCode: collection.collectionCode,
                    to: to.mobile,
                    from: user.mobile,
                    num: 1,
                  },
                ];
                const res = await collectionModel.airdrop(airdropList);
                if (res?.success) {
                  actionRef.current?.reload();
                  message.success("转移成功", 1, () => {
                    message.destroy();
                  });
                }
              }}
            />
            {record.isSaleLocked === CopyrightSaleStatusEnum.LOCKED ? (
              <a
                onClick={async () => {
                  const res = await collectionModel.lock({
                    isSaleLocked: CopyrightSaleStatusEnum.NORMAL,
                    saleLockList: [
                      {
                        collectionCode: collection.collectionCode,
                        copyrightHash: record.copyrightHash,
                        mobile: user.mobile,
                        num: 1,
                      },
                    ],
                  });
                  if (res?.success) {
                    actionRef.current?.reload();
                  }
                }}
              >
                解锁
              </a>
            ) : (
              <a
                onClick={async () => {
                  const res = await collectionModel.lock({
                    isSaleLocked: CopyrightSaleStatusEnum.LOCKED,
                    saleLockList: [
                      {
                        collectionCode: collection.collectionCode,
                        copyrightHash: record.copyrightHash,
                        mobile: user.mobile,
                        num: 1,
                      },
                    ],
                  });
                  if (res?.success) {
                    actionRef.current?.reload();
                  }
                }}
              >
                锁仓
              </a>
            )}
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
      <ProTable
        rowKey="copyrightHash"
        actionRef={actionRef}
        search={false}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 200, 500, 1000, 2000],
        }}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space>
              <>
                <UserSelector
                  target="批量转移"
                  onChange={async (to) => {
                    message.loading("正在转移", 30);
                    const airdropList = selectedRowKeys?.map((v) => ({
                      copyrightHash: v,
                      collectionCode: collection.collectionCode,
                      to: to.mobile,
                      from: user.mobile,
                      num: 1,
                    }));
                    const res = await collectionModel.airdrop(airdropList);
                    if (res?.success) {
                      onCleanSelected();
                      actionRef.current?.reload();
                      message.success("转移成功", 1, () => {
                        message.destroy();
                      });
                    }
                  }}
                />
                <a
                  onClick={async () => {
                    const res = await collectionModel.lock({
                      isSaleLocked: CopyrightSaleStatusEnum.LOCKED,
                      saleLockList: selectedRowKeys?.map((v) => ({
                        copyrightHash: v,
                        collectionCode: collection.collectionCode,
                        mobile: user.mobile,
                        num: 1,
                      })),
                    });
                    if (res?.success) {
                      onCleanSelected();
                      actionRef.current?.reload();
                    }
                  }}
                >
                  批量锁仓
                </a>
                <a
                  onClick={async () => {
                    const res = await collectionModel.lock({
                      isSaleLocked: CopyrightSaleStatusEnum.NORMAL,
                      saleLockList: selectedRowKeys?.map((v) => ({
                        copyrightHash: v,
                        collectionCode: collection.collectionCode,
                        mobile: user.mobile,
                        num: 1,
                      })),
                    });
                    if (res?.success) {
                      onCleanSelected();
                      actionRef.current?.reload();
                    }
                  }}
                >
                  批量解锁
                </a>
              </>
            </Space>
          );
        }}
        columns={columns}
        request={async (params: any) => {
          const res = await copyrightModel.hold({
            ...params,
            ...(params.state ? { state: Number(params.state) } : {}),
            userCode: user.cexId,
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
