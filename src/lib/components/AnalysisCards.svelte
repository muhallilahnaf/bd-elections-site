<script>
	import analysisData from '$lib/data/analysisItems.json';
</script>


<!-- analysis page cards -->
<div class="ui container">
    <div class="ui basic segment">
        <div class="ui four stackable cards">
            {#each analysisData as item}
                <a class="ui card" href={'/analysis/' + item.slug}>
                    <img class="image" src={`${item.figure_folder_url}${item.thumb}`} alt={item.thumb} />
                    <div class="content">
                        <h2 class="header">{item.title}</h2>
                        <div class="meta">
                            <p>{item.description}</p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>


<style>
    img {
		height: 300px;
        width: 100%;
		object-fit: cover;
        opacity: 0.8;
	}
    .card {
        margin-bottom: 4rem !important;
    }
</style>