'use server';

import { feedbackSchema } from "@/constants";
import { db, auth } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY });


export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection('interview')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();


    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]

}



export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {

    const { userId, limit = 20 } = params;

    const interviews = await db
        .collection('interview')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]

}


export async function getInterviewById(id: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection('interview')
        .doc(id)
        .get();

    return interviews.data() as Interview[] | null;
}




export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript, feedbackId } = params;

    try {
        // ✅ Formatting transcript properly
        const formattedTranscript = transcript.map((sentence) => (
            `- ${sentence.role}: ${sentence.content}\n`
        )).join('');

        const prompt = `
         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - Communication Skills: Clarity, articulation, structured responses.
        - Technical Knowledge: Understanding of key concepts for the role.
        - Problem-Solving: Ability to analyze problems and propose solutions.
        - Cultural & Role Fit: Alignment with company values and job role.
        - Confidence & Clarity: Confidence in responses, engagement, and clarity.
        
        Return **only** a valid JSON object. Do **not** include markdown, code blocks, or extra text.
        `;

        // ✅ Calling Gemini API correctly
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        // ✅ Parsing the AI response correctly
        let textResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        // ✅ Remove unwanted markdown/code blocks
        textResponse = textResponse.replace(/^```json|```$/g, "").trim();

        // ✅ Extract JSON safely using regex (handles cases where AI response contains extra text)
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : "{}";

        // ✅ Parsing JSON safely
        let object;
        try {
            object = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("Error parsing AI response as JSON", parseError);
            throw new Error("Invalid JSON format returned by AI.");
        }

        // ✅ Constructing feedback object
        const feedback = {
            interviewId,
            userId,
            totalScore: object.totalScore || 0,
            categoryScores: object.categoryScores || {},
            strengths: object.strengths || [],
            areasForImprovement: object.areasForImprovement || [],
            finalAssessment: object.finalAssessment || "",
            createdAt: new Date().toISOString(),
        };

        // ✅ Saving to Firestore correctly
        const feedbackRef = feedbackId
            ? db.collection("feedback").doc(feedbackId)
            : db.collection("feedback").doc();

        await feedbackRef.set(feedback);

        return { success: true, feedbackId: feedbackRef.id };
    } catch (error) {
        console.error("Error in saving feedback", error);
        return { success: false };
    }
}



export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {

    const { interviewId, userId } = params;

    const feedback = await db
        .collection('feedback')
        .where('interviewId', '==', interviewId)
        .where('userId', '!=', userId)
        .limit(1)
        .get();

    if (feedback.empty) return null

    const feedbackDoc = feedback.docs[0]

    return {
        id: feedbackDoc.id,
        ...feedbackDoc.data()
    } as Feedback



}