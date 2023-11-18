import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/notice/admin/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/notice/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/notice/update", { data });
  },
  remove: async (id: any) => {
    return await http.get(`/api/abc_biz/notice/remove/${id}`);
  },
};

export default {
  ...actions,
};
