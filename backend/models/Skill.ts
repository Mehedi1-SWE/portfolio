import mongoose,{Schema} from "mongoose";
const schema=new Schema({name:{type:String,required:true},category:{type:String,required:true},level:Number},{timestamps:true});
export const Skill=mongoose.models.Skill||mongoose.model("Skill",schema);