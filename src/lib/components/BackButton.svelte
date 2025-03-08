<script>
	let { route, text } = $props()
</script>

<!-- back to \{route} button -->
<div class="ui container back-btn-container">
	<div class="ui basic segment">
		<a href={route}>
			<button class="tiny ui compact labeled icon button">
				<i class="arrow left icon"></i>
				{text}
			</button>
		</a>
	</div>
</div>

<style>
	.back-btn-container {
		margin-top: 2rem;
	}
</style>
