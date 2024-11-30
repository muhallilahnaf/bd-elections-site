<script>
    let { section, figure_url, year } = $props();
</script>

<!-- /electoral-systems analysis section -->
<div class="ui basic padded segment">
    <!-- analysis title, description -->
    <div class="ui basic segment">
        <h2 class="ui header">{section.title}</h2>
        <p>{section.description}</p>
    </div>
    <!-- analysis figure, discussion -->
    <div class="ui stackable grid">
        <div class="eight wide column">
            <div class="ui compact basic segment">
                <img src={figure_url.replace('@year@', year)} alt={section.title} class="ui image" />
            </div>
        </div>
        <div class="ui compact basic segment">
            <div class="ui icon info message">
                <i class="info icon"></i>
                <div class="content">
                    <div class="header">Insight</div>
                    {#each section.discussion as disc}
                        <p>{disc}</p>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>