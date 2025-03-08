import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html' // Enables SPA fallback for dynamic routes
		}),
		// prerender: {
		// 	entries: ['*', '!/kys/seat-details'] // Prerender everything except /kys
		// }
	}
};

export default config;
