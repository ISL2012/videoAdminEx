import {
    organizationList,
    respassWord,
    deleteOrganization,
    modifyOrganizationPage,
    modifyOrganization,
    userList,
    userManageEdit,
    deleteUser,
    modifyUserPage,
    modifyUser,
    powerList,
    addPowerPage,
    findSubPowerList,
    modifyPowerPage,
    operationList,
    loginList,
    roleList,
    rolePowerList,
    deleteRole,
    addRole,
    modifyRolePage,
} from "@/api/systemSetup";

const actions = {

    async organizationList({ commit }, request) {
        const data = await organizationList(request);
        return data;
    },

    async respassWord({ commit }, request) {
        const data = await respassWord(request);
        return data;
    },

    async deleteOrganization({ commit }, request) {
        const data = await deleteOrganization(request);
        return data;
    },

    async modifyOrganizationPage({ commit }, request) {
        const data = await modifyOrganizationPage(request);
        return data;
    },

    async modifyOrganization({ commit }, request) {
        const data = await modifyOrganization(request);
        return data;
    },

    async userList({ commit }, request) {
        const data = await userList(request);
        return data;
    },

    async userManageEdit({ commit }, request) {
        const data = await userManageEdit(request);
        return data;
    },

    async deleteUser({ commit }, request) {
        const data = await deleteUser(request);
        return data;
    },

    async modifyUserPage({ commit }, request) {
        const data = await modifyUserPage(request);
        return data;
    },

    async modifyUser({ commit }, request) {
        const data = await modifyUser(request);
        return data;
    },

    async powerList({ commit }, request) {
        const data = await powerList(request);
        return data;
    },

    async addPowerPage({ commit }, request) {
        const data = await addPowerPage(request);
        return data;
    },

    async findSubPowerList({ commit }, request) {
        const data = await findSubPowerList(request);
        return data;
    },

    async modifyPowerPage({ commit }, request) {
        const data = await modifyPowerPage(request);
        return data;
    },

    async operationList({ commit }, request) {
        const data = await operationList(request);
        return data;
    },

    async loginList({ commit }, request) {
        const data = await loginList(request);
        return data;
    },

    async roleList({ commit }, request) {
        const data = await roleList(request);
        return data;
    },

    async rolePowerList({ commit }, request) {
        const data = await rolePowerList(request);
        return data;
    },

    async deleteRole({ commit }, request) {
        const data = await deleteRole(request);
        return data;
    },

    async addRole({ commit }, request) {
        const data = await addRole(request);
        return data;
    },

    async modifyRolePage({ commit }, request) {
        const data = await modifyRolePage(request);
        return data;
    },

    async modifyRole({ commit }, request) {
        const data = await modifyRole(request);
        return data;
    },

};
export default { actions };
