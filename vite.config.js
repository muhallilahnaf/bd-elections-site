import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

// read data json files
const readDataFiles = () => {
	const analysisItemsPath = path.resolve('src', 'lib', 'data', 'analysisItems.json')
	const analysisItemsText = fs.readFileSync(analysisItemsPath, {encoding: 'utf8'})
	const analysisItems = JSON.parse(analysisItemsText)

	const electoralItemsPath = path.resolve('src', 'lib', 'data', 'electoralItems.json')
	const electoralItemsText = fs.readFileSync(electoralItemsPath, {encoding: 'utf8'})
	const electoralItems = JSON.parse(electoralItemsText)

	return {analysis: analysisItems, electoral: electoralItems}
}

// gather name of files which need to be fetched
const getFileNames = (data) => {
	let filenames = []
	data.analysis.forEach(item => {
		item.sections.forEach(section => {
			if (section.type == 'data' || section.type == 'map') {
				filenames.push({
					type: section.type,
					name: section.file_name
				})
			}
		})
	})
	data.electoral.years.forEach(year => {		
		filenames.push({
			type: 'data',
			name: `method_big_${year}.csv`
		})
	})
	return filenames
}


const fetchAssets = () => ({
    buildStart: async () => {
		// folders
		const folderNames = ['data', 'dataout', 'mapout']

		// create folders if not exist
		folderNames.forEach(name => {
			const folder = path.resolve('static', name)
			if (!fs.existsSync(folder)) {
				fs.mkdirSync(folder, {recursive: true})
			}
		})

		try {
			// fetch all folder data from github
			const allFolderData = await Promise.all(
				folderNames.map(async (name) => {

					const res = await fetch(`https://api.github.com/repos/muhallilahnaf/bd-elections-eda/contents/${name}`);
					if (!res.ok) throw new Error(`error fetching ${name} folder contents`);
					
					const data = await res.json();
					if (!data || !Array.isArray(data)) throw new Error(`${name} folder contents not found`);

					return new Promise((resolve, reject) => {
						resolve({ name, data })
					})
				})
			)

			// map all folder files to single array
			let allFiles = []
			allFolderData.forEach(folder => {
				folder.data.forEach(file => {
					allFiles.push({
						folder: folder.name,
						name: file.name,
						url: file.download_url
					})
				})
			})
	
			// fetch all files from each folder
			allFiles.forEach(async (file) => {
				let name = file.name || '';
				let download_url = file.download_url || '';
				let folder = file.folder || '';

				if (download_url == '') throw new Error(`empty download link for file ${name}`)

				const resFile = await fetch(download_url)
				if (!resFile.ok) throw new Error(`error fetching file ${name}`);

				const targetFolder = path.resolve('static', folder)
				const targetPath = path.join(targetFolder, name)

				if (name.endsWith('.json')) {
					const data = await resFile.json()
					fs.writeFileSync(targetPath, JSON.stringify(data), {encoding: 'utf8'})
				} else {
					const data = await resFile.text()
					fs.writeFileSync(targetPath, data, {encoding: 'utf8'})
				}
				
				console.log(`downloaded file ${folder}/${name}`);
			})

		} catch (er) {
			throw new Error(er);
		}
    }
})

export default defineConfig({
	plugins: [fetchAssets(), sveltekit()]
});
