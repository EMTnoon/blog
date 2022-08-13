<template>
    <div class="homePage">
        <Nav @searchKeyword="searchKeyword" @searchByCategory="searchByCategory" :isSearch="true" :isLogin="true"
            :isCategory="true">
        </Nav>
        <div class="container">
            <div class="layout">
                <BlogList ref="list"></BlogList>
                <div class="sidebar">
                    <div class="personal">
                        <div class="imgbox"></div>
                        <div class="HeadPortrait">
                        </div>
                        <div class="tip">
                            <p class="Name">Emilia</p>
                            <p>好久不见</p>
                        </div>
                        <div class="blogInfo">
                            <div class="blogCount">
                                <p>文章数量</p>
                                <p>{{ blogCount }}</p>
                            </div>
                            <n-divider class="line" vertical />
                            <div class="blogDay">
                                <p>运行天数</p>
                                <p>{{ nowDate }}</p>
                            </div>
                        </div>
                        <div class="contact">
                            <div @mousemove="color.val1 = 'red'" @mouseleave="color.val1 = 'blue'" @click="Collection">
                                <n-icon :size="35" :color="color.val1">
                                    <AlipayCircleOutlined />
                                </n-icon>
                            </div>
                            <div @mousemove="color.val2 = 'black'" @mouseleave="color.val2 = '#0082e5'" @click="goQQ">
                                <n-icon :size="35" :color="color.val2">
                                    <QqCircleFilled />
                                </n-icon>
                            </div>
                            <div @mousemove="color.val3 = 'blue'" @mouseleave="color.val3 = '#020000'" @click="github">
                                <n-icon :size="35" :color="color.val3">
                                    <LogoGithub />
                                </n-icon>
                            </div>
                            <div @mousemove="color.val4 = 'red'" @mouseleave="color.val4 = '#ffcb23'" @click="goEmail">
                                <n-icon :size="35" :color="color.val4">
                                    <EmailOutlined />
                                </n-icon>
                            </div>
                        </div>
                    </div>
                    <div class="label">
                        <Calendar />
                    </div>
                </div>
            </div>
            <n-divider />
            <n-modal v-model:show="showCollection">
                <n-card style="width: 300px" :bordered="false" size="huge" role="dialog" aria-modal="true">
                    <img src="../assets/img/Collection.jpg" alt="">
                </n-card>
            </n-modal>
            <div class="footer">
                <div>Power by EMT</div>
                <div>XICP备XXXXX号-1</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, AlbumsOutline, CogOutline, SearchCircle, LogoGithub } from "@vicons/ionicons5";
import { QqCircleFilled, AlipayCircleOutlined } from "@vicons/antd";
import { EmailOutlined } from "@vicons/material";
import ColorfulText from '../components/ColorfulText.vue'
import BlogList from '../components/BlogList.vue'
import Calendar from '../components/Calendar.vue'
import blogApi from '../api/blogApi.js';
import CategoryApi from '../api/CategoryApi';
import Nav from '../components/Nav.vue'
const router = useRouter()

const message = inject("message")
const dialog = inject("dialog")

const color = reactive({
    val1: 'blue',
    val2: '#0082e5',
    val3: '#020000',
    val4: '#ffcb23'
})
const showCollection = ref(false)
const keyword = ref(null)
const list = ref(null)
const blogCount = ref(0)
const nowDate = ref(0)


onMounted(() => {
    loadBlogsCount()
    getTime()
})
const loadBlogsCount = async () => {
    let res = await blogApi.getlistCount()
    blogCount.value = res.data.rows[0].count
}

const getTime = () => {
    let oldTime = 1659777934307
    let date = new Date().getTime()
    let nowTime = date - oldTime
    let nowDay = Math.ceil(nowTime / 1000 / 60 / 60 / 24)
    nowDate.value = nowDay
}
const searchByCategory = (searchCty) => {
    list.value.searchType(searchCty)

}
const searchKeyword = (keyword) => {
    list.value.searchKeyWord(keyword)
}

const homePage = () => {
    router.push("/")
}

const dashboard = () => {
    router.push("/login")
}
const Collection = () => {
    showCollection.value = !showCollection.value
}
const github = () => {
    window.open('https://github.com/EMTnoon/blog')
}
const goEmail = () => {
    window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=2683102724@qq.com')
}
const goQQ = () => {
    window.open('http://wpa.qq.com/msgrd?v=3&uin=2683102724&site=qq&menu=yes')
}

</script>

<style lang="scss" scoped>
.search {
    position: absolute;
    right: 0;

    .input {
        width: 110px;
        margin-right: 0;
    }
}

.container {
    position: relative;
    width: 1200px;
    margin: 0 auto;

    .layout {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;

        .sidebar {
            margin-right: 20px;
            opacity: 0.9;

            .personal {
                position: relative;
                width: 400px;
                height: 330px;
                border-radius: 15px;
                overflow: hidden;
                margin-bottom: 15px;
                background: linear-gradient(45deg,
                        rgba(255, 255, 255, 1) 0%,
                        rgba(236, 232, 247, 1) 13%,
                        rgba(236, 232, 247, 1) 27%,
                        rgba(225, 221, 243, 1) 46%,
                        rgba(231, 227, 245, 1) 63%,
                        rgba(236, 232, 247, 1) 80%,
                        rgba(236, 232, 247, 1) 87%,
                        rgba(214, 213, 241, 1) 100%);
                box-shadow: 2px 4px 23px -7px rgba(18, 18, 20, 1);

                .imgbox {
                    width: 100%;
                    height: 120px;
                    background: url(../../src/assets/img/role.jpg) no-repeat;
                    background-size: 100%;
                }

                .HeadPortrait {
                    position: relative;
                    left: 40px;
                    top: -40px;
                    width: 80px;
                    height: 80px;
                    background-color: #f60;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px #64676a solid;
                    box-shadow: 1px 1px 29px -7px rgba(63, 83, 181, 1);
                    background: url(../../src/assets/img/tou.jpg) no-repeat;
                    background-size: 100%;
                }

                .tip {
                    position: absolute;
                    left: 155px;
                    top: 120px;
                    text-align: center;

                    .Name {
                        font-size: 24px;
                        font-family: Consolas, 'Microsoft JhengHei',
                            'Apple LiGothic Medium,Microsoft YaHei', 微软雅黑, Arial,
                            sans-serif;
                    }
                }

                .blogInfo {
                    position: absolute;
                    left: 95px;
                    top: 200px;
                    display: flex;
                    justify-content: space-around;
                    width: 200px;
                    text-align: center;

                    .blogCount {
                        p:last-child {
                            color: blue;
                        }
                    }

                    .line {
                        height: 40px;
                    }

                    .blogDay {
                        p:last-child {
                            color: blue;
                        }
                    }
                }

                .contact {
                    display: flex;
                    justify-content: space-between;
                    width: 200px;
                    position: absolute;
                    left: 95px;
                    bottom: 23px;

                    div {
                        cursor: pointer;
                    }
                }
            }

            .label {
                box-sizing: border-box;
                width: 400px;
                height: 330px;
                padding: 16px;
                border-radius: 15px;
                overflow: hidden;
                background-color: #fff;
                box-shadow: 2px 4px 23px -7px rgba(18, 18, 20, 1);
            }
        }
    }
}

:deep(.n-pagination-item--active) {
    color: red !important;
    border: rgb(61, 28, 180) !important;
}

:deep(.n-pagination .n-pagination-item) {
    color: rgb(182, 183, 235);
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>