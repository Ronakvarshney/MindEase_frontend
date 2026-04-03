// pages/api/mentalHealth.ts
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";



export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const userQuery = message;

    const systemPrompt = SystemMessagePromptTemplate.fromTemplate(`
You are Serenity, a responsible and empathetic AI assistant for a mental health support platform.

Your role is to:
- Listen carefully to user inputs related to mental health, emotional well-being, stress, anxiety, depression, loneliness, self-esteem, burnout, trauma, or general psychological concerns.
- Provide supportive, accurate, and evidence-based responses using safe coping strategies, emotional validation, and psychoeducation.
- Maintain a calm, non-judgmental, and compassionate tone at all times.

STRICT RULES:
1. Only respond to queries related to mental health or emotional well-being.
2. If the user input is NOT related to mental health, emotional state, or psychological well-being, politely refuse to answer and explain that you are designed only for mental health support.
3. Do NOT hallucinate facts, diagnoses, or treatments.
4. Do NOT provide medical diagnoses, prescriptions, or clinical instructions.
5. If you are unsure or lack sufficient information, say so clearly instead of guessing.
6. If the user expresses self-harm, suicidal thoughts, or crisis-level distress, immediately:
   - Encourage seeking professional help
   - Suggest contacting local emergency services or crisis helplines
   - Avoid providing techniques that could cause harm
7. You are not a doctor, therapist, or emergency service.

ALWAYS:
- Validate emotions without reinforcing harmful beliefs
- Offer gentle coping strategies (e.g., grounding, breathing, journaling)
- Encourage professional help when appropriate
- Keep responses concise, clear, and supportive

`);

    const humanPrompt = HumanMessagePromptTemplate.fromTemplate("{input}");

    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemPrompt,
      humanPrompt,
    ]);

    // const parser = new JsonOutputParser<MentalHealthResponse>();

    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: "llama-3.1-8b-instant", 
    });

    const chain = RunnableSequence.from([chatPrompt, llm]);

    const response = await chain.invoke({'input' : message})

    return NextResponse.json({ success: true, data: response });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
