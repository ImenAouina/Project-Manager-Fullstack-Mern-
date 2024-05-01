const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "the project  is required"],
        minlength:[3, "project must be 3 characters or longer"],
        
    },
    dueDate:{
        type:Date,
        required:[true,'Due Date field is required']
    },
    projectStatus: {
        type: String,
        enum: ["backlog", "In progress", "completed"],
        default: "backlog",
    },

}, { timestamps: true })

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project