const pathway = {
  getPathway : async (pathway) => {
    const URL  = `/api/pathways/?pathway=${pathway}`;
    const response = await fetch(URL);
    console.log(response);
    return response.json();
  },
  getAllPathways : async () => {
    const URL  = '/api/pathways/';
    const response = await fetch(URL);
    return response.json();
  },
  getAllActiveUserPathways : async () =>{
    const scope = 'all';
    const URL  = `/api/pathways/progress/?scope=${scope}`;
    const response = await fetch(URL);
    return response.json();
  },
  getActiveUserPathway : async (pathway) =>{
    const URL  = `/api/pathways/${pathway}`;
    const response = await fetch(URL);
    return response.json();
  },
  commitUserToPathway: async (pathway) => {
    const URL  = `/api/pathways/commit/`;
    const requestJSON = {
      "pathway": pathway
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(requestJSON)
    };
    const response = await fetch(URL, requestOptions);
    return response;
  },
  taskStatus : {
    "completed": "Completed",
    "skipped": "Skipped",
    "under_review": 'Under Review', 
    "pending_start" : 'Pending Start', 
    "pending_review": 'Pending Review', 
    "in_progress": 'In Progress',
  },

  updatePathwayTaskProgress : async (taskId, status) =>{
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
    
export default pathway; 

