import http from "@/utils/http";

const actions = {
  load: async (data: any) => {
    return await http.post("/api/abc_biz/activity/load", { data });
  },
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/activity/admin/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/activity/create", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/activity/update", { data });
  },
  remove: async (id: any) => {
    return await http.get(`/api/abc_biz/activity/remove/${id}`);
  },
  recordList: async (params?: any) => {
    return await http.get("/api/abc_biz/activity/record/admin/page", { params });
  },
};

export default {
  ...actions,
};
