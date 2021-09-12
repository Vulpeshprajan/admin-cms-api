import SessionSchema from "./Session.schema.js";
import { randomNumberGenerator } from "../../utils/randomGenerator.js";

// to create a unique email validation info 

const pinLength = 6;
export const createUniqueEmailConfirmation = async email => {

    try {
        // generate random 6 digit numbers 
        const pin = randomNumberGenerator(pinLength);
        const newEmailValidation = {
            pin,
            email,
            
        }

        if (!pin || !email) {
            return false
        }
            
        const result = await SessionSchema(newEmailValidation).save();
        console.log(result);
        return result;





        // store pin with email in session table 
        
    } catch (error) {
        console.log(error)
        return false;
        // throw new Error(error)
    }

}