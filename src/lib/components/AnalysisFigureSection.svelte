<script>
	let { section } = $props();
</script>

<!-- analysis section -->
<div class="ui stackable grid">
	<div class="eight wide column">
		<div class="ui compact basic segment">
			<img src={section.file_name} alt={section.file_name} class="ui image" />
		</div>
		<p class="description">
			{section.description.slice(0, section.description.indexOf('*'))}
		</p>
		<div class="ui icon info message">
			<i class="info icon"></i>
			<div class="content">
				<div class="header">Insight</div>
				<p>
					{section.description.slice(
						section.description.indexOf('*') + 1,
						section.description.lastIndexOf('*')
					)}
				</p>
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
