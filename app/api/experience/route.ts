import{NextResponse}from"next/server";import{connectMongoDB}from"@/lib/mongodb";import{Experience}from"@/models/Experience";
export async function GET(){try{await connectMongoDB();return NextResponse.json(await Experience.find().lean())}catch{return NextResponse.json({error:"Unable to load experience."},{status:500})}}
export async function POST(req:Request){try{await connectMongoDB();return NextResponse.json(await Experience.create(await req.json()),{status:201})}catch{return NextResponse.json({error:"Unable to create experience."},{status:500})}}
