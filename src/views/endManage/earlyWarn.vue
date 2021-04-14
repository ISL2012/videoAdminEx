<template>
	<div class="earlyWarn-index">
        <div class="head-title">
            <h3>监测预警中心</h3>
            <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="keyWord" />
                <button @click="tableDataPage.currentPage=1;getList()"><img src="@/assets/search.png"/>查询</button>
            </div>

            <el-popover placement="bottom" width="530" trigger="click">
                <el-form ref="screenForm" :model="screenForm" :inline="true" class="screen-form">
                    <el-select v-model="screenForm.tempId" placeholder="监测模板" class="screen-option">
                        <el-option :label="item.templateName" :value="item.id" v-for="(item, i) in tempArr" :key="i"></el-option>
                    </el-select>
                    <el-select v-model="screenForm.earlyWarnStatus" placeholder="预警状态" class="screen-option">
                        <el-option :label="item.name" :value="item.cdoe" v-for="(item, i) in earlyWarnStatusArr" :key="i"></el-option>
                    </el-select>
                    <el-select v-model="screenForm.earlyWarnTypeCode" placeholder="预警类型" class="screen-option">
                        <el-option :label="item.name" :value="item.keycode" v-for="(item, i) in queryAllEalyWarnTypeCodeAndNameArr" :key="i"></el-option>
                    </el-select>
                    <el-select v-model="screenForm.earlyWarnLevel" placeholder="预警级别" class="screen-option">
                        <el-option :label="item.name" :value="item.code" v-for="(item, i) in EARLY_WARN_LEVELArr" :key="i"></el-option>
                    </el-select>
                    <el-form-item>
                        <el-input v-model="screenForm.dealUserName" placeholder="处理人员" class="screen-option"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="screenForm.earlyWarnTime" value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime" placeholder="处理时间" class="screen-option">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="display:block">
                        <button class="reset" @click="resetForm('screenForm')">重置</button>
                        <button class="primary" @click="tableDataPage.currentPage=1;getList()">查询</button>
                    </el-form-item>
                </el-form>
                <el-button slot="reference" class="screen">筛选</el-button>
            </el-popover>
        </div>

        <div class="operating-button-box">
            <!-- <button :disabled="tableDataSelection.length!=1" @click=""><img src="@/assets/icon_01.png" />处理</button> -->
            <button :disabled="tableDataSelection.length!=1" @click="ignore"><img src="@/assets/icon_02.png" />忽略</button>
            <!-- <button @click=""><img src="@/assets/icon_03.png" />忽略记录</button> -->
        </div>

        <el-table :data="tableData" style="margin: 24px 0" :header-row-style="{height: '68px'}" 
            :cell-style="{height: '44px'}" :header-cell-style="{'font-weight':'bold'}"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column type="index" label="序号" width="80"></el-table-column> -->
            <el-table-column prop="earlyWarnName" label="预警类型">
                <template slot-scope="scope">
                    <p class="table-cell-code">{{scope.row.earlyWarnCode}}</p>
                    <p class="table-cell-name">{{scope.row.planInfoName}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="earlyWarnLevel" label="预警级别" width="85">
                <template slot-scope="scope">
                    <span v-if="scope.row.earlyWarnLevel == 1" class="risk risk-tall">高风险</span>
                    <span v-else-if="scope.row.earlyWarnLevel == 2" class="risk risk-centre">中风险</span>
                    <span v-else-if="scope.row.earlyWarnLevel == 3" class="risk risk-low">低风险</span>
                </template>
            </el-table-column>
            <el-table-column prop="earlyWarnStatusName" label="预警状态">
                <template slot-scope="scope">
                    <span :style="{color: scope.row.earlyWarnStatus == 0? '#999999': '#409EFF'}">{{scope.row.earlyWarnStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="navigation" label="预警位置"></el-table-column>
            <el-table-column prop="planInfoName" label="所属计划名称"></el-table-column>
            <el-table-column prop="earlyWarnTime" label="预警时间" width="170"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
             :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box">
        </el-pagination>
    </div>
</template>

<script>
export default {
	name: 'earlyWarn',
	components: {},
	data() {
		return {
            keyWord: '',
            tempArr: [],
            earlyWarnStatusArr: [],
            queryAllEalyWarnTypeCodeAndNameArr: [],
            EARLY_WARN_LEVELArr: [],
            screenForm: {
                tempId: '',
                earlyWarnStatus: '',
                earlyWarnTypeCode: '',
                earlyWarnLevel: '',
                dealUserName: '',
                earlyWarnTime: ''
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
        this.getTempArr();
        this.getEARLY_WARN_STATUS();
        this.queryAllEalyWarnTypeCodeAndName();
        this.getEARLY_WARN_LEVEL();

        this.getList();
    },
	mounted() {},
	methods: {
        getTempArr() {
            this.$store.dispatch("endManage/dialTemplateList", {
            }).then((res) => {
                this.tempArr = res.data;
            }).catch(() => {
            });
        },
        getEARLY_WARN_STATUS() {
            this.$store.dispatch("message/getGloablecode", "EARLY_WARN_STATUS").then((res) => {
                this.earlyWarnStatusArr = res.data;
            }).catch(() => {
            });
        },
        queryAllEalyWarnTypeCodeAndName() {
            this.$store.dispatch("endManage/queryAllEalyWarnTypeCodeAndName", "").then((res) => {
                this.queryAllEalyWarnTypeCodeAndNameArr = res.data;
            }).catch(() => {
            });
        },
        getEARLY_WARN_LEVEL() {
            this.$store.dispatch("message/getGloablecode", "EARLY_WARN_LEVEL").then((res) => {
                this.EARLY_WARN_LEVELArr = res.data;
            }).catch(() => {
            });
        },

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
            console.log('123');
            this.$store.dispatch("endManage/queryEarlyWarnListByPage", {
                keyWord: this.keyWord,
                tempId: this.screenForm.tempId,
                earlyWarnStatus: this.screenForm.earlyWarnStatus,
                earlyWarnTypeCode: this.screenForm.earlyWarnTypeCode,
                earlyWarnLevel: this.screenForm.earlyWarnLevel,
                dealUserName: this.screenForm.dealUserName,
                earlyWarnTime: this.screenForm.earlyWarnTime,
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
            }).then((res) => {
                this.tableData = res.data.dataList;
                this.tableDataPage.currentPage = res.data.curPage
                this.tableDataPage.total = res.data.totalSize
            }).catch(() => {
            });
        },
        ignore() {
            this.$confirm('是否确定忽略该预警信息？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$store.dispatch("endManage/earlyWarnIgnore", {
                        warnId: this.tableDataSelection[0].dialPlanId,
                        state: 1
                }).then((res) => {
                    if(res.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            showClose: true,
                            center: true
                        });
                    } else {
                        this.$message({
                            message: '操作失败',
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
.earlyWarn-index {
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

.table-cell-code {
    color: #CCCCCC;
    font-size: 12px;
    margin: 0;
    text-align: left;
}

.table-cell-name {
    color: #666666;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    text-align: left;
}

.risk {
    border-radius: 12px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    width: 55px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}

.risk-tall {background: #F56C6C;}
.risk-centre {background: #E6A23C;}
.risk-low {background: #409EFF;}

.el-form {
    .el-form-item, .el-select {
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
