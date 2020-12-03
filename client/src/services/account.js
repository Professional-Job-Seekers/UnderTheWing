const account = {
    async getAllMentors() {
        const URL = "/api/accounts/mentor/all";
        const response = await fetch(URL);
        return response.json();
    },
    async isMentor() {

    },
    async getAssociatedMentors(username) {
        const URL = "/api/matches";
        const response = await fetch(URL);
        return response.json();
    }
}

export default account; 