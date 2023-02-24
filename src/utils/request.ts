import { getToken } from "./auth";
import axios, { AxiosResponse, AxiosError } from "axios";
import { showNotify } from "vant";
const request = axios.create({
  timeout: 6000,
  method: "post",
  baseURL: "/xfj",
});

request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { needToken = true } = config;
    if (getToken() && needToken) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
type dataType<T = any> = {
  msg: string;
  code: number;
  data: T;
};

// 添加响应拦截器
request.interceptors.response.use(
  function ({ data }: AxiosResponse<dataType>) {
    // 对响应数据做点什么
    const { code, msg, data: responseData } = data;
    if (code === 200) {
      return responseData;
    } else {
      showNotify(msg);
      return Promise.reject(new Error(msg));
    }
  },
  function (error: AxiosError<any>) {
    // 对响应错误做点什么
    return showNotify(error.response?.data.msg ?? error.message);
  }
);
export default request;
