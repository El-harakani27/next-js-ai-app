import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
export async function POST(req:Request){
    try{
    const {prompt} = await req.json()
    const result = await streamText({
        model:groq("llama-3.3-70b-versatile"),
        prompt
    })
    result.usage.then((usage)=>{
        console.log({
            inputTokens:usage.inputTokens,
            outputTokens:usage.outputTokens,
            totalTokens:usage.totalTokens
        })
    })
    return result.toUIMessageStreamResponse()       
    }catch(error){
        console.log("Error Streaming:",error)
        return new Response("Failed To stream",{status:500})
    }

}