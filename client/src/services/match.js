const match = {
    async matchUserWithMentor(menteeUsername, mentorUsername) {
        const URL = '/api/matches/match/';
        const matchRequestJSON = {
          "mentee": menteeUsername,
          "mentor": mentorUsername,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(matchRequestJSON)
          };
          try {
            const response = await fetch(URL, requestOptions);
            return response.json();
          } catch (err) {
            console.log(err);
          }
    },
    async getAllMentorsForMentee() {
        const URL  = `/api/matches/`;
        const response = await fetch(URL);
        return response.json();
    },
    async getAllMenteesForMentor() {
        const scope = 'mentors';
        const URL  = `/api/matches/?scope=${scope}`;
        const response = await fetch(URL);
        return response.json();
    },
}

export default match; 