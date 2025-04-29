import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/Assets': path.resolve(__dirname, ',/src/assets'),
            '@/Pages': path.resolve(__dirname, './src/pages'),
            '@/Shared': path.resolve(__dirname, './src/shared'),
            '@/Store': path.resolve(__dirname, './src/store'),
            '@/Components': path.resolve(__dirname, './src/components'),
            '@/Features': path.resolve(__dirname, './src/features'),
            '@scss': path.resolve(__dirname, './src/assets/scss'),
        },
    },
});
