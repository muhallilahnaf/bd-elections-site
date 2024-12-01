<script>
    import menuData from '$lib/data/menuData.json'
</script>


<!-- nav items -->
<a class="item" href="/">
    <i class="home icon"></i> Home
</a>
{#each menuData as menu}
    <a class="item" href={menu.href}>
        <i class="{menu.icon} icon"></i>
        {menu.title}
    </a>
{/each}

