import Joi from 'Joi'

export const createAdminUserValidation = (req, res, next) => {
        // server validation 
    const schema = Joi.object({
        
        fname: Joi.string().max(20).alphanum().required(),
        lname: Joi.string().max(20).alphanum().required(),
        email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).required(),
        phone : Joi.string().max(15),
        address: Joi.string().max(100),
        dob: Joi.date(),
        gender: Joi.string().max(6)
    
     })
    
    const value = schema.validate(req.body)
    console.log(value)
    
    if (value.error) {
        return res.json({
            status: "error",
            message : value.error.message,

        })    }


    next();

}