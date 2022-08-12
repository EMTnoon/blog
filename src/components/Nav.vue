<template>
    <div class="nav-box">
        <div class="nav">
            <div class="iconBox border" @click="homePage">
                <n-icon :size="26" color="#fff">
                    <Home />
                </n-icon>
                <div class="fontColor">首页</div>
            </div>
            <div v-if="props.isCategory" @click="showCategory" class="iconBox border">
                <n-icon :size="26" color="#fff">
                    <AlbumsOutline />
                </n-icon>
                <div class="fontColor">{{ categoryName || "分类" }}</div>
                <!-- <div>
                    <n-popselect @update:value="selectedCategory" v-model:value="searchCty" :options="categortyOptions" scrollable >
                        <p class="fontColor">{{categoryName|| "分类"}}</p>
                    </n-popselect>
                </div> -->
            </div>
            <div v-if="props.isLogin" class="iconBox border" @click="dashboard">
                <n-icon :size="26" color="#fff">
                    <CogOutline />
                </n-icon>
                <div class="fontColor">登录</div>
            </div>
            <div class="iconBox">
                <ColorfulText></ColorfulText>
            </div>
            <div v-if="props.isSearch" class="searchBox">
                <n-space class="search">
                    <!-- 这里的v-model必须跟value -->
                    <n-input class="input" v-model:value="keyword" round type="text" placeholder="请输入关键字" />
                    <div @click="searchkey">
                        <n-icon :size="36" color="#fff">
                            <SearchCircle />
                        </n-icon>
                    </div>
                </n-space>
            </div>
        </div>
        <n-modal class="modal" v-model:show="iscategorty">
            <n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <n-space vertical>
                    <n-select v-model:value="searchCty" :options="categortyOptions" @update:value="selectedCategory" />
                </n-space>
            </n-card>
        </n-modal>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, AlbumsOutline, CogOutline, SearchCircle, LogoGithub } from "@vicons/ionicons5";
import { QqCircleFilled, AlipayCircleOutlined } from "@vicons/antd";
import { EmailOutlined } from "@vicons/material";
import ColorfulText from '../components/ColorfulText.vue'
import CategoryApi from '../api/CategoryApi';

const router = useRouter()
const emit = defineEmits(['searchByCategory', 'searchKeyword'])
const props = defineProps({
    isSearch: {
        type: Boolean,
    },
    isLogin: {
        type: Boolean,
    },
    isCategory: {
        type: Boolean,
    }
})
// 选中的分类
const searchCty = ref(null)
// 具体分类值
const categortyOptions = ref([])
// 搜索关键字
const keyword = ref(null)
const iscategorty = ref(false)
onMounted(() => {
    loadCategorys();
})

// 获取分类列表
const loadCategorys = async () => {
    let res = await CategoryApi.getList()
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}
const categoryName = computed(() => {
    let selectedOption = categortyOptions.value.find((option) => { return option.value == searchCty.value })
    return selectedOption ? selectedOption.label : ""
})
const searchkey = () => {
    emit('searchKeyword', keyword.value)
}
const selectedCategory = (value) => {
    iscategorty.value = !iscategorty.value
    emit('searchByCategory', value)
}
const showCategory = () => {
    iscategorty.value = true
}
const homePage = () => {
    router.push("/")
}
const dashboard = () => {
    router.push("/login")
}
</script>

<style lang="scss" scoped>
.nav-box {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #f60;
    background: linear-gradient(to bottom,
            rgb(222, 233, 236) 0%,
            rgba(149, 204, 219, 1) 67%,
            rgb(129, 214, 233) 80%);
    box-shadow: 0px 6px 13px 0px rgba(113, 185, 240, 1);
    opacity: .9;
    overflow: hidden;
    z-index: 999;
}

.nav {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    display: flex;
    font-size: 20px;
    color: #64676a;

    .iconBox {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        position: relative;

        div {
            margin-left: 10px;
        }
    }

    .searchBox {
        position: absolute;
        right: 0;
        padding-top: 4px;
        cursor: pointer;

        .input {
            width: 110px;
        }
    }

}

.border {
    padding: 5px;

}

.border:hover::before {
    content: "";
    width: 100%;
    height: 150%;
    // border: 1px solid rgb(44, 182, 237);
    display: block;
    /* 伪元素属于行内元素，需要转换 */
    position: absolute;
    top: -10px;
    left: 0;
    box-sizing: border-box;
    cursor: pointer;
    background: linear-gradient(to bottom,
            rgb(222, 233, 236) 0%,
            rgba(149, 204, 219, 1) 67%,
            rgb(40, 121, 139) 100%);
    opacity: .4;
}

.modal {
    border-radius: 20px;
    background: linear-gradient(135deg,
            rgba(235, 233, 249, 1) 0%,
            rgba(235, 233, 249, 1) 23%,
            rgba(216, 208, 239, 1) 49%,
            rgba(206, 199, 236, 1) 71%,
            rgba(193, 191, 234, 1) 100%);
}
</style>