import { groq } from "@ai-sdk/groq";
import { streamText,UIMessage,convertToModelMessages } from "ai";

export async function POST(req:Request){
    try{
        const {messages}:{messages:UIMessage[]} = await req.json()
        
        const result = streamText({
            model:groq('openai/gpt-oss-120b'),
            messages:convertToModelMessages(messages)
        })
        console.log(JSON.stringify(messages,null,2))       
        return result.toUIMessageStreamResponse()
    }catch(error){
        console.log("Error",error)
        return new Response("Failed to stream chat completion",{status:500})
    }

}