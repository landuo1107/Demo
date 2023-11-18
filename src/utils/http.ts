import constants from "@/constants";
import { message } from "antd";
import { redirect } from "react-router-dom";
import { extend } from "umi-request";

const http = extend({
  prefix: constants.apiUrl,
  errorHandler: (error) => {
    console.error(error);
    if (error.type === "TypeError") {
      message.error("网络错误");
      return;
    }
    if (!!error.message) {
      if (typeof error.message !== "string") {
        return;
      }
      const data = JSON.parse(error.message);
      if (["A00004"].includes(data.code)) {
        const token = localStorage.getItem("admin-token");
        if (!!token) {
          localStorage.setItem("admin-token", "");
          message.warning(data.msg);
        } else {
          message.warning("请先登录");
        }
        redirect("/login");
      } else {
        message.warning(data.msg);
      }
      return;
    }
  },
});

http.use(async (ctx, next) => {
  const token = localStorage.getItem("admin-token");
  if (!!token) {
    ctx.req.options.headers = {
      ...ctx.req.options.headers,
      Authorization: "Bearer " + token,
    };
  }
  await next();
  if (!ctx?.res?.success) {
    throw new Error(JSON.stringify(ctx?.res));
  }
});

export default http;
