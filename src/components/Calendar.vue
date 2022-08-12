<template>
    <div>
        <n-calendar class="date" v-model:value="ClickTime" :is-date-disabled="isDateDisabled"
            @update:value="handleUpdateValue">
        </n-calendar>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import blogApi from '../api/blogApi';
const { appContext } = getCurrentInstance()

const ClickTime = ref(null)
const TimeList = ref([])
const createTime = ref([])
onMounted(() => {
    loadBlogs()
})

//读取博客时间
const loadBlogs = async () => {
    let res = await blogApi.getBlogTime()
    TimeList.value = res.data.rows
    let map = new Map();
    for (let item of TimeList.value) {
        map.set(item.date, item);
    }
    TimeList.value = [...map.values()];
}
const handleUpdateValue = (_, { year, month, date }) => {
    appContext.config.globalProperties.$mitt.emit("time", ClickTime.value);
}
const isDateDisabled = (timestamp) => {
    let tamp = timeConversion(timestamp)
    let isTime = TimeList.value.some((item) => {
        return (item.date == tamp)
    })
    if (isTime) {
        return false
    }
    return true
}
const timeConversion = (time) => {
    let Time = new Date(time)
    let Cltime = `${Time.getFullYear()}年${Time.getMonth() + 1}月${Time.getDate()}日`
    return Cltime
}
</script>
<style scoped lang="scss">
.date {
    width: 100%;
    height: 100%;

}
</style>
