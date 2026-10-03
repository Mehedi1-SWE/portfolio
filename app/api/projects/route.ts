import{NextResponse}from"next/server";import{connectMongoDB}from"@/lib/mongodb";import{Project}from"@/models/Project";
export async function GET(){try{await connectMongoDB();return NextResponse.json(await Project.find().sort({createdAt:-1}).lean())}catch{return NextResponse.json({error:"Unable to load projects."},{status:500})}}
export async function POST(req:Request){try{await connectMongoDB();return NextResponse.json(await Project.create(await req.json()),{status:201})}catch{return NextResponse.json({error:"Unable to create project."},{status:500})}}
