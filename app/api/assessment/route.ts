import { z } from "zod";
import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from "@langchain/core/runnables";
import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import userModel from "@/models/user.model";

const QuestionSchema = z.object({
  question: z.string().describe("The mental health assessment question"),
  options: z
    .array(z.string())
    .min(4)
    .max(5)
    .describe("Multiple choice options"),
});

const AssessmentSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .min(10)
    .max(12)
    .describe("List of mental health assessment questions"),
});

const analysisSchema = z.object({
  risk_level: z.string().describe("the risk level of a mental health"),
  mental_health_score: z.number(),
  overall_summary: z.string(),
});

const parser = StructuredOutputParser.fromZodSchema(AssessmentSchema);
const chatPrompt = SystemMessagePromptTemplate.fromTemplate(`
You are a licensed mental health assessment assistant. 
Generate 10–12 clinically appropriate, empathetic, and non-judgmental multiple-choice questions to help analyze a patient’s current mental health condition.

Guidelines:
- Questions should assess mood, anxiety, stress, sleep, energy levels, focus, social withdrawal, motivation, emotional regulation, and daily functioning.
- Use simple, clear, patient-friendly language.
- Avoid making diagnoses.
- Avoid triggering or graphic content.
- Each question should have 4–5 multiple-choice options ranging from positive to severe.
- Include time-based framing (e.g., “in the past 2 weeks”).
- Ensure questions are suitable for a general mental health screening tool.
- Maintain a supportive and non-alarming tone.
- Do NOT provide medical advice or conclusions.

CRITICAL OUTPUT RULES:
- Return ONLY the final data JSON object.
- Do NOT include JSON schema.
- Do NOT include markdown code fences.
- Do NOT include explanations.
- Output must be a valid JSON object.


Required JSON shape:
{{
  "questions": [
    {{
      "question": "string",
      "options": ["string", "string", "string", "string"]
    }}
  ]
}}
`);

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const role = req.headers.get("x-user-role");
    if (!role)
      return NextResponse.json({
        success: false,
        message: "First Login!!!",
      });

    if (role != "patient")
      return NextResponse.json({
        success: false,
        message: "you are not authorized",
      });
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: "llama-3.1-8b-instant",
    });

    const chain = RunnableSequence.from([chatPrompt, model, parser]);

    const result = await chain.invoke({});

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Mental health assessment generation error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to generate mental health assessment",
      },
      { status: 500 },
    );
  }
}

const analyzePrompt = SystemMessagePromptTemplate.fromTemplate(`
You are a mental health screening analysis assistant.

You will be given a list of mental health assessment questions and the user’s selected answers.

Here is the submitted data:
{questions}

Your task is to analyze the responses and estimate the user’s overall mental health situation in a supportive, non-diagnostic way.

Rules:
- Do NOT provide medical diagnoses.
- Do NOT provide medical or medication advice.
- Use empathetic and neutral language.
- Base your analysis only on the provided answers.
- Identify general severity based on patterns across answers.
- Do NOT include crisis or alarming language unless clearly indicated.
- Keep the summary brief and supportive.

Scoring:
- Generate a mental_health_score from 0 to 100.
  - 0 = very poor current mental health state
  - 100 = very positive current mental health state

Risk Levels:
- "low" = mostly positive / minimal distress
- "moderate" = noticeable stress, mood, or functioning concerns
- "elevated" = significant or widespread distress indicators

Output requirements:
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanations outside JSON.

Required JSON format:
{{
  "risk_level": "low | moderate | elevated",
  "mental_health_score": number,
  "overall_summary": "Brief, empathetic summary in simple language"
}}
`);

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const role = req.headers.get("x-user-role");
    const userid = req.headers.get("x-user-id");
    if (!role)
      return NextResponse.json({
        success: false,
        message: "first login !!",
      });

    if (role != "patient")
      return NextResponse.json({
        success: false,
        message: "role must be paitent",
      });
    const { answers } = await req.json();

    if (!answers)
      return NextResponse.json({
        message: "Submission not exists",
      });

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: "llama-3.1-8b-instant",
    });

    const parser = StructuredOutputParser.fromZodSchema(analysisSchema);

    const chain = RunnableSequence.from([analyzePrompt, model, parser]);

    const response = await chain.invoke({ questions: JSON.stringify(answers) });

    
    const user = await userModel.findOne({
      $or: [{ _id: userid }, { role: "patient" }],
    });
    if (!user) {
      return NextResponse.json({
        message: "Submission Failed",
      });
    }


    user.mental_health_report.risk_level = response.risk_level;
    user.mental_health_report.overall_summary = response.overall_summary;
    user.mental_health_report.health_score = response.mental_health_score;
    await user.save();
    return NextResponse.json({
      message: "result analysis",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate mental health assessment",
      },
      { status: 500 },
    );
  }
}
