<script>
	let { section, folder } = $props();
</script>

<!-- /analysis figure section -->
<div class="ui stackable grid">
	<div class="eight wide column">
		<div class="ui compact basic segment">
			<img src={`${folder}${section.file_name}`} alt={section.file_name} class="ui image" />
		</div>
		<p class="description">
			{section.description}
		</p>
		<div class="ui icon info message">
			<i class="info icon"></i>
			<div class="content">
				<div class="header">Insight</div>
				<p>{section.discussion}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.image {
		max-height: 90vh !important;
		border: 1px solid rgba(0, 0, 0, 0.5);
	}
	.description {
		color: rgba(0, 0, 0, 0.5);
	}
</style>
