import Course from "../Models/course.model.js";

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv' 
dotenv.config()

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});



const uploadFile = async (filepath,resourseType = 'image') => {
    try {
       
        const result = await cloudinary.uploader.upload(filepath,{resource_type:resourseType});
       
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
};







export const addCourse = async (req, res) => {
  try {
    const { title, description, price, category, mentor } = req.body;
    
    // Check if all required fields are present
    if (!title || !description || !price || !category || !mentor) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Mandatory",
      });
    }

    // Ensure cover image and videos are uploaded
    const coverImgPath = req.files && req.files.coverImg ? req.files.coverImg[0].path : null;
    if (!coverImgPath) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required",
      });
    }

    // Upload cover image to Cloudinary
    const coverImgUrl = await uploadFile(coverImgPath);

    // Handle video uploads if there are any
    const videoUrls = [];
    if (req.files && req.files.videos) {
      const videoPaths = req.files.videos.map(file => file.path);

      // Upload each video to Cloudinary
      for (const videoPath of videoPaths) {
        const videoUrl = await uploadFile(videoPath, 'video');
        videoUrls.push(videoUrl);
      }
    }

    // Save the course to the database
    const newCourse = await Course.create({
      title,
      description,
      price,
      category,
      coverImg: coverImgUrl,
      mentor,
      videoUrls,
    });

    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in add course",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // Course ID from the URL
    const { title, description, price, category, mentor } = req.body;

    // Find the course in the database
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Update the cover image if a new one is uploaded
    let coverImgUrl = existingCourse.coverImg;
    const coverImgPath = req.files && req.files.coverImg ? req.files.coverImg[0].path : null;
    if (coverImgPath) {
      coverImgUrl = await uploadFile(coverImgPath);
    }

    // Update the videos if new ones are uploaded
    let videoUrls = existingCourse.videoUrls;
    if (req.files && req.files.videos) {
      const videoPaths = req.files.videos.map(file => file.path);
      const uploadedVideos = [];
      for (const videoPath of videoPaths) {
        const videoUrl = await uploadFile(videoPath, 'video');
        uploadedVideos.push(videoUrl);
      }
      videoUrls = uploadedVideos;
    }

    // Update the course fields
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title: title || existingCourse.title,
        description: description || existingCourse.description,
        price: price || existingCourse.price,
        category: category || existingCourse.category,
        mentor: mentor || existingCourse.mentor,
        coverImg: coverImgUrl,
        videoUrls: videoUrls,
      },
      { new: true } // Return the updated course
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in update course",
      error: error.message,
    });
  }
};

export const deleteCourse = async(req,res)=>{
  try {
    const {id} = req.params
    const deleteCourse = await Course.findByIdAndDelete(id);
    if(!deleteCourse){
      return res.status(404).json({
        success : false,
        message :"Course Not Found"
      })
    }
    return res.status(200).json({
      success : true,
      message :"Course Deleted Successfully"
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success : false,
        message :"Server Error in Delete Course",
        error
    })
  }
}

export const getCourseById  = async(req,res)=>{
  try {
    const {id} = req.params
   
    const courses = await Course.findById(id)
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      courses,  
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success : false,
        message :"Server Error in get Course by Category",
        error
    })
  }
}

export const getAllCourse = async(req,res)=>{
  try {
    const courses = await Course.find()
    if(!courses){
      return res.status(404).json({
        success : false,
        message : "Course getting Error"
      })
    }
    return res.status(200).json({
      success : true,
      message : "Course Information",
      courses
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success : false,
        message :"Server Error in get Course",
        error
    })
  
  }
}

export const getSelfCourses = async(req,res)=>{
  try {
    const {mentorId} = req.params
    const courses = await Course.find({mentor : mentorId})
    if(!courses){
      return res.status(400).json({
        success : false,
        message :"No courses found for this mentor"
      })
    }

    res.status(200).json({
      success : true,
      message : 'here are Courses',
      courses
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success : false,
        message :"Server Error in get Course",
        error
    })
  
  }
}

export const searchCourse = async(req,res)=>{
  try {
    const {query} = req.query
    const regex = new RegExp(query,'i')
    const courses = await Course.find({
      $or:[
        {title:{$regex:regex}},
        {description:{$regex:regex}}
      ]
    })
    return res.status(200).json({
      success: true,
      results: courses.length,
      courses
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success : false,
        message :"Server Error in search Course",
        error
    })
  }
}