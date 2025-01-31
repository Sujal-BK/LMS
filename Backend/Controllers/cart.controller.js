import Cart from "../Models/cart.model.js";
import Course from "../Models/course.model.js";
import User from "../Models/user.model.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()



export const addTocart = async (req, res) => {
    try {
        const { email } = req.currentuser;
        const { id } = req.params;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  Not Found",
            });
        }

        // Find the course
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: user._id });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = await Cart.create({
                user: user._id,
                courses: [id], // Add the course ID to the courses array
            });
        } else {
            // Check if the course is already in the cart
            if (cart.courses.includes(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Course already in cart",
                });
            }
            // Add the course ID to the existing cart
            cart.courses.push(id);
            await cart.save(); // Save the updated cart
        }


        return res.status(201).json({
            success: true,
            message: "Course added to cart",
            cart,
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error in Add To Cart",
            error: error.message || "Internal Server Error",
        });
    }
};

export const createOrder = async (req, res) => {


    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1,
      
    }
    try {
        const response = await razorpay.orders.create(options)
        console.log(response);
        
        return res.status(200).json({
            success : true,
            order_id : response.id,
            currency :  response.currency,
            amount : response.amount
        })
    } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Server Error in payment",
        error: error.message || "Internal Server Error",
    });
    }
}

