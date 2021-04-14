<template>
  <div class="login-container">
    <el-row>
      <el-col class="col">
        <div class="title-tips">登录</div>
        <el-form ref="form" :model="form" :rules="rules" class="login-form" label-position="left" v-show="!verificationShow">
          <el-form-item prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input clearable v-model.trim="form.username" v-focus
              placeholder="请输入用户名" tabindex="1" type="text" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input :key="passwordType" ref="password" v-model.trim="form.password"
              :type="passwordType" tabindex="2" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
            <span v-if="passwordType === 'password'" class="show-password" @click="handlePassword" >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>
          <!-- <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin">登录</el-button> -->
          <el-button :loading="loading" class="login-btn" type="primary" @click="verificationShow=true">登录</el-button>
        </el-form>
        <div v-show="verificationShow" style="position: relative;">
          <puzzleVerification class="slide" blockType="puzzle" width="318" height="176" blockRadius="20"
            v-model="verificationShow" :onSuccess="success">
          </puzzleVerification>
          <div v-show="msgShow" class="msg-show">
              <img src="@/assets/affirm.png" alt="">
              <p>验证通过</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from "@/utils/validate";
  import PuzzleVerification from 'vue-puzzle-verification';

  export default {
    name: "Login",
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
    data() {
      const validateusername = (rule, value, callback) => {
        if ("" == value) {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error("密码不能少于6位"));
        } else {
          callback();
        }
      };
      return {
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateusername,
            },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: "password",
        redirect: undefined,
        verificationShow: false,
        msgShow: false,
      };
    },
    components: {
      PuzzleVerification
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || "/";
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = "hidden";
    },
    beforeDestroy() {
      document.body.style.overflow = "auto";
    },
    mounted() {
      this.form.username = "admin";
      this.form.password = "123456";
    //   this.form.username = "wfq1234";
    //   this.form.password = "wfq1234";
    },
    methods: {
      handlePassword() {
        this.passwordType === "password"
          ? (this.passwordType = "")
          : (this.passwordType = "password");
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
            if (valid) {
                this.loading = true;
                this.$store.dispatch("user/toMd5", {value: this.form.password}).then((data) => {
                    this.$store.dispatch("user/login", 
                        this.form
                        // {data: `{"userName":"${this.form.username}","passWord":${data.value}}`}
                    ).then((res) => {
                        // const res = await login(userInfo);
                        // window.sessionStorage.setItem("token", res.token);
                        // window.sessionStorage.setItem("username", res.username);
                        // window.sessionStorage.setItem("password", $("#password").val());
                        // window.sessionStorage.setItem("remember_flag", remember_flag);
                        // window.sessionStorage.setItem("menu_list", JSON.stringify(res.powerList));
                        // window.sessionStorage.setItem("userMessage", JSON.stringify(res.userMessage));

                        const routerPath =
                        this.redirect === "/404" || this.redirect === "/401"
                            ? "/"
                            : this.redirect;
                        this.$router.push(routerPath).catch(() => {});
                        this.loading = false;
                    }).catch(() => {
                        this.loading = false;
                        this.verificationShow = false;
                    });
                });
            } else {
                return false;
            }
        });
      },
      // 用户通过了验证
      success(msg) {
        // this.verificationShow = false; // 通过验证后，需要手动隐藏模态框
        // this.msgShow = true;
        this.handleLogin();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url("~@/assets/login_images/background.png") center center fixed no-repeat;
    background-size: cover;

    .col {
      background: #fff;
      border-radius: 2px;
      width: 366px;
      height: 430px;
      margin: 20.44vh 10.76vh 0 auto;
      position: fixed;
      right: 0;
    }

    .title-tips {
      font-size: 24px;
      font-weight: bold;
      color: #666666;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 50px 23px 0px 23px;
    }

    .login-btn {
      background: #409EFF;
      border: none;
      border-radius: 2px;
      display: inherit;
      font-size: 16px;
      width: 86.9%;
      height: 48px;
      margin: 90px auto 0 auto;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      // margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        color: #454545;
        box-sizing: border-box;
        border-bottom: 1px solid #EFEFEF;
        border-radius: 2px;
        width: 318px;
        height: 46px;
        margin: 32px auto;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }

    .slide {
      border: none;
      margin: 32px 24px 0 24px;
      padding: 0;
      position: relative;
    }

    .msg-show {
        color: #67C23A;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(255 255 255 / 0.8);
        height: calc(100% + 50px);
        width: 100%;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
  }
</style>
