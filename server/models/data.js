import mongoose from "mongoose";

var JobSchema = new mongoose.Schema({
    title : {
        type: String,
        required: 'Required'
    },
    location : {
        type: String,
        required: 'Required'
    },
    date : {
        type: Date,
        required: 'Required'
    }
})

const Job = mongoose.model("job-roles", JobSchema)

export default Job;