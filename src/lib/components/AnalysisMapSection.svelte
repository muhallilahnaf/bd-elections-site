<script>
	let { section, folder } = $props();
</script>

<!-- /analysis map section -->
<p>{section.description}</p>
<iframe src={`${folder}${section.file_name}`} title={section.file_name}></iframe>

<style>
	iframe {
		width: 70vw;
		height: 70vh;
	}
</style>
