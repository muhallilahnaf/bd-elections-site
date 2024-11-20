<script>
    import menuData from '$lib/data/menu.json'
</script>

<!-- brand icon -->
<div class="ui container segment basic">
    <a class="ui header" href="https://google.com">
        <i class="vote yea icon"></i>
        <div class="ui content huge text">BD Elections</div>
    </a>
</div>

<!-- navbar -->
<div class="ui attached stackable menu">
    <div class="ui container">
        <a class="item" href="/">
            <i class="home icon"></i> Home
        </a>
        {#each menuData as menu}
            <a class="item" href={menu.href}>
                <i class="{menu.icon} icon"></i> {menu.title}
            </a>
        {/each}
    </div>
</div>

