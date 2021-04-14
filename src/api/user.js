import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA, tokenName } from "@/config/settings";

const ip_login = "http://182.43.229.186:8081";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data,
  });
//   return request({
//     url: ip_login+"/jySysMgr/login/login",
//     method: "post",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//     },
//     data
//   });
}

export async function toMd5(data) {
    return request({
      url: ip_login+"/jySysMgr/md5/toMd5",
      method: "get",
      params: data,
    });
  }

export function getUserInfo(accessToken) {
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      [tokenName]: accessToken,
    },
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}

export async function userInfo(data) {
    return request({
        url: ip_login+'/jySysMgr/userManage/userInfo',
        method: "get",
        params: data
    });
}

export async function modifyUser(data) {
    return request({
        url: ip_login+'/jySysMgr/userManage/modifyUser',
        method: "POST",
        params: data
    });
}

export async function modifyPwd(data) {
    return request({
        url: ip_login+'/jySysMgr/login/modifyPwd',
        method: "POST",
        params: data
    });
}