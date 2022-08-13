<template>
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
        <n-tab-pane name="list" tab="文章列表">
            <div v-for="blog in blogListInfo" :key="blog.id" style="margin-bottom:15px">
                <n-card :title="blog.title">
                    {{ blog.content }}
                    <template #footer>
                        <n-space align="center">
                            <div>发布时间：{{ blog.date }}</div>
                            <n-button dashed type="info" @click="toUpdate(blog)">修改</n-button>
                            <n-button dashed type="error" @click="toDelete(blog)">删除</n-button>
                        </n-space>
                    </template>
                </n-card>
            </div>
            <n-space>
                  <n-pagination class="pageContral"  @update:page="loadBlogs" v-model="pageInfo.page"
            :page-count="pageInfo.pageCount" />
            </n-space>
        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item class="upload" label="封面">
                    <n-upload multiple directory-dnd :action="uploadUrl" :max="1" :on-finish="successImg">
                        <n-upload-dragger>
                            <div style="margin-bottom: 10px">
                                <n-icon size="30" :depth="4">
                                    <archive-icon />
                                </n-icon>
                            </div>
                            <n-text style="font-size: 13px">
                                点击或者拖动文件到该区域来上传
                            </n-text>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
                <n-form-item class="upload " label="分类">
                    <n-select  v-model:value="addArticle.categoryId" :options="categortyOptions" />
                    <n-form-item class="ml-30">
                        <n-button type="primary" color="#ff69b4" @click="add">完成提交</n-button>
                    </n-form-item>
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="addArticle.content"></rich-text-editor>
                </n-form-item>
            </n-form>
        </n-tab-pane>
        <n-tab-pane name="update" tab="修改">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item class="upload" label="分类">
                    <n-select v-model:value="updateArticle.categoryId" :options="categortyOptions" />
                    <n-button type="primary" color="#78d2f5" class="ml-30" @click="update">提交更新</n-button>
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
                </n-form-item>
            </n-form>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import RichTextEditor from '../../components/RichTextEditor.vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import blogApi from '../../api/blogApi'
import CategoryApi from '../../api/CategoryApi'


const message = inject("message")
const server_url = inject("server_url")
const uploadUrl = server_url + '/upload/cover_upload'

//文章添加数据
const addArticle = reactive({
    categoryId: null,
    title: "",
    content: "",
    coverImg: "",
})

//文章修改数据
const updateArticle = reactive({
    id: 0,
    categoryId: null,
    title: "",
    content: "",
})
const successImg = ({ event }) => {
    let result = JSON.parse(event.currentTarget.response)
    let coverUrl = server_url + result.data.url
    addArticle.coverImg = coverUrl
}

//分类选项
const categortyOptions = ref([])
const blogListInfo = ref([])
//标签页
const tabValue = ref("list")

//分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: '',
    categoryId: 0,
})

onMounted(() => {
    loadBlogs()
    loadCategorys()
})

//读取博客列表
const loadBlogs = async (page = 1) => {
    if (page != 0) {
        pageInfo.page = page
    }
    let res = await blogApi.getList(pageInfo)
    blogListInfo.value = res.data.data.rows
    pageInfo.count = res.data.data.count;
    pageInfo.pageCount =
        parseInt(pageInfo.count / pageInfo.pageSize) +
        (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}

//读取分类
const loadCategorys = async () => {
    let res = await CategoryApi.getList()
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })

}

const add = async () => {
    let res = await blogApi.post(addArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        addArticle.title = '',
            addArticle.content = '',
            addArticle.categoryId = 0
    } else {
        message.error(res.data.msg)
    }
}


const toUpdate = async (blog) => {
    tabValue.value = "update"
    let res = await blogApi.getListID(blog.id)
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.categoryId = res.data.rows[0].category_id
}

const update = async () => {
    let res = await blogApi.putBlog(updateArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadBlogs()
        tabValue.value = "list"
    } else {
        message.error(res.data.msg)
    }
}

const toDelete = async (blog) => {
    let res = await blogApi.delete(blog.id)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadBlogs()
    } else {
        message.error(res.data.msg)
    }
}

</script>

<style lang="scss" scoped>
.upload{
    width: 300px;
}
.ml-30{
    margin-left: 30px;
}
</style>