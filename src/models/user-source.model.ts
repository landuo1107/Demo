import http from "@/utils/http";

const actions = {
  list: async (data?: any) => {
    return await http.post("/api/v1/user-source/admin/query", { data });
  },
  create: async (data: any) => {
    return await http.post("/api/v1/user-source/admin/create", { data });
  },
  update: async (data: any) => {
    return await http.patch("/api/v1/user-source/admin/update", { data });
  },
  remove: async (params: any) => {
    return await http.delete("/api/v1/user-source/admin/remove", { params });
  },
};

export default {
  ...actions,
};
