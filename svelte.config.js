import adapter from '@sveltejs/adapter-node';
import {
    vitePreprocess
} from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        alias: {
            $db: './src/db',
            $lib: './src/lib'
        },
        csrf: {
            checkOrigin: false,
        },
        adapter: adapter()
    }
};

export default config;