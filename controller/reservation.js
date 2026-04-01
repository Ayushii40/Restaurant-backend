import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async(req,res,next)=>{
    const{ firstName, lastName, email, phone, date, time }= req.body;  //take all this details from frontend

    if(!firstName || !lastName ||  !email ||  !phone || !date || !time){
        return next(new ErrorHandler("please fill full reservation form!", 400));
    }
    try{
        await Reservation.create({ firstName, lastName, email, phone, date, time }); //mongoose accept object not a separate value
        res.status(200).json
        ({
            success: true,
            message: "reservation sent successfully!",
        });   
    } catch(error){
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(","),400));
        }else{
            return next(error);
        }
    }
};