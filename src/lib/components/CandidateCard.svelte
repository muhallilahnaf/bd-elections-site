<script>
    let {
        candidate = {
            name: '',
            src: '',
            party: '',
            name_bn: '',
            seat_no: '',
            symbol: '',
            alliance: '',
            seat: '',
            district: '',
            division: ''
        }
    } = $props();
    const folder = "https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/fig/static/candidate/"
    let candidateName = (candidate.name === '') ? candidate.name_bn : candidate.name
</script>

<div class="card">
    <!-- <div class="image">
        <img src={`${folder}${candidate.src}`} alt={candidateName}>
    </div> -->
    <div class="content">
        <div class="header">{candidateName}</div>
        <div class="description">
            <p>{candidate.party}</p>
        </div>
    </div>
    <div class="extra content">
        <span class="right floated">{candidate.symbol}</span>
        <span>Alliance: {candidate.alliance == '' ? 'None' : candidate.alliance}</span>
    </div>
</div>