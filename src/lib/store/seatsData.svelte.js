const createSeatsDataStore = () => {
    let seatsData = $state([]);

    return {
        get seatsData() {
            return seatsData
        },
        set seatsData(newSeatsData) {
            seatsData = newSeatsData
        }
    }
}

const seatsDataStore = createSeatsDataStore()

export default seatsDataStore