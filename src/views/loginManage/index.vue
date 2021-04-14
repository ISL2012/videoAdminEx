<template>
	<div class="loginManage-index">
        <div class="head-title">
            <h3>登录日志管理</h3>
            <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="content" />
                <button @click="getList"><img src="@/assets/search.png"/>查询</button>
            </div>

            <el-popover placement="bottom" width="530" trigger="click">
                <el-form ref="screenForm" :model="screenForm" :inline="true">
                    <el-form-item>
                        <el-select v-model="screenForm.organizationId" placeholder="请选择单位" class="screen-option">
                            <el-option label="" value="" v-for="(item, i) in organizationArr" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="screenForm.opType" placeholder="请选择操作类型" class="screen-option">
                            <el-option label="" value="" v-for="(item, i) in opTypeArr" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="screenForm.userName" placeholder="请输入登录账号" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="screenForm.startTime" type="datetime" placeholder="选择开始时间" class="screen-option">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="screenForm.endTime" type="datetime" placeholder="选择结束时间" class="screen-option">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="screenForm.Id" placeholder="请输入ID" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="screenForm.keyWord" placeholder="请输入操作类型" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item style="display:block">
                        <button class="primary" @click="getList">查询</button>
                    </el-form-item>
                </el-form>
                <el-button slot="reference" class="screen">筛选</el-button>
            </el-popover>
        </div>

        <el-table :data="tableData" style="margin: 24px 0" :header-row-style="{height: '68px'}" >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="userName" label="登录账号"></el-table-column>
            <el-table-column prop="userId" label="ID"></el-table-column>
            <el-table-column prop="organization" label="单位简称"></el-table-column>
            <el-table-column prop="handle" label="操作类型"></el-table-column>
            <el-table-column prop="result" label="结果">
                <template slot-scope="scope">
                    <span :style="{color: scope.row.result == '成功'? '#67C23A': '#F56C6C'}">{{scope.row.result}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ipAddress" label="IP地址"></el-table-column>
            <el-table-column prop="createTime" label="请求时间"></el-table-column>
        </el-table>
        <el-pagination :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
	name: 'loginManage',
	components: {},
	data() {
		return {
            content: '',
            screenForm: {
                organizationId: '',
                opType: '',
                startTime: '',
                endTime: '',
                userName: '',
                Id: '',
                keyWord: ''
            },
            organizationArr: [],
            opTypeArr: [],
            tableData: [],
            tableDataPage: {
                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        }
	},
	created() {
        this.getorganizationArr();
        this.getopTypeArr();
        this.getList();
    },
	mounted() {},
	methods: {
        handleCurrentChange(page) {
            this.tableDataPage.currentPage = page;
            this.getList();
        },
        getList() {
            this.$store.dispatch("systemSetup/loginList", {
                organizationId: this.screenForm.organizationId,
                opType: this.screenForm.opType,
                userName: this.screenForm.userName,
                Id: this.screenForm.Id,
                keyWord: this.screenForm.keyWord,
                startTime: this.screenForm.startTime,
                endTime: this.screenForm.endTime,
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.tableData = res.loginLogList;
                this.tableDataPage.currentPage = res.pageInfo.curPage;
                this.tableDataPage.total = res.pageInfo.totalSize;
            }).catch(() => {
            });
        },
        // 获取单位选项
        getorganizationArr() {
            this.$store.dispatch("systemSetup/userList", {
                userName: '',
			    cpId: '',
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.organizationArr = res.organizationList;
            }).catch(() => {
            });
        },
        getopTypeArr() {
            this.$store.dispatch("message/getGloablecode", "OP_TYPE").then((res) => {
                this.opTypeArr = res.data;
            }).catch(() => {
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.loginManage-index {
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

        .screen {
            background: #FFFFFF;
            border: 1px solid #CCCCCC;
            border-radius: 16px;
            color: #333333;
            width: 94px;
            height: 32px;
            margin: 0 0 0 16px;
        }
    }

}

.el-form {
    .el-form-item {
        margin: 0 10px 10px 0;

        .el-form-item__content {
            line-height: 1;
        }
    }

    .reset {
        background: #fff;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        color: #666;
        width: 64px;
        height: 24px;
    }

    .primary {
        background: #409EFF;
        border: none;
        border-radius: 4px;
        color: #fff;
        width: 64px;
        height: 24px;
        margin: 0 0 0 8px;
    }
}
</style>
