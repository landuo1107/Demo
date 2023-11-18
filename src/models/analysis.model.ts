import http from "@/utils/http";

const actions = {
  queryUserTrend: async () => {
    return await http.post("/api/v1/analysis/admin/user/trend");
  },
  trendList: async (data: any) => {
    return await http.post("/api/v1/analysis/admin/trend/list", { data });
  },
};

export default {
  ...actions,
};
