import mongoose,{Schema} from "mongoose";
const schema=new Schema({name:{type:String,required:true,maxlength:100},email:{type:String,required:true},subject:{type:String,required:true,maxlength:160},message:{type:String,required:true,maxlength:3000}},{timestamps:true});
export const Contact=mongoose.models.Contact||mongoose.model("Contact",schema);