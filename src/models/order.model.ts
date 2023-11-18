import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/order/admin/page", { params });
  },
  detail: async (data: any) => {
    return await http.post(`/api/abc_biz/order/admin/detail`, {
      data,
    });
  },
};

export default {
  ...actions,
};
