class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}

export const errOrMiddleware  = (err, req, res, next)=>{
    err.message = err.message || "internal server error!";
    err.statusCode = err.statusCode || 500;  //500 is for internal server error

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

export default ErrorHandler;