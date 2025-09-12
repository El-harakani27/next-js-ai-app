import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
export async function POST(req:Request){
    try{
    const {prompt} = await req.json()
    const {text} = await generateText({
        model: groq("deepseek-r1-distill-llama-70b"),
        prompt
    })
    return Response.json({text})        
    }catch(error){
        console.log("Error,",error)
        return Response.json({error:"Failed to generate text"},{status:500})
    }

}