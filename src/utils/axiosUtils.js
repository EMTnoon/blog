import axios from 'axios'
import { AdminStore } from '../stores/AdminStore'
import { createDiscreteApi } from 'naive-ui'
const adminStore = AdminStore()
const { message } = createDiscreteApi(["message"])
const AxiosConfigure = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

AxiosConfigure.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})
AxiosConfigure.interceptors.response.use(config=>{
    if (config.status == 200) {
        return config
    } else {
        alert("接口错误")
    }
},error => {
 
    return alert(error);
})
export default AxiosConfigure;