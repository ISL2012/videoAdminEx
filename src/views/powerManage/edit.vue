<template>
	<div class="powerManageEdit-edit">
        <h3>账户管理</h3>
        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <h4>账户信息</h4>
            <el-form-item label="一级菜单" prop="">
                <el-select v-model="firstPower" placeholder="请选择" class="col-width" disabled>
                    <el-option label="请选择" value="0"></el-option>
                    <el-option v-for="item in firstPowerArr" :key="item.sysPowerId" :label="item.name" :value="item.sysPowerId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级菜单" prop="">
                <el-select v-model="subPower" placeholder="请选择" class="col-width" disabled>
                    <el-option label="请选择" value="0"></el-option>
                    <el-option v-for="item in subPowerArr" :key="item.sysPowerId" :label="item.name" :value="item.sysPowerId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="">
                <el-input v-model="ruleForm.name" placeholder="请输入" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="">
                <!-- <el-input v-model="pType" class="col-width" disabled></el-input> -->
                <span class="col-width">{{pType}}</span>
            </el-form-item>
            <el-form-item label="URL" prop="">
                <el-input v-model="ruleForm.url" placeholder="请输入" class="col-width"></el-input>
            </el-form-item>
            <el-form-item label="标识" prop="">
                <el-input v-model="ruleForm.memo" placeholder="请输入" class="col-width"></el-input>
            </el-form-item>

            <el-button type="primary" @click="save('ruleForm')">保存</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'powerManageEdit',
	components: {},
	data() {
		return {
            firstPower: '0',
            firstPowerArr: [],
            subPower: '0',
            subPowerArr: [],
            ruleForm: {
                "sysPowerId": '0',
                "powerId": '0',
                "name": '',
                "memo": '',
                "url": '',
                "status": "0"
            },
            rules: {
                name: [{required: true, message: '请输入', trigger: 'blur'}],
            },
            pType: '一级菜单'
        }
	},
	created() {
    },
	mounted() {
        this.getAddPowerPage();
        this.modifyPowerPage();
    },
	methods: {
        getAddPowerPage() {
            // 获取一级栏目
            // let data = {"token": window.sessionStorage.getItem("token")}
            this.$store.dispatch("systemSetup/addPowerPage", {
                data: JSON.stringify({
                    "token": window.sessionStorage.getItem('token')
                })
            }).then((res) => {
                this.firstPowerArr = res.firstPowerList;
            }).catch(() => {
            });
        },
        getSubPowerList() {
            // 获取二级栏目
            let data = {
                powerId: String(this.firstPower),
                token: window.sessionStorage.getItem('token')
            }
            this.$store.dispatch("systemSetup/findSubPowerList", {
                data: JSON.stringify(data)
            }).then((res) => {
                this.subPowerArr = res.subPowerList;
            }).catch(() => {
            });
        },
        modifyPowerPage() {
            // 获取详情
            let data = {
                "sysPowerId": String(this.$route.query.mid),
                "token": window.sessionStorage.getItem('token')
            }
            this.$store.dispatch("systemSetup/modifyPowerPage", {
                data: JSON.stringify(data)
            }).then((res) => {
                let powerInfo = res.powerInfo;
                this.ruleForm.name = powerInfo.name;
                this.ruleForm.url = powerInfo.url;
                this.ruleForm.memo = powerInfo.memo;
                if(powerInfo.grade == 1) {
                    this.pType = "一级菜单";
                    this.firstPower = "0";
                    this.subPower = "0";
                } else if(powerInfo.grade == 2) {
                    this.pType = "二级菜单";
                    this.firstPower = Number(powerInfo.parentId);
                    this.subPower = "0";
                    this.getSubPowerList(this.firstPower);
                } else if(powerInfo.grade == 3) {
                    this.pType = "功能按钮";
                    this.firstPower = Number(powerInfo.firstPowerId);
                    this.subPower = Number(powerInfo.parentId);
                    this.getSubPowerList(this.firstPower);
                }
            }).catch(() => {
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs[formName].resetFields();
                } else {
                    return false;
                }
            });
        }
    },
    watch: {
        firstPower(val) {
            if (val === '0') {
                this.subPower = '0';
                this.subPowerArr = [];
                setTimeout(() => {
                    this.pType = '一级菜单';
                }, 0);
            } else {
                this.getSubPowerList();
                this.pType = '二级菜单';
            }
        },
        subPower(val) {
            if (val === '0') {
                this.pType = '二级菜单';
            } else {
                this.pType = '功能按钮';
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.powerManageEdit-edit {

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
        display: inline-block;
        width: 300px;
    }
}
</style>
