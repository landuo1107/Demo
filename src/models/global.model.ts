import http from "@/utils/http";
import { defer } from "react-router-dom";
import { proxy } from "valtio";

const state = proxy<{ user: any }>({
  user: null,
});

const actions = {
  load: async () => {
    let user = state.user;
    if (!user) {
      const info = await actions.getInfo();
      if (info) {
        user = info.data;
      }
    }
    state.user = user;
    return defer({ user });
  },
  login: async (params: any) => {
    const res = await http.get(`/api/abc_biz/admin/ua/login`, {
      params,
    });
    localStorage.setItem("admin-token", res.data.accessToken);
    const info = await actions.getInfo();
    state.user = info.data.user;
    return res;
  },
  logout: () => {
    localStorage.setItem("admin-token", "");
    state.user = null;
  },
  getInfo: async () => {
    return await http.get("/api/abc_biz/admin/owner");
  },
};

export default {
  state,
  ...actions,
};
