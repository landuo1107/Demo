import http from "@/utils/http";

const actions = {
  fileUpload: async (data: any) => {
    return await http.post("/api/v1/oss/upload", { data });
  },
};

export default {
  ...actions,
};
