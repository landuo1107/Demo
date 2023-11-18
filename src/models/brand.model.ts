import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/brand/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/brand/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/brand/update", { data });
  },
  remove: async (params: any) => {
    return await http.delete("/api/v1/brand/admin/remove", { params });
  },
};

export default {
  ...actions,
};
