<template>
    <div class="blogBox">
        <div class="blog">
            <div class="blogContent" v-for="item in blogListInfo" :key="item.id">
                <n-card class="blogItem" :style="{ backgroundImage: 'url( ' + item.cover_img + ')' }"
                     @click="toDetail(item)" hoverable>        
                            <h3>{{ item.title}}</h3>
                    <template #footer>
                        <n-space align="center">
                            <div>发布时间：{{ item.date }}</div>
                        </n-space>
                    </template>
                </n-card>
            </div>
            <n-result class="BlogListResult" v-if="isNoBlogList" status="404" title="404 资源不存在" description="生活总归带点荒谬">
            </n-result>
        </div>
        <n-pagination class="pageContral" v-if="isShowKey" @update:page="loadBlogs" v-model="pageInfo.page"
            :page-count="pageInfo.pageCount" />
    </div>
</template>
<script setup>
import {
    ref,
    getCurrentInstance,
    reactive,
    inject,
    onMounted,
    computed,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import blogApi from '../api/blogApi.js'
const { appContext } = getCurrentInstance()
const router = useRouter()

const blogListInfo = ref([])
const isShowKey = ref(true)
const isNoBlogList = computed(() => {
    return blogListInfo.value == 0
})
const pageInfo = reactive({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    count: 0,
    keyword: '',
    categoryId: 0,
})
onMounted(() => {
    loadBlogs()
    appContext.config.globalProperties.$mitt.on('time', async (searchTime) => {
        blogListTime(searchTime)
    })
})
const blogListTime = async (searchTime) => {
    let res = await blogApi.getTime(searchTime)
    isShowKey.value = false
    blogListInfo.value = res.data.rows
    // blogListInfo.value = res.data.rows
    // pageInfo.count = res.data.data.count
    // pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page
    }
    let res = await blogApi.getList(pageInfo)
    blogListInfo.value = res.data.data.rows
    pageInfo.count = res.data.data.count
    pageInfo.pageCount =
        parseInt(pageInfo.count / pageInfo.pageSize) +
        (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}
const searchType = (categoryId) => {
    pageInfo.categoryId = categoryId
    loadBlogs()
}
const searchKeyWord = (keyword) => {
    pageInfo.keyword = keyword
    loadBlogs()
}
const toDetail = (blog) => {
    router.push({ path: '/detail', query: { id: blog.id } })
}
defineExpose({ searchType, searchKeyWord })
</script>
<style lang="scss" scoped>
.blog {
    display: flex;
    flex-direction: column;

    // justify-content: space-between;
    .BlogListResult {
        margin: 200px;
    }
}

.blogContent {
    margin-bottom: 20px;
    width: 700px;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.8;
    box-shadow: 2px 4px 23px -7px rgba(18, 18, 20, 1);

    .blogItem {
        border-radius: 15px;
        background-size: 100% 100%;
        h3 {
            color: #000;
        }
    }
}

.blogBox {
    height: 675px;
    position: relative;
}

.pageContral {
    position: absolute;
    left: 50%;
    bottom: -7px;
    transform: translateX(-50%);
}

.n-card.n-card--bordered {
    border: none;
    color: rgb(97, 21, 104);
}

</style>
