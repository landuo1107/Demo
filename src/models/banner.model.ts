import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/banner/admin/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/banner/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/banner/update", { data });
  },
  remove: async (id: any) => {
    return await http.get(`/api/abc_biz/banner/remove/${id}`);
  },
};

export default {
  ...actions,
};
