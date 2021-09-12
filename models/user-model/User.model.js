import UserSchema from "./User.schema.js"


export const createUser =  newUser => {
try {
    const result =   UserSchema(newUser).save()
    return result;
} catch (error) {
    throw new Error(error)
    
}

}


export const verifyEmail = email => {
try {
    const result = UserSchema.findOneAndUpdate(
        { email },
        { isemailConfirm: true },
        { new: true }
    );
    console.log(result)
    return result;
} catch (error) {
    throw new Error(error)
    
}


}