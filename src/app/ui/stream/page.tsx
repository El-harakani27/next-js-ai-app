"use client"
import { useCompletion } from "@ai-sdk/react"

export default function StreamPagereturn(){
    const {input,handleInputChange,handleSubmit,completion,isLoading,error,setInput,stop} = useCompletion({
        api:"/api/stream"
    })
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {error && <div className="text-red-500 mb-4">{error.message}</div> }
            {isLoading && !completion && <div>Loading ...</div>}
            {completion && <div className="whitespace-pre-wrap">{completion}</div>}
            <form
            className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
            onSubmit={(e)=>{
                e.preventDefault();
                setInput("")
                handleSubmit(e)
                }}>
                <div className="flex gap-2">
                    <input type="text" placeholder="How can i help you" 
                    className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
                    value={input}
                    onChange={handleInputChange}
                    />
                    {isLoading ? 
                    <button onClick={stop} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Stop
                    </button>:
                    <button type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    >Send</button>                    
                    }

                </div>
            </form>
        </div>

    )
}