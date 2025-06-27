

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return next(err);
        })
    }
}


export const globalErrorHandler = (err, req, res, next) => {
    if(process.env.MODE === "DEV"){
        res.status(err["cause"] || 500).json({ message: err.message, stack: err.stack })
    }
    else{
        res.status(err["cause"] || 500).json({ message: err.message })
    }
   
}