<script>
    let {
        candidate = {
            name: '',
            party: '',
            seat_name: '',
            vote: '',
            vote_pc: ''
        }
    } = $props();
    const folder = "https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/fig/static/symbol/"
    const partySymbol = {
        'BNP': 'dhaner_shish.jpg',
        'Jamaat': 'daripalla.jpg',
        'NCP': 'shapla_koli.jpg',
        'Islami Andolan Bangladesh': 'hatapakha.jpg',
        'JaPa': 'langol.jpg'
    }
    let src = $state('tara.jpg')
    if (Object.keys(partySymbol).includes(candidate.party)) {
        src = partySymbol[candidate.party]
    }
</script>

<div class="ui horizontal card">
    <div class="image">
        <img src={`${folder}${src}`} alt={candidate.party}>
    </div>
    <div class="content">
        <div class="header">{candidate.name}</div>
        <div class="meta">
            <span class="category">{candidate.party}</span>
        </div>
        <div class="description">
            <p>Votes: {candidate.vote} ({candidate.vote_pc}%)</p>
        </div>
    </div>
</div>