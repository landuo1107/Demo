import http from "@/utils/http";
import { proxy } from "valtio";

const state = proxy<{ info: any }>({
  info: null,
});

const actions = {
  getInfo: async () => {
    const res = await http.get("/api/abc_biz/setting/info");
    state.info = res.data;
    return res;
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/setting/update", { data });
  },
};

export default {
  state,
  ...actions,
};
