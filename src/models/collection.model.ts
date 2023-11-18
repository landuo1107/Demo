import http from "@/utils/http";

const actions = {
  list: async (params?: any) => {
    return await http.get("/api/abc_biz/collection/admin/page", { params });
  },
  create: async (data: any) => {
    return await http.post("/api/abc_biz/collection/save", { data });
  },
  update: async (data: any) => {
    return await http.post("/api/abc_biz/collection/update", { data });
  },
  remove: async (params: any) => {
    return await http.delete("/api/v1/collection/admin/remove", { params });
  },
  hold: async (params: any) => {
    return await http.get("/api/abc_biz/collection/admin/hold", { params });
  },
  mint: async (data: any) => {
    return await http.post("/api/abc_biz/collection/create", { data });
  },
  lock: async (data: any) => {
    return await http.post("/api/abc_biz/collection/admin/lock", { data });
  },
  airdrop: async (data: any) => {
    return await http.post("/api/abc_biz/collection/admin/airdrop", { data });
  },
  destroy: async (data: any) => {
    return await http.post("/api/abc_biz/collection/admin/destroy", { data });
  },
  unsell: async (data: any) => {
    return await http.post("/api/abc_biz/copyright/admin/unsell", { data });
  },
};

export default {
  ...actions,
};
