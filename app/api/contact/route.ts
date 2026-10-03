import{NextResponse}from"next/server";import{connectMongoDB}from"@/lib/mongodb";import{Contact}from"@/models/Contact";
export async function POST(req:Request){try{
const b=await req.json();const{name,email,subject,message}=b;if(!name||!email||!subject||!message)return NextResponse.json({error:"All fields are required."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({error:"Invalid email."},{status:400});await connectMongoDB();
const x=await Contact.create({name,email,subject,message});return NextResponse.json({success:true,id:x._id},{status:201})}catch{return NextResponse.json({error:"Server error."},{status:500})}}
