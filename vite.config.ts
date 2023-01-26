import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: name => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
