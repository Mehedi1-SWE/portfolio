import mongoose,{Schema} from "mongoose";
const schema=new Schema({title:{type:String,required:true},slug:{type:String,required:true,unique:true},description:{type:String,required:true},image:String,technologies:[String],githubUrl:String,liveUrl:String,featured:{type:Boolean,default:false}},{timestamps:true});
export const Project=mongoose.models.Project||mongoose.model("Project",schema);