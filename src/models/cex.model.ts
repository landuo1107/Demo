import http from "@/utils/http";

const actions = {
  getStsToken: async () => {
    return await http.get("/api/v1/cex/admin/ststoken");
  },
  fileUpload: async (data: any) => {
    return await http.post("/api/abc_biz/file/upload", { data });
  },
};

export default {
  ...actions,
};
