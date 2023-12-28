import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const srcPath = path.resolve('resources');
const jsPath = path.resolve('resources/js');

// https://vitejs.dev/config/
export default defineConfig(({}) => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                assets: path.join(srcPath, 'assets'),
                components: path.join(jsPath, 'components'),
                service: path.join(jsPath, 'service'),
                types: path.join(srcPath, 'types'),
                helpers: path.join(jsPath, 'helpers'),
            },
        },
    };
});
