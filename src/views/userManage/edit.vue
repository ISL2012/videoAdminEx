<template>
	<div class="organizationManage-edit">
        <h3>账户管理</h3>
        <el-form label-width="100px" :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
            <h4>账户信息</h4>
            <el-form-item label="登录账号" prop="userName" required>
                <el-input v-model="ruleForm.userName" disabled placeholder="字母开头，由字母和数字组成的6~16位字符" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="账户名称" prop="accountName">
                <el-input v-model="ruleForm.accountName" placeholder="20位字符以内" class="col-width"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="passWord" required>
                <el-input v-model="ruleForm.passWord" placeholder="字母开头，由字母和数字组成的6~18位字符，只包含字母、数字、下划线" type="passWord" class="col-width"></el-input>
            </el-form-item> -->
            <el-form-item label="角色配置" prop="roleList" style="display:block" required>
                <el-checkbox-group v-model="ruleForm.roleList" style="min-width:200px">
                    <el-checkbox v-for="item in roleList" :key="item.value" :label="item.sysRoleId">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="状态" prop="status" required>
                <el-select v-model="ruleForm.status" placeholder="请选择" class="col-width">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <h4>联系方式</h4>
            <el-form-item label="姓名" prop="telPhone">
                <el-input v-model="ruleForm.telPhone" placeholder="请输入姓名" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone1" required>
                <el-input v-model="ruleForm.phone1" placeholder="请填写正确的手机号" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="证件号码" prop="phone2">
                <el-input v-model="ruleForm.phone2" placeholder="请输入正确的证件号" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入" type="email" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm.qq" placeholder="请输入" class="col-width"></el-input>
            </el-form-item>

            <el-form-item style="display:block">
                <el-button type="primary" @click="save('ruleForm')">保存</el-button>
                <!-- <el-button type="primary" @click="$router.go(-1)">返回</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'organizationManageEdit',
	components: {},
	data() {
        var loginVerify = (rule, value, callback) => {
            var ret = /^[a-zA-Z]{1}[a-zA-Z0-9]{5,15}$/i;
            if (!ret.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var passwordVerify = (rule, value, callback) => {
            var ret = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
            if (!ret.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var phone1Verify = (rule, value, callback) => {
            var ret = /^1[3456789]\d{9}$/;
            if (!ret.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var phone2Verify = (rule, value, callback) => {
            var ret = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if (!ret.test(value) && value!='') {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var emailVerify = (rule, value, callback) => {
            var ret4 = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if (!ret4.test(value) && value!='') {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var qqVerify = (rule, value, callback) => {
            var ret = /^[1-9][0-9]{4,10}$/;
            if (!ret.test(value) && value!='') {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
		return {
            ruleForm: {
                userName: '',
                accountName: '',
                // passWord: '',
                status: '0',
                telPhone: '',
                phone1: '',
                phone2: '',
                email: '',
                qq: '',
                roleList: []
            },
            roleList: [],
            roleListOld: [],
            rules: {
                userName: [{validator: loginVerify, trigger: 'blur'}],
                accountName: [
                    {required: true, message: '请输入账户名称', trigger: 'blur'},
                    {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                ],
                // passWord: [{validator: passwordVerify, trigger: 'blur'}],
                phone1: [{validator: phone1Verify, trigger: 'blur'}],
                phone2: [{validator: phone2Verify, trigger: 'blur'}],
                email: [{validator: emailVerify, trigger: 'blur'}],
                qq: [{validator: qqVerify, trigger: 'blur'}],
                roleList: [
                    {type: 'array', required: true, message: '请至少选择一个角色配置', trigger: 'change'}
                ]
            }
        }
	},
	created() {
        this.addOrganizationPage();
    },
	mounted() {},
	methods: {
        addOrganizationPage() {
            this.$store.dispatch("systemSetup/modifyUserPage", {
                id: this.$route.query.mid,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.roleList = res.roles;
                this.ruleForm = {
                    userName: res.user.userName,
                    accountName: res.user.accountName,
                    // passWord: '',
                    status: res.user.status,
                    telPhone: res.user.telPhone,
                    phone1: res.user.phone1,
                    phone2: res.user.phone2,
                    email: res.user.email,
                    qq: res.user.qq,
                    roleList: []
                }
                this.roleListOld = res.roleList;
                for (const item of res.roleList) {
                    this.ruleForm.roleList.push(item.sysRoleId);
                }
                this.$forceUpdate();
            }).catch(() => {
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("systemSetup/modifyUser", {
                        id: this.$route.query.mid,
                        accountName: this.ruleForm.accountName,
                        status: this.ruleForm.status,
                        telphone: this.ruleForm.telPhone,
                        phone1: this.ruleForm.phone1,
                        phone2: this.ruleForm.phone2,
                        email: this.ruleForm.email,
                        qq: this.ruleForm.qq,
                        roleList: String(this.ruleForm.roleList),
                        oldRoleList: String(this.roleListOld),
                        token: window.sessionStorage.getItem('token'),
                    }).then((res) => {
                        if(res.status == "success") {
                            // 修改成功
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose: true,
                                center: true
                            });
                        } else {
                            // 修改失败
                            this.$message({
                                message: '修改失败',
                                type: 'error',
                                showClose: true,
                                center: true
                            });
                        }
                        // this.$refs[formName].resetFields();
                    }).catch(() => {
                    });
                } else {
                    return false;
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.organizationManage-edit {

    >h3 {
        border-bottom: 1px solid #EFEFEF;
        color: #333333;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        padding: 0 23px;
        margin: 0;
        width: 100%;
        height: 66px;
    }

    h4 {
        color: #333333;
        display: flex;
        align-items: center;
        font-size: 16px;

        &::before {
            content: '';
            background: #3F9CFC;
            border-radius: 3px;
            display: inline-block;
            width: 6px;
            height: 24px;
            margin: 0 16px 0 0;
        }
    }

    .el-form {
        padding: 0 24px;
    }

    .switch-box {
        margin: 0 0 0 25px;
    }

    .col-width {
        width: 300px;
    }
}
</style>
