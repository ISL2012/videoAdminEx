<template>
	<div class="roleManage-index">
        <div class="head-title">
            <h3>角色管理</h3>
            <!-- <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="keywoerd" />
                <button @click="getList"><img src="@/assets/search.png"/>查询</button>
            </div> -->
        </div>

        <div class="operating-button-box">
            <button @click="dialogVisibleStr='新增角色';dialogVisible = true"><img src="@/assets/dialPlan_icon_11.png" />添加</button>
            <button @click="dialogVisibleStr='修改角色';dialogVisible = true;modifyRolePage()"><img src="@/assets/dialPlan_icon_12.png" />修改</button>
            <button @click="deleteOrganization"><img src="@/assets/dialPlan_icon_16.png" />删除</button>
        </div>

        <div class="character-list-container">
            <div class="character-list-content">
                <div class="character-list-box" v-for="item in roleList" :key="item.sysRoleId" @click.prevent="roleId=item.sysRoleId">
                    <div class="head">
                        <span>#{{item.sysRoleId}}</span>
                        <h4>{{item.name}}</h4>
                        <el-checkbox v-model="roleId" :true-label="item.sysRoleId"></el-checkbox>
                    </div>
                    <p>{{item.memo}}</p>
                    <time>{{item.createTime}}</time>
                </div>
            </div>
        </div>

        <el-checkbox-group class="jurisdiction-container" v-model="characterCheckList">
            <table>
                <tr>
                    <th>一级菜单</th>
                    <th>二级菜单</th>
                    <th>权限按钮</th>
                </tr>
                <tbody v-for="item in tableData" :key="item.sysPowerId">
                    <tr v-for="(item2, i) in item.subPower" :key="item2.sysPowerId">
                        <td :rowspan="item.subPower.length" v-if="i===0">
                            <el-checkbox :label="`${item.sysPowerId}`">
                                {{item.name}}
                            </el-checkbox>
                        </td>
                        <td>
                            <el-checkbox :label="`${item2.sysPowerId}`">
                                {{item2.name}}
                            </el-checkbox>
                        </td>
                        <td>
                            <el-checkbox :label="`${item3.sysPowerId}`" 
                                v-for="item3 in item2.subPower" :key="item3.sysPowerId">
                                {{item3.name}}
                            </el-checkbox>
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-checkbox-group>

        <!-- 编辑角色 -->
        <el-dialog :title="dialogVisibleStr" :visible.sync="dialogVisible" center width="480px" @close="handleClose('ruleForm')">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="memo">
                    <el-input v-model="ruleForm.memo" type="textarea" :autosize="{minRows: 4}"></el-input>
                </el-form-item>
                <div class="dialog-button-box">
                    <!-- 新增 -->
                    <el-button type="primary" @click="save('ruleForm')" v-show="dialogVisibleStr=='新增角色'">保 存</el-button>
                    <!-- 修改 -->
                    <el-button type="primary" @click="update('ruleForm')" v-show="dialogVisibleStr=='修改角色'">保 存</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
	name: 'roleManage',
	components: {},
	data() {
		return {
            keywoerd: '',
            roleId: '',
            roleList: [],
            tableData: [],
            characterCheckList: [],
            dialogVisible: false,
            dialogVisibleStr: '新增角色',
            ruleForm: {
                roleName: '',
                memo: ''
            },
            rules: {
                roleName: [
                    {required: true, message: '请输入账户名称', trigger: 'blur'},
                    {max: 8, message: '角色名称不能超过8个字符', trigger: 'blur'}
                ],
                memo: [
                    {required: true, message: '请输入角色描述', trigger: 'blur'}
                ]
            }
        }
	},
	created() {},
	mounted() {
        this.getRoleList();
    },
	methods: {
        getRoleList() {
            this.$store.dispatch("systemSetup/roleList", {
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.roleList = res.roleList;
                this.roleId = res.roleList[0].sysRoleId;

                this.getList();
            }).catch(() => {
            });
        },
        getList() {
            this.$store.dispatch("systemSetup/rolePowerList", {
                roleId: this.roleId,
                token: window.sessionStorage.getItem('token')
            }).then((res) => {
                this.tableData = res.powerList;
                this.characterCheckList = res.roleList;
            }).catch(() => {
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("systemSetup/addRole", {
                        data: JSON.stringify({
                            roleName: this.ruleForm.roleName,
                            memo: this.ruleForm.roleName,
                            token: window.sessionStorage.getItem('token')
                        })
                    }).then((res) => {
                        if(res.status == "success") {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                showClose: true,
                                center: true
                            });
                            this.handleClose(formName);
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'error',
                                showClose: true,
                                center: true
                            });
                        }
                    }).catch(() => {
                    });
                } else {
                    return false;
                }
            });
        },
        modifyRolePage() {
            this.$store.dispatch("systemSetup/modifyRolePage", {
                data: JSON.stringify({
                    roleId: String(this.roleId),
                    token: window.sessionStorage.getItem('token')
                })
            }).then((res) => {
                this.ruleForm = {
                    roleName: res.name,
                    memo: res.memo
                }
            }).catch(() => {
            });
        },
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("systemSetup/modifyRole", {
                        data: JSON.stringify({
                            roleId: this.roleId,
                            roleName: this.ruleForm.roleName,
			                memo: this.ruleForm.memo,
                            token: window.sessionStorage.getItem('token')
                        })
                    }).then((res) => {
                        if(res.status == "success") {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                showClose: true,
                                center: true
                            });
                            this.handleClose(formName);
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'error',
                                showClose: true,
                                center: true
                            });
                        }
                    }).catch(() => {
                    });
                } else {
                    return false;
                }
            });
        },
        handleClose(formName) {
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
            });
            this.dialogVisible = false;
        },
        deleteOrganization() {
            this.$confirm('你确定要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$store.dispatch("systemSetup/deleteRole", {
                    data: JSON.stringify({
                        roleId: this.roleId,
                        token: window.sessionStorage.getItem('token')
                    })
                }).then((res) => {
                    if(res.status == "success") {
                        // 删除成功
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            showClose: true,
                            center: true
                        });
                    } else {
                        // 删除失败
                        this.$message({
                            message: '删除失败',
                            type: 'error',
                            showClose: true,
                            center: true
                        });
                    }
                }).catch(() => {
                });
            }).catch(() => {   
            });
        }
    },
    watch: {
        roleId() {
            this.getList();
        }
    }
}
</script>
<style lang="scss" scoped>
.roleManage-index {
    background: #F6F8F9;
    padding: 20px;

    .head-title {
        display: flex;
        align-items: center;

        h3 {
            color: #666;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
        }

        .search-box {
            box-sizing: content-box;
            border-radius: 4px;
            display: flex;
            width: 264px;
            height: 32px;
            margin: 0 0 0 auto;

            input {
                border: solid #ccc;
                border-width: 1px 0 1px 1px;
                border-radius: 4px 0 0 4px;
                width: 170px;
                height: 100%;
                padding: 0 10px;
            }

            button {
                background: #409EFF;
                border: none;
                border-radius: 0 4px 4px 0;
                color: #fff;
                width: 94px;
                height: 100%;

                img {
                    width: 13px;
                    height: 14px;
                    margin: 0 10px 0 0;
                }
            }
        }
    }

    .operating-button-box {
        display: flex;
        flex-wrap: wrap;
        margin: 17px 0 0 0;

        button {
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            color: #333333;
            display: flex;
            align-items: center;
            height: 32px;
            padding: 0 20px;

            &:focus {outline: none;}

            +button {margin-left: 18px;}

            img {
                margin: 0 9px 0 0px;
            }
        }
    }

    .character-list-container {
        width: 100%;
        overflow-y: auto;
        margin: 13px 0 16px 0;

        .character-list-content {
            display: flex;
            width: auto;
            margin: 0 0 14px 0;

            .character-list-box {
                background: #FFFFFF;
                box-sizing: border-box;
                box-shadow: 0px 2px 4px 0px rgba(3, 13, 58, 0.03), 1px 2px 24px 0px rgba(3, 13, 58, 0.09);
                border-radius: 4px;
                width: 218px;
                height: 120px;
                padding: 15px;
                position: relative;

                +.character-list-box {
                    margin-left: 15px;
                }

                .head {
                    display: flex;

                    span {
                        color: #409EFF;
                        font-size: 16px;

                        &::before {
                            content: '';
                            background: #409EFF;
                            display: inline-block;
                            width: 2px;
                            height: 16px;
                            position: absolute;
                            left: 0;
                        }
                    }

                    h4 {
                        color: #666666;
                        font-size: 16px;
                        font-weight: bold;
                        margin: 0 auto 0 8px;
                    }
                }

                p {
                    color: #999999;
                    font-size: 12px;
                    text-align: left;
                }

                time {
                    color: #CCCCCC;
                    font-size: 12px;
                    position: absolute;
                    left: 16px;
                    bottom: 18px;
                }
            }
        }
    }

    .jurisdiction-container {
        background: #fff;
        font-size: 14px;
        padding: 23px;

        table {
            border: 1px solid #CCCCCC;
            border-radius: 4px 4px 0px 0px;
            border-collapse: collapse;
            width: 100%;

            th {
                background: #F7F7F7;
                border: 1px solid #CCCCCC;
                color: #333333;
                font-size: 14px;
                height: 68px;
            }

            td {
                border: 1px solid #CCCCCC;
                height: 44px;
                padding: 0 12px;
            }
        }
    }

    .dialog-button-box {
        display: flex;
        justify-content: center;
    }
}
</style>
