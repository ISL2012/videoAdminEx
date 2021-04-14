<template>
	<div class="powerManage-index">
        <div class="head-title">
            <h3>菜单管理</h3>
            <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="content" />
                <button @click="getList"><img src="@/assets/search.png"/>查询</button>
            </div>

            <el-popover placement="bottom" width="530" trigger="click">
                <el-form ref="screenForm" :model="screenForm" :inline="true" class="screen-form">
                    <el-form-item>
                        <el-input v-model="screenForm.parentName" placeholder="请输入上级目录" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="screenForm.powerName" placeholder="请输入菜单名称" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item style="display:block">
                        <button class="reset" @click="resetForm('screenForm')">重置</button>
                        <button class="primary" @click="tableDataPage.currentPage=1;getList">查询</button>
                    </el-form-item>
                </el-form>
                <el-button slot="reference" class="screen">筛选</el-button>
            </el-popover>
        </div>

        <div class="operating-button-box">
            <button><img src="@/assets/dialPlan_icon_11.png" />添加</button>
            <button :disabled="tableDataSelection.length!=1" @click="$router.push('/powerManageEdit?mid='+tableDataSelection[0].sysPowerId)"><img src="@/assets/dialPlan_icon_12.png" />修改</button>
            <button :disabled="tableDataSelection.length!=1" @click="deletePower"><img src="@/assets/dialPlan_icon_16.png" />删除</button>
        </div>

        <el-table :data="tableData" style="margin: 24px 0" :header-row-style="{height: '68px'}" 
            :cell-style="{height: '44px'}" :header-cell-style="{'font-weight':'bold'}"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="grade" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.grade == 1">一级菜单</span>
                    <span v-else-if="scope.row.grade == 2">二级菜单</span>
                    <span v-else-if="scope.row.grade == 3">功能按钮</span>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="url"></el-table-column>
            <el-table-column prop="memo" label="标识"></el-table-column>
            <el-table-column prop="parentName" label="上级目录"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
             :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box">
        </el-pagination>
    </div>
</template>

<script>
export default {
	name: 'powerManage',
	components: {},
	data() {
		return {
            content: '',
            screenForm: {
                parentName: '',
                powerName: ''
            },
            tableData: [],
            tableDataSelection: [],
            tableDataPage: {
                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        }
	},
	created() {
        this.getList();
    },
	mounted() {},
	methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(selection) {
            this.tableDataSelection = selection;
        },
        handleCurrentChange(page) {
            this.tableDataPage.currentPage = page;
            this.getList();
        },
        getList() {
            this.$store.dispatch("systemSetup/powerList", {
                powerName: this.screenForm.powerName,
			    parentName: this.screenForm.parentName,
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.tableData = res.powerList;
                this.tableDataPage.currentPage = res.pageInfo.curPage
                this.tableDataPage.total = res.pageInfo.totalSize
            }).catch(() => {
            });
        },
        deletePower() {
             this.$confirm('你确定要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$store.dispatch("systemSetup/powerList", {
                    data: JSON.stringify({
                        "powerId": this.tableDataSelection[0].sysPowerId,
                        "token": window.sessionStorage.getItem('token')
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
    }
}
</script>
<style lang="scss" scoped>
.powerManage-index {
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

        .search-option {
            width: 160px;
            height: 24px;
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
            display: flex;
            align-items: center;
            height: 32px;
            padding: 0 20px;
            cursor: pointer;

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
