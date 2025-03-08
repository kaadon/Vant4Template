import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import path from 'path';
function generateProxyConfig() {
    const routes = (process.env.VUE_APP_PROXY_ROUTES || '')
        .split(',')
        .map(r => r.trim())
        .filter(Boolean);
    const target = process.env.VITE_API_BASE_URL;
    return routes.reduce((config, route) => {
        config[route] = { target, changeOrigin: true };
        return config;
    }, {});
}
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
            imports: [
                'vue',        // 自动导入 Vue API，如 ref, reactive, computed 等
                'vue-router', // 自动导入 Vue Router API，如 useRoute, useRouter
                'pinia',      // 自动导入 Pinia API，如 defineStore, useStore
            ],
            dirs:[
                'src/composables', // 自动导入目录
                'src/plugins', // 自动导入目录
            ],
            dts: 'src/types/auto-imports.d.ts', // 生成的类型声明文件
        }),
        Components({
            resolvers: [VantResolver()],
            dirs: [
                'src/components', // 主组件目录
            ],
            extensions: ['vue'],
            deep: true,
            dts: 'src/types/components.d.ts'
        }),
        Pages({
            dirs: 'src/pages', // 页面目录
            extensions: ['vue'],
        }),
        Layouts({
            layoutsDirs: 'src/layouts', // Layout 目录
            pagesDirs: 'src/pages',
            defaultLayout: 'default', // 默认 Layout
            extensions: ['vue'],
            importMode: ()=>'async', // 异步导入
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server:{
        proxy: generateProxyConfig(),
    }
})