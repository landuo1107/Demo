import globalModel from "@/models/global.model";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  PageContainer,
  ProFormText,
} from "@ant-design/pro-components";
import { useLocalStorageState, useMount } from "ahooks";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const LoginPage = () => {
  const nav = useNavigate();
  const location = useLocation();

  useMount(() => {
    localStorage.setItem("admin-token", "");
  });

  const [account, setAccount] = useLocalStorageState<string | undefined>(
    "account",
    {
      defaultValue: "",
    }
  );

  const handleLogin = async (values: any) => {
    await globalModel.login(values);
    setAccount(values.account);
    nav("/", { replace: true });
  };

  return (
    <PageContainer className={styles.container}>
      <LoginForm
        initialValues={{
          account,
        }}
        title="管理后台"
        subTitle="运营管理中心"
        onFinish={handleLogin}
      >
        <ProFormText
          name="account"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入账号"}
          rules={[{ required: true, message: "请输入账号" }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        />
      </LoginForm>
    </PageContainer>
  );
};

export default LoginPage;
