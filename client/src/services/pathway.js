const pathway = {
  getAllPathways : async () => {
    const URL  = 'api/pathways/';
    const response = await fetch(URL);
    return response.json();
  },
  getAllActiveUserPathways : async () =>{
    const scope = 'ALL';
    const URL  = `api/pathways/progress/?scope=${scope}/`;
    const response = await fetch(URL);
    return response.json();
  },
  getActiveUserPathway : async (pathway) =>{
    const URL  = `api/pathways/${pathway}`;
    const response = await fetch(URL);
    return response.json();
  }

}
    
export default pathway; 