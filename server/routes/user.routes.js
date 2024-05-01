const UserController = require('../controllers/user.controller');
const ProjectController = require("../controllers/project.controller");

const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {

    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    //app.post('/api/logout', UserController.logout);
    

    //authenticate 
    app.post("/api/projects", ProjectController.createNewProject)
    app.get("/api/projects", ProjectController.findAllProjects)
    app.get("/api/projects/:id", ProjectController.findOneProject)
    app.patch("/api/projects/:id", ProjectController.updateExistingProject)
    app.delete("/api/projects/:id", ProjectController.deleteAnExistingProject)
    
}
