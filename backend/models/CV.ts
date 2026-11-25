import mongoose,{Schema} from "mongoose";
const cvSchema=new Schema({type:{type:String,required:true,enum:["academic","professional","complete"],unique:true},label:{type:String,required:true},secureUrl:{type:String,required:true},publicId:{type:String,required:true},originalFilename:{type:String,required:true},bytes:{type:Number,required:true},format:{type:String,enum:["pdf"],default:"pdf"}},{timestamps:true});
export const CV=mongoose.models.CV||mongoose.model("CV",cvSchema);
