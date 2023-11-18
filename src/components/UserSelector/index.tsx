import { UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useReactive } from "ahooks";
import { Avatar, Button, Space } from "antd";
import { ReactNode } from "react";
import SearchUserModal from "../SearchUserModal";

interface User {
  id: number;
  name: string;
  mobile: string;
  cexId: string;
  avatar?: string;
}

interface UserSelectorProps {
  value?: User;
  onChange?: (value: User) => void;
  target?: ReactNode;
}

export default ({ value, onChange, target }: UserSelectorProps) => {
  const state = useReactive({
    openForm: false,
  });
  return (
    <>
      <SearchUserModal
        title="请选择用户"
        open={state.openForm}
        onOpenChange={(visible) => {
          state.openForm = visible;
        }}
        onChange={(user) => {
          state.openForm = false;
          onChange &&
            onChange({
              id: user.id,
              avatar: user.avatar,
              name: user.realname,
              cexId: user.cexId,
              mobile: user.mobile,
            });
        }}
      />
      {target ? (
        <a
          onClick={() => {
            state.openForm = true;
          }}
        >
          {target}
        </a>
      ) : (
        <Space>
          <Button
            size="middle"
            icon={<UserSwitchOutlined />}
            onClick={() => {
              state.openForm = true;
            }}
          >
            选择
          </Button>
          {value && (
            <Button type="ghost">
              <Avatar size="small" icon={<UserOutlined />} src={value.avatar} />
              <Space style={{ marginLeft: 4 }}>{value.name}</Space>
            </Button>
          )}
        </Space>
      )}
    </>
  );
};
