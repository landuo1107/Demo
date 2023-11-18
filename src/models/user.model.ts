import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/user/page", { params });
  },
  update: async (data?: any) => {
    return await http.patch("/api/v1/user/admin/update", { data });
  },
  allowBatch: async (data?: any) => {
    return await http.patch("/api/v1/user/admin/allow-batch", { data });
  },
  profit: async (params?: any) => {
    return await http.get("/api/abc_biz/user/profit/page", { params });
  },
};

export default {
  ...actions,
};
