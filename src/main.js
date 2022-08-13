import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router/router'
// import naive from '../plugins/naive'
import { createDiscreteApi } from 'naive-ui'
import mitt from "mitt"
const { message, notification, dialog } = createDiscreteApi(["message", "dialog", "notification"])
const uploadURL = "http://localhost:8080"

const app = createApp(App)
app.config.globalProperties.$mitt = mitt();
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", uploadURL)

app.use(createPinia())

app.use(router)
// app.use(naive)
app.mount('#app')
