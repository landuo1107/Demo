import http from "@/utils/http";

const actions = {
  list: async (params: any) => {
    return await http.get("/api/abc_biz/copyright/admin/page", { params });
  },
  hold: async (params: any) => {
    return await http.get("/api/abc_biz/copyright/admin/hold", { params });
  },
  distribution: async (params: any) => {
    return await http.get("/api/abc_biz/copyright/admin/distribution", { params });
  },
  snapshot: async (params: any) => {
    return await http.get("/api/abc_biz/copyright/admin/snapshot", { params });
  },
};

export default {
  ...actions,
};
