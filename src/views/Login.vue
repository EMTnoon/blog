<template>
    <Nav></Nav>
    <div class="login-panel">
        <n-card class="cardBack" title="登录后台">
            <n-form :rules="rules" :model="admin">
                <n-form-item path="account" label="账号">
                    <n-input v-model:value="admin.account" placeholder="请输入账号" round autosize style="min-width: 70%" />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" round autosize
                        style="min-width: 70%" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button type="info" @click="login">登录</n-button>
            </template>
        </n-card>
        <div class="loginImg">
            <img src="../assets/img/logo.png" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AdminStore } from "../stores/AdminStore"
import loginApi from '../api/loginApi';
import Nav from '../components/Nav.vue'
const message = inject("message")

const router = useRouter()
const adminStore = AdminStore()
let rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
    ],
};
const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") || false,
})
const login = async () => {
    const result = await loginApi.post({
        account: admin.account,
        password: admin.password
    })
    if (result.data.code === 200) {
        adminStore.token = result.data.data.token
        adminStore.account = result.data.data.account
        adminStore.id = result.data.data.id
        localStorage.setItem("token",result.data.data.token)
        message.info("登录成功")
        if (admin.rember) {
            localStorage.setItem("account", admin.account)
            localStorage.setItem("password", admin.password)
            localStorage.setItem("rember", admin.rember ? 1 : 0)
            
        }
        router.push("/dashboard")
    } else {
        message.info("登录失败")
    }

}
</script>

<style lang="scss" scoped>
.login-panel {
    position: relative;
    width: 500px;
    margin: 0 auto;
    margin-top: 130px;
    box-shadow: -1px 2px 19px 0px rgba(166, 141, 166, 1);
    border-radius: 48px 20px 48px 22px;
    overflow: hidden;

    .cardBack {
        padding-left: 20px;
        border: none;
        background: linear-gradient(135deg, rgba(237, 237, 237, 1) 0%, rgba(230, 230, 230, 1) 30%, rgba(205, 218, 235, 1) 64%, rgba(248, 250, 252, 1) 95%, rgba(255, 255, 255, 1) 100%);
    }

    .loginImg {
        position: absolute;
        right: 25px;
        bottom: 10px;
        width: 100px;
        height: 100px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .ml-20 {
        margin-left: 20px;
    }
}
</style>