<template>
    <div>
        <Nav></Nav>
        <div class="container">
            <!-- <n-h1 class="title" >{{ blogInfo.title }}</n-h1> -->
            <div class="content">
                <n-h1 class="title">{{ blogInfo.title }}</n-h1>
                <div v-html="blogInfo.content"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import blogApi from '../api/blogApi.js'
import Nav from '../components/Nav.vue'
const router = useRouter()
const route = useRoute()
const blogInfo = ref({})

onMounted(() => {
    loadBlog()
})

const loadBlog = async () => {
    let res = await blogApi.getListID(route.query.id)
    blogInfo.value = res.data.rows[0]
}
</script>

<style>
</style>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
    background-color: #f2ece1;
    border-radius: 45px 45px 45px 45px;
    -moz-border-radius: 45px 45px 45px 45px;
    -webkit-border-radius: 45px 45px 45px 45px;
    border: 6px double #998b99;

    .content {
        // border-radius: 20px;
        // background-size:  100%;
        padding: 50px;
        // opacity: 0.9;

        .title {
            font-size: 50px;
            color: rgb(78, 151, 211);
            text-align: center;
        }
    }
}
</style>
