import seatsDataStore from "$lib/store/seatsData.svelte"
import { readCSV } from "$lib/helper";

export const load = async ({ params }) => {
    
    const targetSeat = params.slug;
        
    const seatSummary = await readCSV('data/seat_summary.csv');
    const targetSeatSummary = seatSummary.filter(s => s.seat == targetSeat);
        
    const seatResult = await readCSV('data/candidate_result.csv');
    const targetSeatResults = seatResult.filter(s => s.seat == targetSeat);
    targetSeatResults.sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return {
        slug: targetSeat,
        targetSeatResults,
        targetSeatSummary 
    }
}
