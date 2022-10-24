import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';

// Define site router and routes.
const router : Router = createRouter
({
	history: createWebHistory(),
	routes:
	[
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/PageHome.vue'),
		}
	],
});

export default router;