import { buildAbilityFor } from "@/configs/authConfig/ability";
import { AbilityContext } from "@/configs/authConfig/can";
import { PageLoading } from "@ant-design/pro-layout";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { StillnessProvider } from "react-stillness-component";
import "./index.less";
import { router } from "./routes";
import theme from "./theme";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh");

const ability = buildAbilityFor(
  JSON.parse(localStorage.getItem("user") || "{}")
);
if (import.meta.env.MODE !== "production") {
  // expose ability to play around with it in devtools
  (window as any).ability = ability;
}
ReactDOM.render(
  <ConfigProvider locale={zhCN} theme={theme}>
    <AbilityContext.Provider value={ability}>
      <StillnessProvider>
        <RouterProvider router={router} fallbackElement={<PageLoading />} />
      </StillnessProvider>
    </AbilityContext.Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
