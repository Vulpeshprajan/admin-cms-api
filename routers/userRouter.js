import express from "express";
const Router = express.Router();
import { createUser } from "../models/user-model/User.model.js"
import { createAdminUserValidation } from "../middleware/formValidation.middleware.js";
import {hashPassword} from "../helpers/bcrypt.helper.js"


Router.all("/", (req, res, next) => {
    console.log("from user router");

    next();

})

Router.post("/",createAdminUserValidation, async (req, res) => {
console.log(req.body)
    try {

        // server side validation
        // it is done by createAdminUservValidation

        // encrypt password 


        const hashPass = hashPassword(req.body.password);

        if (hashPass) {
            req.body.password = hashPass
            console.log(hashPass)

        }

        const result = await createUser(req.body)
console.log(result)

        if (result?._id) {
            // TODO 
            // create unque activation link and email the link to user email 
            return res.json({
                state: "success",
                message: "New user has been created successfully! we have send a email confirmation to your email, please check and follow the instruction to activate account",

            })
        }
    
        res.json({
            state: "error",
            message: "Unable to create new user"

        })


    } catch (error) {
        let msg = "Error Unable to create new user"
        console.log(error.message);

        res.json({
            state: "error",
            message: "Error, Unable to created new user"


        })
        
    }


})

export default Router;