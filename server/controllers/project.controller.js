const Project = require("../models/project.model")

module.exports.createNewProject = (req, res) => {
    console.log(req.body)
    Project.create(req.body)
        .then(newlyCreatedProject => {
            res.json({ project: newlyCreatedProject })
        })
        .catch( err => {
            res.status(400).json(err)
        })
}

// Get all 

module.exports.findAllProjects = (req, res) => {
    Project.find()
        .then((allProjects) => {
            res.json({ projects : allProjects })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

//Read one 
module.exports.findOneProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(oneProject => {
            res.json({ Project: oneProject })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
//update 
module.exports.updateExistingProject = (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProject => {
            res.json({ Project: updatedProject })
        })
        .catch( err => {
            res.status(400).json(err)
        })
}
//delete 
module.exports.deleteAnExistingProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
            .then(result => {
            res.json({ result: result })
            console.log(result)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}