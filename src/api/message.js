import request from "@/utils/request";

const ip = "http://182.43.229.186:8082";
const ip_login = "http://182.43.229.186:8081";
const ip_workOrder = "http://182.43.229.186:8084/order-plan/";
const ip_video = 'http://182.43.229.186:8089/video-plan/';
const ip_copyright = 'http://182.43.229.186:8088/copyrightMonitoring/';
const img_url = 'http://182.43.229.186:8085/';

export async function getGloablecode(data) {
    return request({
        url: ip + '/dial-plan/dial/dictionary/gloablecode',
        method: "post",
        params: {
            "gloablecode": data
        },
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function queryMessageListByDate(data) {
    return request({
        url: ip + '/dial-plan/message/queryMessageListByDate',
        method: "POST",
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        },
        data
    });
}

export async function queryMessageById(data) {
    return request({
        url: ip + '/dial-plan/message/queryMessageById',
        method: "get",
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        },
        params: data
    });
}

export async function updateMessageStatus(data) {
    return request({
        url: ip + '/dial-plan/message/updateMessageStatus',
        method: "post",
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        },
        data
    });
}