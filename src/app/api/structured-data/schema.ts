import { z } from "zod";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const recipeSchema = z.object({
    recipe:z.object({
        name:z.string(),
        ingrediants:z.array(
            z.object({
                name:z.string(),
                amount:z.string()
            })
        ),
        steps:z.array(z.string())
    })
})
