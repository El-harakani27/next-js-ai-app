import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
export async function POST(){
    try{
    
    const response = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt:"You are a helpful AI assistant. Always answer concisely and accurately, and always respond in English. Explain what Vercel is."
    })
    console.log({
        inputTokens:response.usage.inputTokens,
        outputTokens:response.usage.outputTokens,
        totalTokens:response.usage.totalTokens
    })
    return Response.json({text:response.text})        
    }catch(error){
        console.log("Error,",error)
        return Response.json({error:"Failed to generate text"},{status:500})
    }

}