import mongoose,{Schema} from "mongoose";
const schema=new Schema({company:{type:String,required:true},position:{type:String,required:true},startDate:{type:String,required:true},endDate:String,location:String,responsibilities:[String]},{timestamps:true});
export const Experience=mongoose.models.Experience||mongoose.model("Experience",schema);