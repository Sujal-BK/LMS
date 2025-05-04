import Course from "../Models/course.model.js";

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const uploadFile = async (filePath, resourseType = 'image') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { resource_type: resourseType })
    return result.secure_url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
}

const deleteLocalFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('failed to delete file', err);

    }
  })
}



export const addCourse = async (req, res) => {
  try {
    const { title, description, price, category, mentor } = req.body

    if (!title) {
      return res.status(404).json({
        success: false,
        message: "Title is not provided..."
      })
    }
    if (!description) {
      return res.status(404).json({
        success: false,
        message: "Description is not provided..."
      })
    } if (!price) {
      return res.status(404).json({
        success: false,
        message: "price is not provided..."
      })
    } if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category is not provided..."
      })
    }

    const coverImgPath = req.files?.coverImg?.[0]?.path
    if (!coverImgPath) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required"
      })
    }
    const coverImgUrl = await uploadFile(coverImgPath, 'image')
    deleteLocalFile(coverImgPath)

    const videoFiles = req.files?.videos || [];
    if (videoFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one video is required",
      });
    }
    const videoUrls = []
    for (const video of videoFiles) {
      const videoUrl = await uploadFile(video.path, 'video')
      videoUrls.push(videoUrl)
      deleteLocalFile(video.path)
    }


    const newCourse = await Course.create({
      title,
      description,
      price,
      category,
      mentor,
      coverImg: coverImgUrl,
      videoUrls,
    })
    return res.status(201).json({
      success: true,
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error in add course"
    })

  }
}


// const uploadFile = async (filepath,resourseType = 'image') => {
//     try {

//         const result = await cloudinary.uploader.upload(filepath,{resource_type:resourseType});

//         return result.secure_url;
//     } catch (error) {
//         console.error("Error uploading to Cloudinary:", error);
//         throw new Error("Cloudinary upload failed");
//     }
// };







// export const addCourse = async (req, res) => {
//   try {
//     const { title, description, price, category, mentor } = req.body;

//     // Check if all required fields are present
//     if (!title || !description || !price || !category || !mentor) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields Are Mandatory",
//       });
//     }

//     // Ensure cover image and videos are uploaded
//     const coverImgPath = req.files && req.files.coverImg ? req.files.coverImg[0].path : null;
//     if (!coverImgPath) {
//       return res.status(400).json({
//         success: false,
//         message: "Cover image is required",
//       });
//     }

//     // Upload cover image to Cloudinary
//     const coverImgUrl = await uploadFile(coverImgPath);

//     // Handle video uploads if there are any
//     const videoUrls = [];
//     if (req.files && req.files.videos) {
//       const videoPaths = req.files.videos.map(file => file.path);

//       // Upload each video to Cloudinary
//       for (const videoPath of videoPaths) {
//         const videoUrl = await uploadFile(videoPath, 'video');
//         videoUrls.push(videoUrl);
//       }
//     }

//     // Save the course to the database
//     const newCourse = await Course.create({
//       title,
//       description,
//       price,
//       category,
//       coverImg: coverImgUrl,
//       mentor,
//       videoUrls,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Course added successfully",
//       course: newCourse,
//     });
//   } catch (error) {
//     console.error("Error adding course:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error in add course",
//       error: error.message,
//     });
//   }
// };

export const updateCourse = async (req, res) => {
  try {

    console.log("Incoming fields:", req.body);
    console.log("Files:", req.files);

    const { courseId } = req.params;
    const { title, description, price, category, mentor } = req.body;

    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Upload new cover image if provided
    let coverImgUrl = existingCourse.coverImg;
    if (req.files?.coverImg && req.files.coverImg[0]) {
      const coverImgPath = req.files.coverImg[0].path;
      coverImgUrl = await uploadFile(coverImgPath, "image");
    }

    // Upload new videos if provided
    let videoUrls = existingCourse.videoUrls;
    if (req.files?.videos?.length > 0) {
      const uploadedVideos = [];
      for (const file of req.files.videos) {
        const videoUrl = await uploadFile(file.path, "video");
        uploadedVideos.push(videoUrl);
      }
      videoUrls = uploadedVideos;
    }

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title: title !== undefined ? title : existingCourse.title,
        description: description !== undefined ? description : existingCourse.description,
        price: price !== undefined ? price : existingCourse.price,
        category: category !== undefined ? category : existingCourse.category,
        mentor: mentor !== undefined ? mentor : existingCourse.mentor,
        coverImg: coverImgUrl,
        videoUrls: videoUrls,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Server error in update course",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Server error in delete course",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id); // singular
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      course, // singular
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error in get course by ID",
      error: error.message,
    });
  }
};


export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find()
    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "Course getting Error"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Course Information",
      courses
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error in get Course",
      error
    })

  }
}

export const getSelfCourses = async (req, res) => {
  try {
    const { mentorId } = req.params
    const courses = await Course.find({ mentor: mentorId })
    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "No courses found for this mentor"
      })
    }

    res.status(200).json({
      success: true,
      message: 'here are Courses',
      courses
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error in get Course",
      error
    })

  }
}

// export const searchCourse = async(req,res)=>{
//   try {
//     const {query} = req.query
//     const regex = new RegExp(query,'i')
//     const courses = await Course.find({
//       $or:[
//         {title:{$regex:regex}},
//         {description:{$regex:regex}}
//       ]
//     })
//     return res.status(200).json({
//       success: true,
//       results: courses.length,
//       courses
//   });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//         success : false,
//         message :"Server Error in search Course",
//         error
//     })
//   }
// }