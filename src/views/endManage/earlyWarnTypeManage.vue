<template>
	<div class="earlyWarnTypeManage-index">
        <div class="head-title">
            <h3>监测预警类型管理</h3>
            <!-- <div class="search-box">
                <input type="search" placeholder="请输入查询内容" v-model="content" />
                <button @click="getList"><img src="@/assets/search.png"/>查询</button>
            </div> -->

            <!-- <el-popover placement="bottom" width="530" trigger="click">
                <el-form ref="screenForm" :model="screenForm" :inline="true" class="screen-form">
                    <el-form-item style="display:block">
                        <button class="reset" @click="resetForm('screenForm')">重置</button>
                        <button class="primary" @click="tableDataPage.currentPage=1;getList">查询</button>
                    </el-form-item>
                </el-form>
                <el-button slot="reference" class="screen">筛选</el-button>
            </el-popover> -->
        </div>

        <div class="operating-button-box">
            <button :disabled="tableDataSelection.length!=1" @click="queryEarlyWarnTypeById"><img src="@/assets/dialPlan_icon_12.png" />修改</button>
        </div>

        <el-table :data="tableData" style="margin: 24px 0" :header-row-style="{height: '68px'}" 
            :cell-style="{height: '44px'}" :header-cell-style="{'font-weight':'bold'}"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column type="index" label="序号" width="80"></el-table-column> -->
            <el-table-column prop="earlyWarnTypeCode" label="类型ID" width="80"></el-table-column>
            <el-table-column prop="earlyWarnName" label="预警类型">
                <template slot-scope="scope">
                    <p class="table-cell-code">{{scope.row.earlyWarnTypeCode}}</p>
                    <p class="table-cell-name">{{scope.row.earlyWarnName}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="earlyWarnLevel" label="预警级别" width="85">
                <template slot-scope="scope">
                    <span v-if="scope.row.earlyWarnLevel == 1" class="risk risk-tall">高风险</span>
                    <span v-else-if="scope.row.earlyWarnLevel == 2" class="risk risk-centre">中风险</span>
                    <span v-else-if="scope.row.earlyWarnLevel == 3" class="risk risk-low">低风险</span>
                </template>
            </el-table-column>
            <el-table-column prop="earlyWarnDescription" label="预警描述"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
             :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box">
        </el-pagination>

        <el-dialog title="修改" :visible.sync="updateFormShow" center width="480px"  @close="handleClose('updateForm')">
            <el-form ref="updateForm" :model="updateForm" label-width="120px" :rules="rules">
                <el-form-item label="预警类型名称" prop="earlyWarnName">
                    <el-input v-model="updateForm.earlyWarnName"></el-input>
                </el-form-item>
                <el-form-item label="风险等级" prop="earlyWarnLevel">
                    <el-select v-model="updateForm.earlyWarnLevel" placeholder="请选择活动区域">
                        <el-option label="高风险" value="1"></el-option>
                        <el-option label="中风险" value="2"></el-option>
                        <el-option label="低风险" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预警描述" prop="earlyWarnDescription">
                    <el-input v-model="updateForm.earlyWarnDescription" type="textarea" :autosize="{minRows: 6}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateEarlyWarnType('updateForm')">保存</el-button>
                    <el-button @click="updateFormShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
	name: 'earlyWarnTypeManage',
	components: {},
	data() {
		return {
            content: '',
            screenForm: {
            },
            tableData: [],
            tableDataSelection: [],
            tableDataPage: {
                currentPage: 1,
                total: 0,
                pageSize: 10
            },
            updateFormShow: false,
            updateForm: {
                earlyWarnName: '',
                earlyWarnLevel: '',
                earlyWarnDescription: ''
            },
            rules: {
                earlyWarnName: [{required: true, message: '请输入预警类型名称', trigger: 'blur'}],
                earlyWarnLevel: [{required: true, message: '请选择风险等级', trigger: 'change'}],
                earlyWarnDescription: [{required: true, message: '请输入预警描述', trigger: 'blur'}]
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
            this.$store.dispatch("endManage/queryEarlyWarnTypeByPage", {
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
                token: window.sessionStorage.getItem('token'),
            }).then((res) => {
                this.tableData = res.data.dataList;
                this.tableDataPage.currentPage = res.data.curPage
                this.tableDataPage.total = res.data.totalSize
            }).catch(() => {
            });
        },
        handleClose(formName) {
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
            });
            this.updateFormShow = false;
        },
        // 获取详情
        queryEarlyWarnTypeById() {
            this.$store.dispatch("endManage/queryEarlyWarnTypeById", {
                id: this.tableDataSelection[0].id
            }).then((res) => {
                this.updateFormShow = true;
                this.updateForm = {
                    earlyWarnName: res.data.earlyWarnName,
                    earlyWarnLevel: String(res.data.earlyWarnLevel),
                    earlyWarnDescription: res.data.earlyWarnDescription
                }
            }).catch(() => {
            });
        },
        // 修改详情
        updateEarlyWarnType(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("endManage/updateEarlyWarnType", {
                        "id": this.tableDataSelection[0].id,
                        "earlyWarnName": this.updateForm.earlyWarnName,
                        "earlyWarnLevel": this.updateForm.earlyWarnLevel,
                        "earlyWarnDescription": this.updateForm.earlyWarnDescription,
                        "token": window.sessionStorage.getItem('token'),
                    }).then((res) => {
                        if(res.code == 200) {
                            this.updateFormShow = false;
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose: true,
                                center: true
                            });
                        } else {
                            this.$message({
                                message: '修改失败',
                                type: 'error',
                                showClose: true,
                                center: true
                            });
                        }
                    }).catch(() => {
                        if(res.code == 200) {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                showClose: true,
                                center: true
                            });
                            handleClose('updateForm')
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'error',
                                showClose: true,
                                center: true
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.earlyWarnTypeManage-index {
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
