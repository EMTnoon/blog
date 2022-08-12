<template>
    <div>
        <n-button class="addButton" @click="showAddModel = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in categoryList" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(item)">修改</n-button>
                            <n-button @click="deleteCategory(item)">删除</n-button>
                        </n-space>
                    </td>
                </tr>

            </tbody>
        </n-table>
        <n-modal v-model:show="showAddModel" preset="dialog" title="Dialog">
            <template #header>
                <div>添加分类</div>
            </template>
            <div>
                <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="add">提交</n-button>
                </div>
            </template>
        </n-modal>

        <n-modal v-model:show="showUpdateModel" preset="dialog" title="Dialog">
            <template #header>
                <div>修改分类</div>
            </template>
            <div>
                <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="upCategory">提交</n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>
<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import CategoryApi from '../../api/CategoryApi';
const message = inject("message")
const dialog = inject("dialog")
const categoryList = ref([])
const showAddModel = ref(false)
const showUpdateModel = ref(false)
const addCategory = reactive({
    name: ""
})
const updateCategory = reactive({
    id: 0,
    name: ''
})

const loadDatas = async () => {
    let res = await CategoryApi.getList()
    categoryList.value = res.data.rows
}

const add = async () => {
    let res = await CategoryApi.postNewCategory({ name: addCategory.name })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
        addCategory.name = ""
    } else {
        message.error(res.data.msg)
    }
    showAddModel.value = false;
}
onMounted(() => {
    loadDatas()
})
const deleteCategory = async (category) => {

    dialog.warning({
        title: '警告',
        content: '是否要删除',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            let res = await CategoryApi.delete(category.id)
            if (res.data.code == 200) {
                loadDatas()
                message.info(res.data.msg)
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => { }
    })
}
const toUpdate = async (category) => {
    showUpdateModel.value = true
    updateCategory.id = category.id
    updateCategory.name = category.name
}
const upCategory = async () => {
    let res = await CategoryApi.putCategory({ id: updateCategory.id, name: updateCategory.name })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showUpdateModel.value = false;
}

</script>
<style scoped>
.addButton {
    margin-bottom: 20px;
}
</style>