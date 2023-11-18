import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/author/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/author/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/author/update", { data });
  },
  remove: async (params: any) => {
    return await http.delete("/api/v1/author/admin/remove", { params });
  },
};

export default {
  ...actions,
};
