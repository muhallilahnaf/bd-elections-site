<script>
	let { section } = $props();
</script>

<!-- map section -->
<p>{section.description}</p>
<iframe src={'/' + section.file_name} title={section.file_name}></iframe>

<style>
	iframe {
		width: 80vw;
		height: 80vh;
	}
</style>
