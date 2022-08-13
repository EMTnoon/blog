<template>
    <div class="RichTextEditor">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
            style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml.val"
            style="height: 700px; overflow-y: hidden" @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive, inject, shallowRef, computed, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const mode = ref("default")
const editorRef = shallowRef();
const toolbarConfig = { excludeKeys: ["uploadVideo"] };
const editorConfig = { placeholder: '请输入内容...' };



const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(["update:model-value"])
const valueHtml = reactive({
    val: computed({
        get: () => props.modelValue || '',
        set: (val) => {
            emit("update:model-value", val)
        }
    })
})

const handleCreated = (editor) => {
    editorRef.value = editor;
};
// 上传图片设置
const server_url = inject("server_url")
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 20 * 1024,
    server: server_url + '/upload/rich_editor_upload',
}
editorConfig.MENU_CONF['insertImage'] = {
    parseImageSrc: (src) => {
        if (src.indexOf("http") !== 0) {
            return `${server_url}${src}`
        }
        return src
    }
}
</script>
<style scoped>
.RichTextEditor{
    width: 100%;
}
/* 解决全屏时层级问题 */
.w-e-full-screen-container{
    z-index: 99999999;
}
</style>
