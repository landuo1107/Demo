const env: string = process.env.NODE_ENV ?? "development";
const isDev = process.env.NODE_ENV === "development";

const URL: Record<string, string> = {
  production: "https://openapi.cex.art",
  development: "http://127.0.0.1:9898",
  test: "http://127.0.0.1:9898",
  bee: "https://bee-api.cex.art",
  sea: "https://merchant-api.cex.art",
  icc: "https://api.paishuzi.com",
  dna: "https://api.dingtaikeji.cn",
  mr: "https://api.hnmingqiu.cn",
};

console.log(process.env.NODE_ENV, URL[env]);

export default {
  isDev,
  apiUrl: URL[env],
};
