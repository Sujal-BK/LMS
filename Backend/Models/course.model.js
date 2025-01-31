import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coverImg:{
        type: String,
        required: true
    },
    videoUrls: [{ 
        type: String,
        required: true
    }],
    rating: {
        type: Number
       
    },
    category: {
        type: String,
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
       
    }
}, {
    timestamps: true,
})

const Course = mongoose.model('Course', courseSchema)

export default Course