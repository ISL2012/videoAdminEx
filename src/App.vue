<template>
  <div id="admin">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {},
  };
</script>

<style lang="scss">
.page-box {
    .el-pager {
        >.number {
        }
    }
}

.login-container{
  .slide {
    .puzzle-header {
      position: absolute;
      bottom: -87px;
      right: 0;

      .puzzle-header-left {
        display: none;
      }
      
      .iconfont {
        font-size: 20px;
      }
    }

    .slider-bar {
      border: none;
      border-radius: 25px;
      height: 50px;
    }

    .slider-btn {
      top: 10px;
      transform: scale(1.25);
    }
  }
}

.el-form {
    .el-form-item {
        margin: 10px;

        .screen-option {
            width: 160px;

            input {
                border-radius: 4px;
                height: 24px;
                line-height: 24px;
            }
        }

        .el-select {
            border-radius: 4px;
            height: 24px;
            line-height: 24px;
        }
    }
}

</style>