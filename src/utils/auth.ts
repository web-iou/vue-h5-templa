import Cookie from "js-cookie";
const Key = "admin";
export const getToken = () => Cookie.get(Key);
export const setToken = (value: string) => {
  Cookie.set(Key, value);
};
export const rmToken = () => Cookie.remove(Key);
