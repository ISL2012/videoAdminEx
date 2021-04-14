<template>
	<div class="organizationManage-index">
        <div class="head-title">
            <h3>单位管理</h3>
            <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="userName" />
                <button @click="handleCurrentChange(1)"><img src="@/assets/search.png"/>查询</button>
            </div>
        </div>

        <div class="operating-button-box">
            <button><img src="@/assets/dialPlan_icon_11.png" />添加</button>
            <!-- <button><img src="@/assets/" />查看</button> -->
            <button :disabled="tableDataSelection.length!=1" @click="$router.push('/organizationManageEdit?mid='+tableDataSelection[0].organizationId)"><img src="@/assets/dialPlan_icon_12.png" />修改</button>
            <button :disabled="tableDataSelection.length<=0" @click="deleteOrganization"><img src="@/assets/dialPlan_icon_16.png" />删除</button>
            <button :disabled="tableDataSelection.length!=1" @click="respassWord"><img src="@/assets/userManage_icon_05.png" />重置密码</button>
        </div>

        <el-table :data="tableData" style="margin: 24px 0" :header-row-style="{height: '68px'}" 
            :cell-style="{height: '44px'}" :header-cell-style="{'font-weight':'bold'}"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="createUserId" label="ID"></el-table-column>
            <el-table-column prop="sname" label="单位简称"></el-table-column>
            <el-table-column prop="organizationId" label="CpId"></el-table-column>
            <el-table-column prop="admin" label="登录账号"></el-table-column>
            <el-table-column prop="status" label="账号状态">
                <template slot-scope="scope">
                    <span class="table-status" v-if="scope.row.status == '0'" style="background:#409EFF;color:#fff">启用</span>
                    <span class="table-status" v-else-if="scope.row.status == '1'" style="background:#409EFF;color:#999">停用</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
            :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box">
        </el-pagination>
    </div>
</template>

<script>
export default {
	name: 'organizationManage',
	components: {},
	data() {
		return {
            userName: '',
            tableData: [],
            tableDataPage: {
                currentPage: 1,
                total: 0,
                pageSize: 10
            },
            tableDataSelection: []
        }
	},
	created() {},
	mounted() {
        this.organizationList();
    },
	methods: {
        handleSelectionChange(selection) {
            this.tableDataSelection = selection;
        },
        handleCurrentChange(page) {
            this.tableDataPage.currentPage = page;
            this.organizationList();
        },
        organizationList() {
            this.$store.dispatch("systemSetup/organizationList", {
                userName: this.userName,
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.tableData = res.organizationList;
                this.tableDataPage = {
                    currentPage: res.pageInfo.curPage,
                    total: res.pageInfo.totalPage,
                    pageSize: res.pageInfo.totalSize
                }
            }).catch(() => {
            });
        },
        respassWord() {
            this.$confirm('密码将被重置为：<span style="color: #E6A23C;">123456</span>, 是否确认操作?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$store.dispatch("systemSetup/respassWord", {
                    data: JSON.stringify({
                        organizationId: String(this.tableDataSelection[0].organizationId),
                        token: window.sessionStorage.getItem('token'),
                    })
                }).then((res) => {
                    if(res.status == "success") {
                        // 重置密码成功
                        this.$message({
                            message: '重置密码成功',
                            type: 'success',
                            showClose: true,
                            center: true
                        });
                    } else {
                        // 重置密码失败
                        this.$message({
                            message: '重置密码失败',
                            type: 'error',
                            showClose: true,
                            center: true
                        });
                    }
                }).catch(() => {
                });
            }).catch(() => {   
            });
        },
        deleteOrganization() {
            this.$confirm('你确定要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                let organizationId = [];
                for (const item of this.tableDataSelection) {
                    organizationId.push(item.organizationId);
                }
                this.$store.dispatch("systemSetup/deleteOrganization", {
                    data: JSON.stringify({
                        organizationId: String(organizationId),
                        token: window.sessionStorage.getItem('token'),
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
}
</script>
<style lang="scss" scoped>
.organizationManage-index {
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

    .operating-button-box {
        display: flex;
        flex-wrap: wrap;
        margin: 17px 0 0 0;

        button {
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            color: #333333;
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 32px;
            padding: 0 20px;

            &:focus {outline: none;}

            &[disabled] {
                background: #efefef;
                cursor: no-drop;
            }

            +button {
                margin-left: 18px;
            }

            img {
                margin: 0 9px 0 0px;
            }
        }
    }

    .table-status {
        border-radius: 12px;
        display: inline-block;
        width: 44px;
        height: 24px;
        text-align: center;
    }
}
</style>
