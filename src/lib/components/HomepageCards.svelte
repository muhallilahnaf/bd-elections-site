<script>
	import menuData from '$lib/data/menuData.json';
	let cardCount = menuData.length == 3 ? 'three' : 'two';
</script>

<!-- homepage cards -->
<div class="ui container">
	<div class="ui {cardCount} stackable cards">
		{#each menuData as menu}
			<a class="ui raised card" href={menu.href}>
				<img class="image" src={menu.img_src} alt={menu.img_alt} />
				<div class="content">
					<h2 class="header">{menu.title}</h2>
					<div class="meta">
						<p>{menu.subtitle}</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	img {
		height: 300px;
		width: 100%;
		object-fit: cover;
		opacity: 0.7;
	}
	.card {
		margin-bottom: 4rem !important;
	}
	.card:hover img {
		opacity: 0.9;
	}
</style>