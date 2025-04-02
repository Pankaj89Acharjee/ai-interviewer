import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY });
// Creating function like below for Routers in NextJS


// The API Endpoint for this function would be like the folder structure (localhost:3000/api/vapi/generate) since this function resides in this same path under app folder (app/api/vapi/generate)

export async function GET() {
    return Response.json({ success: true, data: "Ok ok" }, { status: 200 })
}


// Getting question that are generated from the Gemini AI and saving it in the firebase database

export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid } = await request.json()

    try {
        const { text: questions } = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        If ${role} is different from Mathematics, then tech stack would be for Mathematics.
        The focus between behavioural and technical questions should lean towards: ${type}.
        For Mathematics questions will be of a Post Graduate Teaching Role in India for institutions like NVS, KVS.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
        });

        // For storing in the firebase database
        const interview = {
            role, level, type,
            techstack: techstack.split(','),
            questions: JSON.parse(questions || '[]'),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(), //Later enable user to upload images
            createdAt: new Date().toISOString()
        }

        await db.collection('interviews').add(interview)

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error)

        return Response.json({ success: false, error }, { status: 500 })
    }
}