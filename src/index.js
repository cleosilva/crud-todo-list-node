const express = require('express');
const app = express();

app.use(express.json())

const projects = [];

app.post("/projects", (request, response) => {
    const {id, title, tasks} = request.body;
    const project = {id,title, tasks};

    projects.push(project);

    return response.status(201).json(project);

});

app.get("/projects", (request, response) => {
    return response.json(projects)
});


app.put("/projects/:id", (request, response) => {
    const { id } = request.params;
    const { title, tasks } = request.body;

    const projectIndex = projects.findIndex((project) => project.id == id);
    
    if (projectIndex < 0) {
        return response.status(400).json({message: "Project not found!"});
    }

    const project = { id,title, tasks };
    projects[projectIndex] = project;
    
    return response.status(201).json(project);
});

app.delete("/projects/:id", (request,response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex((project) => project.id == id);
    
    if (projectIndex < 0) {
        return response.status(400).json({message: "Project not found!"});
    }

    projects.splice(projectIndex, 1);
    return response.status(200).json({message: "Project deleted"})

});


app.post("/projects/:id/tasks", (request, response) => {
    const { id } = request.params;
    const { tasks } = request.body;
    
    const projectIndex = projects.findIndex((project) => project.id == id);
   
    if (projectIndex < 0) {
        return response.status(400).json({message: "Project not found!"});
    }

    projects[projectIndex].tasks.push(...tasks);

    return response.status(201).json(projects[projectIndex]);

});

app.listen(3333, () => {
    console.log("Api Start")
});