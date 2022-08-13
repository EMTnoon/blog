<template>
    <div>
        <Nav></Nav>
        <div class="main-panel">
            <div class="menus">
                <div v-for="menu in menus" @click="toPage(menu)" :key="menu.id">
                    {{ menu.name }}
                </div>
            </div>
            <div class="ControlBar">
                <router-view></router-view>
            </div>
        </div>
        <div class="title">EMT</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Nav from '../../components/Nav.vue'
const router = useRouter()

let menus = [
    { id:1, name: "文章管理", href: "/dashboard/article" },
    { id:2, name: "分类管理", href: "/dashboard/category" },
    {id:3,  name: "退出", href: "logout" },
];


const toPage = (menu) => {
    if (menu.href == 'logout') {
        router.push("/")
    } else {
        router.push(menu.href)
    }
}

</script>

<style lang="scss" scoped>
.main-panel {
    display: flex;
    color: #64676a;
    max-width: 1500px;
    margin: 0 auto;
    border-radius:15px ;
    background-color: aliceblue;
    .ControlBar{
        padding: 20px;
        width: 100%;
        border-left: 1px solid #dadada;
    }
    .menus {
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 85vh;
    div {
        cursor: pointer;
        &:hover {
            color: #b819a3;
        }
    }
}
}
.title {
    font-size: 65px;
    font-weight: bold;
    text-align: right;
    position: fixed;
    color: rgba(0, 0, 0, 20%);
    right: calc((100vw - 1500px) / 2);
    bottom: 20px;
}
</style>