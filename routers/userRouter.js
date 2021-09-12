import express from "express";
const Router = express.Router();
import { createUser } from "../models/user-model/User.model.js"
import { createAdminUserValidation } from "../middleware/formValidation.middleware.js";
import { hashPassword } from "../helpers/bcrypt.helper.js"
import { createUniqueEmailConfirmation } from "../models/session/Session.model.js";
import { emailProcessor } from "../helpers/email.helper.js";


Router.all("/", (req, res, next) => {
    console.log("from user router");

    next();

})

Router.post("/",createAdminUserValidation, async (req, res) => {

    try {
        // server side validation
        // it is done by createAdminUservValidation

        // encrypt password done by bcrypt via bcrypt helper
        const hashPass = hashPassword(req.body.password);
        console.log("got hit ")
        console.log(hashPass)
        if (hashPass) {
            req.body.password = hashPass
            console.log(hashPass)

       

            const {_id, fname, email} = await createUser(req.body)
          console.log(email,_id, req.body)
            if (_id) {
                // TODO 
                // create unque activation link 
                const { pin } = await createUniqueEmailConfirmation(email);
                
                // email the link to user email
            if (pin) {
                const forSendingEmail = {
                    fname,
                    email,
                    pin,
                }
                    emailProcessor(forSendingEmail)
                }

                return res.json({
                    state: "success",
                    message: "New user has been created successfully! we have send a email confirmation to your email, please check and follow the instruction to activate account",

                })
            }
    
            res.json({
                state: "error",
                message: "Unable to create new user"

            })

        }
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