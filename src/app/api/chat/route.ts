import { groq } from "@ai-sdk/groq";
import { UIMessage,streamText,convertToModelMessages } from "ai";
export async function POST(req:Request){
    try{
    const {messages}:{messages:UIMessage[]} = await req.json()
    const result = await streamText({
        model:groq("gemma2-9b-it"),
        messages:convertToModelMessages(messages)
    })
    result.usage.then((usage)=>{
        console.log({
            inputTokens:usage.inputTokens,
            outputTokens:usage.outputTokens,
            totalTokens:usage.totalTokens
        })
    })
    console.log(JSON.stringify(messages, null, 2))
    return result.toUIMessageStreamResponse()        
    }catch(error){
        console.log("Error",error)
        return new Response("Failed to stream chat completion",{status:500})
    }

}