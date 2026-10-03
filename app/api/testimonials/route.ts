import{NextResponse}from"next/server";import{connectMongoDB}from"@/lib/mongodb";import{Testimonial}from"@/models/Testimonial";
export async function GET(){try{await connectMongoDB();return NextResponse.json(await Testimonial.find().lean())}catch{return NextResponse.json({error:"Unable to load testimonials."},{status:500})}}
export async function POST(req:Request){try{await connectMongoDB();return NextResponse.json(await Testimonial.create(await req.json()),{status:201})}catch{return NextResponse.json({error:"Unable to create testimonial."},{status:500})}}
