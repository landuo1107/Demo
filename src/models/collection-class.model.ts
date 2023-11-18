import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/collection-class/back/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/collection-class/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/collection-class/update", { data });
  },
  remove: async (params: any) => {
    return await http.delete("/api/v1/collection-class/admin/remove", {
      params,
    });
  },
};

export default {
  ...actions,
};
