import { error } from '@sveltejs/kit';

export async function load() {

    const res = await fetch('https://raw.githubusercontent.com/muhallilahnaf/splore/master/package.json');
    const data = await res.json();

	if (data) {
		return data;
	}

	error(404, 'Not found');
    
};