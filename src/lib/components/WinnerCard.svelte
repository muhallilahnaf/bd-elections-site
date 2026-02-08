<script>
    let {
        winner = {name: '', party: '', votes: '', votes_pc: '', year: ''}
    } = $props();
</script>

<div class="ui card">
    <div class="content">
        <div class="header">{winner.name}</div>
    </div>
    <div class="content">
        <h4 class="ui sub header">{winner.year}</h4>
        <div class="ui small feed">
            <div class="event">
                <div class="content">
                    <div class="summary">party: {winner.party}</div>
                </div>
            </div>
            <div class="event">
                <div class="content">
                    <div class="summary">votes: {winner.votes} ({winner.votes_pc}%)</div>
                </div>
            </div>
        </div>
    </div>
</div>