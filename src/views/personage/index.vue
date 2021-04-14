<template>
	<div class="personage-index">
        <h3>个人中心</h3>

        <el-tabs v-model="activeName" class="content" @tab-click="handleClick">
            <el-tab-pane label="个人资料" name="datum">
                <el-form ref="personalData" label-width="80px" :model="personalData" :rules="personalRules">
                    <el-form-item label="登录账号">
                        <span>{{personalData.userName}}</span>
                    </el-form-item>
                    <el-form-item label="所属单位">
                        <span>{{personalData.sname}}</span>
                    </el-form-item>
                    <el-form-item label="账户名称" prop="accountName">
                        <el-input placeholder="请输入账户名称，20字符以内" v-model="personalData.accountName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone1">
                        <el-input placeholder="请输入手机号" v-model="personalData.phone1"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="请输入邮箱" v-model="personalData.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePersonal('personalData')">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码管理" name="password">
                <el-form ref="passwordUpdate" label-width="100px" :model="passwordUpdate" :rules="passwordRules">
                    <el-form-item label="登录账号">
                        <span>{{userMessage.userName}}</span>
                    </el-form-item>
                    <el-form-item label="原始密码">
                        <el-input type="password" placeholder="请输入原始密码" v-model="passwordUpdate.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" placeholder="请输入新密码。字母开头，由字母和数字组成的6~18位字符，只包含字母、数字、下划线" v-model="passwordUpdate.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码">
                        <el-input type="password" placeholder="请重复输入新密码" v-model="passwordUpdate.affirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword('passwordUpdate')">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
export default {
	name: 'personage',
	components: {},
	data() {
        var phoneRules = (rule, value, callback) => {
            var ret = /^1[3456789]\d{9}$/;
            if ( !ret.test(value) && value != "" ) {
                callback(new Error('手机号有误'));
            } else {
                callback();
            }
        };
        var emailRules = (rule, value, callback) => {
            setTimeout(() => {
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (value != "" && !reg.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            var reg = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码格式不正确'));
            } else {
                // if (this.passwordRules.affirmPassWord !== '') {
                //     this.$refs.passwordRules.validateField('checkPass');
                // }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordRules.newPassWord) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
		return {
            userMessage: JSON.parse(window.sessionStorage.getItem('userMessage')),
            activeName: 'datum',
            personalData: {
                userName: '',
                sname: '',
                accountName: '',
                phone1: '',
                email: ''
            },
            personalRules: {
                accountName: [
                    {required: true, message: '请输入账户名称', trigger: 'blur'},
                    {max: 20, message: '请输入20位字符以内', trigger: 'blur' }
                ],
                phone1: [{ validator: phoneRules, trigger: 'blur' }],
                email: [{ validator: emailRules, trigger: 'blur' }]
            },
            passwordUpdate: {
                oldPassWord: '',
                newPassWord: '',
                affirmPassWord: ''
            },
            passwordRules: {
                oldPassWord: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
                newPassWord: [{validator: validatePass, trigger: 'blur'}],
                affirmPassWord: [{validator: validatePass2, trigger: 'blur'}]
            }
        }
	},
	created() {
    },
	mounted() {
        this.getUserInfo();
    },
	methods: {
        handleClick(tab) {
            if (tab.name == 'datum') {
                this.getUserInfo();
            }
        },
        getUserInfo() {
            this.$store.dispatch("user/userInfo", {
                id: this.userMessage.userId,
                token: window.sessionStorage.getItem('token')
            }).then((res) => {
                this.personalData = {
                    userName: res.userInfo.userName,
                    sname: res.userInfo.sname,
                    accountName: res.userInfo.accountName,
                    phone1: res.userInfo.phone1,
                    email: res.userInfo.email
                }
            }).catch((res) => {
            });
        },
        updatePersonal(formName) {
            let data = {
                id: this.userMessage.userId,
                phone1: this.personalData.phone1,
                email: this.personalData.email,
                accountName: this.personalData.accountName,
                token: window.sessionStorage.getItem('token')
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("user/modifyUser", {
                        data: JSON.stringify(data)
                    }).then((res) => {
                        if(res.status == "success") {
							// 修改成功
                        } else {
                            // 修改失败
                        }
                    }).catch(() => {
                    });
                } else {
                    return false;
                }
            });
        },
        updatePassword(formName) {
            this.$refs[formName].validate((valid) => {
                var data = {
                    id: this.userMessage.userId,
                    Pwd: this.passwordUpdate.oldPassword,
                    newPwd: this.passwordUpdate.newPassword,
                    token: window.sessionStorage.getItem('token')
                }
                if (valid) {
                    this.$store.dispatch("user/modifyPwd", {
                        data: JSON.stringify(data)
                    }).then((res) => {
                        if(res.status == "success") {
							// 修改成功
                        } else {
                            // 修改失败
                        }
                    }).catch(() => {
                    });
                } else {
                    return false;
                }
            });
        },
    },
}
</script>
<style lang="scss" scoped>
.personage-index {
    background: #f6f8f9;
    padding: 20px;

    >h3 {
        color: #666666;
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 20px 0;
    }

    .content {
        background: #fff;
        min-height: calc( 100vh - 275px );
    }

    .el-tab-pane {
        padding: 0 25px;
    }
}
</style>
