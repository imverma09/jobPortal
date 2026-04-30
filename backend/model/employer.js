const mongoose =  require("mongoose")
const employerSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName : { type: String , required : true },
    companyWebsite : { type: String },
    about : { type: String },
})

module.exports = mongoose.model("Employer" , employerSchema )