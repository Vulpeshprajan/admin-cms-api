import mongoose from "mongoose";

const UserScheme = mongoose.Schema(
    { 
        Status: {
            type: String,
            default: "Active",
   

    },
        fname: {
            type: String,
            required: true,
            default: "",
            max: 20,
        },

        lname: {
            type: String,
            required: true,
            default: "",
            max: 20,
        },

        dob: {
        
            type: Date,
        },

        email: {
            type: String,
            required: true,
            default: "",
            max: 50,
            unique: true,
            index: 1
        },
        isemailConfirm: {
            type: Boolean,
            default: false
        },
    

        password: {
            type: String,
            required: true,
            default: "",
            max: 20,
        
        },
        
        phone: {
            type: String,
        
            default: "",
            max: 15,
        },
        address: {
            type: String,
            default: "",
            max: 100
        },
        gender: {
            type: String,
        },

        role: {
            type: String,
            required: true,
            default: "user",
           
        },


    }, {
    timestamps: true,
}    
);

const user = mongoose.model("User", UserScheme);

export default user;