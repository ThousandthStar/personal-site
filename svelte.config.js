import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({
			postcss: true
		}),
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: [
				'/projects/8bit Duels/',
				'/projects/8bit Duels/8bd-intro.md',
				'/projects/8bit Duels/8bd-part1.md',
				'/projects/8bit Duels/8bd-part2.md',
				'/projects/8bit Duels/8bd-part3.md',
				'/projects/8bit Duels/8bd-part4.md',
				'/projects/8bit Duels/8bd-part5.md',
				'/projects/8bit Duels/8bd-part6.md',
				'/projects/8bit Duels/8bd-part7.md',
				'/projects/8bit Duels/8bd-final.md',
			]
		}
	}
};

export default config;
