<template>
	<div class="message-index">
        <div class="checkchoose">
            <div class="checkchoose_box">
                <div class="text1">消息状态：</div>
                <el-radio-group v-model="msgType">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button label="0">未读</el-radio-button>
                    <el-radio-button label="1">已读</el-radio-button>
                </el-radio-group>
            </div>
            <div class="checkchoose_box">
                <div class="text1">消息来源：</div>
                <el-radio-group v-model="sourceType">
                    <el-radio-button v-for="(item, i) in dialMessage" :key="i" :label="item.code">{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
            <el-input v-model="msgTitle" placeholder="消息标题"></el-input>
            <el-date-picker v-model="startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
            <el-date-picker v-model="endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
            <button @click="queryScreen" class="inquire">查询</button>
            <button @click="resetScreen" class="reset">重置</button>
        </div>
        <el-table :data="tableData" style="margin: 24px 0" @row-click="clickTableRow" 
            :header-row-style="{height: '68px'}" :row-style="{height: '48px',cursor: 'pointer'}" >
            <el-table-column prop="content" label="消息标题"></el-table-column>
            <el-table-column prop="flag" label="阅读状态" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.flag===0? "未读": "已读" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sourceTypeName" label="消息来源" width="180"></el-table-column>
            <el-table-column prop="sendTime" label="发送时间" width="180"></el-table-column>
        </el-table>
        <el-pagination :hide-on-single-page="true" :total="tableDataPage.total" :current-page="tableDataPage.currentPage"
            :page-size="tableDataPage.pageSize" layout="total, prev, pager, next" background class="page-box" 
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
	name: 'message',
	components: {},
	data() {
		return {
            msgType: '',
            sourceType: '',
            dialMessage: [],
            msgTitle: '',
            startTime: '',
            endTime: '',
            tableData: [],
            tableDataPage: {
                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        }
	},
	created() {
    },
	mounted() {
        this.getDialMessage();
    },
	methods: {
        handleCurrentChange(page) {
            this.tableDataPage.currentPage = page;
            this.getTableData();
        },
        getTableData() {
            this.$store.dispatch("message/queryMessageListByDate", {
                msgType: this.msgType,
                sourceType: this.sourceType,
                msgTitle: this.msgTitle,
                startTime: this.startTime,
                endTime: this.endTime,
                pageIndex: this.tableDataPage.currentPage,
                pageSize: this.tableDataPage.pageSize,
            }).then((res) => {
                this.tableData = res.data.dataList;
                this.tableDataPage = {
                    currentPage: res.data.curPage,
                    total: res.data.totalSize,
                    pageSize: res.data.pageSize
                }
            }).catch(() => {
            });
        },
        getDialMessage() {
            this.$store.dispatch("message/getGloablecode", "DIAL_MESSAGE_TYPE").then((res) => {
                this.dialMessage = [{code: "",id: 0,name: "全部"}, ...res.data];
                this.getTableData();
            }).catch(() => {
            });
        },
        queryScreen() {
            this.tableDataPage = {
                currentPage: 1,
                total: 0,
                pageSize: 10
            };
            this.getTableData();
        },
        resetScreen() { // 重置筛选条件
            this.msgType = '';
            this.sourceType = '';
            this.msgTitle = '';
            this.startTime = '';
            this.endTime = '';
            this.tableDataPage = {
                currentPage: 1,
                total: 0,
                pageSize: 10
            };

            this.getTableData();
        },
        clickTableRow(row, column, event) {
            // 表格选中某行跳转到详情
            this.$router.push(`/messageInfo?id=${row.id}`);
        }
    },
}
</script>
<style lang="scss" scoped>
.message-index {
    padding: 24px;
}

.checkchoose {
    .el-input {
        width: 220px;
        margin: 0 20px 0 0;
    }

    .checkchoose_box {
        clear: both;
        height: 24px;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 16px;

        .text1 {
            float: left;
            color: #666666;
            font-size: 18px;
        }

        .text2 {
            float: left;
            color: #999999;
            min-width: 90px;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;

            +.text2 {
                border-left: 1px solid #efefef;
            }
        }
    }

    .inquire {
        border: none;
        border-radius: 4px;
        background: #409EFF;
        color: #fff;
        width: 88px;
        height: 32px;
        margin-right: 10px;
        outline: none;
    }

    .reset {
        border: 1px solid #CCCCCC;;
        border-radius: 4px;
        background: #fff;
        color: #666666;
        width: 88px;
        height: 32px;
    }
}


</style>
