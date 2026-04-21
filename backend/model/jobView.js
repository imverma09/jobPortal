const mongoose =  require("mongoose")
const jobViewSchema =   mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    jobId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job",
        required : true 
    } ,
    ipAddress :  String , 
    viewAt : {
        type : Date , 
        default : Date.now
    }
})

jobViewSchema.index({jobId : 1 , userId : 1 , ipAddress : 1 } , {unique  : true})
module.exports  =  mongoose.model("jobView" , jobViewSchema)