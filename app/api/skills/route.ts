import{NextResponse}from"next/server";import{connectMongoDB}from"@/lib/mongodb";import{Skill}from"@/models/Skill";
export async function GET(){try{await connectMongoDB();return NextResponse.json(await Skill.find().lean())}catch{return NextResponse.json({error:"Unable to load skills."},{status:500})}}
export async function POST(req:Request){try{await connectMongoDB();return NextResponse.json(await Skill.create(await req.json()),{status:201})}catch{return NextResponse.json({error:"Unable to create skill."},{status:500})}}
