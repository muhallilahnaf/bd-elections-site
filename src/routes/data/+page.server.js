import { error } from '@sveltejs/kit';


// fetch csv file and return headers and first 5 rows
const fetchCSV = async (url) => {
	const res = await fetch(url)
	const csv = await res.text()
	const lines = csv.split('\n')
	const data = lines.slice(0, 6)
	return data
}


// fetch json file and return first 3 key-values
const fetchJSON = async (url) => {
	const res = await fetch(url)
	const resData = await res.json()
	const data = Object.entries(resData).slice(0, 3)
	return data
}


// fetch github data folder and its contents
export async function load() {

	try {    
		// fetch github data folder
		const res = await fetch('https://api.github.com/repos/muhallilahnaf/bd-elections-eda/contents/data');
		if (!res.ok) error(404, 'error fetching folder contents')

		const resData = await res.json();
		if (!resData || !Array.isArray(resData)) error(404, 'folder contents not found')

		// fetch all files data
		const results = await Promise.all(
			resData.map(async (file) => {
				let name = file.name || '';
				let html_url = file.html_url || '';
				let download_url = file.download_url || '';
				let data = [];
				let type = '';

				if (download_url == '') throw new Error('empty download link')

				if (name.endsWith('.csv')) {
					data = await fetchCSV(download_url)
					type = 'csv'
				}

				if (name.endsWith('.json')) {
					data = await fetchJSON(download_url)
					type = 'json'
				}
				
				return new Promise((resolve, reject) => {
					if (data.length > 0 && type !== '') {
						resolve({ name, type, html_url, download_url, data })
					} else {
						reject('unable to fetch data')
					}
				})
			})
		);

		return { results }

	} catch (er) {
		error(404, er)
	}
};
