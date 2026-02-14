<script>
    let {
        party = {
            party: '',
            vote: '',
            voters: '',
            seat_contested: '',
            avg_vote_pc: '',
            total_vote_pc: '',
            count: '',
        }
    } = $props();
    const folder = "https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/fig/static/symbol/"
    const partySymbol = {
        'BNP': 'dhaner_shish.jpg',
        'Jamaat': 'daripalla.jpg',
        'NCP': 'shapla_koli.jpg',
    }
    let src = $state('tara.jpg')
    if (Object.keys(partySymbol).includes(party.party)) {
        src = partySymbol[party.party]
    }
</script>

<div class="ui raised segment">
    <div class="ui center">
        <img class="ui small middle aligned image" src={`${folder}${src}`} alt={party.party}> 
        <span class="ui large text">{party.party}</span>
    </div>
    <div class="ui two statistics">
        <div class="ui tiny statistic">
            <div class="value">{parseInt(party.count)}</div>
            <div class="label">Seats Won</div>
        </div>
        <div class="ui tiny statistic">
            <div class="value">{parseInt(party.seat_contested)}</div>
            <div class="label">Seats Contested</div>
        </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui two statistics">
        <div class="ui tiny statistic">
            <div class="value">{party.total_vote_pc}</div>
            <div class="label">Vote %</div>
        </div>
        <div class="ui tiny statistic">
            <div class="value">{party.avg_vote_pc}</div>
            <div class="label">Vote % (contested seats)</div>
        </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui one statistics">
        <div class="ui tiny statistic">
            <div class="value">{parseInt(party.vote).toLocaleString()}</div>
            <div class="label">Votes</div>
        </div>
    </div>
</div>
