import { redirect } from '@sveltejs/kit';
import seatsDataStore from '$lib/store/seatsData.svelte';

export const load = () => {
    if (seatsDataStore.seatsData.length < 300) {
        throw redirect(302, '/');
    }
    return {};
}

export const prerender = false;