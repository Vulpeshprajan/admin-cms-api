import express from "express";
const Router = express.Router();
import { createUser, verifyEmail } from "../models/user-model/User.model.js"
import { createAdminUserValidation, adminEmailVerificationValidation } from "../middleware/formValidation.middleware.js";
import { hashPassword } from "../helpers/bcrypt.helper.js"
import { createUniqueEmailConfirmation, findAdminEmailVerification , deleteInfo} from "../models/session/Session.model.js";
import {  sendEmailVerificationConfirmation, sendEmailVerificationLink } from "../helpers/email.helper.js";


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
                sendEmailVerificationLink(forSendingEmail)
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


// email verification 
Router.patch("/email-verification", adminEmailVerificationValidation, async(req, res) => {
try {
    const result = await findAdminEmailVerification(req.body);

    if (result?._id) {
        // TODO 
        // informationn is valid now we can update the user 
        const data = await verifyEmail(result.email)
        console.log(data, "from verify email")
        // delete the session info 
        if (data?._id) {

            deleteInfo(req.body)

            sendEmailVerificationConfirmation({
                fname: data.fname,
                email: data.email,

            })

        
           return  res.json({
                status: "success",
                message: "Your email has been verified, now you may login",

            })
            return
}   
    }


    res.json({
        status: "error",
        message: "Unable to verify email, either the link is invalid or expired"
    })

} catch (error) {
    res.json({
        status: "error",
        message: "Error, Unable to verify the email, please try again later"
    })
}




})

export default Router;