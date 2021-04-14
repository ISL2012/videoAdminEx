import request from "@/utils/request";

const ip = "http://182.43.229.186:8082";
const ip_login = "http://182.43.229.186:8081";
const ip_workOrder = "http://182.43.229.186:8084/order-plan/";
const ip_video = 'http://182.43.229.186:8089/video-plan/';
const ip_copyright = 'http://182.43.229.186:8088/copyrightMonitoring/';
const img_url = 'http://182.43.229.186:8085/';

export async function queryEarlyWarnTypeByPage(data) {
    return request({
        url: ip + '/dial-plan/earlyWarnTypeManager/queryEarlyWarnTypeByPage',
        method: "post",
        // params: data,
        data,
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function queryEarlyWarnTypeById(data) {
    return request({
        url: ip + '/dial-plan/earlyWarnTypeManager/queryEarlyWarnTypeById',
        method: "get",
        params: data,
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function updateEarlyWarnType(data) {
    return request({
        url: ip + '/dial-plan/earlyWarnTypeManager/updateEarlyWarnType',
        method: "post",
        data,
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function queryEarlyWarnListByPage(data) {
    return request({
        url: ip + '/dial-plan/earlyWarn/queryEarlyWarnListByPage',
        method: "post",
        data,
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function earlyWarnIgnore(data) {
    return request({
        url: ip + '/dial-plan/earlyWarn/ignore',
        method: "get",
        params: data,
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function dialTemplateList(data) {
    return request({
        url: ip + '/dial-plan/dialTemplate/list',
        method: "get",
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

export async function queryAllEalyWarnTypeCodeAndName(data) {
    return request({
        url: ip + '/dial-plan/earlyWarnTypeManager/queryAllEalyWarnTypeCodeAndName',
        method: "get",
        headers: {
            'access-token': window.sessionStorage.getItem('token')
        }
    });
}

// export async function updateEarlyWarnType(data) {
//     return request({
//         url: ip + '/dial-plan/earlyWarnTypeManager/updateEarlyWarnType',
//         method: "post",
//         headers: {
//             'access-token': window.sessionStorage.getItem('token')
//         }
//     });
// }

// export async function updateEarlyWarnType(data) {
//     return request({
//         url: ip + '/dial-plan/earlyWarnTypeManager/updateEarlyWarnType',
//         method: "post",
//         headers: {
//             'access-token': window.sessionStorage.getItem('token')
//         }
//     });
// }
