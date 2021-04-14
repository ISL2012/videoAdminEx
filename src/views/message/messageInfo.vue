<template>
	<div class="messageInfo-index">
        <el-form label-width="120px" class="messageInfo-form">
            <el-form-item label="消息来源">
                <span>{{sourceTypeName}}</span>
            </el-form-item>
            <el-form-item label="发送时间">
                <span>{{sendTime}}</span>
            </el-form-item>
            <el-form-item label="描述">
                <span>{{content}}</span>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" @click="viewDetails">查看详情</el-button> -->
                <el-button type="primary" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	name: 'messageInfo',
	components: {},
	data() {
		return {
            sourceTypeName: '',
            sendTime: '',
            content: ''
        }
	},
	created() {
    },
	mounted() {
        this.getDetails();
        this.updateMessageStatus();
    },
	methods: {
        getDetails() {
            this.$store.dispatch("message/queryMessageById", {
                id: this.$route.query.id
            }).then((res) => {
                this.sourceTypeName = res.data.sourceTypeName;
                this.sendTime = res.data.sendTime;
                this.content = res.data.content;
            }).catch(() => {
            });
        },
        updateMessageStatus() {
            this.$store.dispatch("message/updateMessageStatus", {
                msgId: this.$route.query.id
            }).then((res) => {
            }).catch(() => {
            });
        },
        viewDetails() {}
    },
}
</script>
<style lang="scss" scoped>
.messageInfo-index {
    .messageInfo-form {
        padding: 30px 0 0 0;
    }
}
</style>
