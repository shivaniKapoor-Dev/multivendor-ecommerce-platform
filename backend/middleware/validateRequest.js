const {validationResult} = require("express-validator");

module.exports = (req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const formattedErrors = errors.array();
        return res.status(400).json({
            message: formattedErrors[0]?.msg || "Validation failed",
            error: formattedErrors
        });
    }
    next();
}
