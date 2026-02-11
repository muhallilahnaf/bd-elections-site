const createCandidatesDataStore = () => {
    let candidatesData = $state([]);

    return {
        get candidatesData() {
            return candidatesData
        },
        set candidatesData(newCandidatesData) {
            candidatesData = newCandidatesData
        }
    }
}

const candidatesDataStore = createCandidatesDataStore()

export default candidatesDataStore