<template>
	<div class="organizationManage-edit">
        <h3>单位管理</h3>
        <el-form label-width="100px" :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
            <h4>账户信息</h4>
            <el-form-item label="单位全称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入" class="col-width"></el-input>
                <el-switch v-model="ruleForm.isAdmin" class="switch-box"></el-switch><span>允许查看所有单位数据(慎选)</span>
            </el-form-item>
            <el-form-item label="单位简称" prop="sname">
                <el-input v-model="ruleForm.sname" placeholder="请输入" class="col-width" ></el-input>
            </el-form-item>
            <el-form-item label="单位类型" prop="organizationTypeId" required>
                <el-select v-model="ruleForm.organizationTypeId" placeholder="请选择" class="col-width">
                    <el-option v-for="item in organizationTypeArr" :key="item.organizationTypeId" :label="item.name" :value="item.organizationTypeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="登录账号" prop="admin" required>
                <el-input v-model="ruleForm.admin" placeholder="字母开头，由字母和数字组成的6~16位字符" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="账户名称" prop="accountName">
                <el-input v-model="ruleForm.accountName" placeholder="20位字符以内" class="col-width"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="passWord" required>
                <el-input v-model="ruleForm.passWord" placeholder="字母开头，由字母和数字组成的6~18位字符，只包含字母、数字、下划线" type="passWord" class="col-width"></el-input>
            </el-form-item> -->
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
            <el-form-item label="证件号码" prop="phone2" required>
                <el-input v-model="ruleForm.phone2" placeholder="请输入正确的证件号" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" required>
                <el-input v-model="ruleForm.email" placeholder="请输入" type="email" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq" required>
                <el-input v-model="ruleForm.qq" placeholder="请输入" class="col-width"></el-input>
            </el-form-item>

            <h4>此单位可创建角色</h4>
            <el-form-item label="角色配置" prop="roleList" style="display:block" required>
                <el-checkbox-group v-model="ruleForm.roleList">
                    <el-checkbox :label="item.sysRoleId" v-for="item in roleList" :key="item.value">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-button type="primary" @click="save('ruleForm')">保存</el-button>
            <!-- <el-button type="primary" @click="$router.go(-1)">返回</el-button> -->
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
            if (!ret.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var emailVerify = (rule, value, callback) => {
            var ret4 = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if (!ret4.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
        var qqVerify = (rule, value, callback) => {
            var ret = /^[1-9][0-9]{4,10}$/;
            if (!ret.test(value)) {
                callback(new Error('输入格式不正确'));
            } else {
                callback();
            }
        }
		return {
            userId: '',
            roleList: [],
            roleListOld: [],
            organizationTypeArr: [],
            ruleForm: {
                name: '',
                sname: '',
                organizationTypeId: '',
                admin: '',
                accountName: '',
                // passWord: '',
                status: '0',
                telPhone: '',
                phone1: '',
                phone2: '',
                email: '',
                qq: '',
                roleList: [],
                isAdmin: false,
                token: '',
            },
            rules: {
                name: [{required: true, message: '请输入单位全称', trigger: 'blur'}],
                sname: [{required: true, message: '请输入单位简称', trigger: 'blur'}],
                organizationTypeId: [{required: true, message: '请选择单位类型', trigger: 'change'}],
                admin: [{validator: loginVerify, trigger: 'blur'}],
                accountName: [
                    {required: true, message: '请输入账户名称', trigger: 'blur'},
                    {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                ],
                // passWord: [{validator: passwordVerify, trigger: 'blur'}],
                telPhone: [{required: true, message: '请输入', trigger: 'blur'}],
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
            this.$store.dispatch("systemSetup/modifyOrganizationPage", {
                organizationId: this.$route.query.mid,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.userId = isExist(organization.user && organization.user.id) ? organization.user.id : "";
                this.roleList = res.roleList; // data.roles
                this.roleListOld = res.roleList;
                this.organizationTypeArr = res.organizationTypes; // data.organizationType
                this.ruleForm = {
                    name: res.organization.name,
                    sname: res.organization.sname,
                    organizationTypeId: res.organization.typeId,
                    admin: res.organization.admin,
                    accountName: res.organization.user.accountName,
                    status: res.organization.user.status,
                    telPhone: res.organization.user.telphone,
                    phone1: res.organization.user.phone1,
                    phone2: res.organization.user.phone1,
                    email: res.organization.user.email,
                    qq: res.organization.user.qq,
                    roleList: [],
                    isAdmin: res.organization.user.isAdmin=='0',
                }
                for (const item of res.roleLists) {
                    this.ruleForm.roleList.push(item.sysRoleId);
                }
            }).catch(() => {
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("systemSetup/modifyOrganization", 
                        JSON.stringify({ data: {
                            "organizationId": this.$route.query.mid,
							"id": String(this.userId),
							"name": this.ruleForm.name,
							"sname": this.ruleForm.sname,
							"organizationTypeId": $this.ruleForm.organizationTypeId,
							"admin": this.ruleForm.admin,
							"accountName": this.ruleForm.accountName,
							// "status": this.ruleForm.status,
							"telphone": this.ruleForm.telPhone,
							"phone1": this.ruleForm.phone1,
							"phone2": this.ruleForm.phone2,
							"email": this.ruleForm.email,
							"qq": this.ruleForm.qq,
							"roleList": String(this.ruleForm.roleList),
							"oldRoleList": String(this.roleListOld),
							"isAdmin": this.ruleForm.isAdmin,
                            "token": window.sessionStorage.getItem('token'),
                        } })
                    ).then((res) => {
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
                    }).catch(() => {
                    });
                    // this.$refs[formName].resetFields();
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
