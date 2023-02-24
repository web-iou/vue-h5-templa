export {};
declare module "axios" {
  interface AxiosRequestConfig {
    needToken?: Boolean;
  }
}
