const activePathway = {
    getActivePathwayTask : async (pathway) => {
      const URL  = `/api/pathways/?pathway=${pathway}`;
      const response = await fetch(URL);
      console.log(response);
      return response.json();
    },  
    updateActivePathwayTaskProgress : async (taskId, status) =>{
      const URL  = `/api/pathways/progress/update`;
      const requestJSON = {
        "task_id": taskId,
        "new_status": status
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(requestJSON)
      };
      const response = await fetch(URL, requestOptions);
      return response;
    } 
  }
      
export default activePathway; 
  
  