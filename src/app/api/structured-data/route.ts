import { streamObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try{
    const { dish } = await req.json();

  // Stream a JSON object from the model
  const result = streamObject({
    model: groq("openai/gpt-oss-120b"),
    schema: recipeSchema,
    prompt: `Generate a detailed recipe for a dish called ${dish}.`,
  });

  return result.toTextStreamResponse();    
  }catch(error){
    console.log("Error generating recipe:",error)
    return new Response("Failed to generate recipe",{status:500})
  }

}