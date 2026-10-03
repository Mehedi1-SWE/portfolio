import mongoose,{Schema} from "mongoose";
const schema=new Schema({name:{type:String,required:true},profession:{type:String,required:true},profileImage:String,message:{type:String,required:true},rating:{type:Number,min:1,max:5,default:5}},{timestamps:true});
export const Testimonial=mongoose.models.Testimonial||mongoose.model("Testimonial",schema);