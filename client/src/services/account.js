const account = {
    async getAllMentors(){
        const URL  = "/api/accounts/mentor/all";
        const response = await fetch(URL);
        return response.json();
    },
    async isMentor(){
        
    }
}
    
export default account; 