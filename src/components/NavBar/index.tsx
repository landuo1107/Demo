import { globalEvent } from "@/events/global.event";
import navbarModel, { NavbarItem } from "@/models/navbar.model";
import {
  CloseOutlined,
  MenuOutlined,
  MinusOutlined,
  PauseOutlined,
  ReloadOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { useMount } from "ahooks";
import { Button, Dropdown, Space, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useStillnessManager } from "react-stillness-component";
import { useSnapshot } from "valtio";
import styles from "./index.module.less";

const items = [
  {
    label: "刷新当前标签页",
    icon: <ReloadOutlined />,
    key: "refresh",
  },
  {
    key: "divider-1",
    type: "divider",
  },
  {
    label: "关闭左侧标签页",
    icon: <VerticalRightOutlined />,
    key: "close-left",
  },
  {
    label: "关闭右侧标签页",
    icon: <VerticalLeftOutlined />,
    key: "close-right",
  },
  {
    key: "divider-2",
    type: "divider",
  },
  { label: "关闭其他标签页", icon: <PauseOutlined />, key: "close-others" },
  { label: "关闭全部标签页", icon: <MinusOutlined />, key: "close-all" },
];

export default () => {
  const manager = useStillnessManager();
  const nav = useNavigate();
  const navbarSnap = useSnapshot(navbarModel.state);

  useMount(() => {
    navbarModel.init((activeKey) => {
      nav(activeKey);
    });
  });

  const handleMenuClick = async ({ key, domEvent }: any, activeKey: string) => {
    domEvent.stopPropagation();
    if (key === "refresh") {
      globalEvent.emit("refresh", { activeKey });
    }
    if (key === "close-left") {
      navbarModel.closeLeft(activeKey, (activeKey, others: NavbarItem[]) => {
        nav(activeKey);
        others.forEach((item) => {
          globalEvent.emit("refresh", { activeKey: item.itemPath });
        });
      });
    }
    if (key === "close-right") {
      navbarModel.closeRight(activeKey, (activeKey, others: NavbarItem[]) => {
        nav(activeKey);
        others.forEach((item) => {
          globalEvent.emit("refresh", { activeKey: item.itemPath });
        });
      });
    }
    if (key === "close-others") {
      navbarModel.closeOthers(activeKey, (activeKey, others: NavbarItem[]) => {
        nav(activeKey);
        others.forEach((item) => {
          globalEvent.emit("refresh", { activeKey: item.itemPath });
        });
      });
    }
    if (key === "close-all") {
      navbarModel.clear((activeKey) => {
        nav(activeKey);
        manager.getActions().triggerClear();
      });
    }
  };

  return (
    <div className={styles.container}>
      <Tabs
        hideAdd
        type="editable-card"
        tabBarExtraContent={{
          right: (
            <Space>
              <Button
                type="ghost"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => {
                  globalEvent.emit("refresh", {
                    activeKey: navbarSnap.activeKey,
                  });
                }}
              />
              <Dropdown
                menu={{
                  items: items.filter(
                    (item) =>
                      ![
                        "refresh",
                        "divider-1",
                        "divider-2",
                        "close-left",
                        "close-right",
                      ].includes(item.key)
                  ),
                  onClick: (info) =>
                    handleMenuClick(info, navbarSnap.activeKey),
                }}
              >
                <MenuOutlined />
              </Dropdown>
            </Space>
          ),
        }}
        activeKey={navbarSnap.activeKey}
        items={navbarSnap.items?.map((item: any) => ({
          label: (
            <Dropdown
              trigger={["contextMenu"]}
              menu={{
                items,
                onClick: (info) => handleMenuClick(info, item.itemPath),
              }}
            >
              <div>{item.name}</div>
            </Dropdown>
          ),
          key: item.itemPath,
          closable: item.closable,
        }))}
        onTabClick={(activeKey) => {
          navbarModel.switchTo(activeKey, () => {
            nav(activeKey);
          });
        }}
        onEdit={(targetKey, action: "add" | "remove") => {
          if (action === "remove") {
            navbarModel.remove(targetKey.toString(), (nextKey) => {
              globalEvent.emit("refresh", { activeKey: targetKey.toString() });
              if (nextKey) {
                nav(nextKey);
              }
            });
          }
        }}
      />
    </div>
  );
};
