import request from "@/utils/request";

const ip = "http://182.43.229.186:8082";
const ip_login = "http://182.43.229.186:8081";
const ip_workOrder = "http://182.43.229.186:8084/order-plan/";
const ip_video = 'http://182.43.229.186:8089/video-plan/';
const ip_copyright = 'http://182.43.229.186:8088/copyrightMonitoring/';
const img_url = 'http://182.43.229.186:8085/';

export async function organizationList(data) {
    return request({
        url: ip_login + '/jySysMgr/organizationManage/organizationList',
        method: "get",
        params: data,
        headers: {
            // 'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function respassWord(data) {
    return request({
        url: ip_login + '/jySysMgr/organizationManage/respassWord',
        method: "post",
        params: data
    });
}

export async function deleteOrganization(data) {
    return request({
        url: ip_login + '/jySysMgr/organizationManage/respassWord',
        method: "post",
        params: data
    });
}

export async function modifyOrganizationPage(data) {
    return request({
        url: ip_login + '/jySysMgr/organizationManage/modifyOrganizationPage',
        method: "get",
        params: data
    });
}

export async function modifyOrganization(data) {
    return request({
        url: ip_login + '/jySysMgr/organizationManage/modifyOrganization',
        method: "post",
        params: data
    });
}

export async function userList(data) {
    return request({
        url: ip_login + '/jySysMgr/userManage/userList',
        method: "get",
        params: data
    });
}

export async function userManageEdit(data) {
    return request({
        url: ip_login + '/jySysMgr/userManage/respassWord',
        method: "post",
        params: data
    });
}

export async function deleteUser(data) {
    return request({
        url: ip_login + '/jySysMgr/userManage/deleteUser',
        method: "post",
        params: data
    });
}

export async function modifyUserPage(data) {
    return request({
        url: ip_login + '/jySysMgr/userManage/modifyUserPage',
        method: "get",
        params: data
    });
}

export async function modifyUser(data) {
    return request({
        url: ip_login + '/jySysMgr/userManage/modifyUser',
        method: "post",
        params: data
    });
}

export async function powerList(data) {
    return request({
        url: ip_login + '/jySysMgr/powerManage/powerList',
        method: "get",
        params: data
    });
}

export async function addPowerPage(data) {
    return request({
        url: ip_login + '/jySysMgr/powerManage/addPowerPage',
        method: "post",
        params: data
    });
}

export async function findSubPowerList(data) {
    return request({
        url: ip_login + '/jySysMgr/powerManage/findSubPowerList',
        method: "post",
        params: data
    });
}

export async function modifyPowerPage(data) {
    return request({
        url: ip_login + '/jySysMgr/powerManage/modifyPowerPage',
        method: "post",
        params: data
    });
}

export async function operationList(data) {
    return request({
        url: ip_login + '/jySysMgr/operationManage/operationList',
        method: "get",
        params: data
    });
}

export async function loginList(data) {
    return request({
        url: ip_login + '/jySysMgr/loginManage/loginList',
        method: "get",
        params: data
    });
}

export async function roleList(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/roleList',
        method: "get",
        params: data
    });
}

export async function rolePowerList(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/powerList',
        method: "get",
        params: data
    });
}

export async function deleteRole(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/deleteRole',
        method: "post",
        params: data
    });
}

export async function addRole(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/addRole',
        method: "post",
        params: data
    });
}

export async function modifyRolePage(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/modifyRolePage',
        method: "post",
        params: data
    });
}

export async function modifyRole(data) {
    return request({
        url: ip_login + '/jySysMgr/roleManage/modifyRole',
        method: "post",
        params: data
    });
}

