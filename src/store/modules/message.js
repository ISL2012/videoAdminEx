import {
    getGloablecode,
    queryMessageListByDate,
    queryMessageById,
    updateMessageStatus
} from "@/api/message";

const actions = {

    async getGloablecode({ commit }, request) {
        const data = await getGloablecode(request);
        return data;
    },

    async queryMessageListByDate({ commit }, request) {
        const data = await queryMessageListByDate(request);
        return data;
    },

    async queryMessageById({ commit }, request) {
        const data = await queryMessageById(request);
        return data;
    },

    async updateMessageStatus({ commit }, request) {
        const data = await updateMessageStatus(request);
        return data;
    },

};
export default { actions };
