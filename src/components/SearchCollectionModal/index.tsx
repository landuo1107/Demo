// import { CollectionStatusEnumMaps } from "@/enums";
import collectionModel from "@/models/collection.model";
import {
  ProColumns,
  ProForm,
  ProFormDigit,
  ProTable,
} from "@ant-design/pro-components";
import { useReactive } from "ahooks";
import {
  Button,
  Modal,
  ModalProps,
  Popconfirm,
  Popover,
  Space,
  Tag,
} from "antd";
import styles from "./index.module.less";

interface SearchCollectionModalProps extends ModalProps {
  onOpenChange: (visible: boolean) => void;
}

export default ({ onOpenChange, ...props }: SearchCollectionModalProps) => {
  const state = useReactive({
    popoverId: null,
  });
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
      title: "图片",
      dataIndex: "picture",
      width: 80,
      hideInSearch: true,
      hideInForm: true,
      valueType: "image",
    },
    {
      title: "名称",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入藏品名称" }],
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      width: 200,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "寄售状态",
      dataIndex: "consignmentStatus",
      valueType: "switch",
      width: 100,
      hideInSearch: true,
      formItemProps: {
        initialValue: 0,
      },
      fieldProps: {
        checkedChildren: "开启",
        unCheckedChildren: "关闭",
      },
      render: (_, record) =>
        record.consignmentStatus ? (
          <Tag color="success">开启</Tag>
        ) : (
          <Tag>关闭</Tag>
        ),
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      // valueEnum: CollectionStatusEnumMaps,
      hideInForm: true,
    },
    {
      title: "操作",
      valueType: "option",
      width: 100,
      render: (text, record, _, action) => {
        if (record.recommendValue > 0)
          return [
            <Popconfirm
              title="确定要取消精选吗？"
              onConfirm={async () => {
                const res = await collectionModel.update({
                  id: record.id,
                  recommendValue: 0,
                });
                if (res?.code === 200) {
                  action?.reload();
                }
              }}
            >
              <a>取消精选</a>
            </Popconfirm>,
          ];
        return record.consignmentStatus
          ? [
              <Popover
                open={record.id === state.popoverId}
                onOpenChange={(visible) => {
                  state.popoverId = visible ? record.id : null;
                }}
                content={
                  <ProForm
                    initialValues={{
                      recommendValue: 1,
                    }}
                    onFinish={async (values) => {
                      const res = await collectionModel.update({
                        id: record.id,
                        ...values,
                      });
                      if (res?.code === 200) {
                        action?.reload();
                        state.popoverId = null;
                      }
                    }}
                    submitter={{
                      render: ({ submit, reset }) => (
                        <Space className={styles.submitter}>
                          <Button
                            size="small"
                            onClick={() => {
                              reset();
                              state.popoverId = null;
                            }}
                          >
                            取消
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              submit();
                            }}
                          >
                            确定
                          </Button>
                        </Space>
                      ),
                    }}
                  >
                    <ProFormDigit
                      name="recommendValue"
                      rules={[{ required: true, message: "请输入精选排序" }]}
                      fieldProps={{
                        defaultValue: 1,
                        min: 1,
                      }}
                    />
                  </ProForm>
                }
                title="请输入精选排序"
                trigger="click"
                placement="leftTop"
              >
                <a>设为精选</a>
              </Popover>,
            ]
          : null;
      },
    },
  ];
  return (
    <Modal
      className={styles.container}
      width="80%"
      {...props}
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
        className={styles.table}
        search={{ defaultCollapsed: false }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 200, 500, 1000, 2000],
        }}
        columns={columns}
        request={async (params) => {
          const res = await collectionModel.list({
            ...params,
            page: params.current ?? 1,
            pageSize: params.pageSize ?? 10,
          });
          return {
            success: res?.code === 200,
            data: res.data?.list ?? [],
            total: res.data?.total,
            current: res.data?.page ?? 1,
            pageSize: res.data?.pageSize ?? 10,
          };
        }}
      />
    </Modal>
  );
};
