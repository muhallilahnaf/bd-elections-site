<script>
	import DataTable from '$lib/components/DataTable.svelte';
	import DataJson from '$lib/components/DataJson.svelte';

	let { filedata } = $props();
</script>

<!-- data page files -->
<div class="ui very padded basic segment">
    <!-- file name with link to github -->
    <div class="ui fitted compact basic segment">
        <a href={filedata.html_url} class="filename" target="_blank">
            <span class="ui large text">{filedata.name}</span>
        </a>
    </div>
    <!-- data preview -->
	<div>
		<p class="data-preview">Data preview:</p>
		{#if filedata.type == 'csv'}
			<DataTable data={filedata.data} />
		{/if}
		{#if filedata.type == 'json'}
			<DataJson data={filedata.data} />
		{/if}
	</div>
</div>

<style>
	.data-preview {
		margin-bottom: 1rem;
	}
	.filename:hover {
		text-decoration: underline;
	}
</style>
