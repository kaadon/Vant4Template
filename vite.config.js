import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
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
        }),
        Components({
            resolvers: [VantResolver()],
        }),

    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server:{
        proxy: generateProxyConfig(),
    }
    
})