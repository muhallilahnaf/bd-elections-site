<script>
	import analysisData from '$lib/data/analysisItems.json';
</script>


<!-- analysis page cards -->
<div class="ui container">
    <div class="ui basic segment">
        <div class="ui four stackable cards">
            {#each analysisData as item}
                <a class="ui card" href={'/analysis/' + item.name}>
                    <img class="image" src={item.thumb} alt={item.title} />
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
