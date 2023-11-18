import userModel from "@/models/user.model";
import {
  ActionType,
  BetaSchemaForm,
  ProColumns,
  ProFormColumnsType,
  ProTable,
} from "@ant-design/pro-components";
import { useReactive } from "ahooks";
import { Button, FormInstance, Modal, ModalProps, Tag } from "antd";
import { useRef } from "react";
import UploadSingleImage from "../UploadSingleImage";
import styles from "./index.module.less";

interface SearchUserModalProps extends ModalProps {
  onOpenChange: (visible: boolean) => void;
  onChange: (user: any) => void;
}

export default ({ onOpenChange, onChange, ...props }: SearchUserModalProps) => {
  const state = useReactive({
    openForm: false,
  });
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const columns: ProColumns[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      readonly: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "交易所ID",
      dataIndex: "cexId",
      hideInSearch: true,
      ellipsis: true,
      copyable: true,
      hideInForm: true,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      valueType: "avatar",
      readonly: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      hideInForm: true,
    },
    {
      title: "姓名",
      dataIndex: "realname",
      hideInForm: true,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      hideInForm: true,
    },
    {
      title: "是否实名",
      dataIndex: "isReal",
      valueType: "switch",
      width: 100,
      hideInForm: true,
      render: (_, item) =>
        item.isReal ? <Tag color="success">已实名</Tag> : <Tag>待实名</Tag>,
    },
    {
      title: "注册时间",
      dataIndex: "createAt",
      valueType: "dateTime",
      width: 200,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "是否禁用",
      dataIndex: "isBlock",
      valueType: "switch",
      width: 100,
      hideInSearch: true,
      formItemProps: {
        initialValue: 1,
      },
      fieldProps: {
        checkedChildren: "已禁用",
        unCheckedChildren: "未禁用",
      },
      render: (_, item) =>
        item.isBlock ? <Tag color="red">已禁用</Tag> : <Tag>未禁用</Tag>,
    },
    {
      title: "操作",
      valueType: "option",
      width: 100,
      render: (text, record, _, action) => {
        return <a onClick={() => onChange && onChange(record)}>选择</a>;
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
      <BetaSchemaForm
        formRef={formRef}
        title={"新建"}
        layoutType="ModalForm"
        open={state.openForm}
        onOpenChange={(visible) => {
          state.openForm = visible;
          if (!visible) {
            formRef?.current?.resetFields();
          }
        }}
        columns={columns as ProFormColumnsType[]}
        onFinish={async (values) => {
          // await userModel.create(values);
          actionRef?.current?.reload();
        }}
      />
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        className={styles.table}
        search={{ defaultCollapsed: false }}
        toolBarRender={() => [
          <Button
            type="primary"
            danger
            onClick={() => onChange && onChange({})}
          >
            仓库
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 200, 500, 1000, 2000],
        }}
        columns={columns}
        request={async (params) => {
          const res = await userModel.list({
            ...params,
            page: params.current ?? 1,
            pageSize: params.pageSize ?? 10,
          });
          return {
            success: res?.success,
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
