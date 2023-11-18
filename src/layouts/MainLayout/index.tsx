import defaultAvatar from "@/assets/default-avatar.jpeg";
import globalModel from "@/models/global.model";
import { PageContainer, ProLayout } from "@ant-design/pro-layout";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";

import KeepAlive from "@/components/KeepAlive";
import NavBar from "@/components/NavBar";
import navbarModel from "@/models/navbar.model";
import settingModel from "@/models/setting.model";
import { menus } from "@/routes";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { Offscreen } from "react-stillness-component";
import { useSnapshot } from "valtio";
import styles from "./index.module.less";

const MainLayout = () => {
  const globalSnap = useSnapshot(globalModel.state);
  const settingSnap = useSnapshot(settingModel.state);
  const location = useLocation();
  const outlet = useOutlet();
  const nav = useNavigate();

  const [outlets, setOutlets] = useState<any>([]);
  const locationPathname = location.pathname;

  useEffect(() => {
    settingModel.getInfo();
  }, []);

  useEffect(() => {
    const result = outlets.some((o: any) => o.pathname === locationPathname);
    if (!result) {
      setOutlets([
        ...outlets,
        {
          key: locationPathname,
          pathname: locationPathname,
          outlet,
        },
      ]);
    }
  }, [locationPathname]);

  return (
    <ProLayout
      className={styles.container}
      fixSiderbar
      logo={settingSnap.info?.logo}
      title={settingSnap.info?.name}
      collapsed={false}
      menu={{
        type: "group",
        request: async () => menus,
      }}
      menuItemRender={(item, defaultDom) => {
        return (
          <div
            onClick={() => {
              nav(item.itemPath);
              navbarModel.push({
                itemPath: item.itemPath,
                name: item.name ?? item.itemPath,
              });
            }}
          >
            {defaultDom}
          </div>
        );
      }}
      location={{
        pathname: location.pathname,
      }}
      siderWidth={200}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <Space>
            <Avatar
              size="small"
              src={globalSnap.user?.avatar ?? defaultAvatar}
            />
            {globalSnap.user?.account}
          </Space>,
          <Popconfirm
            title="确定要退出吗？"
            onConfirm={async () => {
              globalModel.logout();
              nav("/login", { replace: true });
            }}
          >
            <Button
              className={styles.logout}
              type="text"
              icon={<LogoutOutlined />}
            >
              退出
            </Button>
          </Popconfirm>,
        ];
      }}
    >
      <PageContainer
        fixedHeader
        header={{
          title: <NavBar />,
          breadcrumbRender: () => <></>,
        }}
      >
        {outlets.map((o: any) => (
          <Offscreen key={o.key} visible={locationPathname === o.pathname}>
            <KeepAlive path={o.pathname}>{o.outlet}</KeepAlive>
          </Offscreen>
        ))}
      </PageContainer>
    </ProLayout>
  );
};

export default MainLayout;
