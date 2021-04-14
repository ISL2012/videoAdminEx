import {
    queryEarlyWarnTypeByPage,
    queryEarlyWarnTypeById,
    updateEarlyWarnType,
    queryEarlyWarnListByPage,
    earlyWarnIgnore,
    dialTemplateList,
    queryAllEalyWarnTypeCodeAndName,
} from "@/api/endManage";

const actions = {

    async queryEarlyWarnTypeByPage({ commit }, request) {
        const data = await queryEarlyWarnTypeByPage(request);
        return data;
    },

    async queryEarlyWarnTypeById({ commit }, request) {
        const data = await queryEarlyWarnTypeById(request);
        return data;
    },

    async updateEarlyWarnType({ commit }, request) {
        const data = await updateEarlyWarnType(request);
        return data;
    },

    async queryEarlyWarnListByPage({ commit }, request) {
        const data = await queryEarlyWarnListByPage(request);
        return data;
    },

    async earlyWarnIgnore({ commit }, request) {
        const data = await earlyWarnIgnore(request);
        return data;
    },

    async dialTemplateList({ commit }, request) {
        const data = await dialTemplateList(request);
        return data;
    },

    async queryAllEalyWarnTypeCodeAndName({ commit }, request) {
        const data = await queryAllEalyWarnTypeCodeAndName(request);
        return data;
    },

    // async updateEarlyWarnType({ commit }, request) {
    //     const data = await updateEarlyWarnType(request);
    //     return data;
    // },

    // async updateEarlyWarnType({ commit }, request) {
    //     const data = await updateEarlyWarnType(request);
    //     return data;
    // },

    // async updateEarlyWarnType({ commit }, request) {
    //     const data = await updateEarlyWarnType(request);
    //     return data;
    // },

};
export default { actions };
